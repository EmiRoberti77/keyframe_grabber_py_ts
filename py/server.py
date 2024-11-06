import ffmpeg
import os

def ensure_dir_exists(dir):
    if not os.path.exists(dir):
        os.mkdir(dir)
        print('created', dir)
    else:
        print(dir, 'found')

def extract_frames(video_path, output_folder, fps=1):
    ensure_dir_exists(output_folder)
    """Extract frames from a video at a specified frames per second (fps)."""
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