from manim import *
import numpy as np

class CartoonDizzyStarsComedyVFX(Scene):
    def construct(self):
        # 1. Pure Pitch Black Background (Ideal for Screen / Add / Color Dodge Blend Modes)
        self.camera.background_color = "#000000"

        # Colors
        STAR_YELLOW = "#FFD700"
        STAR_ORANGE = "#FFA500"
        WHITE_CORE = "#FFFFFF"
        SPARK_GOLD = "#FFDF00"

        # 2. Wide Empty Center Orbit Parameters (Positioned for Head Placement)
        # Orbit center is slightly elevated (UP * 0.8) so it crowns a head in video editing
        center_pos = UP * 0.8
        a_semi = 2.8 # Horizontal radius (wide enough for head)
        b_semi = 0.95 # Vertical perspective depth
        tilt = PI / 16

        # 3. Create 6 Bright 5-Point Cartoon Stars
        stars_group = VGroup()
        num_stars = 6
        star_radii = [0.35, 0.42, 0.36, 0.45, 0.38, 0.40]

        for i in range(num_stars):
            s_outer = Star(n=5, outer_radius=star_radii[i], inner_radius=star_radii[i]*0.46, color=STAR_YELLOW, fill_opacity=1.0, stroke_width=2.5, stroke_color=STAR_ORANGE)
            s_inner = Star(n=5, outer_radius=star_radii[i]*0.52, inner_radius=star_radii[i]*0.22, color=WHITE_CORE, fill_opacity=1.0, stroke_width=0)
            star = VGroup(s_outer, s_inner)
            stars_group.add(star)

        angles = np.linspace(0, 2 * PI, num_stars, endpoint=False)

        def update_star_positions(mobj, dt):
            mobj.time_elapsed = getattr(mobj, 'time_elapsed', 0) + dt
            t = mobj.time_elapsed * 3.6 # Smooth dizzy spin speed
            
            for idx, star in enumerate(stars_group):
                ang = t + angles[idx]
                x_raw = a_semi * np.cos(ang)
                y_raw = b_semi * np.sin(ang)
                
                # Apply perspective tilt
                x = x_raw * np.cos(tilt) - y_raw * np.sin(tilt) + center_pos[0]
                y = x_raw * np.sin(tilt) + y_raw * np.cos(tilt) + center_pos[1]
                
                star.move_to([x, y, 0])
                # Spin star on its own center axis for comedy wobble
                star.rotate(dt * 7.5)

        stars_group.time_elapsed = 0
        stars_group.add_updater(update_star_positions)

        # 4. Twinkling Orbit Sparkles (No text, no center clutter)
        dizzy_sparks = VGroup()
        for _ in range(16):
            ang = np.random.uniform(0, 2 * PI)
            x_raw = (a_semi + np.random.uniform(-0.3, 0.3)) * np.cos(ang)
            y_raw = (b_semi + np.random.uniform(-0.2, 0.2)) * np.sin(ang)
            x = x_raw * np.cos(tilt) - y_raw * np.sin(tilt) + center_pos[0]
            y = x_raw * np.sin(tilt) + y_raw * np.cos(tilt) + center_pos[1]
            
            spark = Dot(point=[x, y, 0], color=SPARK_GOLD if np.random.rand() > 0.5 else WHITE_CORE, radius=np.random.uniform(0.04, 0.09))
            dizzy_sparks.add(spark)

        # --- ANIMATION TIMELINE (Seamless Clean Overlay) ---

        # Phase 1: Stars Pop In & Start Orbiting Around Head Area
        self.play(
            FadeIn(stars_group, scale=0.5, run_time=0.6),
            FadeIn(dizzy_sparks, run_time=0.6)
        )

        # Phase 2: Full Dizzy Spin Loop (4.5 Seconds of Pure Clean Head Orbit)
        self.play(
            dizzy_sparks.animate.set_opacity(0.4),
            run_time=4.5
        )

        # Phase 3: Funny Pop Burst Fade Out
        stars_group.clear_updaters()
        pop_rings = VGroup()
        for s in stars_group:
            pr = Circle(radius=0.4, color=STAR_YELLOW, stroke_width=5).move_to(s.get_center())
            pop_rings.add(pr)

        self.play(
            pop_rings.animate.scale(2.2).set_opacity(0),
            FadeOut(stars_group, scale=1.3),
            FadeOut(dizzy_sparks),
            run_time=0.8,
            rate_func=smooth
        )

        self.wait(0.3)
