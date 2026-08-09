from manim import *
import numpy as np

class RedHinduFlagSubscribeVFX(Scene):
    def construct(self):
        # 1. Pure Pitch Black Background (Overlay / Screen / Add Ready)
        self.camera.background_color = "#000000"

        # Sacred Palette
        SAFFRON_RED = "#FF3300"
        FLAG_SAFFRON = "#FF5500"
        GOLD_MAIN = "#FFD700"
        GOLD_LIGHT = "#FFF080"
        SACRED_WHITE = "#FFFFFF"
        DEEP_DARK = "#0a0505"
        SHIVA_CYAN = "#00F0FF"

        # --- 2. SACRED GOLDEN FLAGPOLE (ध्वजदंड) & SUN FINIAL ---
        pole_line = Line(UP * 2.8 + LEFT * 2.6, DOWN * 1.8 + LEFT * 2.6, color=GOLD_MAIN, stroke_width=7)
        pole_base = Dot(point=DOWN * 1.8 + LEFT * 2.6, color=GOLD_MAIN, radius=0.14)
        
        # Sun Spear Finial (ध्वज कलश नोक)
        finial_tip = Polygon(
            [-2.6, 3.15, 0], [-2.72, 2.8, 0], [-2.48, 2.8, 0],
            color=GOLD_MAIN, fill_color=GOLD_LIGHT, fill_opacity=1.0, stroke_width=2
        )
        finial_orb = Dot(point=[-2.6, 2.8, 0], color=GOLD_MAIN, radius=0.12)
        flagpole_group = VGroup(pole_line, pole_base, finial_tip, finial_orb)

        # --- 3. SACRED RED/SAFFRON TRIANGULAR HINDU FLAG (भगवा / लाल त्रिकोण धर्मध्वज) ---
        # Main Triangular Flag Shape
        flag_polygon = Polygon(
            [-2.58, 2.75, 0], [0.8, 1.95, 0], [-2.58, 1.15, 0],
            color=SAFFRON_RED, fill_color=FLAG_SAFFRON, fill_opacity=0.92, stroke_width=3.5
        )

        # Golden Fringe & Border on Flag Edges
        flag_top_edge = Line([-2.58, 2.75, 0], [0.8, 1.95, 0], color=GOLD_MAIN, stroke_width=3)
        flag_bot_edge = Line([-2.58, 1.15, 0], [0.8, 1.95, 0], color=GOLD_MAIN, stroke_width=3)

        # Sacred Om (ॐ) Emblem on Flag
        om_flag = Text("ॐ", font_size=42, color=GOLD_MAIN).move_to(LEFT * 1.4 + UP * 1.95)
        
        # Sun Rays Aura around Om
        sun_aura = Circle(radius=0.45, color=GOLD_MAIN, stroke_width=2).move_to(LEFT * 1.4 + UP * 1.95).set_opacity(0.6)

        flag_assembly = VGroup(flag_polygon, flag_top_edge, flag_bot_edge, om_flag, sun_aura)

        # --- 4. SACRED RED & GOLD SUBSCRIBER BUTTON CHASSIS ---
        btn_outer = RoundedRectangle(corner_radius=0.25, width=5.6, height=1.4, color=GOLD_MAIN, fill_color=DEEP_DARK, fill_opacity=0.92, stroke_width=4.5).move_to(DOWN * 0.75)
        btn_inner_glow = RoundedRectangle(corner_radius=0.2, width=5.35, height=1.18, color=SAFFRON_RED, stroke_width=2.5).move_to(DOWN * 0.75).set_opacity(0.7)

        # Initial Button Text: "SUBSCRIBE 🚩"
        text_sub = Text("SUBSCRIBE", font="Trebuchet MS", font_size=38, weight=BOLD, color=SACRED_WHITE).move_to(DOWN * 0.75 + LEFT * 0.4)
        flag_emoji = Text("🚩", font_size=36, color=GOLD_MAIN).next_to(text_sub, RIGHT, buff=0.25)
        sub_group = VGroup(text_sub, flag_emoji)

        # Subscribed State Text: "SUBSCRIBED 🕉️"
        text_blessed = Text("SUBSCRIBED", font="Trebuchet MS", font_size=32, weight=BOLD, color=GOLD_MAIN).move_to(DOWN * 0.75 + LEFT * 0.45)
        om_bless_emoji = Text("🕉️", font_size=38, color=GOLD_MAIN).next_to(text_blessed, RIGHT, buff=0.3)
        blessed_group = VGroup(text_blessed, om_bless_emoji)

        # Divine Sun blessing light beam from Flag to Button
        blessing_beam = Line(LEFT * 1.4 + UP * 1.95, DOWN * 0.75, color=GOLD_MAIN, stroke_width=8).set_opacity(0)

        # Energy Shockwave Ring on Click Impact
        impact_ring = Circle(radius=0.2, color=GOLD_MAIN, stroke_width=8).move_to(DOWN * 0.75).set_opacity(0)

        # Divine Saffron/Gold Sparks & Petals
        sparks = VGroup()
        np.random.seed(888)
        for _ in range(54):
            a = np.random.uniform(0, 2 * PI)
            r = np.random.uniform(0.1, 0.3)
            pt = Dot(
                point=[r * np.cos(a), r * np.sin(a) - 0.75, 0],
                color=GOLD_MAIN if np.random.rand() > 0.35 else SAFFRON_RED,
                radius=np.random.uniform(0.04, 0.1)
            )
            pt.target_pos = np.array([3.5 * np.cos(a), 3.5 * np.sin(a) - 0.75, 0])
            sparks.add(pt)

        # --- ANIMATION SEQUENCE ---

        # Phase 1: Reveal Flagpole, Waving Red Flag & Subscribe Button
        self.play(
            FadeIn(flagpole_group, shift=RIGHT * 0.3, run_time=1.0),
            FadeIn(flag_assembly, scale=0.85, run_time=1.1),
            FadeIn(btn_outer, scale=0.85, run_time=0.9),
            FadeIn(btn_inner_glow, scale=0.85, run_time=0.9),
            Write(sub_group, run_time=0.9)
        )
        self.wait(0.3)

        # Phase 2: Gentle Flag Wave Pulse & Sun Om Glow
        self.play(
            sun_aura.animate.scale(1.4).set_opacity(0.9),
            om_flag.animate.set_color(SACRED_WHITE),
            btn_inner_glow.animate.set_color(GOLD_MAIN).set_opacity(0.95),
            run_time=0.8
        )

        # Phase 3: Divine Blessing Laser Beam Strike & Explosion!
        self.play(
            blessing_beam.animate.set_opacity(1.0).set_stroke(width=14, color=SACRED_WHITE),
            impact_ring.animate.set_opacity(1.0).set_stroke(width=12),
            run_time=0.18
        )

        particle_anims = [
            pt.animate.move_to(pt.target_pos).set_opacity(0)
            for pt in sparks
        ]

        self.play(
            *particle_anims,
            FadeOut(blessing_beam, run_time=0.3),
            impact_ring.animate.scale(12).set_opacity(0),
            FadeOut(sub_group, scale=0.7),
            FadeIn(blessed_group, scale=1.15),
            btn_outer.animate.set_color(SAFFRON_RED).set_fill(color=SAFFRON_RED, opacity=0.38),
            btn_inner_glow.animate.scale(1.2).set_opacity(0),
            sun_aura.animate.scale(0.7).set_color(GOLD_MAIN),
            om_flag.animate.set_color(GOLD_MAIN),
            run_time=1.0,
            rate_func=smooth
        )

        # Phase 4: Sacred Om Pulse & Golden Radiant Ring
        self.play(
            om_bless_emoji.animate.scale(1.35).set_color(SACRED_WHITE),
            sun_aura.animate.scale(1.6).set_opacity(0),
            run_time=0.7
        )
        self.play(
            om_bless_emoji.animate.scale(0.74).set_color(GOLD_MAIN),
            run_time=0.5
        )

        self.wait(1.2)

        # Phase 5: Divine Reverb Fade Out
        self.play(
            FadeOut(flag_assembly, shift=UP * 0.3),
            FadeOut(flagpole_group),
            FadeOut(btn_outer, scale=1.1),
            FadeOut(blessed_group, scale=1.1),
            run_time=1.0,
            rate_func=smooth
        )

        self.wait(0.3)
