import urllib.request
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

base_url = 'https://creatorsfree-j70gc6crm-creatorsfree.vercel.app/'

test_paths = [
    'index.html',
    'video-effects.html',
    'sound-effects.html',
    'thumbnail-booster-pack.html',
    'indian-2d-characters.html',
    'css/styles.css',
    'css/responsive.css',
    'js/header-footer.js',
    'js/main.js',
    'components/header.html',
    'components/footer.html',
    'images/favicon.png',
    'media/cf_youtube_corner_gradient_bg_1080p.mp4',
    'media/master-vectors/hero_nle_timeline_illustration.svg'
]

print("--- AUDITING ALL ASSET PATHS ON LIVE DEPLOYMENT ---")
failed = 0
for path in test_paths:
    url = base_url + path
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            print(f"[{resp.status} OK] ({resp.length} bytes) -> /{path}")
    except urllib.error.HTTPError as e:
        print(f"[{e.code} FAIL] ❌ NOT FOUND -> /{path}")
        failed += 1
    except Exception as e:
        print(f"[ERROR {e}] -> /{path}")
        failed += 1

print(f"\nAUDIT COMPLETE: {len(test_paths) - failed}/{len(test_paths)} ASSET PATHS PASSED!")
