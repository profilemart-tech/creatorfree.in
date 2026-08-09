import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

site_dir = r"C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website"
html_files = [f for f in os.listdir(site_dir) if f.endswith('.html')]

print("--- AUDITING ALL INTERNAL LINKS ACROSS HTML FILES ---")
broken_count = 0
tested_count = 0

for hfile in html_files:
    filepath = os.path.join(site_dir, hfile)
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Find all href and src
    links = re.findall(r'(?:href|src)=["\']([^"\']+)["\']', content)
    for link in links:
        # Ignore external links, javascript:void(0), data URIs, anchor hashes
        if link.startswith('http') or link.startswith('//') or link.startswith('javascript') or link.startswith('data:') or link.startswith('#') or link == '':
            continue
        
        # Remove query parameters or hash anchors
        clean_link = link.split('?')[0].split('#')[0]
        if not clean_link:
            continue

        target_path = os.path.join(site_dir, clean_link.replace('/', os.sep))
        tested_count += 1
        if not os.path.exists(target_path):
            print(f"[MISSING LINK] in [{hfile}]: '{link}' -> Path not found: {clean_link}")
            broken_count += 1

print(f"\nLINK AUDIT COMPLETE: {tested_count - broken_count}/{tested_count} LINKS VALID. {broken_count} MISSING ASSETS FOUND.")
