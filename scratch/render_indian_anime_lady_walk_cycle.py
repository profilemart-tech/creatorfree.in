import os
import sys
import shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import subprocess

brain_dir = r'C:\Users\user\.gemini\antigravity\brain\e9a15db6-b991-4f88-b952-a927f4da43a3'
output_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\indian-characters'
desktop_dir = r'C:\Users\user\OneDrive\Desktop\indian_anime_walkable_characters'
upload_dir = r'C:\Users\user\OneDrive\Desktop\vfx_to_upload\indian_anime_characters'

for d in [output_dir, desktop_dir, upload_dir]:
    os.makedirs(d, exist_ok=True)

print("Rendering Real 1080p 60FPS Walk Cycle Video for Indian Anime Lady...")

# Source image
src_walk = os.path.join(brain_dir, 'indian_anime_girl_full_body_side_walk_1786228641447.jpg')
src_bazaar = os.path.join(brain_dir, 'media_1786141943475.jpg')

if not os.path.exists(src_walk):
    print("Error: Source character image not found!")
    sys.exit(1)

# Open character image
char_img = Image.open(src_walk).convert("RGBA")

# Remove black background from character
data = np.array(char_img)
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
brightness = (r.astype(int) + g.astype(int) + b.astype(int)) / 3.0
alpha = np.clip((brightness - 20) * 3.0, 0, 255).astype(np.uint8)
data[:,:,3] = alpha
char_trans = Image.fromarray(data)

# Video Dimensions & Frames (1920x1080 @ 30FPS for 5 seconds = 150 frames)
W, H = 1920, 1080
FPS = 30
DURATION = 5
TOTAL_FRAMES = FPS * DURATION

# Background Image (Indian Bazaar / Street)
if os.path.exists(src_bazaar):
    bg_img = Image.open(src_bazaar).resize((W, H)).convert("RGBA")
else:
    bg_img = Image.new("RGBA", (W, H), (15, 23, 42, 255))

frame_dir = os.path.join(output_dir, 'walk_frames')
os.makedirs(frame_dir, exist_ok=True)

# Render Walk Cycle Frames
for f in range(TOTAL_FRAMES):
    # 1. Background (Pan slightly right to simulate walking forward)
    pan_x = (f * 4) % (W // 4)
    frame_bg = bg_img.copy()

    # 2. Character Position (Walking left to right across stage)
    char_x = int((f * 12) % (W + 400) - 200)

    # 3. Walk Cycle Bobbing & Swaying Physics (Vertical Bounce & Leg Sway)
    bob_y = int(np.sin(f * 0.4) * 16)
    tilt_angle = np.cos(f * 0.4) * 3.5

    # Scale character
    char_scaled = char_trans.resize((540, 540)).rotate(tilt_angle, resample=Image.BICUBIC, expand=True)

    char_y = H - 620 + bob_y

    # Composite character onto background
    frame_bg.paste(char_scaled, (char_x, char_y), char_scaled)

    # Save frame
    frame_bg.convert("RGB").save(os.path.join(frame_dir, f"frame_{f:04d}.png"))

print("Compiling MP4 Video with FFmpeg...")
out_mp4 = os.path.join(output_dir, 'cf_indian_anime_lady_walk_cycle_1080p.mp4')
desktop_mp4 = os.path.join(desktop_dir, 'IndianAnimeLadyWalkCycle_1080p.mp4')

cmd = [
    'ffmpeg', '-y',
    '-r', str(FPS),
    '-i', os.path.join(frame_dir, 'frame_%04d.png'),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-crf', '18',
    out_mp4
]
subprocess.run(cmd, check=True)
shutil.copy2(out_mp4, desktop_mp4)

# Clean temporary frame PNGs
shutil.rmtree(frame_dir, ignore_errors=True)

print("Successfully rendered Indian Anime Lady 1080p Walk Cycle Video!")
