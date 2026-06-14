import { createHash } from "node:crypto";
import { applyApiHeaders, sendError, sendJson } from "./_http.js";
import { contactCollection } from "./_mongo.js";

async function readBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    return parseBodyString(req.body, req.headers["content-type"] || "");
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  return parseBodyString(rawBody, req.headers["content-type"] || "");
}

function parseBodyString(rawBody, contentType) {
  if (!rawBody) {
    return {};
  }

  if (contentType.includes("application/json")) {
    return JSON.parse(rawBody);
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(rawBody));
  }

  return {};
}

function cleanString(value, maxLength) {
  const cleaned = String(value ?? "")
    .trim()
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");

  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned;
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "";
}

function ipHash(req) {
  const appKey = process.env.APP_KEY || "portfolio";
  return createHash("sha256").update(`${clientIp(req)}|${appKey}`).digest("hex");
}

export default async function handler(req, res) {
  if (applyApiHeaders(req, res)) {
    return;
  }

  if (req.method !== "POST") {
    sendError(res, "Method not allowed.", 405);
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    sendError(res, "Invalid request body.", 400);
    return;
  }

  const name = cleanString(body.name, 120);
  const email = cleanString(body.email, 254).toLowerCase();
  const subject = cleanString(body.subject, 160);
  const message = cleanString(body.message, 5000);
  const validationErrors = {};

  if (!name) {
    validationErrors.name = "Name is required.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    validationErrors.email = "A valid email is required.";
  }

  if (!subject) {
    validationErrors.subject = "Subject is required.";
  }

  if (!message) {
    validationErrors.message = "Message is required.";
  }

  if (Object.keys(validationErrors).length > 0) {
    sendJson(
      res,
      {
        ok: false,
        message: "Please check the form and try again.",
        errors: validationErrors,
      },
      422,
    );
    return;
  }

  try {
    const collection = await contactCollection();

    await collection.insertOne({
      name,
      email,
      subject,
      message,
      source: "portfolio-contact-form",
      ipHash: ipHash(req),
      userAgent: String(req.headers["user-agent"] || "").slice(0, 300),
      createdAt: new Date(),
    });

    sendJson(res, {
      ok: true,
      message: "Message received.",
    });
  } catch (error) {
    console.error("Contact form MongoDB insert failed:", error.constructor?.name || "Error");
    sendError(res, "Unable to send your message right now. Please try again later.", 503);
  }
}
