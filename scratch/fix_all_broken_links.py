import os
import re

website_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website'

print("Fixing all broken links and cleaning up remaining temp tool files...")

# 1. Delete temp tool files if they exist
temp_files = [
    'facebook-post-creator.html',
    'fb-post-creator.html',
    'fb-post-generator.html',
    'fb-generator.html',
    'fb-style.css',
    'app.js',
    'canvas-renderer.js'
]

for tf in temp_files:
    tp = os.path.join(website_dir, tf)
    if os.path.exists(tp):
        os.remove(tp)
        print(f"Removed temp file: {tf}")

# 2. Fix CSS references (style.css -> css/styles.css)
for hf in ['creator-icons.html', 'indian-2d-characters.html', 'thumbnail-booster-pack.html']:
    hp = os.path.join(website_dir, hf)
    if os.path.exists(hp):
        with open(hp, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace('href="style.css"', 'href="css/styles.css"')
        with open(hp, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed style.css link in: {hf}")

# 3. Clean up index.html links
index_p = os.path.join(website_dir, 'index.html')
with open(index_p, 'r', encoding='utf-8') as f:
    index_content = f.read()

# Remove any remaining Facebook Post Creator link or card
index_content = re.sub(r'<!-- Tool: Facebook Post Creator.*?<\/article>\s*', '', index_content, flags=re.DOTALL)
index_content = index_content.replace('<a href="facebook-post-creator" class="btn" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); text-align: center; border-radius: 12px; font-weight: 700;">Open FB Post Creator ➔</a>', '')
index_content = index_content.replace('<a href="facebook-post-creator.html" style="color: #3DDC84; text-decoration: none; font-weight: 800;">FB Post Creator 🔥</a>', '')
index_content = index_content.replace('<a href="facebook-post-creator" class="active" style="color: #3DDC84;">FB Post Creator 🔥</a>', '')

with open(index_p, 'w', encoding='utf-8') as f:
    f.write(index_content)

print("index.html cleaned and verified!")
