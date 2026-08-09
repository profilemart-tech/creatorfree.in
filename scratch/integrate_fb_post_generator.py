import os
import shutil
import re

tool_src_dir = r'C:\Users\user\.gemini\antigravity\scratch\fb-post-generator'
website_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website'

print("Integrating FB Post Generator Tool into CreatorsFree.in website...")

# 1. Copy app.js and canvas-renderer.js to website root
shutil.copy2(os.path.join(tool_src_dir, 'app.js'), os.path.join(website_dir, 'app.js'))
shutil.copy2(os.path.join(tool_src_dir, 'canvas-renderer.js'), os.path.join(website_dir, 'canvas-renderer.js'))
shutil.copy2(os.path.join(tool_src_dir, 'style.css'), os.path.join(website_dir, 'fb-style.css'))

# Copy public assets if available
public_src = os.path.join(tool_src_dir, 'public')
public_dest = os.path.join(website_dir, 'public')
if os.path.exists(public_src):
    os.makedirs(public_dest, exist_ok=True)
    for f in os.listdir(public_src):
        shutil.copy2(os.path.join(public_src, f), os.path.join(public_dest, f))

# 2. Process index.html from tool into fb-post-generator.html
with open(os.path.join(tool_src_dir, 'index.html'), 'r', encoding='utf-8') as f:
    tool_html = f.read()

# Update CSS reference to ./fb-style.css & header navigation to match CreatorsFree.in
tool_html = tool_html.replace('href="./style.css"', 'href="./fb-style.css"')

# Inject CreatorsFree.in Header Navigation
header_replacement = """  <!-- Top Navigation Header -->
  <header class="app-header" style="background: rgba(15, 23, 42, 0.95); border-bottom: 1px solid rgba(61, 220, 132, 0.2); padding: 14px 24px;">
    <div class="header-container" style="max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
      <a href="index.html" class="logo" style="text-decoration: none; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 900; color: #fff;">
        Creators<span style="color: #3DDC84;">Free</span>.in
      </a>
      <nav class="nav-links" style="display: flex; gap: 20px; align-items: center;">
        <a href="index.html" style="color: #cbd5e1; text-decoration: none; font-weight: 600;">Home</a>
        <a href="video-effects.html" style="color: #cbd5e1; text-decoration: none; font-weight: 600;">Video FX</a>
        <a href="sound-effects.html" style="color: #cbd5e1; text-decoration: none; font-weight: 600;">Sound FX</a>
        <a href="thumbnail-booster-pack.html" style="color: #cbd5e1; text-decoration: none; font-weight: 600;">Vector Pack</a>
        <a href="fb-post-generator.html" style="color: #3DDC84; text-decoration: none; font-weight: 800;">FB Post Generator 🔥</a>
        <a href="indian-2d-characters.html" style="color: #cbd5e1; text-decoration: none; font-weight: 600;">2D Characters 🎭</a>
      </nav>
    </div>
  </header>"""

# Replace header block in tool_html
tool_html = re.sub(r'<header class="app-header">.*?</header>', header_replacement, tool_html, flags=re.DOTALL)

with open(os.path.join(website_dir, 'fb-post-generator.html'), 'w', encoding='utf-8') as f:
    f.write(tool_html)

print("Created fb-post-generator.html on CreatorsFree.in!")
