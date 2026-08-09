import os
import shutil

website_dir = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website'

src_file = os.path.join(website_dir, 'fb-post-generator.html')

aliases = [
    'fb-generator.html',
    'fb-post-creator.html',
    'facebook-post-generator.html'
]

for alias in aliases:
    dest_file = os.path.join(website_dir, alias)
    shutil.copy2(src_file, dest_file)
    print(f"Created alias route file: {alias}")

print("Vercel routing alias files created successfully!")
