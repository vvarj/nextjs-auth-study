import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process?.env?.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected successfully");
    });
    connection.on("error", (err) => {
      console.log("Mongoose connection error:", err);
    });
  } catch (error) {
    console.log("DB error:", error);
  }
}
