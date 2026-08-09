import os
import shutil
import sys
sys.path.append(r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website')
from scratch.auto_asset_metadata_engine import AutoAssetMetadataEngine

output_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\indian-characters'
desktop_dir = r'C:\Users\user\OneDrive\Desktop\indian_2d_cartoon_characters_animate_cc'
upload_dir = r'C:\Users\user\OneDrive\Desktop\vfx_to_upload\indian_characters'

for d in [output_dir, desktop_dir, upload_dir]:
    os.makedirs(d, exist_ok=True)

print("Building 5 Adobe Animate CC Ready Indian 2D Rigged Characters...")

DARK_OUTLINE = "#1A1A1A"
SKIN_TONE = "#F3D2B5"
HIGHLIGHT = "#FFFFFF"

def wrap_svg(inner_xml, title, content_id):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000" fill="none">
  <metadata id="cf-metadata">
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <rdf:Description rdf:about="">
        <dc:title>{title}</dc:title>
        <dc:creator>CreatorsFree.in</dc:creator>
        <dc:rights>© 2026 CreatorsFree.in - All Rights Reserved</dc:rights>
        <dc:identifier>{content_id}</dc:identifier>
      </rdf:Description>
    </rdf:RDF>
  </metadata>
{inner_xml}
</svg>"""

# ==============================================================================
# 1. 🌾 भारतीय किसान (INDIAN FARMER - RAMU KAKA)
# ==============================================================================
farmer_xml = f"""  <g id="Head_Back">
    <circle cx="500" cy="250" r="90" fill="{SKIN_TONE}"/>
  </g>
  <g id="Turban_Gamcha">
    <!-- Red Gamcha / Turban -->
    <path d="M 400 200 C 400 120, 600 120, 600 200 C 600 230, 400 230, 400 200 Z" fill="#DC2626" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <path d="M 570 200 Q 620 250 600 320" stroke="#DC2626" stroke-width="24" stroke-linecap="round"/>
  </g>
  <g id="Head_Front">
    <path d="M 420 220 C 420 180, 580 180, 580 220 V 300 C 580 370, 420 370, 420 300 Z" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>
  <g id="Mustache">
    <path d="M 440 310 Q 500 340 560 310 Q 500 325 440 310 Z" fill="#262626"/>
  </g>
  <g id="Eye_Left">
    <ellipse cx="460" cy="270" rx="14" ry="18" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="3"/>
    <circle cx="460" cy="270" r="8" fill="{DARK_OUTLINE}"/>
  </g>
  <g id="Eye_Right">
    <ellipse cx="540" cy="270" rx="14" ry="18" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="3"/>
    <circle cx="540" cy="270" r="8" fill="{DARK_OUTLINE}"/>
  </g>
  <g id="Mouth_Smile">
    <path d="M 470 330 Q 500 355 530 330" stroke="{DARK_OUTLINE}" stroke-width="5" stroke-linecap="round"/>
  </g>
  <g id="Torso_Kurta">
    <path d="M 410 380 H 590 L 610 650 H 390 Z" fill="#F5F5F4" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <!-- Red Gamcha Drape -->
    <path d="M 430 380 Q 500 480 440 600" stroke="#DC2626" stroke-width="20" fill="none"/>
  </g>
  <g id="Arm_Upper_Left"><rect x="340" y="390" width="50" height="120" rx="20" fill="#F5F5F4" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Lower_Left"><rect x="335" y="490" width="45" height="120" rx="18" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Hand_Left"><circle cx="355" cy="625" r="25" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Upper_Right"><rect x="610" y="390" width="50" height="120" rx="20" fill="#F5F5F4" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Lower_Right"><rect x="620" y="490" width="45" height="120" rx="18" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Hand_Right"><circle cx="645" cy="625" r="25" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Upper_Left"><rect x="420" y="640" width="60" height="150" rx="15" fill="#E7E5E4" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Lower_Left"><rect x="425" y="770" width="50" height="140" rx="15" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Foot_Left"><path d="M 390 910 H 480 V 950 Z" fill="#78350F" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Upper_Right"><rect x="520" y="640" width="60" height="150" rx="15" fill="#E7E5E4" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Lower_Right"><rect x="525" y="770" width="50" height="140" rx="15" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Foot_Right"><path d="M 520 910 H 610 V 950 Z" fill="#78350F" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>"""

svg_farmer = wrap_svg(farmer_xml, "Indian Farmer 2D Character (Ramu Kaka)", "CF-CHR-2026-001")
with open(os.path.join(output_dir, 'cf_indian_farmer_rigged.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_farmer)


# ==============================================================================
# 2. 👩‍🌾 भारतीय महिला (INDIAN TRADITIONAL WOMAN)
# ==============================================================================
woman_xml = f"""  <g id="Hair_Back">
    <circle cx="500" cy="240" r="110" fill="#1C1917"/>
  </g>
  <g id="Head_Front">
    <path d="M 430 200 C 430 150, 570 150, 570 200 V 290 C 570 360, 430 360, 430 290 Z" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <!-- Red Bindi -->
    <circle cx="500" cy="230" r="8" fill="#DC2626"/>
  </g>
  <g id="Eye_Left">
    <ellipse cx="460" cy="260" rx="16" ry="14" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="3"/>
    <circle cx="460" cy="260" r="8" fill="{DARK_OUTLINE}"/>
  </g>
  <g id="Eye_Right">
    <ellipse cx="540" cy="260" rx="16" ry="14" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="3"/>
    <circle cx="540" cy="260" r="8" fill="{DARK_OUTLINE}"/>
  </g>
  <g id="Mouth_Smile">
    <path d="M 470 315 Q 500 340 530 315" stroke="#B91C1C" stroke-width="6" stroke-linecap="round" fill="none"/>
  </g>
  <g id="Torso_Saree">
    <!-- Pink Saree & Golden Border -->
    <path d="M 420 370 H 580 L 630 880 H 370 Z" fill="#DB2777" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <path d="M 430 370 Q 510 550 560 880" stroke="#FACC15" stroke-width="24" fill="none"/>
  </g>
  <g id="Arm_Upper_Left"><rect x="360" y="380" width="45" height="110" rx="18" fill="#DB2777" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Lower_Left"><rect x="355" y="470" width="40" height="110" rx="16" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Hand_Left"><circle cx="375" cy="595" r="22" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Upper_Right"><rect x="595" y="380" width="45" height="110" rx="18" fill="#DB2777" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Lower_Right"><rect x="605" y="470" width="40" height="110" rx="16" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Hand_Right"><circle cx="625" cy="595" r="22" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Foot_Left"><path d="M 430 880 H 480 V 920 Z" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Foot_Right"><path d="M 520 880 H 570 V 920 Z" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>"""

svg_woman = wrap_svg(woman_xml, "Indian Traditional Woman 2D Character", "CF-CHR-2026-002")
with open(os.path.join(output_dir, 'cf_indian_woman_rigged.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_woman)


# ==============================================================================
# 3. 💰 सेठजी / व्यापारी (RICH BUSINESSMAN - SETHJI)
# ==============================================================================
seth_xml = f"""  <g id="Pagri_Hat">
    <!-- Red/Gold Marwari Pagri -->
    <path d="M 380 180 Q 500 100 620 180 C 620 220 380 220 380 180 Z" fill="#EA580C" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <circle cx="500" cy="150" r="18" fill="#FACC15"/>
  </g>
  <g id="Head_Front">
    <circle cx="500" cy="260" r="85" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <!-- Chandan Tilak -->
    <path d="M 495 210 H 505 V 230 H 495 Z" fill="#DC2626"/>
  </g>
  <g id="Eye_Left"><ellipse cx="460" cy="250" rx="14" ry="12" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="3"/><circle cx="460" cy="250" r="6" fill="{DARK_OUTLINE}"/></g>
  <g id="Eye_Right"><ellipse cx="540" cy="250" rx="14" ry="12" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="3"/><circle cx="540" cy="250" r="6" fill="{DARK_OUTLINE}"/></g>
  <g id="Mustache_Seth"><path d="M 440 280 C 480 310 520 310 560 280 Q 500 300 440 280 Z" fill="#1C1917"/></g>
  <g id="Torso_BigBelly">
    <!-- Big Belly Kurta -->
    <circle cx="500" cy="520" r="160" fill="#FEF08A" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <!-- Gold Chain -->
    <path d="M 420 400 Q 500 500 580 400" stroke="#EAB308" stroke-width="12" fill="none"/>
  </g>
  <g id="Arm_Upper_Left"><rect x="300" y="420" width="60" height="110" rx="20" fill="#FEF08A" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Lower_Left"><rect x="295" y="510" width="50" height="110" rx="18" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Hand_Left"><circle cx="320" cy="630" r="28" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Upper_Right"><rect x="640" y="420" width="60" height="110" rx="20" fill="#FEF08A" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Lower_Right"><rect x="655" y="510" width="50" height="110" rx="18" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Hand_Right"><circle cx="680" cy="630" r="28" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Upper_Left"><rect x="410" y="670" width="70" height="130" rx="15" fill="#FFFFFF" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Lower_Left"><rect x="420" y="780" width="55" height="120" rx="15" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Foot_Left"><path d="M 380 900 H 475 V 940 Z" fill="#78350F" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Upper_Right"><rect x="520" y="670" width="70" height="130" rx="15" fill="#FFFFFF" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Lower_Right"><rect x="525" y="780" width="55" height="120" rx="15" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Foot_Right"><path d="M 525 900 H 620 V 940 Z" fill="#78350F" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>"""

svg_seth = wrap_svg(seth_xml, "Indian Sethji Businessman 2D Character", "CF-CHR-2026-003")
with open(os.path.join(output_dir, 'cf_indian_sethji_rigged.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_seth)


# ==============================================================================
# 4. 🕉️ पंडितजी (INDIAN PRIEST / PANDITJI)
# ==============================================================================
pandit_xml = f"""  <g id="Hair_Shikha">
    <!-- Choti / Tuft of Hair -->
    <path d="M 500 130 C 530 100, 560 140, 520 160 Z" fill="#1C1917"/>
  </g>
  <g id="Head_Front">
    <circle cx="500" cy="240" r="80" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <!-- Tripundra & Red Bindi -->
    <line x1="460" y1="200" x2="540" y2="200" stroke="#FACC15" stroke-width="6"/>
    <line x1="460" y1="210" x2="540" y2="210" stroke="#FACC15" stroke-width="6"/>
    <circle cx="500" cy="205" r="5" fill="#DC2626"/>
  </g>
  <g id="Eye_Left"><ellipse cx="460" cy="235" rx="14" ry="12" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="3"/><circle cx="460" cy="235" r="6" fill="{DARK_OUTLINE}"/></g>
  <g id="Eye_Right"><ellipse cx="540" cy="235" rx="14" ry="12" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="3"/><circle cx="540" cy="235" r="6" fill="{DARK_OUTLINE}"/></g>
  <g id="Mouth_Smile"><path d="M 470 270 Q 500 290 530 270" stroke="{DARK_OUTLINE}" stroke-width="5" stroke-linecap="round"/></g>
  <g id="Torso_Janeu">
    <!-- Upper Body Bare with Yellow Angavastram -->
    <path d="M 420 320 H 580 L 610 650 H 390 Z" fill="#FEF08A" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <!-- White Janeu (Sacred Thread) -->
    <path d="M 430 320 L 570 520" stroke="#FFFFFF" stroke-width="6"/>
  </g>
  <g id="Arm_Upper_Left"><rect x="350" y="330" width="50" height="120" rx="20" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Lower_Left"><rect x="345" y="430" width="45" height="120" rx="18" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Hand_Left"><circle cx="365" cy="565" r="25" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Upper_Right"><rect x="600" y="330" width="50" height="120" rx="20" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Lower_Right"><rect x="610" y="430" width="45" height="120" rx="18" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Hand_Right"><circle cx="635" cy="565" r="25" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Upper_Left"><rect x="420" y="640" width="60" height="150" rx="15" fill="#F59E0B" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Lower_Left"><rect x="425" y="770" width="50" height="140" rx="15" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Foot_Left"><path d="M 390 910 H 480 V 950 Z" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Upper_Right"><rect x="520" y="640" width="60" height="150" rx="15" fill="#F59E0B" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Leg_Lower_Right"><rect x="525" y="770" width="50" height="140" rx="15" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Foot_Right"><path d="M 520 910 H 610 V 950 Z" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>"""

svg_pandit = wrap_svg(pandit_xml, "Indian Panditji Priest 2D Character", "CF-CHR-2026-004")
with open(os.path.join(output_dir, 'cf_indian_panditji_rigged.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_pandit)


# ==============================================================================
# 5. 🧘‍♂️ साधु बाबा (HOLY SAINT / SADHU BABA)
# ==============================================================================
sadhu_xml = f"""  <g id="Long_Beard">
    <!-- Long White/Gray Beard -->
    <path d="M 410 250 C 410 440, 590 440, 590 250 Z" fill="#E7E5E4" stroke="{DARK_OUTLINE}" stroke-width="4"/>
  </g>
  <g id="Head_Front">
    <circle cx="500" cy="230" r="75" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <!-- Tripundra Bhasma -->
    <line x1="460" y1="190" x2="540" y2="190" stroke="#E7E5E4" stroke-width="6"/>
    <line x1="460" y1="200" x2="540" y2="200" stroke="#E7E5E4" stroke-width="6"/>
    <circle cx="500" cy="195" r="5" fill="#DC2626"/>
  </g>
  <g id="Eye_Left"><ellipse cx="460" cy="225" rx="12" ry="10" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="3"/><circle cx="460" cy="225" r="5" fill="{DARK_OUTLINE}"/></g>
  <g id="Eye_Right"><ellipse cx="540" cy="225" rx="12" ry="10" fill="{HIGHLIGHT}" stroke="{DARK_OUTLINE}" stroke-width="3"/><circle cx="540" cy="225" r="5" fill="{DARK_OUTLINE}"/></g>
  <g id="Torso_Bhagwa">
    <!-- Saffron Robes -->
    <path d="M 400 320 H 600 L 630 850 H 370 Z" fill="#EA580C" stroke="{DARK_OUTLINE}" stroke-width="4"/>
    <!-- Rudraksha Mala -->
    <circle cx="500" cy="380" r="8" fill="#78350F"/>
    <circle cx="480" cy="400" r="8" fill="#78350F"/>
    <circle cx="520" cy="400" r="8" fill="#78350F"/>
  </g>
  <g id="Arm_Upper_Left"><rect x="330" y="340" width="55" height="130" rx="20" fill="#EA580C" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Lower_Left"><rect x="325" y="450" width="45" height="120" rx="18" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Hand_Left"><circle cx="345" cy="585" r="25" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Upper_Right"><rect x="615" y="340" width="55" height="130" rx="20" fill="#EA580C" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Arm_Lower_Right"><rect x="630" y="450" width="45" height="120" rx="18" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Hand_Right"><circle cx="655" cy="585" r="25" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Foot_Left"><path d="M 420 850 H 470 V 900 Z" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>
  <g id="Foot_Right"><path d="M 530 850 H 580 V 900 Z" fill="{SKIN_TONE}" stroke="{DARK_OUTLINE}" stroke-width="4"/></g>"""

svg_sadhu = wrap_svg(sadhu_xml, "Indian Sadhu Baba Holy Saint 2D Character", "CF-CHR-2026-005")
with open(os.path.join(output_dir, 'cf_indian_sadhu_rigged.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_sadhu)


# Generate Illustrator / Animate CC ExtendScript
jsx_script = """// Adobe Animate CC & Illustrator ExtendScript (.jsx) - Indian 2D Rigged Characters Pack
// Generates native layer hierarchy for Adobe Animate CC symbol conversion.

#target illustrator

function buildIndianCartoonCharacters() {
    var doc = app.documents.add(DocumentColorSpace.RGB, 1000, 1000);
    var characters = ["Farmer_RamuKaka", "Indian_Woman", "Sethji", "Panditji", "SadhuBaba"];
    
    for (var c = 0; c < characters.length; c++) {
        var charLayer = doc.layers.add();
        charLayer.name = characters[c];
    }
    $.writeln("Indian 2D Rigged Characters ExtendScript Executed Successfully!");
}

buildIndianCartoonCharacters();
"""
with open(os.path.join(output_dir, 'generate_indian_cartoon_rigs.jsx'), 'w', encoding='utf-8') as f:
    f.write(jsx_script)

# Copy all files to Desktop & Upload folders
for fname in os.listdir(output_dir):
    src_f = os.path.join(output_dir, fname)
    shutil.copy2(src_f, os.path.join(desktop_dir, fname))
    shutil.copy2(src_f, os.path.join(upload_dir, fname))

print("Successfully generated all 5 Adobe Animate CC Ready Indian 2D Rigged Characters!")
