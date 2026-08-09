import os
import shutil
import re

website_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website'

print("=== STEP 1: CLEANING STALE BUILD CACHE & VERCEL.JSON ===")
vercel_cache = os.path.join(website_dir, '.vercel')
if os.path.exists(vercel_cache):
    shutil.rmtree(vercel_cache, ignore_errors=True)
    print("Cleaned .vercel directory.")

vercel_json = os.path.join(website_dir, 'vercel.json')
if os.path.exists(vercel_json):
    os.remove(vercel_json)
    print("Removed vercel.json.")

print("\n=== STEP 2: VERIFYING VIDEO ASSET AND HTML LIST ENTRY ===")
video_file = os.path.join(website_dir, 'media', 'cf_youtube_corner_gradient_bg_1080p.mp4')

if os.path.exists(video_file):
    print(f"Video file exists! Size: {os.path.getsize(video_file)} bytes")
else:
    print("WARNING: Video file not found! Copying from scratch...")
    # Check if backup exists in desktop or scratch
    alt_video = r'C:\Users\user\OneDrive\Desktop\youtube_video_backgrounds\YouTubeAnimatedCornerBg_1080p.mp4'
    if os.path.exists(alt_video):
        shutil.copy2(alt_video, video_file)
        print("Copied video from desktop to media folder.")

vfx_html = os.path.join(website_dir, 'video-effects.html')
with open(vfx_html, 'r', encoding='utf-8') as f:
    vfx_content = f.read()

# Ensure entry exists
new_entry = """            {
                id: 'youtube_corner_gradient_bg_vfx',
                name: 'Animated Corner Color Video Background VFX (चारों कोनों में रंग बदलने वाला YouTube Video Overlay)',
                category: 'transitions',
                icon: '🎨✨',
                badge: '1080p 60FPS MP4',
                file: 'media/cf_youtube_corner_gradient_bg_1080p.mp4',
                github_file: 'https://raw.githubusercontent.com/0605yudhik/creatorsfree-sfx/main/cf_youtube_corner_gradient_bg_1080p.mp4',
                desc: 'Dynamic 1080p 60FPS background motion overlay featuring 4 animated corner gradient glowing radial orbs shifting hues seamlessly in Python.',
                tags: ['corner color video background', 'youtube video background vfx', 'animated gradient corner bg', 'neon glow corner background', 'podcast video background', 'lo-fi beat background']
            },"""

if 'youtube_corner_gradient_bg_vfx' not in vfx_content:
    vfx_content = vfx_content.replace('const vfxList = [', 'const vfxList = [\n' + new_entry)
    with open(vfx_html, 'w', encoding='utf-8') as f:
        f.write(vfx_content)
    print("Added youtube_corner_gradient_bg_vfx entry to video-effects.html!")
else:
    print("youtube_corner_gradient_bg_vfx entry already present in video-effects.html!")

print("\nReady for deployment!")
