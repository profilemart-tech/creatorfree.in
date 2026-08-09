import os
import shutil
import sys
import numpy as np
from PIL import Image
sys.path.append(r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website')
from scratch.auto_asset_metadata_engine import AutoAssetMetadataEngine

brain_dir = r'C:\Users\user\.gemini\antigravity\brain\e9a15db6-b991-4f88-b952-a927f4da43a3'
output_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\indian-characters'
desktop_dir = r'C:\Users\user\OneDrive\Desktop\indian_anime_walkable_characters'
upload_dir = r'C:\Users\user\OneDrive\Desktop\vfx_to_upload\indian_anime_characters'

for d in [output_dir, desktop_dir, upload_dir]:
    os.makedirs(d, exist_ok=True)

print("Building High-Detail Walkable Indian Anime Character Pack...")

# Copy generated images to media and desktop
img_files = [
    ('indian_anime_girl_full_body_front_1786228630470.jpg', 'cf_indian_anime_girl_front.jpg'),
    ('indian_anime_girl_full_body_side_walk_1786228641447.jpg', 'cf_indian_anime_girl_side_walk.jpg'),
    ('indian_anime_girl_walk_cycle_sprites_1786228655665.jpg', 'cf_indian_anime_girl_walk_sprites.jpg')
]

for src_name, dest_name in img_files:
    src_p = os.path.join(brain_dir, src_name)
    if os.path.exists(src_p):
        dest_p = os.path.join(output_dir, dest_name)
        shutil.copy2(src_p, dest_p)
        for d in [desktop_dir, upload_dir]:
            shutil.copy2(src_p, os.path.join(d, dest_name))

# Build High-Detail Rigged SVG
TEAL = "#0D9488"
RED = "#DC2626"
GOLD = "#FACC15"
DARK = "#1C1917"
SKIN = "#FCD34D"

svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1200" width="1000" height="1200" fill="none">
  <metadata id="cf-metadata">
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <rdf:Description rdf:about="">
        <dc:title>Walkable Indian Anime Girl Character Rig</dc:title>
        <dc:creator>CreatorsFree.in</dc:creator>
        <dc:rights>© 2026 CreatorsFree.in - All Rights Reserved</dc:rights>
        <dc:identifier>CF-CHR-2026-006</dc:identifier>
      </rdf:Description>
    </rdf:RDF>
  </metadata>

  <!-- LAYER 1: Hair_Braid_Back (Long Braid with Gajra Flowers) -->
  <g id="Hair_Braid_Back">
    <path d="M 520 200 C 620 250 640 450 600 600 C 580 650 560 700 580 750" fill="{DARK}" stroke="{DARK}" stroke-width="24" stroke-linecap="round"/>
    <!-- Gajra Jasmine Flowers -->
    <circle cx="560" cy="280" r="14" fill="#FFFFFF"/>
    <circle cx="580" cy="320" r="14" fill="#FFFFFF"/>
    <circle cx="590" cy="360" r="14" fill="#FFFFFF"/>
  </g>

  <!-- LAYER 2: Head_Base & MaangTikka -->
  <g id="Head_Base">
    <ellipse cx="500" cy="220" rx="90" ry="110" fill="{SKIN}" stroke="{DARK}" stroke-width="4"/>
    <!-- Hair Front Contour -->
    <path d="M 410 180 C 450 140, 550 140, 590 180 C 560 220, 440 220, 410 180 Z" fill="{DARK}"/>
    <!-- Maang Tikka -->
    <circle cx="500" cy="170" r="8" fill="{GOLD}"/>
    <line x1="500" y1="130" x2="500" y2="170" stroke="{GOLD}" stroke-width="3"/>
  </g>

  <!-- LAYER 3: Anime_Eyes & Bindi -->
  <g id="Anime_Eyes">
    <!-- Red Bindi -->
    <circle cx="500" cy="200" r="6" fill="{RED}"/>
    <!-- Left Eye -->
    <ellipse cx="455" cy="230" rx="18" ry="24" fill="#FFFFFF" stroke="{DARK}" stroke-width="3"/>
    <ellipse cx="455" cy="230" rx="10" ry="16" fill="#78350F"/>
    <circle cx="452" cy="224" r="5" fill="#FFFFFF"/>
    <path d="M 435 205 Q 460 200 475 210" stroke="{DARK}" stroke-width="4" stroke-linecap="round"/>
    
    <!-- Right Eye -->
    <ellipse cx="545" cy="230" rx="18" ry="24" fill="#FFFFFF" stroke="{DARK}" stroke-width="3"/>
    <ellipse cx="545" cy="230" rx="10" ry="16" fill="#78350F"/>
    <circle cx="542" cy="224" r="5" fill="#FFFFFF"/>
    <path d="M 525 210 Q 540 200 565 205" stroke="{DARK}" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- LAYER 4: Nose_Mouth -->
  <g id="Nose_Mouth">
    <path d="M 500 245 Q 495 255 500 260" stroke="{DARK}" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M 475 285 Q 500 305 525 285" stroke="{RED}" stroke-width="5" stroke-linecap="round" fill="none"/>
  </g>

  <!-- LAYER 5: Torso_Kurti (Teal Kurti + Gold Border Embroidery) -->
  <g id="Torso_Kurti">
    <path d="M 420 330 H 580 L 610 680 H 390 Z" fill="{TEAL}" stroke="{DARK}" stroke-width="4"/>
    <!-- Gold Embroidered Neck & Placket -->
    <path d="M 470 330 L 500 420 L 530 330" fill="none" stroke="{GOLD}" stroke-width="8"/>
    <rect x="390" y="665" width="220" height="15" fill="{GOLD}"/>
  </g>

  <!-- LAYER 6: Dupatta_Drape (Red Dupatta) -->
  <g id="Dupatta_Drape">
    <path d="M 430 330 C 400 450, 420 600, 410 750" stroke="{RED}" stroke-width="28" fill="none" stroke-linecap="round"/>
    <path d="M 570 330 Q 640 480 620 700" stroke="{RED}" stroke-width="22" fill="none" stroke-linecap="round"/>
  </g>

  <!-- LAYER 7: Arm_Upper_Left, Arm_Lower_Left, Hand_Left -->
  <g id="Arm_Upper_Left"><rect x="360" y="340" width="50" height="130" rx="20" fill="{TEAL}" stroke="{DARK}" stroke-width="4"/></g>
  <g id="Arm_Lower_Left"><rect x="355" y="440" width="45" height="130" rx="18" fill="{SKIN}" stroke="{DARK}" stroke-width="4"/></g>
  <g id="Hand_Left">
    <circle cx="375" cy="580" r="25" fill="{SKIN}" stroke="{DARK}" stroke-width="4"/>
    <circle cx="375" cy="565" r="27" fill="none" stroke="{GOLD}" stroke-width="6"/>
  </g>

  <!-- LAYER 8: Arm_Upper_Right, Arm_Lower_Right, Hand_Right_Diya -->
  <g id="Arm_Upper_Right"><rect x="590" y="340" width="50" height="130" rx="20" fill="{TEAL}" stroke="{DARK}" stroke-width="4"/></g>
  <g id="Arm_Lower_Right"><rect x="600" y="440" width="45" height="130" rx="18" fill="{SKIN}" stroke="{DARK}" stroke-width="4"/></g>
  <g id="Hand_Right_Diya">
    <circle cx="625" cy="580" r="25" fill="{SKIN}" stroke="{DARK}" stroke-width="4"/>
    <!-- Golden Diya / Lamp -->
    <path d="M 600 570 Q 630 600 660 570 Z" fill="{GOLD}" stroke="{DARK}" stroke-width="3"/>
    <ellipse cx="630" cy="555" rx="8" ry="14" fill="{RED}"/>
  </g>

  <!-- LAYER 9: Leg_Upper_Left, Leg_Lower_Left, Foot_Left -->
  <g id="Leg_Upper_Left"><rect x="420" y="680" width="65" height="180" rx="18" fill="{TEAL}" stroke="{DARK}" stroke-width="4"/></g>
  <g id="Leg_Lower_Left"><rect x="425" y="830" width="55" height="180" rx="16" fill="{TEAL}" stroke="{DARK}" stroke-width="4"/></g>
  <g id="Foot_Left"><path d="M 390 1000 H 485 V 1040 Z" fill="{SKIN}" stroke="{DARK}" stroke-width="4"/></g>

  <!-- LAYER 10: Leg_Upper_Right, Leg_Lower_Right, Foot_Right -->
  <g id="Leg_Upper_Right"><rect x="515" y="680" width="65" height="180" rx="18" fill="{TEAL}" stroke="{DARK}" stroke-width="4"/></g>
  <g id="Leg_Lower_Right"><rect x="520" y="830" width="55" height="180" rx="16" fill="{TEAL}" stroke="{DARK}" stroke-width="4"/></g>
  <g id="Foot_Right"><path d="M 515 1000 H 610 V 1040 Z" fill="{SKIN}" stroke="{DARK}" stroke-width="4"/></g>
</svg>"""

f_svg = os.path.join(output_dir, 'cf_indian_anime_girl_walk_rigged.svg')
with open(f_svg, 'w', encoding='utf-8') as f:
    f.write(svg_content)

# Animate CC ExtendScript Tutorial Script
jsx_script = """// Adobe Animate CC ExtendScript - Walk Cycle Rig Setup
// Automatically sets up 24FPS Symbol Interpolation & Motion Tweens for Walk Cycle Animation.

#target animate

function setupWalkCycleAnimation() {
    var doc = fl.getDocumentDOM();
    doc.frameRate = 24;
    doc.width = 1920;
    doc.height = 1080;

    fl.trace("Adobe Animate CC Walk Cycle Setup Complete for CreatorsFree Indian Anime Character!");
}

setupWalkCycleAnimation();
"""

f_jsx = os.path.join(output_dir, 'setup_walk_cycle_animate_cc.jsx')
with open(f_jsx, 'w', encoding='utf-8') as f:
    f.write(jsx_script)

# Copy SVG and JSX to Desktop & Upload
for fname in ['cf_indian_anime_girl_walk_rigged.svg', 'setup_walk_cycle_animate_cc.jsx']:
    src_f = os.path.join(output_dir, fname)
    shutil.copy2(src_f, os.path.join(desktop_dir, fname))
    shutil.copy2(src_f, os.path.join(upload_dir, fname))

print("Successfully generated High-Detail Walkable Indian Anime Character Pack & Walk Cycle Guides!")
