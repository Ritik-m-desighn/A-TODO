
  import express from "express";
  import mongoose from "mongoose";
  import cors from "cors";
  import dotenv from "dotenv";
  import todoRoutes from "./routes/todoRoutes.js";

  dotenv.config();
  const app =express();
  app.use(cors());
  app.use(express.json());
  
  app.get("/", (req, res) => {
  res.send("Backend is running!");
});


  mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ MongoDB connected")).catch((err) => console.log(err));
  app.use("/api/todos", todoRoutes);
  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));