
  import express from "express";
  import mongoose from "mongoose";
  import cors from "cors";
  import dotenv from "dotenv";
  import todoRoutes from "./routes/todoRoutes.js";

  dotenv.config();
  const app =express();
  app.use(cors());
  app.use(express.json());

  mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ MongoDB connected")).catch((err) => console.log(err));
  app.use("/api/todos", todoRoutes);
  const port=5000;
  app.listen(port,()=>console.log(`🚀 Server running on port ${port}`));