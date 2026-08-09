import os
import re

index_path = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\index.html'

with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Interactive Category Sample Carousel Section
showcase_section = """
        <!-- 🌟 Interactive Category Preview Showcase (Sample Carousels Grid) -->
        <section class="category-showcase-section" style="padding: 60px 0; background: linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%); border-top: 1px solid rgba(61, 220, 132, 0.15); border-bottom: 1px solid rgba(61, 220, 132, 0.15);">
            <div class="container">
                
                <div style="text-align: center; margin-bottom: 48px;">
                    <span style="background: rgba(61, 220, 132, 0.15); color: #3DDC84; border: 1px solid rgba(61, 220, 132, 0.3); padding: 6px 18px; border-radius: 50px; font-weight: 800; font-size: 0.85rem; display: inline-block; margin-bottom: 12px;">🌟 LIVE MEDIA PREVIEW CAROUSELS</span>
                    <h2 style="font-family: 'Outfit', sans-serif; font-size: 2.3rem; font-weight: 900; color: #ffffff; margin: 0 0 12px 0;">
                        Category Sample <span style="color: #3DDC84;">Live Play & Preview Cards</span>
                    </h2>
                    <p style="color: #94a3b8; font-size: 1.05rem; max-width: 680px; margin: 0 auto; line-height: 1.6;">
                        हर कैटेगरी कार्ड में 5 सैंपल एसेट्स हैं! स्लाइडर को स्वाइप (Slide) करके ऑडियो प्ले करें, 1080p VFX वीडियो देखें और SVG वेक्टर्स का प्रिव्यू लें।
                    </p>
                </div>

                <div class="showcase-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 28px;">
                    
                    <!-- 🔊 Category Box 1: Sound Effects (SFX) -->
                    <div class="category-box" style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(61, 220, 132, 0.3); border-radius: 24px; padding: 20px; backdrop-filter: blur(16px); box-shadow: 0 15px 35px rgba(0,0,0,0.4);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div>
                                <span style="font-size: 0.8rem; font-weight: 800; color: #3DDC84; text-transform: uppercase;">Category 1</span>
                                <h3 style="font-size: 1.25rem; font-weight: 800; color: #fff; margin: 2px 0 0 0;">🔊 Sound Effects (SFX)</h3>
                            </div>
                            <a href="sound-effects.html" style="background: rgba(61, 220, 132, 0.15); color: #3DDC84; border: 1px solid rgba(61, 220, 132, 0.3); padding: 6px 14px; border-radius: 50px; font-weight: 700; font-size: 0.8rem; text-decoration: none;">View All 38 SFX ➔</a>
                        </div>

                        <!-- 5-Slide Touch Carousel -->
                        <div id="carousel-sfx" class="carousel-container" style="display: flex; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 12px; scrollbar-width: none;">
                            <!-- Slide 1 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 16px; text-align: center;">
                                <div style="font-size: 2.2rem; margin-bottom: 8px;">💥</div>
                                <h4 style="font-size: 0.95rem; font-weight: 800; color: #facc15; margin: 0 0 4px 0;">Bollywood Dhishum</h4>
                                <p style="font-size: 0.78rem; color: #94a3b8; margin-bottom: 12px;">Action Fight Punch SFX</p>
                                <audio controls style="width: 100%; height: 36px; border-radius: 8px;">
                                    <source src="sfx/dhishum.wav" type="audio/wav">
                                </audio>
                            </div>
                            <!-- Slide 2 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 16px; text-align: center;">
                                <div style="font-size: 2.2rem; margin-bottom: 8px;">👋</div>
                                <h4 style="font-size: 0.95rem; font-weight: 800; color: #facc15; margin: 0 0 4px 0;">Slap / Thappad</h4>
                                <p style="font-size: 0.78rem; color: #94a3b8; margin-bottom: 12px;">Comedy Slap Sound</p>
                                <audio controls style="width: 100%; height: 36px; border-radius: 8px;">
                                    <source src="sfx/thappad.wav" type="audio/wav">
                                </audio>
                            </div>
                            <!-- Slide 3 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 16px; text-align: center;">
                                <div style="font-size: 2.2rem; margin-bottom: 8px;">🗣️</div>
                                <h4 style="font-size: 0.95rem; font-weight: 800; color: #facc15; margin: 0 0 4px 0;">Cough (खांसी)</h4>
                                <p style="font-size: 0.78rem; color: #94a3b8; margin-bottom: 12px;">Real Human Cough Sound</p>
                                <audio controls style="width: 100%; height: 36px; border-radius: 8px;">
                                    <source src="sfx/cough.wav" type="audio/wav">
                                </audio>
                            </div>
                            <!-- Slide 4 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 16px; text-align: center;">
                                <div style="font-size: 2.2rem; margin-bottom: 8px;">🫧</div>
                                <h4 style="font-size: 0.95rem; font-weight: 800; color: #facc15; margin: 0 0 4px 0;">Burp (डकार)</h4>
                                <p style="font-size: 0.78rem; color: #94a3b8; margin-bottom: 12px;">Funny Comedy Burp</p>
                                <audio controls style="width: 100%; height: 36px; border-radius: 8px;">
                                    <source src="sfx/burp.wav" type="audio/wav">
                                </audio>
                            </div>
                            <!-- Slide 5 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 16px; text-align: center;">
                                <div style="font-size: 2.2rem; margin-bottom: 8px;">💨</div>
                                <h4 style="font-size: 0.95rem; font-weight: 800; color: #facc15; margin: 0 0 4px 0;">Whoosh Transition</h4>
                                <p style="font-size: 0.78rem; color: #94a3b8; margin-bottom: 12px;">Fast Cinematic Whoosh</p>
                                <audio controls style="width: 100%; height: 36px; border-radius: 8px;">
                                    <source src="sfx/whoosh.wav" type="audio/wav">
                                </audio>
                            </div>
                        </div>
                    </div>

                    <!-- ⚡ Category Box 2: Video FX Overlays (VFX) -->
                    <div class="category-box" style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(192, 132, 252, 0.3); border-radius: 24px; padding: 20px; backdrop-filter: blur(16px); box-shadow: 0 15px 35px rgba(0,0,0,0.4);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div>
                                <span style="font-size: 0.8rem; font-weight: 800; color: #c084fc; text-transform: uppercase;">Category 2</span>
                                <h3 style="font-size: 1.25rem; font-weight: 800; color: #fff; margin: 2px 0 0 0;">⚡ Video FX Overlays (VFX)</h3>
                            </div>
                            <a href="video-effects.html" style="background: rgba(192, 132, 252, 0.15); color: #c084fc; border: 1px solid rgba(192, 132, 252, 0.3); padding: 6px 14px; border-radius: 50px; font-weight: 700; font-size: 0.8rem; text-decoration: none;">View All VFX ➔</a>
                        </div>

                        <!-- 5-Slide Touch Carousel -->
                        <div id="carousel-vfx" class="carousel-container" style="display: flex; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 12px; scrollbar-width: none;">
                            <!-- Slide 1 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <video controls muted style="width: 100%; height: 130px; border-radius: 10px; object-fit: cover; background: #000;">
                                    <source src="media/futuristic_sci_fi_ring_1080p.mp4" type="video/mp4">
                                </video>
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #c084fc; margin: 8px 0 2px 0;">Sci-Fi Energy Ring</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">1080p 60FPS Overlay</p>
                            </div>
                            <!-- Slide 2 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <video controls muted style="width: 100%; height: 130px; border-radius: 10px; object-fit: cover; background: #000;">
                                    <source src="media/electric_lightning_vfx_1080p.mp4" type="video/mp4">
                                </video>
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #c084fc; margin: 8px 0 2px 0;">Electric Lightning</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">Power Lightning Effect</p>
                            </div>
                            <!-- Slide 3 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <video controls muted style="width: 100%; height: 130px; border-radius: 10px; object-fit: cover; background: #000;">
                                    <source src="media/cyber_subscribe_button_1080p.mp4" type="video/mp4">
                                </video>
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #c084fc; margin: 8px 0 2px 0;">Cyber Subscribe</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">Futuristic Subscribe HUD</p>
                            </div>
                            <!-- Slide 4 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <video controls muted style="width: 100%; height: 130px; border-radius: 10px; object-fit: cover; background: #000;">
                                    <source src="media/red_hindu_flag_subscribe_1080p.mp4" type="video/mp4">
                                </video>
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #c084fc; margin: 8px 0 2px 0;">Red Hindu Flag</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">Bhakti Channel Intro</p>
                            </div>
                            <!-- Slide 5 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <video controls muted style="width: 100%; height: 130px; border-radius: 10px; object-fit: cover; background: #000;">
                                    <source src="media/dizzy_stars_comedy_vfx_1080p.mp4" type="video/mp4">
                                </video>
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #c084fc; margin: 8px 0 2px 0;">Dizzy Comedy Stars</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">Comedy Spinning Stars</p>
                            </div>
                        </div>
                    </div>

                    <!-- 🎨 Category Box 3: Thumbnail Booster Vector Pack -->
                    <div class="category-box" style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 24px; padding: 20px; backdrop-filter: blur(16px); box-shadow: 0 15px 35px rgba(0,0,0,0.4);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div>
                                <span style="font-size: 0.8rem; font-weight: 800; color: #ffd700; text-transform: uppercase;">Category 3</span>
                                <h3 style="font-size: 1.25rem; font-weight: 800; color: #fff; margin: 2px 0 0 0;">🎨 Thumbnail Vector Pack</h3>
                            </div>
                            <a href="thumbnail-booster-pack.html" style="background: rgba(255, 215, 0, 0.15); color: #ffd700; border: 1px solid rgba(255, 215, 0, 0.3); padding: 6px 14px; border-radius: 50px; font-weight: 700; font-size: 0.8rem; text-decoration: none;">View Vector Pack ➔</a>
                        </div>

                        <!-- 5-Slide Touch Carousel -->
                        <div id="carousel-vector" class="carousel-container" style="display: flex; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 12px; scrollbar-width: none;">
                            <!-- Slide 1 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <img src="media/thumbnail-booster/rupee_3d_gold.svg" alt="3D Gold Rupee Vector" style="width: 100%; height: 130px; object-fit: contain;">
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #ffd700; margin: 8px 0 2px 0;">3D Gold Rupee</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">High-CTR Coin Vector</p>
                            </div>
                            <!-- Slide 2 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <img src="media/thumbnail-booster/shocking_red_arrow.svg" alt="Shocking Red Arrow Vector" style="width: 100%; height: 130px; object-fit: contain;">
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #ffd700; margin: 8px 0 2px 0;">Shocking Red Arrow</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">Viral Pointer Graphic</p>
                            </div>
                            <!-- Slide 3 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <img src="media/thumbnail-booster/fire_flame_burst.svg" alt="Fire Burst Vector" style="width: 100%; height: 130px; object-fit: contain;">
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #ffd700; margin: 8px 0 2px 0;">Fire Flame Burst</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">Trending Topic Flame</p>
                            </div>
                            <!-- Slide 4 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <img src="media/thumbnail-booster/explosive_starburst_tag.svg" alt="Explosive Starburst Vector" style="width: 100%; height: 130px; object-fit: contain;">
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #ffd700; margin: 8px 0 2px 0;">Starburst Discount Tag</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">Special Offer Badge</p>
                            </div>
                            <!-- Slide 5 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <img src="media/thumbnail-booster/golden_ribbon_banner.svg" alt="Golden Ribbon Banner Vector" style="width: 100%; height: 130px; object-fit: contain;">
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #ffd700; margin: 8px 0 2px 0;">Golden Ribbon Banner</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">Header Title Banner</p>
                            </div>
                        </div>
                    </div>

                    <!-- 🎭 Category Box 4: 360° Indian 2D Characters -->
                    <div class="category-box" style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(248, 113, 113, 0.3); border-radius: 24px; padding: 20px; backdrop-filter: blur(16px); box-shadow: 0 15px 35px rgba(0,0,0,0.4);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div>
                                <span style="font-size: 0.8rem; font-weight: 800; color: #f87171; text-transform: uppercase;">Category 4</span>
                                <h3 style="font-size: 1.25rem; font-weight: 800; color: #fff; margin: 2px 0 0 0;">🎭 2D Indian Characters</h3>
                            </div>
                            <a href="indian-2d-characters.html" style="background: rgba(248, 113, 113, 0.15); color: #f87171; border: 1px solid rgba(248, 113, 113, 0.3); padding: 6px 14px; border-radius: 50px; font-weight: 700; font-size: 0.8rem; text-decoration: none;">View 2D Rigs ➔</a>
                        </div>

                        <!-- 5-Slide Touch Carousel -->
                        <div id="carousel-char" class="carousel-container" style="display: flex; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 12px; scrollbar-width: none;">
                            <!-- Slide 1 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <img src="media/indian-characters/cf_radha_full_package_master_sprites.jpg" alt="Radha 360 Full Package Rig" style="width: 100%; height: 130px; object-fit: contain; border-radius: 8px;">
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #f87171; margin: 8px 0 2px 0;">Radha 360° Master Rig</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">12-in-1 Full Action Pack</p>
                            </div>
                            <!-- Slide 2 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <img src="media/indian-characters/cf_indian_farmer_rigged.svg" alt="Ramu Kaka Farmer Rig" style="width: 100%; height: 130px; object-fit: contain;">
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #f87171; margin: 8px 0 2px 0;">भारतीय किसान (Ramu Kaka)</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">14-Layer Animate CC Rig</p>
                            </div>
                            <!-- Slide 3 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <img src="media/indian-characters/cf_indian_woman_rigged.svg" alt="Indian Woman Rig" style="width: 100%; height: 130px; object-fit: contain;">
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #f87171; margin: 8px 0 2px 0;">भारतीय महिला (Housewife)</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">Traditional Village Woman</p>
                            </div>
                            <!-- Slide 4 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <img src="media/indian-characters/cf_indian_sethji_rigged.svg" alt="Sethji Businessman Rig" style="width: 100%; height: 130px; object-fit: contain;">
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #f87171; margin: 8px 0 2px 0;">सेठजी (Sethji)</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">Rich Businessman Character</p>
                            </div>
                            <!-- Slide 5 -->
                            <div class="carousel-slide" style="min-width: 260px; max-width: 260px; scroll-snap-align: start; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; text-align: center;">
                                <img src="media/indian-characters/cf_indian_sadhu_rigged.svg" alt="Sadhu Baba Rig" style="width: 100%; height: 130px; object-fit: contain;">
                                <h4 style="font-size: 0.9rem; font-weight: 800; color: #f87171; margin: 8px 0 2px 0;">साधु बाबा (Sadhu Baba)</h4>
                                <p style="font-size: 0.75rem; color: #94a3b8;">Holy Saint Character Rig</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
"""

# Insert showcase section before tools grid
if '<!-- Featured Tools Grid (Glassmorphism Cards) -->' in html:
    html = html.replace('<!-- Featured Tools Grid (Glassmorphism Cards) -->', showcase_section + '\n        <!-- Featured Tools Grid (Glassmorphism Cards) -->')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Successfully injected Live Category Sample Carousels Showcase onto homepage!")
