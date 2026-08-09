const canvas = document.getElementById('filterCanvas');
const ctx = canvas.getContext('2d');
const photoUpload = document.getElementById('photoUpload');
const filterPreset = document.getElementById('filterPreset');
const brightnessRange = document.getElementById('brightnessRange');
const contrastRange = document.getElementById('contrastRange');
const saturationRange = document.getElementById('saturationRange');
const warmthRange = document.getElementById('warmthRange');
const brightnessVal = document.getElementById('brightnessVal');
const contrastVal = document.getElementById('contrastVal');
const saturationVal = document.getElementById('saturationVal');
const warmthVal = document.getElementById('warmthVal');
const currentFilterName = document.getElementById('currentFilterName');
const downloadPng = document.getElementById('downloadPng');
const downloadJpg = document.getElementById('downloadJpg');

let loadedImage = null;
let currentPreset = 'normal';

const presets = {
    normal: { brightness: 1, contrast: 1, saturation: 1, warmth: 0 },
    clarendon: { brightness: 1.08, contrast: 1.15, saturation: 1.15, warmth: 10 },
    juno: { brightness: 1.05, contrast: 1.08, saturation: 1.3, warmth: 20 },
    lark: { brightness: 1.08, contrast: 1.03, saturation: 1.35, warmth: -10 },
    valencia: { brightness: 1.1, contrast: 1.04, saturation: 1.1, warmth: 15 },
    xpro2: { brightness: 1.05, contrast: 1.25, saturation: 1.4, warmth: 25 },
    moon: { brightness: 1.1, contrast: 1.25, saturation: 0.1, warmth: 0 },
    reyes: { brightness: 1.15, contrast: 1.02, saturation: 0.9, warmth: 5 },
    skyline: { brightness: 1.02, contrast: 1.1, saturation: 1.2, warmth: -5 },
    lofi: { brightness: 0.95, contrast: 1.02, saturation: 1.1, warmth: 30 }
};

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function applyFilter() {
    if (!loadedImage) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
    }

    const img = loadedImage;
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const width = img.width * scale;
    const height = img.height * scale;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, width, height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const brightness = parseFloat(brightnessRange.value);
    const contrast = parseFloat(contrastRange.value);
    const saturation = parseFloat(saturationRange.value);
    const warmth = parseFloat(warmthRange.value);

    const contrastFactor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));
    const warmthRadians = (warmth / 360) * Math.PI * 2;
    const warmthShiftR = Math.cos(warmthRadians) * 20;
    const warmthShiftB = Math.sin(warmthRadians) * 20;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Brightness
        r *= brightness;
        g *= brightness;
        b *= brightness;

        // Contrast
        r = contrastFactor * (r - 128) + 128;
        g = contrastFactor * (g - 128) + 128;
        b = contrastFactor * (b - 128) + 128;

        // Saturation
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        r = gray + (r - gray) * saturation;
        g = gray + (g - gray) * saturation;
        b = gray + (b - gray) * saturation;

        // Warmth tint
        r += warmthShiftR;
        b -= warmthShiftB;

        data[i] = clamp(r, 0, 255);
        data[i + 1] = clamp(g, 0, 255);
        data[i + 2] = clamp(b, 0, 255);
    }

    ctx.putImageData(imageData, 0, 0);
}

function updateValues() {
    brightnessVal.textContent = `${Math.round(brightnessRange.value * 100)}%`;
    contrastVal.textContent = `${Math.round(contrastRange.value * 100)}%`;
    saturationVal.textContent = `${Math.round(saturationRange.value * 100)}%`;
    warmthVal.textContent = `${warmthRange.value}°`;
    currentFilterName.textContent = filterPreset.options[filterPreset.selectedIndex].text;
}

function setPreset(preset) {
    const values = presets[preset];
    filterPreset.value = preset;
    brightnessRange.value = values.brightness;
    contrastRange.value = values.contrast;
    saturationRange.value = values.saturation;
    warmthRange.value = values.warmth;
    updateValues();
    applyFilter();
}

photoUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            loadedImage = img;
            applyFilter();
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

filterPreset.addEventListener('change', (event) => {
    currentPreset = event.target.value;
    const presetValues = presets[currentPreset] || presets.normal;
    brightnessRange.value = presetValues.brightness;
    contrastRange.value = presetValues.contrast;
    saturationRange.value = presetValues.saturation;
    warmthRange.value = presetValues.warmth;
    updateValues();
    applyFilter();
});

brightnessRange.addEventListener('input', () => {
    updateValues();
    applyFilter();
});
contrastRange.addEventListener('input', () => {
    updateValues();
    applyFilter();
});
saturationRange.addEventListener('input', () => {
    updateValues();
    applyFilter();
});
warmthRange.addEventListener('input', () => {
    updateValues();
    applyFilter();
});

Array.from(document.querySelectorAll('.preset-list button')).forEach((button) => {
    button.addEventListener('click', () => {
        setPreset(button.dataset.preset);
    });
});

downloadPng.addEventListener('click', () => {
    if (!loadedImage) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'instagram-filter.png';
    link.click();
});

downloadJpg.addEventListener('click', () => {
    if (!loadedImage) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.92);
    link.download = 'instagram-filter.jpg';
    link.click();
});

window.addEventListener('load', () => {
    updateValues();
    applyFilter();
});
