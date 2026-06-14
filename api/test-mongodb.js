import { applyApiHeaders, sendError, sendJson } from "./_http.js";
import { mongoDatabase } from "./_mongo.js";

export default async function handler(req, res) {
  if (applyApiHeaders(req, res)) {
    return;
  }

  if (req.method !== "GET") {
    sendError(res, "Method not allowed.", 405);
    return;
  }

  try {
    const database = await mongoDatabase();
    await database.command({ ping: 1 });

    sendJson(res, {
      ok: true,
      message: "MongoDB connection is healthy.",
    });
  } catch (error) {
    console.error("MongoDB health check failed:", error.constructor?.name || "Error");
    sendError(res, "MongoDB connection is not available.", 503);
  }
}
