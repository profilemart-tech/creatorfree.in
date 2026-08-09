from manim import *
import numpy as np

class CyberSubscribeButton22ndCenturyVFX(Scene):
    def construct(self):
        # 1. Pure Pitch Black Background (100% Ready for Screen / Add / Color Dodge Blend Modes)
        self.camera.background_color = "#000000"

        # 22nd Century Cyberpunk Palette
        CYAN_NEON = "#00F0FF"
        MAGENTA_NEON = "#FF0055"
        GOLD_NEON = "#FFD700"
        WHITE_CORE = "#FFFFFF"
        DARK_HUD = "#090d16"

        # 2. Holographic Button Chassis Framework
        button_bg = RoundedRectangle(corner_radius=0.2, width=4.8, height=1.3, color=CYAN_NEON, fill_color=DARK_HUD, fill_opacity=0.85, stroke_width=3.5)
        
        # Cyber Corner Tech Accents
        corner_tl = VMobject(color=MAGENTA_NEON, stroke_width=4).set_points_as_corners([
            button_bg.get_corner(UL) + RIGHT * 0.4 + DOWN * 0.05,
            button_bg.get_corner(UL) + DOWN * 0.05,
            button_bg.get_corner(UL) + DOWN * 0.4
        ])
        corner_br = VMobject(color=MAGENTA_NEON, stroke_width=4).set_points_as_corners([
            button_bg.get_corner(DR) + LEFT * 0.4 + UP * 0.05,
            button_bg.get_corner(DR) + UP * 0.05,
            button_bg.get_corner(DR) + UP * 0.4
        ])
        
        outer_dashed_pulse = DashedVMobject(
            RoundedRectangle(corner_radius=0.25, width=5.1, height=1.6, color=CYAN_NEON, stroke_width=2),
            num_dashes=28
        ).set_opacity(0.6)

        button_chassis = VGroup(button_bg, corner_tl, corner_br, outer_dashed_pulse)

        # 3. Holographic Typography & Bell Icon
        sub_text = Text("SUBSCRIBE", font="Consolas", font_size=38, weight=BOLD, color=WHITE_CORE).move_to(button_bg.get_center())
        sub_glow = Text("SUBSCRIBE", font="Consolas", font_size=38, weight=BOLD, color=CYAN_NEON).move_to(button_bg.get_center()).set_opacity(0.7)

        initial_group = VGroup(button_chassis, sub_glow, sub_text)

        # Subscribed State Assets
        subscribed_text = Text("SUBSCRIBED", font="Consolas", font_size=32, weight=BOLD, color=GOLD_NEON).move_to(button_bg.get_center() + LEFT * 0.4)
        
        # Holographic Notification Bell Icon
        bell_body = Arc(radius=0.22, start_angle=0, angle=PI, color=GOLD_NEON, stroke_width=3).move_to(button_bg.get_center() + RIGHT * 1.5 + UP * 0.05)
        bell_base = Line(LEFT * 0.3, RIGHT * 0.3, color=GOLD_NEON, stroke_width=3).next_to(bell_body, DOWN, buff=0.02)
        bell_clapper = Dot(radius=0.06, color=WHITE_CORE).next_to(bell_base, DOWN, buff=0.04)
        bell_icon = VGroup(bell_body, bell_base, bell_clapper)

        bell_ring_1 = Arc(radius=0.35, start_angle=-PI/3, angle=2*PI/3, color=CYAN_NEON, stroke_width=2).next_to(bell_icon, RIGHT, buff=0.05)
        bell_ring_2 = Arc(radius=0.45, start_angle=-PI/3, angle=2*PI/3, color=MAGENTA_NEON, stroke_width=2).next_to(bell_icon, RIGHT, buff=0.08)
        bell_rings = VGroup(bell_ring_1, bell_ring_2)

        subscribed_group = VGroup(subscribed_text, bell_icon, bell_rings)

        # 4. Quantum Laser Pointer / Cursor Ray
        cursor_pointer = Polygon(
            [0, 0, 0], [-0.25, -0.65, 0], [-0.05, -0.55, 0], [0.15, -0.9, 0], [0.35, -0.8, 0], [0.15, -0.45, 0], [0.45, -0.45, 0],
            color=MAGENTA_NEON, fill_color=CYAN_NEON, fill_opacity=0.95, stroke_width=2
        ).scale(0.45).move_to(DOWN * 2.8 + RIGHT * 2.2)

        # Quantum Particle Burst on Click
        particles = VGroup()
        np.random.seed(88)
        for _ in range(40):
            a = np.random.uniform(0, 2 * PI)
            r = np.random.uniform(0.2, 0.4)
            p = Dot(
                point=[r * np.cos(a), r * np.sin(a), 0],
                color=GOLD_NEON if np.random.rand() > 0.4 else CYAN_NEON,
                radius=np.random.uniform(0.04, 0.08)
            )
            p.target_pos = np.array([2.8 * np.cos(a), 2.8 * np.sin(a), 0])
            particles.add(p)

        # --- ANIMATION TIMELINE (22nd Century Cyber Motion) ---

        # Phase 1: Holographic Assembly Boots Up
        self.play(
            FadeIn(button_chassis, scale=0.7, run_time=0.8),
            Write(sub_text, run_time=0.8),
            FadeIn(sub_glow, run_time=0.8)
        )
        self.wait(0.3)

        # Phase 2: Quantum Cursor Flies In & Clicks
        self.play(
            cursor_pointer.animate.move_to(button_bg.get_center() + DOWN * 0.15 + RIGHT * 0.2),
            Rotate(outer_dashed_pulse, angle=PI, run_time=0.8),
            run_time=0.8,
            rate_func=smooth
        )

        # Phase 3: Click Trigger & Overdrive Explosion
        particle_anims = [
            p.animate.move_to(p.target_pos).set_opacity(0)
            for p in particles
        ]

        self.play(
            cursor_pointer.animate.scale(0.8).set_color(WHITE_CORE),
            button_bg.animate.set_color(MAGENTA_NEON).set_fill(color=MAGENTA_NEON, opacity=0.3),
            run_time=0.15
        )

        self.play(
            *particle_anims,
            FadeOut(sub_text, scale=0.8),
            FadeOut(sub_glow, scale=0.8),
            FadeOut(cursor_pointer, shift=DOWN * 0.4),
            FadeIn(subscribed_group, scale=1.1),
            button_bg.animate.set_color(GOLD_NEON).set_fill(color=DARK_HUD, opacity=0.9),
            outer_dashed_pulse.animate.set_color(GOLD_NEON).scale(1.15).set_opacity(0),
            run_time=0.8,
            rate_func=smooth
        )

        # Phase 4: Bell Ring Wave Animation & Steady State
        self.play(
            bell_icon.animate.rotate(0.2).set_color(WHITE_CORE),
            Create(bell_rings, run_time=0.6),
            run_time=0.6
        )
        self.play(
            bell_icon.animate.rotate(-0.2).set_color(GOLD_NEON),
            bell_rings.animate.scale(1.3).set_opacity(0),
            run_time=0.6
        )

        self.wait(0.8)

        # Phase 5: Smooth Dissolve Out
        self.play(
            FadeOut(button_chassis, scale=1.1),
            FadeOut(subscribed_group, scale=1.1),
            run_time=0.8,
            rate_func=smooth
        )

        self.wait(0.3)
