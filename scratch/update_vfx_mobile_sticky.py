import os
import re

vfx_html_path = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\video-effects.html'

with open(vfx_html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add new Animated Corner Color Video Background VFX to vfxList array
new_vfx_entry = """            {
                id: 'youtube_corner_gradient_bg_vfx',
                name: 'Animated Corner Color Video Background VFX (चारों कोनों में रंग बदलने वाला YouTube Video Overlay)',
                category: 'transitions',
                icon: '🎨✨',
                badge: '1080p 60FPS MP4',
                file: 'media/cf_youtube_corner_gradient_bg_1080p.mp4',
                github_file: 'https://raw.githubusercontent.com/0605yudhik/creatorsfree-sfx/main/cf_youtube_corner_gradient_bg_1080p.mp4',
                desc: 'Dynamic 1080p 60FPS background motion overlay featuring 4 animated corner gradient glowing radial orbs shifting hues seamlessly in Python.',
                tags: ['corner color video background', 'youtube video background vfx', 'animated gradient corner bg', 'neon glow corner background', 'podcast video background', 'lo-fi beat background']
            },"""

if 'const vfxList = [' in html and 'youtube_corner_gradient_bg_vfx' not in html:
    html = html.replace('const vfxList = [', 'const vfxList = [\n' + new_vfx_entry)

# 2. Add Sticky Mobile Video Preview Player CSS
sticky_css = """
        /* Mobile Sticky Video Preview Player */
        @media (max-width: 768px) {
            #vfxModalOverlay {
                align-items: flex-start !important;
                padding: 10px !important;
            }
            #vfxModalOverlay > div {
                position: sticky !important;
                top: 10px !important;
                z-index: 10000 !important;
                max-height: 85vh !important;
                overflow-y: auto !important;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.9), 0 0 25px rgba(168, 85, 247, 0.4) !important;
            }
            #vfxModalOverlay video {
                max-height: 240px !important;
                object-fit: contain !important;
            }
        }
"""

if '</style>' in html:
    html = html.replace('</style>', sticky_css + '\n    </style>')

with open(vfx_html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Successfully updated video-effects.html with new Corner Color Video Background & Mobile Sticky Preview!")
