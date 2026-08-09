import os
import shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont

output_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\thumbnail-booster'
desktop_dir = r'C:\Users\user\OneDrive\Desktop\thumbnail_booster_pack'
upload_dir = r'C:\Users\user\OneDrive\Desktop\vfx_to_upload\thumbnail_booster'

for d in [output_dir, desktop_dir, upload_dir]:
    os.makedirs(d, exist_ok=True)

print("Generating Pure SVG & PNG Thumbnail Booster Pack Assets...")

# 1. 3D GOLDEN RUPEE SYMBOL (₹ - 3D रुपया सिंबल)
svg1 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <circle cx="400" cy="400" r="360" fill="#FFD700" opacity="0.25"/>
  <circle cx="400" cy="400" r="280" fill="#FF8C00" opacity="0.35"/>
  <circle cx="400" cy="400" r="250" fill="#DAA520" stroke="#FFD700" stroke-width="16"/>
  <circle cx="400" cy="400" r="220" fill="#FFD700" stroke="#B8860B" stroke-width="10"/>
  <text x="400" y="520" text-anchor="middle" font-size="360" font-weight="bold" font-family="Arial" fill="#8B4513">₹</text>
  <text x="394" y="514" text-anchor="middle" font-size="360" font-weight="bold" font-family="Arial" fill="#FFFFFF">₹</text>
</svg>"""
with open(os.path.join(output_dir, 'rupee_3d_gold.svg'), 'w', encoding='utf-8') as f:
    f.write(svg1)

img1 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw1 = ImageDraw.Draw(img1)
draw1.ellipse([140, 140, 660, 660], fill=(255, 215, 0, 80))
draw1.ellipse([160, 160, 640, 640], fill=(218, 165, 32, 255), outline=(255, 255, 255, 255), width=12)
draw1.ellipse([180, 180, 620, 620], fill=(255, 215, 0, 255), outline=(184, 134, 11, 255), width=8)
try:
    font_large = ImageFont.truetype("arial.ttf", 340)
except:
    font_large = ImageFont.load_default()
draw1.text((395, 410), "₹", fill=(139, 69, 19, 255), font=font_large, anchor="mm")
draw1.text((390, 405), "₹", fill=(255, 255, 255, 255), font=font_large, anchor="mm")
img1.save(os.path.join(output_dir, 'rupee_3d_gold.png'))


# 2. SHOCKING RED VIRAL ARROW (शॉकिंग रेड एरो)
svg2 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <polygon points="150,480 450,480 450,600 700,400 450,200 450,320 150,320" fill="#FF0000" stroke="#FFFF00" stroke-width="18"/>
</svg>"""
with open(os.path.join(output_dir, 'shocking_red_arrow.svg'), 'w', encoding='utf-8') as f:
    f.write(svg2)

arrow_points = [(150, 480), (450, 480), (450, 600), (700, 400), (450, 200), (450, 320), (150, 320)]
img2 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw2 = ImageDraw.Draw(img2)
draw2.polygon(arrow_points, fill=(255, 0, 0, 255), outline=(255, 255, 0, 255), width=18)
img2.save(os.path.join(output_dir, 'shocking_red_arrow.png'))


# 3. EXPLOSIVE STARBURST BOOM TAG (धमाका स्टारबर्स्ट बैज)
star_pts = []
center_x, center_y = 400, 400
num_points = 16
pts_str = []
for i in range(num_points * 2):
    r = 350 if i % 2 == 0 else 220
    angle = i * (np.pi / num_points)
    px, py = center_x + r * np.cos(angle), center_y + r * np.sin(angle)
    star_pts.append((px, py))
    pts_str.append(f"{px:.1f},{py:.1f}")

svg3 = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <polygon points="{" ".join(pts_str)}" fill="#FFCC00" stroke="#FF0000" stroke-width="16"/>
  <text x="400" y="430" text-anchor="middle" font-size="110" font-weight="bold" font-family="Arial" fill="#FF0000">VIRAL</text>
