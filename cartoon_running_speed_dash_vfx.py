from manim import *
import numpy as np

class CartoonRunningSpeedDashVFX(Scene):
    def construct(self):
        # 1. Pure Pitch Black Background (100% Ready for Screen / Add Blend Modes)
        self.camera.background_color = "#000000"

        # Colors
        SPEED_WHITE = "#FFFFFF"
        SPEED_YELLOW = "#FFD700"
        SPEED_CYAN = "#00F0FF"
        DUST_GRAY = "#CBD5E1"

        # Feet Level Center Position (Where character's running legs/wheels sit)
        feet_pos = DOWN * 1.5

        # 2. Classic Cartoon Running Leg Wheel (Blur Swirl Circles)
        wheel_1 = DashedVMobject(Circle(radius=0.9, color=SPEED_WHITE, stroke_width=6), num_dashes=12).move_to(feet_pos)
        wheel_2 = DashedVMobject(Circle(radius=0.7, color=SPEED_YELLOW, stroke_width=5), num_dashes=10).move_to(feet_pos)
        wheel_3 = DashedVMobject(Circle(radius=0.5, color=SPEED_CYAN, stroke_width=4), num_dashes=8).move_to(feet_pos)
        wheel_core = Circle(radius=0.25, color=SPEED_WHITE, fill_opacity=0.9, stroke_width=0).move_to(feet_pos)

        running_wheel = VGroup(wheel_1, wheel_2, wheel_3, wheel_core)

        # 3. Continuous Cartoon Puffy Dust Clouds (Blowing Backward from Feet)
        def make_dust_puff(start_point):
            puff = VGroup()
            for _ in range(6):
                r = np.random.uniform(0.2, 0.45)
                dx = np.random.uniform(-0.35, 0.35)
                dy = np.random.uniform(-0.25, 0.25)
                c = Circle(radius=r, color=DUST_GRAY, fill_opacity=0.85, stroke_width=2, stroke_color=SPEED_WHITE)
                c.move_to(start_point + np.array([dx, dy, 0]))
                puff.add(c)
            return puff

        dust_cloud_1 = make_dust_puff(feet_pos + LEFT * 1.2)
        dust_cloud_2 = make_dust_puff(feet_pos + LEFT * 2.4)
        dust_cloud_3 = make_dust_puff(feet_pos + LEFT * 3.6)

        # 4. Super High-Speed Horizontal Motion Lines Across Feet & Body
        speed_streaks = VGroup()
        np.random.seed(42)
        for _ in range(30):
            y = np.random.uniform(-2.2, 1.2)
            x_start = np.random.uniform(-3.8, 1.5)
            len_val = np.random.uniform(1.8, 4.0)
            
            line = Line(
                start=[x_start, y, 0],
                end=[x_start + len_val, y, 0],
                color=SPEED_CYAN if np.random.rand() > 0.4 else SPEED_WHITE,
                stroke_width=np.random.uniform(3.0, 7.0)
            ).set_opacity(np.random.uniform(0.7, 1.0))
            speed_streaks.add(line)

        # --- ANIMATION TIMELINE (Authentic Cartoon Running Feet Wheel & Dash Trail) ---

        # Phase 1: Running Leg Wheel Pops & Starts Spinning Fast
        self.play(
            FadeIn(running_wheel, scale=0.3, run_time=0.4),
            FadeIn(dust_cloud_1, scale=0.5, run_time=0.4),
            ShowPassingFlash(speed_streaks, run_time=1.0, time_width=0.4),
            rate_func=rush_into
        )

        # Phase 2: Ultra Fast Wheel Rotation & Continuous Dust Trail (3.5 Seconds of Running)
        self.play(
            Rotate(running_wheel, angle=8 * PI, run_time=3.5, rate_func=linear),
            FadeIn(dust_cloud_2, scale=0.6, run_time=0.8),
            dust_cloud_1.animate.scale(1.4).shift(LEFT * 1.2).set_opacity(0.4),
            run_time=3.5
        )

        # Phase 3: Dust Cloud Blast Expands & Disperses
        self.play(
            FadeIn(dust_cloud_3, scale=0.7, run_time=0.6),
            dust_cloud_2.animate.scale(1.5).shift(LEFT * 1.2).set_opacity(0.3),
            FadeOut(dust_cloud_1, run_time=0.6),
            running_wheel.animate.scale(1.2).set_opacity(0),
            run_time=0.8
        )

        # Phase 4: Final Dissolve
        self.play(
            dust_cloud_3.animate.scale(1.6).shift(LEFT * 1.2).set_opacity(0),
            FadeOut(dust_cloud_2),
            run_time=0.8,
            rate_func=smooth
        )

        self.wait(0.3)
