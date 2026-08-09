import numpy as np
from scipy.io import wavfile

sample_rate = 44100
duration = 7.5
num_samples = int(sample_rate * duration)

t = np.linspace(0, duration, num_samples, endpoint=False)
audio = np.zeros(num_samples)

# --- 1. DEEP ORGANIC SHANKH NAAD & SACRED OM DRONE (0.0s - 1.6s) ---
t1 = t[(t >= 0.05) & (t < 1.6)] - 0.05
# Fundamental 110Hz (A2) with rich natural harmonics (220, 330, 440, 550, 660, 880 Hz)
fund = 110.0
# Natural Shankh breath vibrato (4.5 Hz modulation)
vibrato = 1.0 + 0.02 * np.sin(2 * np.pi * 4.5 * t1)
f_mod = fund * vibrato

# Harmonics mixing ratio
h1 = 0.40 * np.sin(2 * np.pi * f_mod * 1 * t1)
h2 = 0.35 * np.sin(2 * np.pi * f_mod * 2 * t1)
h3 = 0.25 * np.sin(2 * np.pi * f_mod * 3 * t1)
h4 = 0.18 * np.sin(2 * np.pi * f_mod * 4 * t1)
h5 = 0.12 * np.sin(2 * np.pi * f_mod * 5 * t1)
h6 = 0.08 * np.sin(2 * np.pi * f_mod * 6 * t1)
h8 = 0.05 * np.sin(2 * np.pi * f_mod * 8 * t1)

shankh_raw = h1 + h2 + h3 + h4 + h5 + h6 + h8
# Slow crescendo swell and gentle fade out envelope
env1 = (np.sin(np.pi * (t1 / 1.55)**0.8))**1.5
audio[(t >= 0.05) & (t < 1.6)] += shankh_raw * env1 * 0.70


# --- 2. ORGANIC DAMRU DOUBLE-TAP DRUM BEATS (1.5s - 2.2s) ---
damru_hit_times = [1.50, 1.65, 1.85, 2.00]
for hit_t in damru_hit_times:
    idx = (t >= hit_t) & (t < hit_t + 0.18)
    td = t[idx] - hit_t
    # Pitch drop from 340Hz down to 85Hz in 50ms for authentic skin drum feel
    pitch_env = 85.0 + (340.0 - 85.0) * np.exp(-35 * td)
    phase = 2 * np.pi * np.cumsum(pitch_env) / sample_rate
    
    # Transient click at start
    click = 0.3 * (np.random.uniform(-1, 1, len(td))) * np.exp(-120 * td)
    # Tonal drum body
    drum_body = 0.75 * np.sin(phase) * np.exp(-22 * td)
    
    audio[idx] += (drum_body + click) * 0.65


# --- 3. EPIC CINEMATIC THUNDER IMPACT & LIGHTNING BLASTER (2.2s - 3.4s) ---
t3 = t[(t >= 2.2) & (t < 3.4)] - 2.2
# 808 Sub-Bass Impact (Drops from 150Hz to 32Hz)
pitch_sub = 32.0 + (150.0 - 32.0) * np.exp(-8 * t3)
sub_phase = 2 * np.pi * np.cumsum(pitch_sub) / sample_rate
sub_bass = 0.85 * np.sin(sub_phase) * np.exp(-2.2 * t3)

# Thunder crackle & lightning blast transient (Filtered noise burst)
noise = np.random.uniform(-1, 1, len(t3))
# Simple low-pass smoothing
smooth_noise = np.convolve(noise, np.ones(5)/5, mode='same')
lightning_crackle = 0.40 * smooth_noise * np.exp(-14 * t3)

audio[(t >= 2.2) & (t < 3.4)] += (sub_bass + lightning_crackle) * 0.80


# --- 4. AUTHENTIC BRASS TEMPLE BELL CHIME ("टुनन्नन्न...") (3.2s - 6.0s) ---
t4 = t[(t >= 3.2) & (t < 6.0)] - 3.2
# Pure Temple Bell Modes (Acoustically tuned for authentic brass Ghanti)
f_bell = 1046.5  # C6 note
b_mode1 = 0.50 * np.sin(2 * np.pi * f_bell * 1.000 * t4) * np.exp(-1.4 * t4)
b_mode2 = 0.35 * np.sin(2 * np.pi * f_bell * 2.003 * t4) * np.exp(-1.8 * t4)  # Harmonic 2 + slight beating
b_mode3 = 0.25 * np.sin(2 * np.pi * f_bell * 2.760 * t4) * np.exp(-2.4 * t4)  # Inharmonic bell tone
b_mode4 = 0.18 * np.sin(2 * np.pi * f_bell * 4.000 * t4) * np.exp(-3.2 * t4)  # High sparkle chime
b_mode5 = 0.10 * np.sin(2 * np.pi * f_bell * 5.400 * t4) * np.exp(-4.5 * t4)

temple_bell = b_mode1 + b_mode2 + b_mode3 + b_mode4 + b_mode5
audio[(t >= 3.2) & (t < 6.0)] += temple_bell * 0.75


# --- 5. GLOBAL AUDIO FADE & PEAK NORMALIZATION ---
# Smooth fade-out at the very end
fade_out_idx = t >= 6.8
t_fade = t[fade_out_idx] - 6.8
audio[fade_out_idx] *= np.cos(np.pi/2 * t_fade / 0.7)**2

# Master Peak Normalization to -0.5 dB
max_val = np.max(np.abs(audio))
if max_val > 0:
    audio = audio / max_val * 0.94

# Save 16-bit 44.1kHz Stereo/Mono PCM WAV
audio_int16 = (audio * 32767).astype(np.int16)
wav_out = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\videos\lord_shiva_blessing_subscribe_vfx\1080p60\shiva_subscribe_sfx.wav'
wavfile.write(wav_out, sample_rate, audio_int16)
print(f'Successfully generated Organic Cinematic Lord Shiva Subscribe SFX WAV at: {wav_out}')
