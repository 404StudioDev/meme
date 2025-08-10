import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import imageRoutes from "./routes/imageRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import { healthCheck } from "./utils/healthCheck.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/health", healthCheck);
app.use("/", imageRoutes);
app.use("/", videoRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ MemeForge server running on http://localhost:${PORT}`);
});