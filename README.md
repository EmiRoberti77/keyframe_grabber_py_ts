Keyframe Grabber

The Keyframe Grabber extracts frames from a video file at a specified rate (e.g., 1 frame per second). This can be useful for analyzing specific moments in a video, capturing important frames, or feeding frames into an AI model for further processing. The tool is implemented in both Python and TypeScript, leveraging ffmpeg, a powerful multimedia framework for handling video, audio, and other multimedia files.

How it Works

The tool uses ffmpeg to process video files, which allows precise control over frame extraction:

    1.	FFmpeg: This multimedia framework can extract frames from video files using a specified frames-per-second (fps) rate.
    2.	Frame Extraction: By setting an fps rate, ffmpeg extracts frames periodically based on that rate. For example, an fps rate of 1 extracts one frame per second.
    3.	Output: The extracted frames are saved as image files in a specified output directory.

Implementations

Python

The Python implementation uses the ffmpeg-python library, a wrapper for ffmpeg. The code checks if the output directory exists, creates it if it doesn’t, and then extracts frames from the video.

Code Example (Python)

```python
import ffmpeg
import os

def ensure_directory_exists(directory_path):
    if not os.path.exists(directory_path):
        os.makedirs(directory_path)

def extract_frames(video_path, output_folder, fps=1):
    """Extract frames from a video at a specified frames per second (fps)."""
    ensure_directory_exists(output_folder)
    (
        ffmpeg
        .input(video_path)
        .filter('fps', fps=fps)
        .output(f'{output_folder}/frame%04d.jpg')
        .run()
    )

video_path = './video/video_in/sample_video.mkv'
output_folder = './video/keyframes_out/'
extract_frames(video_path=video_path, output_folder=output_folder)
```

Dependencies:

    •	ffmpeg-python: Install with pip install ffmpeg-python
    •	Make sure ffmpeg is installed on your system.

TypeScript

The TypeScript version uses the fluent-ffmpeg library, which is a Node.js wrapper for ffmpeg. It provides similar functionality, ensuring the output directory exists and saving extracted frames.

Code Example (TypeScript)

```typescript
import ffmpeg from "fluent-ffmpeg";
import * as fs from "fs";
import * as path from "path";
import ffmpegPath from "ffmpeg-static";

ffmpeg.setFfmpegPath(ffmpegPath!);

interface KeyframeExtractorConfig {
  videoPath: string;
  outputFolder: string;
  fps: number;
}

function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function extractKeyframes({
  videoPath,
  outputFolder,
  fps,
}: KeyframeExtractorConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    ensureDirectoryExists(outputFolder);

    ffmpeg(videoPath)
      .outputOptions([`-vf fps=${fps}`])
      .output(path.join(outputFolder, "frame-%04d.jpg"))
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

// Usage example
const config: KeyframeExtractorConfig = {
  videoPath: "./videos/sample_video.mp4",
  outputFolder: "./output_frames",
  fps: 1,
};

extractKeyframes(config)
  .then(() => console.log("Frames extracted successfully."))
  .catch((err) => console.error("Error extracting frames:", err));
```

Dependencies:
• fluent-ffmpeg and ffmpeg-static: Install with npm install fluent-ffmpeg ffmpeg-static
• Ensure ffmpeg is available via ffmpeg-static.

Setup

    1.	Install the required dependencies for your chosen language.
    2.	Provide the input video file path, output folder, and fps rate.
    3.	Run the script to extract frames.
