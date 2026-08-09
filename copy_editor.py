import os, shutil
src = r'C:\Users\user\Downloads\interactive-image-editor (1)'
dst = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\image-editor-app'
print('src exists', os.path.exists(src))
print('dst exists', os.path.exists(dst))
if not os.path.exists(dst):
    shutil.copytree(src, dst)
    print('copied')
else:
    print('already there')
