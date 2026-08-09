from manim import *
import numpy as np

class ElectricLightningShockwaveVFX(Scene):
    def construct(self):
        # 1. Pure Pitch Black Background (100% Ready for Screen / Add Blend Modes)
        self.camera.background_color = "#000000"

        # High-Voltage Color Palette
        ELECTRIC_BLUE = "#00D2FF"
        ELECTRIC_GOLD = "#FFD700"
        ELECTRIC_WHITE = "#FFFFFF"
        CYAN_CORE = "#00FFFF"

        # 2. Outer & Inner Dashed Voltage Base Rings
        base_ring_1 = DashedVMobject(Circle(radius=2.8, color=ELECTRIC_BLUE, stroke_width=4), num_dashes=32)
        base_ring_2 = Circle(radius=2.2, color=ELECTRIC_GOLD, stroke_width=5).set_opacity(0.85)

        # 3. Procedural Jagged Lightning Bolt Generator
        def create_jagged_ring(radius, num_points=36, deviation=0.35, color=ELECTRIC_BLUE, stroke_width=4):
            angles = np.linspace(0, 2 * PI, num_points, endpoint=False)
            points = []
            for a in angles:
                r_dev = radius + np.random.uniform(-deviation, deviation)
                points.append([r_dev * np.cos(a), r_dev * np.sin(a), 0])
            points.append(points[0])
            return VMobject(color=color, stroke_width=stroke_width).set_points_as_corners(points)

        lightning_arc_1 = create_jagged_ring(radius=2.8, deviation=0.38, color=ELECTRIC_BLUE, stroke_width=6)
        lightning_arc_2 = create_jagged_ring(radius=2.2, deviation=0.28, color=ELECTRIC_GOLD, stroke_width=4)
        lightning_arc_3 = create_jagged_ring(radius=1.6, deviation=0.22, color=ELECTRIC_WHITE, stroke_width=2.5)

        vfx_group = VGroup(base_ring_1, base_ring_2, lightning_arc_1, lightning_arc_2, lightning_arc_3)

        # 4. Orbiting Electrical Spark Arcs
        sparks = VGroup()
        for a in np.linspace(0, 2 * PI, 16, endpoint=False):
            pt = [2.5 * np.cos(a), 2.5 * np.sin(a), 0]
            spk = Line(start=pt, end=[pt[0] + 0.35*np.cos(a+0.5), pt[1] + 0.35*np.sin(a+0.5), 0], color=ELECTRIC_GOLD, stroke_width=3)
            sparks.add(spk)

        # 5. 360-Degree Electric Shockwave Burst Sparks
        burst_sparks = VGroup()
        for a in np.linspace(0, 2 * PI, 24, endpoint=False):
            spk_line = Line(
                start=[0.5 * np.cos(a), 0.5 * np.sin(a), 0],
                end=[3.8 * np.cos(a), 3.8 * np.sin(a), 0],
                color=ELECTRIC_BLUE if a % 2 == 0 else ELECTRIC_GOLD,
                stroke_width=4
            )
            burst_sparks.add(spk_line)

        # --- ANIMATION TIMELINE (Clean VFX Overlay) ---

        # Phase 1: High-Voltage Lightning Arc Formation
        self.play(
            Create(base_ring_1, run_time=0.8),
            Create(base_ring_2, run_time=0.8),
            Create(lightning_arc_1, run_time=0.8),
            Create(lightning_arc_2, run_time=0.8),
            Create(lightning_arc_3, run_time=0.8),
            FadeIn(sparks, run_time=0.6)
        )

        # Phase 2: Electric Jitter Flickering & Rapid Orbiting Discharge
        self.play(
            Rotate(sparks, angle=2 * PI, run_time=1.8, rate_func=linear),
            Rotate(lightning_arc_1, angle=-PI, run_time=1.8, rate_func=linear),
            Rotate(lightning_arc_2, angle=PI, run_time=1.8, rate_func=linear),
            lightning_arc_1.animate.set_color(CYAN_CORE),
            lightning_arc_2.animate.set_color(ELECTRIC_WHITE),
            run_time=1.8
        )

        # Phase 3: 360-Degree Electric Blast Detonation
        self.play(
            Create(burst_sparks, run_time=0.6),
            vfx_group.animate.scale(1.45).set_opacity(0),
            FadeOut(sparks, run_time=0.4),
            run_time=0.9
        )

        self.play(
            burst_sparks.animate.scale(1.3).set_opacity(0),
            run_time=0.8,
            rate_func=rush_from
        )

        self.wait(0.3)
