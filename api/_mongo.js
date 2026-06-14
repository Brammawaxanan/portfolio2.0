import { MongoClient } from "mongodb";

const globalForMongo = globalThis;

function requiredEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function databaseNameFromUri(uri) {
  try {
    const parsed = new URL(uri);
    const pathDatabase = parsed.pathname.replace(/^\/+/, "").split("/")[0];
    return pathDatabase ? decodeURIComponent(pathDatabase) : null;
  } catch {
    return null;
  }
}

export async function mongoClient() {
  if (globalForMongo.__portfolioMongoClient) {
    return globalForMongo.__portfolioMongoClient;
  }

  const uri = requiredEnv("MONGODB_URI");
  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();
  globalForMongo.__portfolioMongoClient = client;

  return client;
}

export async function mongoDatabase() {
  const uri = requiredEnv("MONGODB_URI");
  const databaseName =
    process.env.MONGODB_DATABASE?.trim() || databaseNameFromUri(uri) || "portfolio";
  const client = await mongoClient();

  return client.db(databaseName);
}

export async function contactCollection() {
  const collectionName = process.env.MONGODB_CONTACT_COLLECTION?.trim() || "messages";
  const database = await mongoDatabase();

  return database.collection(collectionName);
}
