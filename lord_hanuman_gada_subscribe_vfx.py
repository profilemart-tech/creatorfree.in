from manim import *
import numpy as np

class LordHanumanGadaSubscribeVFX(Scene):
    def construct(self):
        # 1. Pure Pitch Black Background (Overlay / Screen / Add Ready)
        self.camera.background_color = "#000000"

        # Ultra Divine Bajrangbali Palette
        GOLD_MAIN = "#FFD700"
        GOLD_LIGHT = "#FFF2A3"
        HANUMAN_ORANGE = "#FF4500"
        SAFFRON_RED = "#FF1A00"
        SACRED_WHITE = "#FFFFFF"
        DARK_COSMIC = "#0c0505"

        # --- 2. SACRED GOLDEN GADA (श्री हनुमान जी की दिव्य गदा) ---
        # Gada Handle (दण्ड)
        handle = Line(UP * 2.8, UP * 0.9, color=GOLD_MAIN, stroke_width=7)
        handle_ring_top = Annulus(inner_radius=0.08, outer_radius=0.14, color=HANUMAN_ORANGE, fill_opacity=0.9).move_to(UP * 2.7)
        handle_ring_bot = Annulus(inner_radius=0.08, outer_radius=0.14, color=HANUMAN_ORANGE, fill_opacity=0.9).move_to(UP * 1.0)
        handle_knob = Dot(point=UP * 2.85, color=GOLD_MAIN, radius=0.12)

        # Gada Head (गदा सिर - Ridged Spherical Mace)
        gada_head_outer = Circle(radius=0.55, color=GOLD_MAIN, fill_color=GOLD_MAIN, fill_opacity=0.95, stroke_width=3).move_to(UP * 1.45)
        gada_head_inner = Circle(radius=0.38, color=HANUMAN_ORANGE, fill_color=HANUMAN_ORANGE, fill_opacity=0.9, stroke_width=2).move_to(UP * 1.45)
        gada_spike = Polygon(
            [-0.15, 0.9, 0], [0.15, 0.9, 0], [0, 0.7, 0],
            color=GOLD_MAIN, fill_color=GOLD_LIGHT, fill_opacity=1.0, stroke_width=2
        )
        
        # Gada Ribs / Grooves
        rib1 = Line(UP * 1.9, UP * 1.0, color=GOLD_LIGHT, stroke_width=3)
        rib2 = Line(UP * 1.45 + LEFT * 0.45, UP * 1.45 + RIGHT * 0.45, color=GOLD_LIGHT, stroke_width=3)

        gada_assembly = VGroup(
            handle, handle_ring_top, handle_ring_bot, handle_knob,
            gada_head_outer, gada_head_inner, gada_spike, rib1, rib2
        )

        # --- 3. SACRED SOLAR DISC & TILAK AURA (सूर्य देव मण्डल) ---
        sun_disc = Circle(radius=1.3, color=HANUMAN_ORANGE, stroke_width=2.5).move_to(UP * 1.75).set_opacity(0.4)
        sun_spokes = VGroup()
        for i in range(12):
            ang = i * (2 * PI / 12)
            spoke = Line(UP * 1.75, UP * 1.75 + np.array([1.4 * np.cos(ang), 1.4 * np.sin(ang), 0]), color=GOLD_MAIN, stroke_width=1.5).set_opacity(0.35)
            sun_spokes.add(spoke)

        # Sacred Bajrangbali Tilak Symbol on Sun
        tilak_v = Polygon([-0.18, 2.05, 0], [0.18, 2.05, 0], [0, 1.7, 0], color=SACRED_WHITE, fill_color=SACRED_WHITE, fill_opacity=0.9)
        tilak_dot = Dot(point=[0, 1.88, 0], color=SAFFRON_RED, radius=0.07)
        tilak = VGroup(tilak_v, tilak_dot)

        divine_solar_aura = VGroup(sun_disc, sun_spokes, tilak)

        # --- 4. SACRED SAFFRON & GOLD SUBSCRIBER BUTTON CHASSIS ---
        btn_outer = RoundedRectangle(corner_radius=0.25, width=5.6, height=1.4, color=GOLD_MAIN, fill_color=DARK_COSMIC, fill_opacity=0.92, stroke_width=4.5).move_to(DOWN * 0.75)
        btn_inner_glow = RoundedRectangle(corner_radius=0.2, width=5.35, height=1.18, color=HANUMAN_ORANGE, stroke_width=2.5).move_to(DOWN * 0.75).set_opacity(0.7)

        # Initial Button Text: "SUBSCRIBE 🚩"
        text_sub = Text("SUBSCRIBE", font="Trebuchet MS", font_size=38, weight=BOLD, color=SACRED_WHITE).move_to(DOWN * 0.75 + LEFT * 0.4)
        flag_emoji = Text("🚩", font_size=36, color=GOLD_MAIN).next_to(text_sub, RIGHT, buff=0.25)
        sub_group = VGroup(text_sub, flag_emoji)

        # Subscribed State Text: "JAI SHREE RAM 🚩"
        text_blessed = Text("SUBSCRIBED", font="Trebuchet MS", font_size=32, weight=BOLD, color=GOLD_MAIN).move_to(DOWN * 0.75 + LEFT * 0.45)
        ram_bless_emoji = Text("🕉️", font_size=38, color=GOLD_MAIN).next_to(text_blessed, RIGHT, buff=0.3)
        blessed_group = VGroup(text_blessed, ram_bless_emoji)

        # Divine Gada Blessing Laser Beam
        blessing_beam = Line(UP * 0.7, DOWN * 0.75, color=GOLD_MAIN, stroke_width=10).set_opacity(0)

        # Energy Shockwave Ring on Click Impact
        impact_ring = Circle(radius=0.2, color=GOLD_MAIN, stroke_width=8).move_to(DOWN * 0.75).set_opacity(0)

        # Divine Solar Flame Sparks
        sparks = VGroup()
        np.random.seed(999)
        for _ in range(60):
            a = np.random.uniform(0, 2 * PI)
            r = np.random.uniform(0.1, 0.3)
            pt = Dot(
                point=[r * np.cos(a), r * np.sin(a) - 0.75, 0],
                color=GOLD_MAIN if np.random.rand() > 0.35 else HANUMAN_ORANGE,
                radius=np.random.uniform(0.04, 0.1)
            )
            pt.target_pos = np.array([3.6 * np.cos(a), 3.6 * np.sin(a) - 0.75, 0])
            sparks.add(pt)

        # --- ANIMATION SEQUENCE ---

        # Phase 1: Reveal Golden Gada, Solar Aura & Subscribe Button
        self.play(
            Create(divine_solar_aura, run_time=1.1),
            FadeIn(gada_assembly, shift=DOWN * 0.4, run_time=1.1),
            FadeIn(btn_outer, scale=0.85, run_time=0.9),
            FadeIn(btn_inner_glow, scale=0.85, run_time=0.9),
            Write(sub_group, run_time=0.9)
        )
        self.wait(0.3)

        # Phase 2: Gada Energy Charge & Solar Rays Rotation
        self.play(
            Rotate(sun_spokes, angle=PI/2, run_time=0.8, rate_func=linear),
            sun_disc.animate.scale(1.35).set_opacity(0.85),
            btn_inner_glow.animate.set_color(GOLD_MAIN).set_opacity(0.95),
            run_time=0.8
        )

        # Phase 3: Divine Gada Blessing Laser Beam Strike & Explosion!
        self.play(
            blessing_beam.animate.set_opacity(1.0).set_stroke(width=16, color=SACRED_WHITE),
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
            btn_outer.animate.set_color(HANUMAN_ORANGE).set_fill(color=SAFFRON_RED, opacity=0.42),
            btn_inner_glow.animate.scale(1.2).set_opacity(0),
            sun_disc.animate.scale(0.7).set_color(GOLD_MAIN),
            run_time=1.0,
            rate_func=smooth
        )

        # Phase 4: Om Divine Mantra Pulse & Golden Radiant Aura
        self.play(
            ram_bless_emoji.animate.scale(1.35).set_color(SACRED_WHITE),
            Rotate(sun_spokes, angle=PI/3, run_time=0.7),
            run_time=0.7
        )
        self.play(
            ram_bless_emoji.animate.scale(0.74).set_color(GOLD_MAIN),
            run_time=0.5
        )

        self.wait(1.2)

        # Phase 5: Divine Reverb Fade Out
        self.play(
            FadeOut(gada_assembly, shift=UP * 0.3),
            FadeOut(divine_solar_aura),
            FadeOut(btn_outer, scale=1.1),
            FadeOut(blessed_group, scale=1.1),
            run_time=1.0,
            rate_func=smooth
        )

        self.wait(0.3)
