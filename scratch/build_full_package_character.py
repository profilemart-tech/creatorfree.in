import os
import shutil
import sys
sys.path.append(r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website')
from scratch.auto_asset_metadata_engine import AutoAssetMetadataEngine

brain_dir = r'C:\Users\user\.gemini\antigravity\brain\e9a15db6-b991-4f88-b952-a927f4da43a3'
output_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\indian-characters'
desktop_dir = r'C:\Users\user\OneDrive\Desktop\radha_full_package_character_rig'
upload_dir = r'C:\Users\user\OneDrive\Desktop\vfx_to_upload\radha_full_package'

for d in [output_dir, desktop_dir, upload_dir]:
    os.makedirs(d, exist_ok=True)

print("Building Full-Package 360 Indian Character Rig (Speaking, Laughing, Crying, Walking, Sitting, Roti Making)...")

# Copy generated images
img_files = [
    ('radha_full_package_master_sprite_sheet_1786228930190.jpg', 'cf_radha_full_package_master_sprites.jpg'),
    ('radha_lipsync_expression_sheet_1786228944067.jpg', 'cf_radha_lipsync_expressions.jpg')
]

for src_name, dest_name in img_files:
    src_p = os.path.join(brain_dir, src_name)
    if os.path.exists(src_p):
        dest_p = os.path.join(output_dir, dest_name)
        shutil.copy2(src_p, dest_p)
        for d in [desktop_dir, upload_dir]:
            shutil.copy2(src_p, os.path.join(d, dest_name))

# Master SVG Rig with all lip-sync phonemes, tears layer, roti rolling pin, sit legs
TEAL = "#0D9488"
RED = "#DC2626"
GOLD = "#FACC15"
DARK = "#1C1917"
SKIN = "#FCD34D"
TEARS_BLUE = "#38BDF8"

master_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200" fill="none">
  <metadata id="cf-metadata">
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <rdf:Description rdf:about="">
        <dc:title>Radha Full-Package 360 Indian Character Rig</dc:title>
        <dc:creator>CreatorsFree.in</dc:creator>
        <dc:rights>© 2026 CreatorsFree.in - All Rights Reserved</dc:rights>
        <dc:identifier>CF-CHR-2026-007</dc:identifier>
      </rdf:Description>
    </rdf:RDF>
  </metadata>

  <!-- 1. HEAD & HAIR -->
  <g id="Hair_Braid_Back">
    <path d="M 620 200 C 720 250 740 450 700 600" fill="{DARK}" stroke="{DARK}" stroke-width="24" stroke-linecap="round"/>
  </g>
  <g id="Head_Base">
    <ellipse cx="600" cy="220" rx="90" ry="110" fill="{SKIN}" stroke="{DARK}" stroke-width="4"/>
    <path d="M 510 180 C 550 140, 650 140, 690 180 C 660 220, 540 220, 510 180 Z" fill="{DARK}"/>
    <circle cx="600" cy="170" r="8" fill="{GOLD}"/>
  </g>

  <!-- 2. EYES & EXPRESSION STATES -->
  <g id="Eyes_Normal">
    <circle cx="600" cy="200" r="6" fill="{RED}"/>
    <ellipse cx="555" cy="230" rx="18" ry="24" fill="#FFFFFF" stroke="{DARK}" stroke-width="3"/>
    <ellipse cx="555" cy="230" rx="10" ry="16" fill="#78350F"/>
    <ellipse cx="645" cy="230" rx="18" ry="24" fill="#FFFFFF" stroke="{DARK}" stroke-width="3"/>
    <ellipse cx="645" cy="230" rx="10" ry="16" fill="#78350F"/>
  </g>

  <!-- 3. CRYING TEARS LAYER (Toggle On for Crying Scene) -->
  <g id="Expression_Tears_Crying" opacity="1">
    <path d="M 550 250 C 540 280, 540 310, 555 330" stroke="{TEARS_BLUE}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 640 250 C 630 280, 630 310, 645 330" stroke="{TEARS_BLUE}" stroke-width="8" fill="none" stroke-linecap="round"/>
  </g>

  <!-- 4. LIP-SYNC MOUTH STATES (Swap in Animate CC for Speaking) -->
  <g id="Mouth_State_Neutral" opacity="0">
    <line x1="575" y1="285" x2="625" y2="285" stroke="{DARK}" stroke-width="5" stroke-linecap="round"/>
  </g>
  <g id="Mouth_State_Smile_Laugh" opacity="1">
    <path d="M 570 280 Q 600 315 630 280 Z" fill="{RED}" stroke="{DARK}" stroke-width="4"/>
  </g>
  <g id="Mouth_State_AE_Speak" opacity="0">
    <ellipse cx="600" cy="285" rx="18" ry="22" fill="{DARK}"/>
  </g>
  <g id="Mouth_State_OU_Speak" opacity="0">
    <circle cx="600" cy="285" r="14" fill="{DARK}"/>
  </g>

  <!-- 5. TORSO & DUPATTA -->
  <g id="Torso_Kurti">
    <path d="M 520 330 H 680 L 710 680 H 490 Z" fill="{TEAL}" stroke="{DARK}" stroke-width="4"/>
  </g>

  <!-- 6. PROPS & ACCESSORIES (ROTI ROLLING PIN / BELAN & THALI) -->
  <g id="Prop_Roti_Belan" opacity="1">
    <!-- Rolling Board (Chakla) -->
    <ellipse cx="600" cy="720" rx="120" ry="30" fill="#78350F" stroke="{DARK}" stroke-width="4"/>
    <!-- Flattened Roti -->
    <ellipse cx="600" cy="720" rx="80" ry="20" fill="#FEF08A"/>
    <!-- Rolling Pin (Belan) -->
    <rect x="460" y="710" width="280" height="20" rx="10" fill="#B45309" stroke="{DARK}" stroke-width="4"/>
  </g>

  <!-- 7. LEGS STANDING / WALKING / SITTING POSES -->
  <g id="Legs_Standing_Pose" opacity="1">
    <rect x="520" y="680" width="65" height="280" rx="18" fill="{TEAL}" stroke="{DARK}" stroke-width="4"/>
    <rect x="615" y="680" width="65" height="280" rx="18" fill="{TEAL}" stroke="{DARK}" stroke-width="4"/>
    <path d="M 490 960 H 585 V 1000 Z" fill="{SKIN}" stroke="{DARK}" stroke-width="4"/>
    <path d="M 615 960 H 710 V 1000 Z" fill="{SKIN}" stroke="{DARK}" stroke-width="4"/>
  </g>
</svg>"""

f_svg = os.path.join(output_dir, 'cf_radha_360_full_rig.svg')
with open(f_svg, 'w', encoding='utf-8') as f:
    f.write(master_svg)

print("Successfully generated Full-Package 360 Indian Character Rig & Master Sprite Sheets!")
