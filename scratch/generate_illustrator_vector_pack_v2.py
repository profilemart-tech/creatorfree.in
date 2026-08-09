import os
import sys
import shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont
sys.path.append(r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website')
from scratch.auto_asset_metadata_engine import AutoAssetMetadataEngine

output_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\thumbnail-booster'
desktop_dir = r'C:\Users\user\OneDrive\Desktop\illustrator_vector_assets_v2'
upload_dir = r'C:\Users\user\OneDrive\Desktop\vfx_to_upload\illustrator_vectors'

for d in [output_dir, desktop_dir, upload_dir]:
    os.makedirs(d, exist_ok=True)

print("Generating Adobe Illustrator Vector Assets Pack 2.0 (SVG & PNG)...")

# Helper for font loading
try:
    font_large = ImageFont.truetype("arial.ttf", 260)
    font_med = ImageFont.truetype("arial.ttf", 100)
    font_small = ImageFont.truetype("arial.ttf", 70)
except:
    font_large = font_med = font_small = ImageFont.load_default()


# -------------------------------------------------------------
# 1. 🔥 FIRE FLAME EMOJI (CF-VEC-2026-007)
# -------------------------------------------------------------
svg1 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <path d="M 400 80 C 480 260 620 320 620 500 C 620 660 520 740 400 740 C 280 740 180 660 180 500 C 180 320 320 260 400 80 Z" fill="#FF3300" stroke="#FFCC00" stroke-width="16"/>
  <path d="M 400 240 C 450 360 540 400 540 520 C 540 620 480 670 400 670 C 320 670 260 620 260 520 C 260 400 350 360 400 240 Z" fill="#FF9900"/>
  <path d="M 400 400 C 430 470 480 490 480 550 C 480 600 440 630 400 630 C 360 630 320 600 320 550 C 320 490 370 470 400 400 Z" fill="#FFEC00"/>
</svg>"""
f1_path = os.path.join(output_dir, 'cf_fire_flame_emoji.svg')
with open(f1_path, 'w', encoding='utf-8') as f:
    f.write(svg1)
AutoAssetMetadataEngine.tag_svg_vector(f1_path, "Fire Flame Emoji Sticker", "CF-VEC-2026-007")

img1 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw1 = ImageDraw.Draw(img1)
draw1.ellipse([180, 200, 620, 740], fill=(255, 51, 0, 255), outline=(255, 204, 0, 255), width=16)
draw1.ellipse([260, 320, 540, 670], fill=(255, 153, 0, 255))
draw1.ellipse([320, 440, 480, 630], fill=(255, 236, 0, 255))
img1.save(os.path.join(output_dir, 'cf_fire_flame_emoji.png'))


# -------------------------------------------------------------
# 2. 😂 CRYING LAUGHING EMOJI (CF-VEC-2026-008)
# -------------------------------------------------------------
svg2 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <circle cx="400" cy="400" r="280" fill="#FFCC00" stroke="#FFFFFF" stroke-width="20"/>
  <path d="M 260 300 Q 310 240 340 300" fill="none" stroke="#000" stroke-width="20" stroke-linecap="round"/>
  <path d="M 460 300 Q 490 240 540 300" fill="none" stroke="#000" stroke-width="20" stroke-linecap="round"/>
  <path d="M 280 440 Q 400 580 520 440 Z" fill="#8B0000" stroke="#000" stroke-width="12"/>
  <path d="M 180 340 C 140 420 200 480 240 420 Z" fill="#38BDF8"/>
  <path d="M 620 340 C 660 420 600 480 560 420 Z" fill="#38BDF8"/>
</svg>"""
f2_path = os.path.join(output_dir, 'cf_crying_laughing_emoji.svg')
with open(f2_path, 'w', encoding='utf-8') as f:
    f.write(svg2)
AutoAssetMetadataEngine.tag_svg_vector(f2_path, "Crying Laughing Emoji Sticker", "CF-VEC-2026-008")

img2 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw2 = ImageDraw.Draw(img2)
draw2.ellipse([120, 120, 680, 680], fill=(255, 204, 0, 255), outline=(255, 255, 255, 255), width=20)
draw2.arc([260, 240, 340, 320], 180, 360, fill=(0, 0, 0, 255), width=20)
draw2.arc([460, 240, 540, 320], 180, 360, fill=(0, 0, 0, 255), width=20)
draw2.chord([280, 420, 520, 560], 0, 180, fill=(139, 0, 0, 255), outline=(0, 0, 0, 255), width=10)
img2.save(os.path.join(output_dir, 'cf_crying_laughing_emoji.png'))


# -------------------------------------------------------------
# 3. 🤯 MIND BLOWN EXPLODING HEAD EMOJI (CF-VEC-2026-009)
# -------------------------------------------------------------
svg3 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <path d="M 200 240 C 250 100 550 100 600 240 Z" fill="#FF4500" stroke="#FFD700" stroke-width="14"/>
  <circle cx="400" cy="460" r="230" fill="#FFCC00" stroke="#FFFFFF" stroke-width="16"/>
  <ellipse cx="320" cy="420" rx="30" ry="45" fill="#000000"/>
  <ellipse cx="480" cy="420" rx="30" ry="45" fill="#000000"/>
  <ellipse cx="400" cy="550" rx="60" ry="80" fill="#000000"/>
</svg>"""
f3_path = os.path.join(output_dir, 'cf_mind_blown_emoji.svg')
with open(f3_path, 'w', encoding='utf-8') as f:
    f.write(svg3)
AutoAssetMetadataEngine.tag_svg_vector(f3_path, "Mind Blown Exploding Head Emoji", "CF-VEC-2026-009")

img3 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw3 = ImageDraw.Draw(img3)
draw3.pieslice([180, 100, 620, 400], 180, 360, fill=(255, 69, 0, 255), outline=(255, 215, 0, 255), width=14)
draw3.ellipse([170, 230, 630, 690], fill=(255, 204, 0, 255), outline=(255, 255, 255, 255), width=16)
draw3.ellipse([290, 380, 350, 460], fill=(0, 0, 0, 255))
draw3.ellipse([450, 380, 510, 460], fill=(0, 0, 0, 255))
draw3.ellipse([340, 480, 460, 620], fill=(0, 0, 0, 255))
img3.save(os.path.join(output_dir, 'cf_mind_blown_emoji.png'))


# -------------------------------------------------------------
# 4. 📸 INSTAGRAM FOLLOW GLOW BADGE (CF-VEC-2026-010)
# -------------------------------------------------------------
svg4 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect x="100" y="240" width="600" height="320" rx="60" ry="60" fill="url(#igGrad)" stroke="#FFFFFF" stroke-width="12"/>
  <defs>
    <linearGradient id="igGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#833AB4"/>
      <stop offset="50%" stop-color="#FD1D1D"/>
      <stop offset="100%" stop-color="#FCB045"/>
    </linearGradient>
  </defs>
  <rect x="180" y="320" width="160" height="160" rx="40" ry="40" fill="none" stroke="#FFFFFF" stroke-width="16"/>
  <circle cx="260" cy="400" r="45" fill="none" stroke="#FFFFFF" stroke-width="16"/>
  <circle cx="305" cy="355" r="12" fill="#FFFFFF"/>
  <text x="520" y="425" text-anchor="middle" font-size="75" font-weight="bold" font-family="Arial" fill="#FFFFFF">FOLLOW</text>
</svg>"""
f4_path = os.path.join(output_dir, 'cf_instagram_follow_badge.svg')
with open(f4_path, 'w', encoding='utf-8') as f:
    f.write(svg4)
AutoAssetMetadataEngine.tag_svg_vector(f4_path, "Instagram Follow Glow Badge", "CF-VEC-2026-010")

img4 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw4 = ImageDraw.Draw(img4)
draw4.rounded_rectangle([100, 240, 700, 560], radius=60, fill=(225, 48, 108, 255), outline=(255, 255, 255, 255), width=12)
draw4.rounded_rectangle([180, 320, 340, 480], radius=40, outline=(255, 255, 255, 255), width=14)
draw4.ellipse([215, 355, 305, 445], outline=(255, 255, 255, 255), width=14)
draw4.text((520, 400), "FOLLOW", fill=(255, 255, 255, 255), font=font_med, anchor="mm")
img4.save(os.path.join(output_dir, 'cf_instagram_follow_badge.png'))


# -------------------------------------------------------------
# 5. 🔴 YOUTUBE SUBSCRIBE METALLIC BADGE (CF-VEC-2026-011)
# -------------------------------------------------------------
svg5 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect x="80" y="240" width="640" height="320" rx="50" ry="50" fill="#FF0000" stroke="#FFD700" stroke-width="14"/>
  <polygon points="200,320 200,480 340,400" fill="#FFFFFF"/>
  <text x="500" y="425" text-anchor="middle" font-size="65" font-weight="bold" font-family="Arial" fill="#FFFFFF">SUBSCRIBE</text>
</svg>"""
f5_path = os.path.join(output_dir, 'cf_youtube_subscribe_badge.svg')
with open(f5_path, 'w', encoding='utf-8') as f:
    f.write(svg5)
AutoAssetMetadataEngine.tag_svg_vector(f5_path, "YouTube Subscribe Metallic Badge", "CF-VEC-2026-011")

img5 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw5 = ImageDraw.Draw(img5)
draw5.rounded_rectangle([80, 240, 720, 560], radius=50, fill=(255, 0, 0, 255), outline=(255, 215, 0, 255), width=14)
draw5.polygon([(200, 320), (200, 480), (340, 400)], fill=(255, 255, 255, 255))
draw5.text((500, 400), "SUBSCRIBE", fill=(255, 255, 255, 255), font=font_small, anchor="mm")
img5.save(os.path.join(output_dir, 'cf_youtube_subscribe_badge.png'))


# -------------------------------------------------------------
# 6. ✔ METALLIC BLUE VERIFIED TICK BADGE (CF-VEC-2026-012)
# -------------------------------------------------------------
svg6 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <circle cx="400" cy="400" r="260" fill="#1DA1F2" stroke="#FFFFFF" stroke-width="16"/>
  <path d="M 280 400 L 360 480 L 520 320" fill="none" stroke="#FFFFFF" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>
</svg>"""
f6_path = os.path.join(output_dir, 'cf_verified_blue_tick.svg')
with open(f6_path, 'w', encoding='utf-8') as f:
    f.write(svg6)
AutoAssetMetadataEngine.tag_svg_vector(f6_path, "Metallic Blue Verified Tick Badge", "CF-VEC-2026-012")

img6 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw6 = ImageDraw.Draw(img6)
draw6.ellipse([140, 140, 660, 660], fill=(29, 161, 242, 255), outline=(255, 255, 255, 255), width=16)
draw6.line([(280, 400), (360, 480), (520, 320)], fill=(255, 255, 255, 255), width=36)
img6.save(os.path.join(output_dir, 'cf_verified_blue_tick.png'))


# -------------------------------------------------------------
# 7. 💬 COMIC SPEECH BUBBLE CALLOUT (CF-VEC-2026-013)
# -------------------------------------------------------------
svg7 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <path d="M 120 200 H 680 V 500 H 450 L 320 620 L 350 500 H 120 Z" fill="#FFFFFF" stroke="#000000" stroke-width="20"/>
  <text x="400" y="380" text-anchor="middle" font-size="110" font-weight="900" font-family="Arial" fill="#FF0000">WHAT?!</text>
</svg>"""
f7_path = os.path.join(output_dir, 'cf_speech_bubble_callout.svg')
with open(f7_path, 'w', encoding='utf-8') as f:
    f.write(svg7)
AutoAssetMetadataEngine.tag_svg_vector(f7_path, "Comic Speech Bubble WHAT Callout", "CF-VEC-2026-013")

img7 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw7 = ImageDraw.Draw(img7)
draw7.rounded_rectangle([120, 200, 680, 500], radius=30, fill=(255, 255, 255, 255), outline=(0, 0, 0, 255), width=20)
draw7.polygon([(450, 500), (320, 620), (350, 500)], fill=(255, 255, 255, 255), outline=(0, 0, 0, 255))
draw7.text((400, 350), "WHAT?!", fill=(255, 0, 0, 255), font=font_med, anchor="mm")
img7.save(os.path.join(output_dir, 'cf_speech_bubble_callout.png'))


# -------------------------------------------------------------
# 8. ⚡ VS BATTLE 3D LIGHTNING BADGE (CF-VEC-2026-014)
# -------------------------------------------------------------
svg8 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <circle cx="400" cy="400" r="260" fill="#FFD700" stroke="#FF0000" stroke-width="20"/>
  <text x="390" y="470" text-anchor="middle" font-size="240" font-weight="900" font-family="Arial" fill="#8B0000">VS</text>
  <text x="380" y="460" text-anchor="middle" font-size="240" font-weight="900" font-family="Arial" fill="#FFFFFF">VS</text>
</svg>"""
f8_path = os.path.join(output_dir, 'cf_vs_battle_badge.svg')
with open(f8_path, 'w', encoding='utf-8') as f:
    f.write(svg8)
AutoAssetMetadataEngine.tag_svg_vector(f8_path, "VS Battle 3D Badge", "CF-VEC-2026-014")

img8 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw8 = ImageDraw.Draw(img8)
draw8.ellipse([140, 140, 660, 660], fill=(255, 215, 0, 255), outline=(255, 0, 0, 255), width=20)
draw8.text((400, 400), "VS", fill=(139, 0, 0, 255), font=font_large, anchor="mm")
draw8.text((392, 392), "VS", fill=(255, 255, 255, 255), font=font_large, anchor="mm")
img8.save(os.path.join(output_dir, 'cf_vs_battle_badge.png'))


# -------------------------------------------------------------
# 9. 🏷️ 50% OFF SALE EXPLOSION TAG (CF-VEC-2026-015)
# -------------------------------------------------------------
svg9 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect x="140" y="260" width="520" height="280" rx="40" ry="40" fill="#FF0055" stroke="#FFFFFF" stroke-width="16"/>
  <text x="400" y="430" text-anchor="middle" font-size="120" font-weight="900" font-family="Arial" fill="#FFFFFF">50% OFF</text>
</svg>"""
f9_path = os.path.join(output_dir, 'cf_discount_percentage_badge.svg')
with open(f9_path, 'w', encoding='utf-8') as f:
    f.write(svg9)
AutoAssetMetadataEngine.tag_svg_vector(f9_path, "50% OFF Discount Sale Badge", "CF-VEC-2026-015")

img9 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw9 = ImageDraw.Draw(img9)
draw9.rounded_rectangle([140, 260, 660, 540], radius=40, fill=(255, 0, 85, 255), outline=(255, 255, 255, 255), width=16)
draw9.text((400, 400), "50% OFF", fill=(255, 255, 255, 255), font=font_med, anchor="mm")
img9.save(os.path.join(output_dir, 'cf_discount_percentage_badge.png'))


# Copy all new assets to Desktop and Upload folders
for fname in os.listdir(output_dir):
    src_f = os.path.join(output_dir, fname)
    shutil.copy2(src_f, os.path.join(desktop_dir, fname))
    shutil.copy2(src_f, os.path.join(upload_dir, fname))

print("Successfully generated & auto-tagged 9 new Adobe Illustrator Vector Assets (Total 15 Vector Assets)!")
