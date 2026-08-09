from manim import *
import numpy as np

class FuturisticSciFiEnergyRing(Scene):
    def construct(self):
        # 1. Pure Pitch Black Background (100% Ready for Screen / Add Blend Modes)
        self.camera.background_color = "#000000"

        # Colors
        CYAN_BLUE = "#00F0FF"
        DEEP_BLUE = "#0066FF"
        ELECTRIC_WHITE = "#FFFFFF"
        NEON_ORANGE = "#FF6600"

        # 2. Concentric Sci-Fi HUD Rings
        outer_dashed_ring = DashedVMobject(
            Circle(radius=3.1, color=DEEP_BLUE, stroke_width=3),
            num_dashes=36,
            dashed_ratio=0.6
        )

        mid_solid_ring = Circle(radius=2.6, color=CYAN_BLUE, stroke_width=6).set_opacity(0.85)

        inner_dashed_ring = DashedVMobject(
            Circle(radius=2.1, color=CYAN_BLUE, stroke_width=4),
            num_dashes=24,
            dashed_ratio=0.5
        )

        core_glow = Circle(radius=1.8, color=ELECTRIC_WHITE, stroke_width=8).set_opacity(0.9)

        # Crosshair Targeting Reticles
        cross_h = Line(LEFT * 3.4, RIGHT * 3.4, color=CYAN_BLUE, stroke_width=1.5).set_opacity(0.4)
        cross_v = Line(DOWN * 3.4, UP * 3.4, color=CYAN_BLUE, stroke_width=1.5).set_opacity(0.4)
        crosshairs = VGroup(cross_h, cross_v)

        ring_system = VGroup(
            crosshairs,
            outer_dashed_ring,
            mid_solid_ring,
            inner_dashed_ring,
            core_glow
        )

        # 3. Particle Explosive Blast Generator
        particles = VGroup()
        np.random.seed(42)
        for _ in range(60):
            angle = np.random.uniform(0, 2 * PI)
            radius = np.random.uniform(0.1, 0.4)
            p = Dot(
                point=[radius * np.cos(angle), radius * np.sin(angle), 0],
                color=CYAN_BLUE if np.random.rand() > 0.3 else ELECTRIC_WHITE,
                radius=np.random.uniform(0.04, 0.09)
            )
            p.target_pos = np.array([3.8 * np.cos(angle), 3.8 * np.sin(angle), 0])
            particles.add(p)

        # --- ANIMATION SEQUENCE (Clean VFX Overlay) ---

        # Phase 1: Ring System Expands & Counter-Rotates
        self.play(
            Create(outer_dashed_ring, run_time=1.2),
            Create(mid_solid_ring, run_time=1.2),
            Create(inner_dashed_ring, run_time=1.2),
            FadeIn(crosshairs, run_time=0.8),
            FadeIn(core_glow, scale=0.6, run_time=1.0)
        )

        # Phase 2: High-Energy Counter Rotation & Pulse
        self.play(
            Rotate(outer_dashed_ring, angle=2 * PI, run_time=2.5, rate_func=linear),
            Rotate(inner_dashed_ring, angle=-2 * PI, run_time=2.5, rate_func=linear),
            Rotate(mid_solid_ring, angle=PI, run_time=2.5, rate_func=linear),
            mid_solid_ring.animate.set_color(NEON_ORANGE),
            core_glow.animate.scale(1.25).set_color(CYAN_BLUE),
            run_time=2.5
        )

        # Phase 3: Energy Detonation Burst & Particle Shockwave
        particle_anims = [
            p.animate.move_to(p.target_pos).set_opacity(0)
            for p in particles
        ]

        self.play(
            *particle_anims,
            ring_system.animate.scale(1.4).set_opacity(0),
            run_time=1.2,
            rate_func=rush_from
        )

        self.wait(0.4)
