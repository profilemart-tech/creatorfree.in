from manim import *
import numpy as np

class CloudLightningTextVFX(Scene):
    def construct(self):
        # 1. Pure Pitch Black Background (100% Ready for Screen / Add Blend Modes)
        self.camera.background_color = "#000000"

        # Colors
        ELECTRIC_BLUE = "#00D2FF"
        ELECTRIC_GOLD = "#FFD700"
        ELECTRIC_WHITE = "#FFFFFF"
        CLOUD_COLOR = "#1e293b"

        # 2. Build Top-Middle Storm Cloud Assembly
        cloud_p1 = Circle(radius=0.9, color=CLOUD_COLOR, fill_opacity=0.95, stroke_width=0).move_to(UP * 2.8 + LEFT * 0.9)
        cloud_p2 = Circle(radius=1.2, color=CLOUD_COLOR, fill_opacity=0.95, stroke_width=0).move_to(UP * 3.0 + UP * 0.1)
        cloud_p3 = Circle(radius=0.95, color=CLOUD_COLOR, fill_opacity=0.95, stroke_width=0).move_to(UP * 2.8 + RIGHT * 0.9)
        cloud_base = Rectangle(width=3.2, height=1.0, color=CLOUD_COLOR, fill_opacity=0.95, stroke_width=0).move_to(UP * 2.5)

        # Internal Cloud Energy Glow
        cloud_inner_glow = Circle(radius=1.3, color=ELECTRIC_BLUE, stroke_width=20).set_opacity(0.25).move_to(UP * 2.8)
        cloud_group = VGroup(cloud_inner_glow, cloud_p1, cloud_p2, cloud_p3, cloud_base)

        # 3. Procedural Jagged Lightning Bolt Generator (Pure Lightning Overlay)
        def build_lightning_bolt(start_pt, end_pt, num_segments=18, deviation=0.25, color=ELECTRIC_BLUE, stroke_width=5):
            start = np.array(start_pt)
            end = np.array(end_pt)
            vec = end - start
            length = np.linalg.norm(vec)
            unit_vec = vec / length
            perp_vec = np.array([-unit_vec[1], unit_vec[0], 0])

            points = [start]
            for i in range(1, num_segments):
                fraction = i / num_segments
                curr_base = start + fraction * vec
                offset = np.random.uniform(-deviation, deviation) * perp_vec
                points.append(curr_base + offset)
            points.append(end)

            return Line(points[0], points[1], color=color, stroke_width=stroke_width) if len(points) == 2 else \
                   VMobject(color=color, stroke_width=stroke_width).set_points_as_corners(points)

        start_point = [0, 2.3, 0]
        end_point = [0, -2.8, 0]

        # Multi-layer Lightning Bolts
        main_bolt_blue = build_lightning_bolt(start_point, end_point, num_segments=20, deviation=0.3, color=ELECTRIC_BLUE, stroke_width=9)
        main_bolt_gold = build_lightning_bolt(start_point, end_point, num_segments=18, deviation=0.2, color=ELECTRIC_GOLD, stroke_width=5)
        main_bolt_white = build_lightning_bolt(start_point, end_point, num_segments=16, deviation=0.1, color=ELECTRIC_WHITE, stroke_width=2.5)

        # 4. Bottom Ground Impact Spark Burst
        ground_glow = Ellipse(width=2.5, height=0.6, color=ELECTRIC_GOLD, stroke_width=12).set_opacity(0.8).move_to(DOWN * 2.8)
        
        ground_sparks = VGroup()
        for a in np.linspace(-PI/4, 5*PI/4, 14):
            spark = Line(
                start=[0, -2.8, 0],
                end=[1.5 * np.cos(a), -2.8 + 1.2 * np.sin(a), 0],
                color=ELECTRIC_GOLD if a % 2 == 0 else ELECTRIC_WHITE,
                stroke_width=3.5
            )
            ground_sparks.add(spark)

        # --- ANIMATION TIMELINE (Clean Storm Lightning Overlay) ---

        # Phase 1: Storm Cloud Gathers
        self.play(
            FadeIn(cloud_group, shift=DOWN * 0.3),
            cloud_inner_glow.animate.set_opacity(0.65),
            run_time=1.2,
            rate_func=smooth
        )

        # Phase 2: High Voltage Lightning Strike
        self.play(
            Create(main_bolt_blue, run_time=0.6, rate_func=smooth),
            Create(main_bolt_gold, run_time=0.6, rate_func=smooth),
            Create(main_bolt_white, run_time=0.6, rate_func=smooth),
            Create(ground_sparks, run_time=0.6),
            FadeIn(ground_glow, run_time=0.4)
        )

        self.wait(0.6)

        # Phase 3: Energy Discharge & Fade Out
        self.play(
            ground_glow.animate.scale(2.2).set_opacity(0),
            FadeOut(ground_sparks, run_time=0.8),
            Uncreate(main_bolt_blue),
            Uncreate(main_bolt_gold),
            Uncreate(main_bolt_white),
            FadeOut(cloud_group, shift=UP * 0.3),
            run_time=1.4,
            rate_func=smooth
        )

        self.wait(0.3)
