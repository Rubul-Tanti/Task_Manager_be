// src/db/mongoose/connect.ts
import mongoose from "mongoose";
import env from "../../config/env_config";

const connectToMongoDb = async (): Promise<void> => {
  try {
    const mongoUrl = env?.mongo_url;
    if (!mongoUrl) {
      throw new Error("MongoDB connection URL is not defined in env");
    }

    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToMongoDb;
