from PIL import Image, ImageDraw, ImageFont
import os

media_dir = r"C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media"
os.makedirs(media_dir, exist_ok=True)

samples = [
    ("banner_15_august_hero.jpg", "🇮🇳 15TH AUGUST PATRIOTIC POSTER", "#ff9933", "#138808"),
    ("banner_diwali_sample.jpg", "🪔 FESTIVAL GREETINGS BANNER", "#7c3aed", "#d97706"),
    ("banner_suvichar_quote.jpg", "💬 HINDI SUVICHAR & QUOTE BANNER", "#0f172a", "#334155"),
    ("banner_shop_opening.jpg", "🏪 GRAND SHOP OPENING BANNER", "#0284c7", "#0369a1"),
    ("banner_reels_ad.jpg", "📱 INSTAGRAM REELS PRODUCT FRAME", "#db2777", "#9333ea"),
    ("yt_tech_review_thumb.jpg", "📱 TECH & SMARTPHONE UNBOXING 1080p", "#dc2626", "#1e293b"),
    ("yt_stock_market_thumb.jpg", "📈 STOCK MARKET TRADING HIGH-CTR", "#15803d", "#064e3b"),
    ("yt_ssc_exam_thumb.jpg", "📚 SSC CGL EXAM PREPARATION 2026", "#b45309", "#78350f"),
    ("yt_daily_vlog_thumb.jpg", "🎬 INDIAN FAMILY DAILY VLOG COVER", "#c026d3", "#701a75"),
    ("yt_cooking_recipe_thumb.jpg", "🍔 SPECIAL INDIAN RECIPE THUMBNAIL", "#ea580c", "#9a3412"),
    ("radha_360_rig_thumb.jpg", "🎭 RADHA 360° MASTER 2D RIG", "#0284c7", "#4338ca")
]

for filename, text, color1, color2 in samples:
    filepath = os.path.join(media_dir, filename)
    img = Image.new("RGB", (640, 360), color1)
    draw = ImageDraw.Draw(img)
    
    # Draw simple gradient effect / rectangle
    draw.rectangle([0, 180, 640, 360], fill=color2)
    
    # Add text banner
    draw.rectangle([40, 140, 600, 220], fill=(0, 0, 0, 180))
    try:
        font = ImageFont.truetype("arial.ttf", 20)
    except:
        font = ImageFont.load_default()
    
    draw.text((60, 165), text, fill=(255, 255, 255), font=font)
    
    img.save(filepath, "JPEG", quality=90)
    print(f"Generated sample image: {filename}")

print("ALL SAMPLE THUMBNAILS GENERATED 100% SUCCESSFULLY!")
