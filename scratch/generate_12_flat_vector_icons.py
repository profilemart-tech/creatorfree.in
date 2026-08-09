import os
import shutil
import sys
sys.path.append(r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website')
from scratch.auto_asset_metadata_engine import AutoAssetMetadataEngine

output_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\creator-icons'
desktop_dir = r'C:\Users\user\OneDrive\Desktop\creator_vector_icons_64x64'
upload_dir = r'C:\Users\user\OneDrive\Desktop\vfx_to_upload\creator_vector_icons'

for d in [output_dir, desktop_dir, upload_dir]:
    os.makedirs(d, exist_ok=True)

print("Generating 12 Minimal Flat Vector Icons (64x64 SVG, #3DDC84 Green Accent)...")

# Color & Stroke Tokens
ACCENT_GREEN = "#3DDC84"
STROKE_W = "2"

def wrap_svg(inner_xml, title, content_id):
    svg_str = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
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
    return svg_str

# 1. Video Camera
icon1_xml = f"""  <rect x="8" y="16" width="34" height="32" rx="6" fill="{ACCENT_GREEN}" fill-opacity="0.15" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linejoin="round"/>
  <polygon points="42,26 56,18 56,46 42,38" fill="{ACCENT_GREEN}" fill-opacity="0.25" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linejoin="round"/>
  <circle cx="25" cy="32" r="5" fill="none" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>"""
svg1 = wrap_svg(icon1_xml, "Video Camera Creator Icon", "CF-ICON-2026-001")

# 2. Thumbnail / Image
icon2_xml = f"""  <rect x="8" y="12" width="48" height="40" rx="8" fill="{ACCENT_GREEN}" fill-opacity="0.12" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <circle cx="22" cy="24" r="5" fill="{ACCENT_GREEN}" fill-opacity="0.3" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <path d="M 12 44 L 26 30 L 36 40 L 44 32 L 52 40 M 12 44 H 52" fill="none" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round" stroke-linejoin="round"/>"""
svg2 = wrap_svg(icon2_xml, "Thumbnail Image Creator Icon", "CF-ICON-2026-002")

# 3. Download
icon3_xml = f"""  <path d="M 32 10 V 38 M 32 38 L 20 26 M 32 38 L 44 26" fill="none" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 12 44 V 50 C 12 52 14 54 16 54 H 48 C 50 54 52 52 52 50 V 44" fill="{ACCENT_GREEN}" fill-opacity="0.15" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round" stroke-linejoin="round"/>"""
svg3 = wrap_svg(icon3_xml, "Download Creator Icon", "CF-ICON-2026-003")

# 4. Scissors (Editing)
icon4_xml = f"""  <circle cx="18" cy="18" r="8" fill="{ACCENT_GREEN}" fill-opacity="0.2" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <circle cx="18" cy="46" r="8" fill="{ACCENT_GREEN}" fill-opacity="0.2" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <path d="M 24 22 L 52 46 M 24 42 L 52 18" fill="none" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round"/>"""
svg4 = wrap_svg(icon4_xml, "Scissors Video Editing Creator Icon", "CF-ICON-2026-004")

# 5. Magic Wand (AI Tool)
icon5_xml = f"""  <path d="M 14 50 L 42 22" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round"/>
  <path d="M 42 22 L 50 14 L 38 26 Z" fill="{ACCENT_GREEN}" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <path d="M 24 10 V 16 M 21 13 H 27 M 48 34 V 40 M 45 37 H 51 M 50 10 V 14 M 48 12 H 52" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round"/>"""
svg5 = wrap_svg(icon5_xml, "Magic Wand AI Tool Creator Icon", "CF-ICON-2026-005")

# 6. CV / Resume
icon6_xml = f"""  <rect x="14" y="10" width="36" height="44" rx="6" fill="{ACCENT_GREEN}" fill-opacity="0.12" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <path d="M 22 20 H 42 M 22 28 H 36 M 22 36 H 42 M 22 44 H 32" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round"/>"""
svg6 = wrap_svg(icon6_xml, "CV Resume Creator Icon", "CF-ICON-2026-006")

# 7. Passport Photo
icon7_xml = f"""  <rect x="12" y="10" width="40" height="44" rx="6" fill="{ACCENT_GREEN}" fill-opacity="0.1" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <circle cx="32" cy="26" r="8" fill="{ACCENT_GREEN}" fill-opacity="0.25" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <path d="M 18 48 C 18 38 24 38 32 38 C 40 38 46 38 46 48" fill="{ACCENT_GREEN}" fill-opacity="0.2" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round"/>"""
svg7 = wrap_svg(icon7_xml, "Passport Photo Creator Icon", "CF-ICON-2026-007")

# 8. SFX / Sound Wave
icon8_xml = f"""  <path d="M 10 32 H 16 M 22 20 V 44 M 28 12 V 52 M 34 26 V 38 M 40 16 V 48 M 46 22 V 42 M 52 32 H 54" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round"/>
  <rect x="25" y="10" width="6" height="44" rx="3" fill="{ACCENT_GREEN}" fill-opacity="0.2"/>
  <rect x="37" y="14" width="6" height="36" rx="3" fill="{ACCENT_GREEN}" fill-opacity="0.2"/>"""
svg8 = wrap_svg(icon8_xml, "SFX Sound Wave Creator Icon", "CF-ICON-2026-008")

# 9. Blog / Document
icon9_xml = f"""  <path d="M 14 12 C 14 10 16 8 18 8 H 36 L 50 22 V 52 C 50 54 48 56 46 56 H 18 C 16 56 14 54 14 52 Z" fill="{ACCENT_GREEN}" fill-opacity="0.12" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linejoin="round"/>
  <path d="M 36 8 V 22 H 50" fill="none" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <path d="M 22 30 H 42 M 22 38 H 42 M 22 46 H 34" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round"/>"""
svg9 = wrap_svg(icon9_xml, "Blog Document Creator Icon", "CF-ICON-2026-009")

# 10. Calendar
icon10_xml = f"""  <rect x="10" y="14" width="44" height="40" rx="8" fill="{ACCENT_GREEN}" fill-opacity="0.1" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <path d="M 10 26 H 54" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <path d="M 20 8 V 16 M 44 8 V 16" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round"/>
  <circle cx="22" cy="36" r="2" fill="{ACCENT_GREEN}"/>
  <circle cx="32" cy="36" r="2" fill="{ACCENT_GREEN}"/>
  <circle cx="42" cy="36" r="2" fill="{ACCENT_GREEN}"/>
  <circle cx="22" cy="44" r="2" fill="{ACCENT_GREEN}"/>
  <circle cx="32" cy="44" r="2" fill="{ACCENT_GREEN}"/>
  <circle cx="42" cy="44" r="2" fill="{ACCENT_GREEN}"/>"""
svg10 = wrap_svg(icon10_xml, "Calendar Event Creator Icon", "CF-ICON-2026-010")

# 11. Settings Gear
icon11_xml = f"""  <circle cx="32" cy="32" r="10" fill="{ACCENT_GREEN}" fill-opacity="0.2" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}"/>
  <path d="M 32 8 V 14 M 32 50 V 56 M 8 32 H 14 M 50 32 H 56 M 15 15 L 19 19 M 45 45 L 49 49 M 15 49 L 19 45 M 45 19 L 49 15" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round"/>"""
svg11 = wrap_svg(icon11_xml, "Settings Gear Creator Icon", "CF-ICON-2026-011")

# 12. Upload Arrow
icon12_xml = f"""  <path d="M 32 44 V 16 M 32 16 L 20 28 M 32 16 L 44 28" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 12 48 V 52 C 12 54 14 56 16 56 H 48 C 50 56 52 54 52 52 V 48" fill="{ACCENT_GREEN}" fill-opacity="0.15" stroke="{ACCENT_GREEN}" stroke-width="{STROKE_W}" stroke-linecap="round" stroke-linejoin="round"/>"""
svg12 = wrap_svg(icon12_xml, "Upload Arrow Creator Icon", "CF-ICON-2026-012")

# Mapping
icon_files = [
    ('icon_video_camera.svg', svg1),
    ('icon_thumbnail_image.svg', svg2),
    ('icon_download.svg', svg3),
    ('icon_scissors_editing.svg', svg4),
    ('icon_magic_wand_ai.svg', svg5),
    ('icon_cv_resume.svg', svg6),
    ('icon_passport_photo.svg', svg7),
    ('icon_sfx_sound_wave.svg', svg8),
    ('icon_blog_document.svg', svg9),
    ('icon_calendar.svg', svg10),
    ('icon_settings_gear.svg', svg11),
    ('icon_upload_arrow.svg', svg12)
]

for fname, content in icon_files:
    fpath = os.path.join(output_dir, fname)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    # Copy to Desktop & Upload folders
    for d in [desktop_dir, upload_dir]:
        shutil.copy2(fpath, os.path.join(d, fname))

print("Successfully generated all 12 Minimal Flat Vector Icons (64x64 SVG, #3DDC84 Green Accent)!")
