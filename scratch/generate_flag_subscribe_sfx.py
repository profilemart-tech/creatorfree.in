import numpy as np
from scipy.io import wavfile

sample_rate = 44100
duration = 7.0
num_samples = int(sample_rate * duration)

t = np.linspace(0, duration, num_samples, endpoint=False)
audio = np.zeros(num_samples)

# --- 1. MAJESTIC SHANKH NAAD & OM ECHO (0.05s - 1.5s) ---
t1 = t[(t >= 0.05) & (t < 1.5)] - 0.05
fund = 110.0
vibrato = 1.0 + 0.025 * np.sin(2 * np.pi * 4.2 * t1)
f_mod = fund * vibrato

h1 = 0.40 * np.sin(2 * np.pi * f_mod * 1 * t1)
h2 = 0.35 * np.sin(2 * np.pi * f_mod * 2 * t1)
h3 = 0.25 * np.sin(2 * np.pi * f_mod * 3 * t1)
h4 = 0.18 * np.sin(2 * np.pi * f_mod * 4 * t1)
h5 = 0.12 * np.sin(2 * np.pi * f_mod * 5 * t1)

shankh = (h1 + h2 + h3 + h4 + h5) * (np.sin(np.pi * (t1 / 1.45)**0.8))**1.5
audio[(t >= 0.05) & (t < 1.5)] += shankh * 0.70


# --- 2. VEDIC MANJIRA / BRASS CYMBAL CHIME (1.5s - 2.4s) ---
t2 = t[(t >= 1.5) & (t < 2.4)] - 1.5
# High-frequency brass manjira chime (2640Hz [E7] + 5280Hz)
manjira1 = 0.50 * np.sin(2 * np.pi * 2640 * t2) * np.exp(-4.5 * t2)
manjira2 = 0.30 * np.sin(2 * np.pi * 5280 * t2) * np.exp(-6.0 * t2)
wind_swish = 0.15 * np.random.uniform(-1, 1, len(t2)) * np.exp(-8 * t2)

audio[(t >= 1.5) & (t < 2.4)] += (manjira1 + manjira2 + wind_swish) * 0.75


# --- 3. DIVINE IMPACT BOOM & TEMPLE BELL RING (2.5s - 5.5s) ---
t3 = t[(t >= 2.5) & (t < 5.5)] - 2.5
# 808 Sub-Bass Impact Boom (140Hz -> 30Hz)
sub_pitch = 30.0 + (140.0 - 30.0) * np.exp(-8 * t3)
sub_phase = 2 * np.pi * np.cumsum(sub_pitch) / sample_rate
sub_bass = 0.85 * np.sin(sub_phase) * np.exp(-2.2 * t3)

# Temple Bell C6 Mode (1760Hz [A6] + 3520Hz)
f_bell = 1760.0
b1 = 0.50 * np.sin(2 * np.pi * f_bell * 1.000 * t3) * np.exp(-1.6 * t3)
b2 = 0.32 * np.sin(2 * np.pi * f_bell * 2.003 * t3) * np.exp(-2.2 * t3)
b3 = 0.20 * np.sin(2 * np.pi * f_bell * 2.760 * t3) * np.exp(-3.0 * t3)

audio[(t >= 2.5) & (t < 5.5)] += (sub_bass + b1 + b2 + b3) * 0.80


# --- 4. MASTER NORMALIZATION ---
max_val = np.max(np.abs(audio))
if max_val > 0:
    audio = audio / max_val * 0.94

audio_int16 = (audio * 32767).astype(np.int16)
wav_out = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\videos\red_hindu_flag_subscribe_vfx\1080p60\flag_subscribe_sfx.wav'
wavfile.write(wav_out, sample_rate, audio_int16)
print(f'Successfully generated Red Hindu Flag Subscribe SFX WAV at: {wav_out}')
