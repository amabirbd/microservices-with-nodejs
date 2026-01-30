import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app.js";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "asfdsf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("Database not initialized");
  }

  const collections = await db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});
