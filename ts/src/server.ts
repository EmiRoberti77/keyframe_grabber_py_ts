import ffmpeg from "fluent-ffmpeg";
import * as fs from "fs";
import * as path from "path";
import ffmpegPath from "ffmpeg-static";

// Set the path to the ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegPath!);

interface KeyFramesConfig {
  videoPath: string;
  outputPath: string;
  fps: number;
}

function ensureDirExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function extractKeyframes(params: KeyFramesConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    ensureDirExists(params.outputPath);

    ffmpeg(params.videoPath)
      .outputOptions([`-vf fps=${params.fps}`])
      .output(path.join(params.outputPath, "frame-%04d.jpg"))
      .on("start", (cmd) => console.log("Started ffmpeg with command:", cmd))
      .on("error", (err) => {
        console.error("Error processing video:", err);
        reject(err);
      })
      .on("end", () => {
        console.log("Frame extraction complete.");
        resolve();
      })
      .run();
  });
}

const config: KeyFramesConfig = {
  videoPath: "./video/video_in/sample_video.mkv",
  outputPath: "./video/keyframes_out",
  fps: 1,
};

extractKeyframes(config)
  .then(() => console.log("Frames extracted successfully."))
  .catch((err) => console.error("Error extracting frames:", err));
