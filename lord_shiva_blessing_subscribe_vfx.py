from manim import *
import numpy as np

class LordShivaBlessingSubscribeVFX(Scene):
    def construct(self):
        # 1. Pure Pitch Black Background (Overlay / Screen / Add Ready)
        self.camera.background_color = "#000000"

        # Ultra Divine Color Palette
        GOLD_MAIN = "#FFD700"
        GOLD_LIGHT = "#FFF099"
        SHIVA_CYAN = "#00F0FF"
        SHIVA_BLUE = "#0066FF"
        SACRED_RED = "#FF1A1A"
        SACRED_WHITE = "#FFFFFF"
        DEEP_COSMIC = "#050814"

        # --- 2. SACRED TRIPUNDRA & THIRD EYE (त्रिपुंड और दिव्य नेत्र) ---
        line1 = Line(LEFT * 0.5, RIGHT * 0.5, color=SACRED_WHITE, stroke_width=3.5).move_to(UP * 2.35)
        line2 = Line(LEFT * 0.6, RIGHT * 0.6, color=SACRED_WHITE, stroke_width=3.5).move_to(UP * 2.25)
        line3 = Line(LEFT * 0.5, RIGHT * 0.5, color=SACRED_WHITE, stroke_width=3.5).move_to(UP * 2.15)
        bindi = Dot(point=[0, 2.25, 0], color=SACRED_RED, radius=0.09)
        bindi_glow = Dot(point=[0, 2.25, 0], color=GOLD_MAIN, radius=0.18).set_opacity(0.5)
        tripundra = VGroup(line1, line2, line3, bindi, bindi_glow)

        # --- 3. HIGH-DETAIL EPIC TRISHUL (त्रिशूल) ---
        # Central Prongs & Curved Wings
        center_blade = Polygon(
            [0, 2.7, 0], [-0.12, 1.6, 0], [0.12, 1.6, 0],
            color=GOLD_MAIN, fill_color=GOLD_LIGHT, fill_opacity=1.0, stroke_width=2
        )
        
        # Left Prong Curve
        left_prong = CubicBezier(
            [0, 1.65, 0], [-0.4, 1.7, 0], [-0.65, 2.1, 0], [-0.5, 2.5, 0],
            color=GOLD_MAIN, stroke_width=5
        )
        left_tip = Polygon([-0.5, 2.5, 0], [-0.58, 2.38, 0], [-0.42, 2.38, 0], color=GOLD_MAIN, fill_color=GOLD_MAIN, fill_opacity=1.0)
        
        # Right Prong Curve
        right_prong = CubicBezier(
            [0, 1.65, 0], [0.4, 1.7, 0], [0.65, 2.1, 0], [0.5, 2.5, 0],
            color=GOLD_MAIN, stroke_width=5
        )
        right_tip = Polygon([0.5, 2.5, 0], [0.42, 2.38, 0], [0.58, 2.38, 0], color=GOLD_MAIN, fill_color=GOLD_MAIN, fill_opacity=1.0)

        # Trishul Base & Shaft
        trishul_base_ring = Annulus(inner_radius=0.1, outer_radius=0.18, color=SHIVA_CYAN, fill_opacity=0.8).move_to(UP * 1.55)
        shaft = Line(UP * 1.55, UP * 0.75, color=GOLD_MAIN, stroke_width=6)

        # Crescent Moon (अर्धचंद्र)
        moon = Arc(radius=0.32, start_angle=PI/3, angle=4*PI/3, color=SACRED_WHITE, stroke_width=3.5).move_to(UP * 2.05 + RIGHT * 0.42)

        # Damru Assembly (डमरू + धागा व मनका)
        d_top = Polygon([-0.3, 1.3, 0], [0.3, 1.3, 0], [0, 1.15, 0], color=GOLD_MAIN, fill_color=DEEP_COSMIC, fill_opacity=0.95, stroke_width=2.5)
        d_bot = Polygon([-0.3, 1.0, 0], [0.3, 1.0, 0], [0, 1.15, 0], color=GOLD_MAIN, fill_color=DEEP_COSMIC, fill_opacity=0.95, stroke_width=2.5)
        d_center_ring = Circle(radius=0.06, color=SHIVA_CYAN, fill_opacity=1.0).move_to(UP * 1.15)
        
        # Damru Strings & Beads
        string_left = Line(UP * 1.15, UP * 1.0 + LEFT * 0.45, color=SACRED_WHITE, stroke_width=2)
        bead_left = Dot(point=UP * 1.0 + LEFT * 0.45, color=GOLD_MAIN, radius=0.06)
        string_right = Line(UP * 1.15, UP * 1.3 + RIGHT * 0.45, color=SACRED_WHITE, stroke_width=2)
        bead_right = Dot(point=UP * 1.3 + RIGHT * 0.45, color=GOLD_MAIN, radius=0.06)

        damru = VGroup(d_top, d_bot, d_center_ring, string_left, bead_left, string_right, bead_right)

        epic_trishul = VGroup(
            shaft, trishul_base_ring, center_blade, left_prong, left_tip, right_prong, right_tip,
            moon, damru, tripundra
        )

        # Rotating Sacred Om Aura Rays (पीछे की तरफ दिव्य ओरा)
        aura_circle = Circle(radius=1.3, color=SHIVA_CYAN, stroke_width=2).move_to(UP * 1.85).set_opacity(0.4)
        aura_spokes = VGroup()
        for i in range(12):
            ang = i * (2 * PI / 12)
            spoke = Line(UP * 1.85, UP * 1.85 + np.array([1.35 * np.cos(ang), 1.35 * np.sin(ang), 0]), color=GOLD_MAIN, stroke_width=1.5).set_opacity(0.35)
            aura_spokes.add(spoke)

        divine_mandala = VGroup(aura_circle, aura_spokes)

        # --- 4. SACRED GOLDEN SUBSCRIBER BUTTON CHASSIS ---
        btn_outer = RoundedRectangle(corner_radius=0.25, width=5.6, height=1.4, color=GOLD_MAIN, fill_color=DEEP_COSMIC, fill_opacity=0.92, stroke_width=4.5).move_to(DOWN * 0.75)
        btn_inner_glow = RoundedRectangle(corner_radius=0.2, width=5.35, height=1.18, color=SHIVA_CYAN, stroke_width=2).move_to(DOWN * 0.75).set_opacity(0.6)

        # Subscribed Texts
        text_sub = Text("SUBSCRIBE", font="Trebuchet MS", font_size=38, weight=BOLD, color=SACRED_WHITE).move_to(DOWN * 0.75 + LEFT * 0.4)
        trishul_emoji = Text("🔱", font_size=36, color=GOLD_MAIN).next_to(text_sub, RIGHT, buff=0.25)
        sub_group = VGroup(text_sub, trishul_emoji)

        # Blessed Subscribed State: "HAR HAR MAHADEV ॐ"
        text_blessed = Text("SUBSCRIBED", font="Trebuchet MS", font_size=32, weight=BOLD, color=GOLD_MAIN).move_to(DOWN * 0.75 + LEFT * 0.45)
        om_emoji = Text("ॐ", font_size=40, color=GOLD_MAIN).next_to(text_blessed, RIGHT, buff=0.3)
        blessed_group = VGroup(text_blessed, om_emoji)

        # Divine Lightning Strike Line from Trishul Tip to Button
        lightning_bolt = VMobject(color=SACRED_WHITE, stroke_width=7).set_points_as_corners([
            [0, 2.7, 0], [0.1, 1.8, 0], [-0.15, 0.9, 0], [0.05, 0.1, 0], [0, -0.75, 0]
        ])

        # Energy Shockwave Ring on Impact
        impact_ring = Circle(radius=0.2, color=GOLD_MAIN, stroke_width=8).move_to(DOWN * 0.75).set_opacity(0)

        # Divine Lotus Sparks / Particles
        sparks = VGroup()
        np.random.seed(777)
        for _ in range(60):
            a = np.random.uniform(0, 2 * PI)
            r = np.random.uniform(0.1, 0.3)
            pt = Dot(
                point=[r * np.cos(a), r * np.sin(a) - 0.75, 0],
                color=GOLD_MAIN if np.random.rand() > 0.4 else SHIVA_CYAN,
                radius=np.random.uniform(0.04, 0.1)
            )
            pt.target_pos = np.array([3.6 * np.cos(a), 3.6 * np.sin(a) - 0.75, 0])
            sparks.add(pt)

        # --- ANIMATION SEQUENCE ---

        # Phase 1: Divine Trishul & Sacred Mandala Reveal
        self.play(
            Create(divine_mandala, run_time=1.2),
            FadeIn(epic_trishul, shift=DOWN * 0.4, run_time=1.2),
            FadeIn(btn_outer, scale=0.85, run_time=0.9),
            FadeIn(btn_inner_glow, scale=0.85, run_time=0.9),
            Write(sub_group, run_time=0.9)
        )
        self.wait(0.3)

        # Phase 2: Damru Beats Vibration & Third Eye Activation
        self.play(
            Rotate(divine_mandala, angle=PI/2, run_time=0.8, rate_func=linear),
            bindi_glow.animate.scale(2.2).set_color(SACRED_RED),
            string_left.animate.rotate(PI/6),
            string_right.animate.rotate(-PI/6),
            btn_inner_glow.animate.set_color(GOLD_MAIN).set_opacity(0.9),
            run_time=0.8
        )

        # Phase 3: Trishul Lightning Blessing Strike & Explosion!
        self.play(
            Create(lightning_bolt, run_time=0.15),
            impact_ring.animate.set_opacity(1.0).set_stroke(width=12),
            run_time=0.15
        )

        particle_anims = [
            pt.animate.move_to(pt.target_pos).set_opacity(0)
            for pt in sparks
        ]

        self.play(
            *particle_anims,
            FadeOut(lightning_bolt, run_time=0.3),
            impact_ring.animate.scale(12).set_opacity(0),
            FadeOut(sub_group, scale=0.7),
            FadeIn(blessed_group, scale=1.15),
            btn_outer.animate.set_color(SHIVA_CYAN).set_fill(color=SHIVA_BLUE, opacity=0.45),
            btn_inner_glow.animate.scale(1.2).set_opacity(0),
            bindi_glow.animate.scale(0.5).set_color(GOLD_MAIN),
            run_time=1.0,
            rate_func=smooth
        )

        # Phase 4: Om Divine Mantra Pulse & Radiant Glow
        self.play(
            om_emoji.animate.scale(1.35).set_color(SACRED_WHITE),
            Rotate(divine_mandala, angle=PI/3, run_time=0.7),
            run_time=0.7
        )
        self.play(
            om_emoji.animate.scale(0.74).set_color(GOLD_MAIN),
            run_time=0.5
        )

        self.wait(1.2)

        # Phase 5: Divine Reverb Fade Out
        self.play(
            FadeOut(epic_trishul, shift=UP * 0.3),
            FadeOut(divine_mandala),
            FadeOut(btn_outer, scale=1.1),
            FadeOut(blessed_group, scale=1.1),
            run_time=1.0,
            rate_func=smooth
        )

        self.wait(0.3)
