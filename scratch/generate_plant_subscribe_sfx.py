import numpy as np
from scipy.io import wavfile

sample_rate = 44100
duration = 7.5
num_samples = int(sample_rate * duration)

t = np.linspace(0, duration, num_samples, endpoint=False)
audio = np.zeros(num_samples)

# --- 1. SPROUT EMERGING FROM SOIL (0.1s - 1.2s) ---
t1 = t[(t >= 0.1) & (t < 1.2)] - 0.1
# Ascending Organic Marimba / Harp Notes (C5=523Hz, E5=659Hz, G5=784Hz, C6=1046Hz)
notes = [523.25, 659.25, 784.00, 1046.50]
for idx, freq in enumerate(notes):
    note_t_start = idx * 0.22
    mask = (t1 >= note_t_start) & (t1 < note_t_start + 0.4)
    tn = t1[mask] - note_t_start
    m_sound = 0.45 * np.sin(2 * np.pi * freq * tn) * np.exp(-10 * tn)
    audio[(t >= 0.1) & (t < 1.2)][mask] += m_sound

# Soil rustle (filtered soft noise)
soil_noise = 0.08 * np.random.uniform(-1, 1, len(t1)) * (np.sin(np.pi * t1 / 1.1)**2)
audio[(t >= 0.1) & (t < 1.2)] += soil_noise


# --- 2. STEM GROWTH & LEAF UNFOLD (1.2s - 2.4s) ---
t2 = t[(t >= 1.2) & (t < 2.4)] - 1.2
freq_sweep = 300.0 + 600.0 * (t2 / 1.2)**1.5
vine_sound = 0.35 * np.sin(2 * np.pi * freq_sweep * t2) * (np.sin(np.pi * t2 / 1.2)**2)
audio[(t >= 1.2) & (t < 2.4)] += vine_sound


# --- 3. FLOWER SUBSCRIBER BUTTON BLOOM & CLICK POP (2.4s - 4.5s) ---
t3 = t[(t >= 2.4) & (t < 4.5)] - 2.4

# Snappy organic wood click pop at 0.4s into bloom
pop_mask = (t3 >= 0.4) & (t3 < 0.55)
tp = t3[pop_mask] - 0.4
pop_pitch = 450.0 + (1200.0 - 450.0) * np.exp(-40 * tp)
pop_sound = 0.85 * np.sin(2 * np.pi * pop_pitch * tp) * np.exp(-35 * tp)
audio[(t >= 2.4) & (t < 4.5)][pop_mask] += pop_sound

# Magical Crystal Bloom Chime (E6 = 1318.5Hz, E7 = 2637Hz)
bloom_chime1 = 0.50 * np.sin(2 * np.pi * 1318.5 * t3) * np.exp(-1.8 * t3)
bloom_chime2 = 0.32 * np.sin(2 * np.pi * 2637.0 * t3) * np.exp(-2.5 * t3)
audio[(t >= 2.4) & (t < 4.5)] += (bloom_chime1 + bloom_chime2) * 0.80


# --- 4. NOTIFICATION BELL RINGS (4.5s - 5.5s) ---
t4 = t[(t >= 4.5) & (t < 5.5)] - 4.5
bell1 = 0.45 * np.sin(2 * np.pi * 1568.0 * t4) * np.exp(-3.0 * t4)
bell2 = 0.25 * np.sin(2 * np.pi * 3136.0 * t4) * np.exp(-4.0 * t4)
audio[(t >= 4.5) & (t < 5.5)] += (bell1 + bell2)


# --- 5. MASTER NORMALIZATION ---
max_val = np.max(np.abs(audio))
if max_val > 0:
    audio = audio / max_val * 0.92

audio_int16 = (audio * 32767).astype(np.int16)
wav_out = r'C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\media\videos\youtube_plant_growth_subscribe_vfx\1080p60\plant_subscribe_sfx.wav'
wavfile.write(wav_out, sample_rate, audio_int16)
print(f'Successfully generated YouTube Plant Growth Subscribe SFX WAV at: {wav_out}')
