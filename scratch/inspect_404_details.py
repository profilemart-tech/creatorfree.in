import urllib.request

url = 'https://www.creatorsfree.in/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        print("STATUS:", resp.status)
        print("HEADERS:", resp.headers)
except urllib.error.HTTPError as e:
    print("HTTP ERROR CODE:", e.code)
    print("\n--- RESPONSE HEADERS ---")
    print(e.headers)
    print("\n--- RESPONSE BODY ---")
    print(e.read().decode('utf-8', errors='ignore')[:1000])
