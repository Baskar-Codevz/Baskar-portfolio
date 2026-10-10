import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import testimonialRoutes from "./routes/testimonials.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "20kb" }));

app.get("/", (_req, res) => {
  res.json({ message: "Baskar Portfolio API is running." });
});

app.use("/api/testimonials", testimonialRoutes);

async function startServer() {
  try {
    if (
      !process.env.MONGO_URI ||
      !process.env.JWT_SECRET ||
      !process.env.ADMIN_PASSWORD
    ) {
      throw new Error("Missing required environment variables in server/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");

    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();