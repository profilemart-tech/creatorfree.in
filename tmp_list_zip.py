import zipfile
path = 'C:/Users/user/Downloads/interactive-image-editor (1).zip'
print('exists=', path, zipfile.is_zipfile(path))
with zipfile.ZipFile(path, 'r') as z:
    for name in z.namelist():
        print(name)
