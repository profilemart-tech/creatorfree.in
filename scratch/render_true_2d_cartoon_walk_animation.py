import os
import sys
import shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import subprocess

output_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\indian-characters'
desktop_dir = r'C:\Users\user\OneDrive\Desktop\indian_anime_walkable_characters'
upload_dir = r'C:\Users\user\OneDrive\Desktop\vfx_to_upload\indian_anime_characters'

for d in [output_dir, desktop_dir, upload_dir]:
    os.makedirs(d, exist_ok=True)

print("Rendering True 2D Cartoon Film Frame-by-Frame Limb Walk Cycle Animation...")

W, H = 1920, 1080
FPS = 24
DURATION = 4 # 4 seconds walk
TOTAL_FRAMES = FPS * DURATION

frame_dir = os.path.join(output_dir, 'true_cartoon_frames')
os.makedirs(frame_dir, exist_ok=True)

# Color Palette for 2D Indian Anime Lady (Teal Salwar Kameez, Red Dupatta, Skin, Hair)
TEAL_DARK = (13, 148, 136, 255)
TEAL_LIGHT = (20, 184, 166, 255)
RED_DUPATTA = (220, 38, 38, 255)
GOLD_TRIM = (250, 204, 21, 255)
SKIN_COLOR = (252, 211, 77, 255)
HAIR_COLOR = (28, 25, 23, 255)
OUTLINE = (17, 24, 39, 255)

