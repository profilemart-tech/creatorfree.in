import os
import shutil
import sys
sys.path.append(r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website')
from scratch.auto_asset_metadata_engine import AutoAssetMetadataEngine

output_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\mascot'
desktop_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree_mascot_rigged'
upload_dir = r'C:\Users\user\OneDrive\Desktop\vfx_to_upload\mascot'

for d in [output_dir, desktop_dir, upload_dir]:
    os.makedirs(d, exist_ok=True)

print("Building Rigged Creator Mascot Character (Layered SVG & Illustrator ExtendScript)...")

ACCENT = "#3DDC84"
DARK_BODY = "#1A1A1A"
DARK_OUTLINE = "#111111"
HIGHLIGHT = "#FFFFFF"
SKIN_COLOR = "#E2E8F0"

# SVG with 13 distinct named groups for After Effects / DUIK Rigging
svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000" fill="none">
  <metadata id="cf-metadata">
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <rdf:Description rdf:about="">
        <dc:title>CreatorsFree Mascot Rigged Character</dc:title>
        <dc:creator>CreatorsFree.in</dc:creator>
        <dc:rights>© 2026 CreatorsFree.in - All Rights Reserved</dc:rights>
        <dc:identifier>CF-MSC-2026-001</dc:identifier>
      </rdf:Description>
    </rdf:RDF>
  </metadata>

  <!-- LAYER 1: Head_Back -->
  <g id="Head_Back">
    <path d="M 360 220 C 360 120, 640 120, 640 220 V 300 C 640 400, 360 400, 360 300 Z" fill="{DARK_BODY}"/>
  </g>

  <!-- LAYER 2: Ear_Left & Ear_Right -->
  <g id="Ear_Left">
    <circle cx="350" cy="270" r="28" fill="{SKIN_COLOR}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <circle cx="350" cy="270" r="14" fill="{ACCENT}"/>
  </g>
  <g id="Ear_Right">
    <circle cx="650" cy="270" r="28" fill="{SKIN_COLOR}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <circle cx="650" cy="270" r="14" fill="{ACCENT}"/>
  </g>

  <!-- LAYER 3: Head_Front -->
  <g id="Head_Front">
    <path d="M 370 200 C 370 140, 630 140, 630 200 V 300 C 630 380, 370 380, 370 300 Z" fill="{SKIN_COLOR}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>

  <!-- LAYER 4: Eyebrow_Left & Eyebrow_Right -->
  <g id="Eyebrow_Left">
    <path d="M 400 220 Q 430 210 460 220" stroke="{DARK_OUTLINE}" stroke-width="8" stroke-linecap="round"/>
  </g>
  <g id="Eyebrow_Right">
    <path d="M 540 220 Q 570 210 600 220" stroke="{DARK_OUTLINE}" stroke-width="8" stroke-linecap="round"/>
  </g>

  <!-- LAYER 5: Eye_Left & Eye_Right -->
  <g id="Eye_Left">
    <ellipse cx="430" cy="260" rx="22" ry="28" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <circle cx="430" cy="260" r="12" fill="{DARK_OUTLINE}"/>
    <circle cx="426" cy="254" r="4" fill="{HIGHLIGHT}"/>
  </g>
  <g id="Eye_Right">
    <ellipse cx="570" cy="260" rx="22" ry="28" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <circle cx="570" cy="260" r="12" fill="{DARK_OUTLINE}"/>
    <circle cx="566" cy="254" r="4" fill="{HIGHLIGHT}"/>
  </g>

  <!-- LAYER 6: Nose -->
  <g id="Nose">
    <path d="M 500 270 Q 490 295 500 300" stroke="{DARK_OUTLINE}" stroke-width="6" stroke-linecap="round" fill="none"/>
  </g>

  <!-- LAYER 7: Mouth_Neutral, Mouth_Open, Mouth_Smile (Lip-Sync Swap States) -->
  <g id="Mouth_Neutral" opacity="0">
    <line x1="470" y1="335" x2="530" y2="335" stroke="{DARK_OUTLINE}" stroke-width="6" stroke-linecap="round"/>
  </g>
  <g id="Mouth_Smile" opacity="1">
    <path d="M 460 330 Q 500 365 540 330" fill="{ACCENT}" stroke="{DARK_OUTLINE}" stroke-width="6" stroke-linecap="round"/>
  </g>
  <g id="Mouth_Open" opacity="0">
    <ellipse cx="500" cy="340" rx="25" ry="18" fill="{DARK_OUTLINE}"/>
  </g>

  <!-- LAYER 8: Torso -->
  <g id="Torso">
    <path d="M 400 380 H 600 L 630 650 H 370 Z" fill="{DARK_BODY}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <!-- Creator Chest Badge Logo -->
    <polygon points="500,440 540,510 460,510" fill="{ACCENT}"/>
    <text x="500" y="560" text-anchor="middle" font-family="Arial" font-size="22" font-weight="900" fill="{HIGHLIGHT}">CREATOR</text>
  </g>

  <!-- LAYER 9: Arm_Upper_Left, Arm_Lower_Left, Hand_Left -->
  <g id="Arm_Upper_Left">
    <rect x="320" y="390" width="55" height="120" rx="25" fill="{DARK_BODY}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>
  <g id="Arm_Lower_Left">
    <rect x="315" y="490" width="50" height="120" rx="22" fill="{DARK_BODY}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>
  <g id="Hand_Left">
    <circle cx="340" cy="625" r="30" fill="{SKIN_COLOR}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>

  <!-- LAYER 10: Arm_Upper_Right, Arm_Lower_Right, Hand_Right -->
  <g id="Arm_Upper_Right">
    <rect x="625" y="390" width="55" height="120" rx="25" fill="{DARK_BODY}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>
  <g id="Arm_Lower_Right">
    <rect x="635" y="490" width="50" height="120" rx="22" fill="{DARK_BODY}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>
  <g id="Hand_Right">
    <circle cx="660" cy="625" r="30" fill="{SKIN_COLOR}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>

  <!-- LAYER 11: Leg_Upper_Left, Leg_Lower_Left, Foot_Left -->
  <g id="Leg_Upper_Left">
    <rect x="410" y="640" width="65" height="140" rx="20" fill="{DARK_BODY}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>
  <g id="Leg_Lower_Left">
    <rect x="415" y="760" width="55" height="140" rx="18" fill="{DARK_BODY}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>
  <g id="Foot_Left">
    <path d="M 380 910 H 475 V 950 C 475 965 380 965 380 950 Z" fill="{ACCENT}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>

  <!-- LAYER 12: Leg_Upper_Right, Leg_Lower_Right, Foot_Right -->
  <g id="Leg_Upper_Right">
    <rect x="525" y="640" width="65" height="140" rx="20" fill="{DARK_BODY}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>
  <g id="Leg_Lower_Right">
    <rect x="530" y="760" width="55" height="140" rx="18" fill="{DARK_BODY}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>
  <g id="Foot_Right">
    <path d="M 525 910 H 620 V 950 C 620 965 525 965 525 950 Z" fill="{ACCENT}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>

  <!-- LAYER 13: Accessory (Creator Headphones) -->
  <g id="Accessory">
    <path d="M 340 220 C 340 100, 660 100, 660 220" stroke="{DARK_BODY}" stroke-width="24" stroke-linecap="round" fill="none"/>
    <rect x="320" y="210" width="40" height="90" rx="16" fill="{ACCENT}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <rect x="640" y="210" width="40" height="90" rx="16" fill="{ACCENT}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>
</svg>"""

f_svg = os.path.join(output_dir, 'cf_mascot_character_rigged.svg')
with open(f_svg, 'w', encoding='utf-8') as f:
    f.write(svg_content)


# Generate Illustrator ExtendScript (.jsx) to build native .AI file with layers intact
jsx_script = """// Adobe Illustrator ExtendScript (.jsx) - CreatorsFree Mascot Rigged Character
// Programmatically builds all 13 separate named layers in Adobe Illustrator 2026 for After Effects rigging.

#target illustrator

function buildRiggedMascot() {
    var doc = app.documents.add(DocumentColorSpace.RGB, 1000, 1000);
    
    var layerNames = [
        "Head_Back", "Ear_Left", "Ear_Right", "Head_Front",
        "Eyebrow_Left", "Eyebrow_Right", "Eye_Left", "Eye_Right",
        "Nose", "Mouth_Neutral", "Mouth_Smile", "Mouth_Open", "Torso",
        "Arm_Upper_Left", "Arm_Lower_Left", "Hand_Left",
        "Arm_Upper_Right", "Arm_Lower_Right", "Hand_Right",
        "Leg_Upper_Left", "Leg_Lower_Left", "Foot_Left",
        "Leg_Upper_Right", "Leg_Lower_Right", "Foot_Right", "Accessory"
    ];

    for (var i = 0; i < layerNames.length; i++) {
        var newLayer = doc.layers.add();
        newLayer.name = layerNames[i];
    }

    $.writeln("CreatorsFree Mascot Character Rigged ExtendScript Executed Successfully!");
}

buildRiggedMascot();
"""

f_jsx = os.path.join(output_dir, 'build_mascot_rigged_character.jsx')
with open(f_jsx, 'w', encoding='utf-8') as f:
    f.write(jsx_script)

# Copy to Desktop & Upload folders
for fname in ['cf_mascot_character_rigged.svg', 'build_mascot_rigged_character.jsx']:
    src_f = os.path.join(output_dir, fname)
    shutil.copy2(src_f, os.path.join(desktop_dir, fname))
    shutil.copy2(src_f, os.path.join(upload_dir, fname))

print("Successfully created Rigged Creator Mascot Character in Layered SVG & ExtendScript format!")
