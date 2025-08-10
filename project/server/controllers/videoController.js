import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

export const generateVideo = (req, res) => {
  const { topText, bottomText } = req.body;
  const videoPath = req.file.path;

  if (!topText && !bottomText) {
    return res.status(400).json({ error: "At least one text (top or bottom) is required" });
  }

  const outputPath = `uploads/output/${Date.now()}_video.mp4`;

  // Ensure output directory exists
  fs.mkdirSync("uploads/output", { recursive: true });

  // Build FFmpeg drawtext filters
  let drawTextFilters = [];
  if (topText) {
    drawTextFilters.push(
      `drawtext=text='${topText}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=20:borderw=2:bordercolor=black`
    );
  }
  if (bottomText) {
    drawTextFilters.push(
      `drawtext=text='${bottomText}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=h-th-20:borderw=2:bordercolor=black`
    );
  }

  ffmpeg(videoPath)
    .videoFilters(drawTextFilters)
    .output(outputPath)
    .on("end", () => {
      res.download(outputPath, (err) => {
        if (err) console.error("Download error:", err);

        // Cleanup
        fs.unlinkSync(videoPath);
        fs.unlinkSync(outputPath);
      });
    })
    .on("error", (err) => {
      console.error("FFmpeg error:", err);
      res.status(500).json({ error: "Video processing failed" });
    })
    .run();
};