def draw_limb(draw, p1, p2, width, color, outline=OUTLINE):
    """Draws a smooth cartoon limb segment with joint caps."""
    draw.line([p1, p2], fill=outline, width=width+6)
    draw.line([p1, p2], fill=color, width=width)
    draw.ellipse([p1[0]-width//2, p1[1]-width//2, p1[0]+width//2, p1[1]+width//2], fill=color, outline=outline, width=2)
    draw.ellipse([p2[0]-width//2, p2[1]-width//2, p2[0]+width//2, p2[1]+width//2], fill=color, outline=outline, width=2)

def draw_foot(draw, ankle, angle_deg, color=SKIN_COLOR):
    rad = np.radians(angle_deg)
    toe = (ankle[0] + int(45 * np.cos(rad)), ankle[1] + int(25 * np.sin(rad)))
    heel = (ankle[0] - int(15 * np.cos(rad)), ankle[1] - int(10 * np.sin(rad)))
    draw.polygon([ankle, toe, (toe[0], toe[1]+12), (heel[0], heel[1]+12), heel], fill=color, outline=OUTLINE, width=3)

# Render 96 Individual Cartoon Animation Keyframes
for f in range(TOTAL_FRAMES):
    img = Image.new("RGBA", (W, H), (15, 23, 42, 255))
    draw = ImageDraw.Draw(img)

    # 1. Background Grid & Horizon Line
    draw.rectangle([0, H-280, W, H], fill=(30, 41, 59, 255))
    draw.line([(0, H-280), (W, H-280)], fill=(64, 83, 112, 255), width=4)

    # Walk Kinematic Calculations
    walk_progress = (f / FPS) * 1.8 # 1.8 walk cycles per second
    phase = walk_progress * 2 * np.pi

    # Character Root Center Moving Left to Right
    char_x = int((f * 12) % (W + 300) - 150)
    
    # Body Vertical Bobbing (Weight down on contact/down pose, high on pass pose)
    hip_y = H - 520 + int(np.sin(phase * 2) * 18)
    hip_pos = (char_x, hip_y)

    # Leg Angles (Forward & Back Motion)
    # Left Leg (Far / Back Leg)
    l_hip_angle = np.sin(phase) * 35
    l_knee_flex = max(0, -np.sin(phase + np.pi/4) * 45)
    
    # Right Leg (Near / Front Leg)
    r_hip_angle = -np.sin(phase) * 35
    r_knee_flex = max(0, -np.sin(phase - np.pi/4) * 45)

    # Arm Angles (Opposite to Legs for natural walk balance)
    l_arm_angle = -np.sin(phase) * 30
    r_arm_angle = np.sin(phase) * 30

    # Spine / Torso Position
    torso_tilt = np.sin(phase) * 2.5
    neck_pos = (char_x + int(torso_tilt * 4), hip_y - 210)
    head_pos = (neck_pos[0], neck_pos[1] - 85)

    # -------------------------------------------------------------
    # DRAWING CHARACTER IN DEPTH ORDER (Back-to-Front Layering)
    # -------------------------------------------------------------

    # LAYER 1: Hair Braid Swaying Back
    braid_sway = int(np.cos(phase) * 15)
    draw.line([head_pos, (head_pos[0] - 50 + braid_sway, head_pos[1] + 180)], fill=HAIR_COLOR, width=28)

    # LAYER 2: LEFT LEG (FAR / BACK LEG)
    # Thigh
    l_thigh_rad = np.radians(90 + l_hip_angle)
    l_knee = (hip_pos[0] + int(110 * np.cos(l_thigh_rad)), hip_pos[1] + int(110 * np.sin(l_thigh_rad)))
    draw_limb(draw, hip_pos, l_knee, 38, TEAL_DARK)

    # Shin
    l_shin_rad = np.radians(90 + l_hip_angle + l_knee_flex)
    l_ankle = (l_knee[0] + int(110 * np.cos(l_shin_rad)), l_knee[1] + int(110 * np.sin(l_shin_rad)))
    draw_limb(draw, l_knee, l_ankle, 32, TEAL_DARK)
    draw_foot(draw, l_ankle, l_hip_angle * 0.5)

    # LAYER 3: LEFT ARM (FAR / BACK ARM)
    l_shoulder = (neck_pos[0] - 25, neck_pos[1] + 25)
    l_arm_rad = np.radians(90 + l_arm_angle)
    l_elbow = (l_shoulder[0] + int(90 * np.cos(l_arm_rad)), l_shoulder[1] + int(90 * np.sin(l_arm_rad)))
    draw_limb(draw, l_shoulder, l_elbow, 26, TEAL_DARK)
    l_hand = (l_elbow[0] + int(80 * np.cos(l_arm_rad + 0.2)), l_elbow[1] + int(80 * np.sin(l_arm_rad + 0.2)))
    draw_limb(draw, l_elbow, l_hand, 22, SKIN_COLOR)

    # LAYER 4: TORSO & KURTI
    draw.polygon([
        (neck_pos[0]-45, neck_pos[1]), (neck_pos[0]+45, neck_pos[1]),
        (hip_pos[0]+65, hip_pos[1]+40), (hip_pos[0]-65, hip_pos[1]+40)
    ], fill=TEAL_LIGHT, outline=OUTLINE, width=4)
    
    # Gold Embroidered Border
    draw.line([(neck_pos[0]-15, neck_pos[1]), (hip_pos[0], hip_pos[1]+40), (neck_pos[0]+15, neck_pos[1])], fill=GOLD_TRIM, width=8)

    # LAYER 5: DUPATTA FLOWING
    dupatta_sway = int(np.sin(phase) * 12)
    draw.line([(neck_pos[0]-35, neck_pos[1]+10), (hip_pos[0]-50+dupatta_sway, hip_pos[1]+180)], fill=RED_DUPATTA, width=32)

    # LAYER 6: RIGHT LEG (NEAR / FRONT LEG)
    r_thigh_rad = np.radians(90 + r_hip_angle)
    r_knee = (hip_pos[0] + int(110 * np.cos(r_thigh_rad)), hip_pos[1] + int(110 * np.sin(r_thigh_rad)))
    draw_limb(draw, hip_pos, r_knee, 40, TEAL_LIGHT)

    r_shin_rad = np.radians(90 + r_hip_angle + r_knee_flex)
    r_ankle = (r_knee[0] + int(110 * np.cos(r_shin_rad)), r_knee[1] + int(110 * np.sin(r_shin_rad)))
    draw_limb(draw, r_knee, r_ankle, 34, TEAL_LIGHT)
    draw_foot(draw, r_ankle, r_hip_angle * 0.5)

    # LAYER 7: HEAD & FACE
    draw.ellipse([head_pos[0]-55, head_pos[1]-65, head_pos[0]+55, head_pos[1]+55], fill=SKIN_COLOR, outline=OUTLINE, width=4)
    # Hair Top
    draw.chord([head_pos[0]-57, head_pos[1]-67, head_pos[0]+57, head_pos[1]+10], 180, 360, fill=HAIR_COLOR)
    # Bindi
    draw.ellipse([head_pos[0]+15, head_pos[1]-15, head_pos[0]+23, head_pos[1]-7], fill=RED_DUPATTA)
    # Anime Eye
    draw.ellipse([head_pos[0]+10, head_pos[1]-5, head_pos[0]+32, head_pos[1]+20], fill=(255,255,255,255), outline=OUTLINE, width=2)
    draw.ellipse([head_pos[0]+20, head_pos[1]+0, head_pos[0]+30, head_pos[1]+16], fill=HAIR_COLOR)

    # LAYER 8: RIGHT ARM (NEAR / FRONT ARM - SWINGING)
    r_shoulder = (neck_pos[0] + 25, neck_pos[1] + 25)
    r_arm_rad = np.radians(90 + r_arm_angle)
    r_elbow = (r_shoulder[0] + int(90 * np.cos(r_arm_rad)), r_shoulder[1] + int(90 * np.sin(r_arm_rad)))
    draw_limb(draw, r_shoulder, r_elbow, 28, TEAL_LIGHT)
    r_hand = (r_elbow[0] + int(80 * np.cos(r_arm_rad + 0.2)), r_elbow[1] + int(80 * np.sin(r_arm_rad + 0.2)))
    draw_limb(draw, r_elbow, r_hand, 24, SKIN_COLOR)

    # Save PNG Frame
    img.save(os.path.join(frame_dir, f"frame_{f:04d}.png"))

print("Compiling True 2D Cartoon Limb Animation Video with FFmpeg...")
out_mp4 = os.path.join(output_dir, 'cf_true_2d_cartoon_walk_cycle_1080p.mp4')
desktop_mp4 = os.path.join(desktop_dir, 'True2DCartoonLimbWalkCycle_1080p.mp4')

cmd = [
    'ffmpeg', '-y',
    '-r', str(FPS),
    '-i', os.path.join(frame_dir, 'frame_%04d.png'),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-crf', '16',
    out_mp4
]
subprocess.run(cmd, check=True)
shutil.copy2(out_mp4, desktop_mp4)

# Clean temp frames
shutil.rmtree(frame_dir, ignore_errors=True)

print("Successfully rendered True 2D Cartoon Film Limb Walk Cycle Animation Video!")
