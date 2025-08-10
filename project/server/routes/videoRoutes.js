import express from "express";
import multer from "multer";
import { generateVideo } from "../controllers/videoController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/generate-video", upload.single("video"), generateVideo);

export default router;