import os
import shutil

brain_dir = r'C:\Users\user\.gemini\antigravity\brain\e9a15db6-b991-4f88-b952-a927f4da43a3'
web_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\indian-characters'

desktop_folders = [
    r'C:\Users\user\OneDrive\Desktop\radha_full_package_character_rig',
    r'C:\Users\user\OneDrive\Desktop\indian_anime_walkable_characters',
    r'C:\Users\user\OneDrive\Desktop\indian_2d_cartoon_characters_animate_cc',
    r'C:\Users\user\OneDrive\Desktop\vfx_to_upload\radha_full_package'
]

for d in desktop_folders:
    os.makedirs(d, exist_ok=True)

# Copy SVG files
svg_files = [
    ('cf_radha_360_full_rig.svg', web_dir, 'cf_radha_360_full_rig.svg'),
    ('cf_indian_anime_girl_walk_rigged.svg', os.path.join(web_dir, '..', '..', 'scratch'), 'cf_indian_anime_girl_walk_rigged.svg'),
    ('cf_indian_woman_rigged.svg', web_dir, 'cf_indian_woman_rigged.svg')
]

for filename, src_dir, dest_filename in svg_files:
    src_p = os.path.join(src_dir, filename)
    if os.path.exists(src_p):
        for d in desktop_folders:
            dest_p = os.path.join(d, dest_filename)
            shutil.copy2(src_p, dest_p)
            print(f"Copied {filename} -> {dest_p}")

print("All female character SVG files organized successfully across Desktop folders!")
