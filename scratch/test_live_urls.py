import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    'https://www.creatorsfree.in/',
    'https://www.creatorsfree.in/index.html',
    'https://www.creatorsfree.in/video-effects.html',
    'https://www.creatorsfree.in/sound-effects.html',
    'https://www.creatorsfree.in/thumbnail-booster-pack.html',
    'https://www.creatorsfree.in/indian-2d-characters.html',
    'https://creatorsfree-ddc8tw9pp-creatorsfree.vercel.app/',
    'https://creatorsfree-ddc8tw9pp-creatorsfree.vercel.app/video-effects.html'
]

print("--- TESTING LIVE URL STATUS CODES ---")
for url in urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            print(f"[{resp.status} OK] -> {url}")
    except urllib.error.HTTPError as e:
        print(f"[{e.code} FAIL] -> {url}")
    except Exception as e:
        print(f"[ERROR {e}] -> {url}")