</svg>"""
with open(os.path.join(output_dir, 'explosive_starburst_tag.svg'), 'w', encoding='utf-8') as f:
    f.write(svg3)

img3 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw3 = ImageDraw.Draw(img3)
draw3.polygon(star_pts, fill=(255, 204, 0, 255), outline=(255, 0, 0, 255), width=16)
try:
    font_med = ImageFont.truetype("arial.ttf", 110)
except:
    font_med = ImageFont.load_default()
draw3.text((400, 400), "VIRAL", fill=(255, 0, 0, 255), font=font_med, anchor="mm")
img3.save(os.path.join(output_dir, 'explosive_starburst_tag.png'))


# 4. FIRE ENERGY FLAME BURST (हॉट फायर फ्लेम बस्ट)
svg4 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <path d="M 400 100 C 450 250 550 300 550 450 C 550 600 450 700 400 700 C 350 700 250 600 250 450 C 250 300 350 250 400 100 Z" fill="#FF3300" stroke="#FFCC00" stroke-width="14"/>
  <path d="M 400 250 C 430 330 480 380 480 470 C 480 560 430 620 400 620 C 370 620 320 560 320 470 C 320 380 370 330 400 250 Z" fill="#FFCC00"/>
</svg>"""
with open(os.path.join(output_dir, 'fire_flame_burst.svg'), 'w', encoding='utf-8') as f:
    f.write(svg4)

img4 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw4 = ImageDraw.Draw(img4)
draw4.ellipse([250, 250, 550, 650], fill=(255, 68, 0, 255), outline=(255, 204, 0, 255), width=16)
draw4.ellipse([300, 320, 500, 600], fill=(255, 204, 0, 255))
img4.save(os.path.join(output_dir, 'fire_flame_burst.png'))


# 5. GOLDEN WINNER RIBBON BANNER (गोल्डन रिबन बैज)
svg5 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect x="150" y="320" width="500" height="160" rx="30" ry="30" fill="#FFD700" stroke="#B8860B" stroke-width="12"/>
  <text x="400" y="425" text-anchor="middle" font-size="75" font-weight="bold" font-family="Arial" fill="#8B4513">100% FREE</text>
</svg>"""
with open(os.path.join(output_dir, 'golden_ribbon_banner.svg'), 'w', encoding='utf-8') as f:
    f.write(svg5)

img5 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw5 = ImageDraw.Draw(img5)
draw5.rounded_rectangle([150, 320, 650, 480], radius=30, fill=(255, 215, 0, 255), outline=(184, 134, 11, 255), width=12)
try:
    font_ribbon = ImageFont.truetype("arial.ttf", 75)
except:
    font_ribbon = ImageFont.load_default()
draw5.text((400, 400), "100% FREE", fill=(139, 69, 19, 255), font=font_ribbon, anchor="mm")
img5.save(os.path.join(output_dir, 'golden_ribbon_banner.png'))


# 6. SHOCKED WOW EMOTICON STICKER (शॉक्ड इमोजी ओरा)
svg6 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <circle cx="400" cy="400" r="280" fill="#FFCC00" stroke="#FFFFFF" stroke-width="20"/>
  <ellipse cx="300" cy="320" rx="40" ry="60" fill="#000000"/>
  <ellipse cx="500" cy="320" rx="40" ry="60" fill="#000000"/>
  <ellipse cx="400" cy="500" rx="70" ry="90" fill="#000000"/>
</svg>"""
with open(os.path.join(output_dir, 'shocked_wow_sticker.svg'), 'w', encoding='utf-8') as f:
    f.write(svg6)

img6 = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
draw6 = ImageDraw.Draw(img6)
draw6.ellipse([120, 120, 680, 680], fill=(255, 204, 0, 255), outline=(255, 255, 255, 255), width=20)
draw6.ellipse([260, 260, 340, 380], fill=(0, 0, 0, 255))
draw6.ellipse([460, 260, 540, 380], fill=(0, 0, 0, 255))
draw6.ellipse([330, 410, 470, 590], fill=(0, 0, 0, 255))
img6.save(os.path.join(output_dir, 'shocked_wow_sticker.png'))


# Copy all files to desktop and upload folders
for fname in os.listdir(output_dir):
    src_f = os.path.join(output_dir, fname)
    shutil.copy2(src_f, os.path.join(desktop_dir, fname))
    shutil.copy2(src_f, os.path.join(upload_dir, fname))

print("Successfully generated all 6 Thumbnail Booster Pack Assets in SVG and PNG format!")
