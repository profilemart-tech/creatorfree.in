import numpy as np
from scipy.io import wavfile
import subprocess
import os

sample_rate = 44100
duration = 6.0
num_samples = int(sample_rate * duration)

t = np.linspace(0, duration, num_samples, endpoint=False)
audio = np.zeros(num_samples)

# 1. 0.0s - 0.8s: Holographic Cyber Boot-Up Sweep (Frequency Slide 400Hz -> 1200Hz + Tremolo)
t1 = t[(t >= 0.1) & (t < 0.9)] - 0.1
freq_sweep1 = 400 + 800 * (t1 / 0.8)**2
sfx1 = 0.25 * np.sin(2 * np.pi * freq_sweep1 * t1) * (1 + 0.3 * np.sin(2 * np.pi * 30 * t1))
# Envelope fade
env1 = np.sin(np.pi * t1 / 0.8)
audio[(t >= 0.1) & (t < 0.9)] += sfx1 * env1

# 2. 0.9s - 1.2s: Quantum Cursor Lock-On Click (1200Hz Short Pop)
t2 = t[(t >= 0.95) & (t < 1.15)] - 0.95
sfx2 = 0.4 * np.sin(2 * np.pi * 1400 * t2) * np.exp(-40 * t2)
audio[(t >= 0.95) & (t < 1.15)] += sfx2

# 3. 1.6s - 2.5s: Quantum Overdrive Click Explosion (Sub-Bass Drop 150Hz -> 40Hz + White Noise Spark)
t3 = t[(t >= 1.6) & (t < 2.5)] - 1.6
freq_sweep3 = 160 * np.exp(-3 * t3)
bass_impact = 0.6 * np.sin(2 * np.pi * freq_sweep3 * t3) * np.exp(-2.5 * t3)
noise_spark = 0.25 * np.random.uniform(-1, 1, len(t3)) * np.exp(-8 * t3)
audio[(t >= 1.6) & (t < 2.5)] += (bass_impact + noise_spark)

# 4. 2.6s - 3.8s: Crystal Bell Notification Chime (Harmonics at 1568Hz [G6], 3136Hz [G7], 4704Hz)
t4 = t[(t >= 2.6) & (t < 3.8)] - 2.6
bell1 = 0.45 * np.sin(2 * np.pi * 1568 * t4) * np.exp(-2.8 * t4)
bell2 = 0.25 * np.sin(2 * np.pi * 3136 * t4) * np.exp(-3.5 * t4)
bell3 = 0.15 * np.sin(2 * np.pi * 4704 * t4) * np.exp(-4.2 * t4)
audio[(t >= 2.6) & (t < 3.8)] += (bell1 + bell2 + bell3)

# 5. 4.2s - 5.5s: Cyber Power-Down Whoosh (Frequency Slide 800Hz -> 100Hz)
t5 = t[(t >= 4.2) & (t < 5.4)] - 4.2
freq_sweep5 = 800 * np.exp(-2 * t5)
sfx5 = 0.3 * np.sin(2 * np.pi * freq_sweep5 * t5) * (np.sin(np.pi * t5 / 1.2)**2)
audio[(t >= 4.2) & (t < 5.4)] += sfx5

# Normalize audio to prevent clipping
max_val = np.max(np.abs(audio))
if max_val > 0:
    audio = audio / max_val * 0.88

# Convert to 16-bit PCM WAV
audio_int16 = (audio * 32767).astype(np.int16)
wav_out = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\videos\cyber_subscribe_button_22nd_century_vfx\1080p60\cyber_subscribe_sfx.wav'
wavfile.write(wav_out, sample_rate, audio_int16)
print(f'Generated SFX Audio WAV at: {wav_out}')
