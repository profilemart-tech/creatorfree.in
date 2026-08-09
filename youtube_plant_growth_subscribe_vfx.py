from manim import *
import numpy as np

class YouTubePlantGrowthSubscribeVFX(Scene):
    def construct(self):
        # 1. Pure Pitch Black Background (Overlay / Screen / Add Ready)
        self.camera.background_color = "#000000"

        # Color Palette
        YT_RED = "#FF0000"
        STEM_GREEN = "#32CD32"
        LEAF_GREEN = "#228B22"
        SOIL_BROWN = "#8B4513"
        GOLD_MAIN = "#FFD700"
        GOLD_LIGHT = "#FFF2A3"
        SACRED_WHITE = "#FFFFFF"
        DARK_COSMIC = "#0c0a05"

        # --- 2. YOUTUBE SHAPED PLANT POT (YouTube रूपी गमला) ---
        pot_body = Polygon(
            [-1.1, -1.3, 0], [1.1, -1.3, 0], [0.8, -2.5, 0], [-0.8, -2.5, 0],
            color=YT_RED, fill_color=YT_RED, fill_opacity=0.95, stroke_width=3
        )
        pot_rim = RoundedRectangle(corner_radius=0.08, width=2.4, height=0.25, color=YT_RED, fill_color=YT_RED, fill_opacity=1.0, stroke_width=2).move_to(UP * (-1.2))
        pot_play_icon = Polygon([-0.25, -1.9, 0], [0.35, -1.9, 0], [0.05, -2.15, 0], color=SACRED_WHITE, fill_color=SACRED_WHITE, fill_opacity=1.0).rotate(-PI/2, about_point=np.array([0.05, -1.9, 0])).move_to(np.array([0, -1.9, 0]))
        soil_top = Ellipse(width=2.1, height=0.3, color=SOIL_BROWN, fill_color=SOIL_BROWN, fill_opacity=0.9).move_to(UP * (-1.3))

        yt_pot = VGroup(pot_body, pot_rim, pot_play_icon, soil_top)

        # --- 3. PLANT STEM & LEAVES (अंकुर और पौधा) ---
        # Main Stem growing upwards
        stem = CubicBezier(
            [0, -1.3, 0], [0.1, -0.8, 0], [-0.1, -0.3, 0], [0, 0.2, 0],
            color=STEM_GREEN, stroke_width=7
        )

        # Left Leaf
        leaf_left = CubicBezier(
            [-0.05, -0.6, 0], [-0.4, -0.4, 0], [-0.7, -0.5, 0], [-0.6, -0.7, 0],
            color=LEAF_GREEN, stroke_width=4
        )
        leaf_left_fill = Polygon(
            [-0.05, -0.6, 0], [-0.4, -0.4, 0], [-0.7, -0.5, 0], [-0.6, -0.7, 0],
            color=STEM_GREEN, fill_color=STEM_GREEN, fill_opacity=0.8, stroke_width=1
        )
        leaf_l_group = VGroup(leaf_left, leaf_left_fill)

        # Right Leaf
        leaf_right = CubicBezier(
            [0.05, -0.3, 0], [0.4, -0.1, 0], [0.7, -0.2, 0], [0.6, -0.4, 0],
            color=LEAF_GREEN, stroke_width=4
        )
        leaf_right_fill = Polygon(
            [0.05, -0.3, 0], [0.4, -0.1, 0], [0.7, -0.2, 0], [0.6, -0.4, 0],
            color=STEM_GREEN, fill_color=STEM_GREEN, fill_opacity=0.8, stroke_width=1
        )
        leaf_r_group = VGroup(leaf_right, leaf_right_fill)

        plant_group = VGroup(stem, leaf_l_group, leaf_r_group)

        # --- 4. FLOWER SUBSCRIBER BUTTON BLOOM (फूल की जगह उगता हुआ सब्सक्राइब बटन) ---
        btn_outer = RoundedRectangle(corner_radius=0.25, width=5.6, height=1.4, color=GOLD_MAIN, fill_color=DARK_COSMIC, fill_opacity=0.92, stroke_width=4.5).move_to(UP * 0.9)
        btn_inner_glow = RoundedRectangle(corner_radius=0.2, width=5.35, height=1.18, color=YT_RED, stroke_width=2.5).move_to(UP * 0.9).set_opacity(0.75)

        # Initial Button Text: "SUBSCRIBE 🔔"
        text_sub = Text("SUBSCRIBE", font="Trebuchet MS", font_size=38, weight=BOLD, color=SACRED_WHITE).move_to(UP * 0.9 + LEFT * 0.4)
        bell_emoji = Text("🔔", font_size=36, color=GOLD_MAIN).next_to(text_sub, RIGHT, buff=0.25)
        sub_group = VGroup(text_sub, bell_emoji)

        # Subscribed State Text: "SUBSCRIBED 🔔"
        text_blessed = Text("SUBSCRIBED", font="Trebuchet MS", font_size=32, weight=BOLD, color=GOLD_MAIN).move_to(UP * 0.9 + LEFT * 0.45)
        subscribed_bell = Text("🔔", font_size=38, color=GOLD_MAIN).next_to(text_blessed, RIGHT, buff=0.3)
        blessed_group = VGroup(text_blessed, subscribed_bell)

        # Magical Bloom Shockwave Ring
        impact_ring = Circle(radius=0.2, color=GOLD_MAIN, stroke_width=8).move_to(UP * 0.9).set_opacity(0)

        # Magical Flower Pollen Sparks
        sparks = VGroup()
        np.random.seed(1234)
        for _ in range(54):
            a = np.random.uniform(0, 2 * PI)
            r = np.random.uniform(0.1, 0.3)
            pt = Dot(
                point=[r * np.cos(a), r * np.sin(a) + 0.9, 0],
                color=GOLD_MAIN if np.random.rand() > 0.35 else STEM_GREEN,
                radius=np.random.uniform(0.04, 0.1)
            )
            pt.target_pos = np.array([3.5 * np.cos(a), 3.5 * np.sin(a) + 0.9, 0])
            sparks.add(pt)

        # --- ANIMATION SEQUENCE ---

        # Phase 1: Fade In YouTube Pot
        self.play(
            FadeIn(yt_pot, shift=UP * 0.3, run_time=0.9)
        )
        self.wait(0.2)

        # Phase 2: Sprout Emergence & Stem Growth (अंकुर फूटना और पौधा बनना)
        self.play(
            Create(stem, run_time=1.2),
            FadeIn(leaf_l_group, scale=0.5, run_time=0.8),
            FadeIn(leaf_r_group, scale=0.5, run_time=0.8)
        )
        self.wait(0.2)

        # Phase 3: Flower Subscriber Button Bloom (फूल की जगह सब्सक्राइब बटन उगना)
        self.play(
            FadeIn(btn_outer, scale=0.3, run_time=0.9),
            FadeIn(btn_inner_glow, scale=0.3, run_time=0.9),
            Write(sub_group, run_time=0.8)
        )
        self.wait(0.4)

        # Phase 4: Click Event & Pollen Sparkle Burst!
        self.play(
            impact_ring.animate.set_opacity(1.0).set_stroke(width=12),
            btn_inner_glow.animate.set_color(GOLD_MAIN).set_opacity(0.95),
            run_time=0.18
        )

        particle_anims = [
            pt.animate.move_to(pt.target_pos).set_opacity(0)
            for pt in sparks
        ]

        self.play(
            *particle_anims,
            impact_ring.animate.scale(12).set_opacity(0),
            FadeOut(sub_group, scale=0.7),
            FadeIn(blessed_group, scale=1.15),
            btn_outer.animate.set_color(STEM_GREEN).set_fill(color=STEM_GREEN, opacity=0.38),
            btn_inner_glow.animate.scale(1.2).set_opacity(0),
            run_time=1.0,
            rate_func=smooth
        )

        # Phase 5: Notification Bell Ring Animation
        self.play(
            subscribed_bell.animate.rotate(PI/6),
            run_time=0.25
        )
        self.play(
            subscribed_bell.animate.rotate(-PI/3),
            run_time=0.25
        )
        self.play(
            subscribed_bell.animate.rotate(PI/6),
            run_time=0.25
        )

        self.wait(1.2)

        # Phase 6: Smooth Dissolve Out
        self.play(
            FadeOut(yt_pot, shift=DOWN * 0.3),
            FadeOut(plant_group),
            FadeOut(btn_outer, scale=1.1),
            FadeOut(blessed_group, scale=1.1),
            run_time=1.0,
            rate_func=smooth
        )

        self.wait(0.3)
