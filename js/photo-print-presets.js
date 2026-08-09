const printImageUpload = document.getElementById('printImageUpload');
const printSizeSelect = document.getElementById('printSizeSelect');
const printQuantitySelect = document.getElementById('printQuantitySelect');
const orientationSelect = document.getElementById('orientationSelect');
const printPreviewCanvas = document.getElementById('printPreviewCanvas');
const downloadPrintSheet = document.getElementById('downloadPrintSheet');
const sheetSizeText = document.getElementById('sheetSizeText');
const layoutText = document.getElementById('layoutText');
const backgroundText = document.getElementById('backgroundText');
const dateText = document.getElementById('dateText');
const sheetBackgroundSelect = document.getElementById('sheetBackgroundSelect');
const sheetBackgroundColor = document.getElementById('sheetBackgroundColor');
const customBackgroundField = document.getElementById('customBackgroundField');
const imageBackgroundSelect = document.getElementById('imageBackgroundSelect');
const imageBackgroundColor = document.getElementById('imageBackgroundColor');
const customImageBackgroundField = document.getElementById('customImageBackgroundField');
const decorativeStyleSelect = document.getElementById('decorativeStyleSelect');
const showDateOnPhotoCheckbox = document.getElementById('showDateOnPhotoCheckbox');
const photoDateInput = document.getElementById('photoDateInput');
const additionalSizeSelect = document.getElementById('additionalSizeSelect');
const additionalQuantitySelect = document.getElementById('additionalQuantitySelect');
const decorativeText = document.getElementById('decorativeText');
const photoBgText = document.getElementById('photoBgText');
const backgroundRemovalCheckbox = document.getElementById('backgroundRemovalCheckbox');
const backgroundImageUpload = document.getElementById('backgroundImageUpload');
const photoTextInput = document.getElementById('photoTextInput');
const photoTextColor = document.getElementById('photoTextColor');
const photoTextSize = document.getElementById('photoTextSize');
const photoTextPositionSelect = document.getElementById('photoTextPositionSelect');

const previewCtx = printPreviewCanvas.getContext('2d');
let printImage = null;
let photoBackdropImage = null;
let backgroundRemovedCanvas = null;

const A4_SIZE = { width: 8.27, height: 11.69 };
const printSizes = {
    'passport': { width: 2, height: 2 },
    'postcard': { width: 4, height: 6 },
    '4x6': { width: 4, height: 6 },
    '5x7': { width: 5, height: 7 },
    '6x8': { width: 6, height: 8 },
    '8x10': { width: 8, height: 10 }
};

function getA4Dimensions() {
    if (orientationSelect.value === 'landscape') {
        return { width: A4_SIZE.height, height: A4_SIZE.width };
    }
    return { width: A4_SIZE.width, height: A4_SIZE.height };
}

function updatePreviewInfo() {
    const quantityValue = parseInt(printQuantitySelect.value, 10);
    const additionalQuantityValue = parseInt(additionalQuantitySelect.value, 10) || 0;
    const a4Size = getA4Dimensions();
    sheetSizeText.textContent = `Sheet size: ${a4Size.width.toFixed(2)} x ${a4Size.height.toFixed(2)} in (A4)`;
    layoutText.textContent = `Layout: ${quantityValue + additionalQuantityValue} print${quantityValue + additionalQuantityValue > 1 ? 's' : ''}`;
    backgroundText.textContent = `Page Bg: ${getBackgroundLabel()}`;
    if (photoBgText) {
        photoBgText.textContent = `Photo Bg: ${getImageBackgroundLabel()}`;
    }
    if (decorativeText) {
        decorativeText.textContent = `Frame: ${decorativeStyleSelect.value === 'none' ? 'None' : decorativeStyleSelect.value.charAt(0).toUpperCase() + decorativeStyleSelect.value.slice(1)}`;
    }
    dateText.textContent = showDateOnPhotoCheckbox.checked ? `Date label: ${photoDateInput.value || 'set date'}` : 'Date label: None';
}

function updatePhotoSizeText() {
    const size = printSizes[printSizeSelect.value];
    const orientation = size.width <= size.height ? 'Portrait' : 'Landscape';
    const width = size.width;
    const height = size.height;
    const photoSizeText = document.getElementById('photoSizeText');
    if (photoSizeText) {
        photoSizeText.textContent = `Photo size: ${width.toFixed(2)} x ${height.toFixed(2)} in (${orientation})`;
    }
}

function clearPreview() {
    previewCtx.fillStyle = '#e5e7eb';
    previewCtx.fillRect(0, 0, printPreviewCanvas.width, printPreviewCanvas.height);
    previewCtx.fillStyle = '#0f172a';
    previewCtx.font = '22px Arial';
    previewCtx.textAlign = 'center';
    previewCtx.fillText('Upload an image to preview', printPreviewCanvas.width / 2, printPreviewCanvas.height / 2);
}

function getBackgroundStyle(context, width, height) {
    const value = sheetBackgroundSelect.value;
    if (value === 'lightGray') {
        context.fillStyle = '#f3f4f6';
        context.fillRect(0, 0, width, height);
        return;
    }
    if (value === 'ivory') {
        context.fillStyle = '#fffbf0';
        context.fillRect(0, 0, width, height);
        return;
    }
    if (value === 'blueGradient') {
        const grad = context.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#dbeafe');
        grad.addColorStop(1, '#bfdbfe');
        context.fillStyle = grad;
        context.fillRect(0, 0, width, height);
        return;
    }
    if (value === 'greenGradient') {
        const grad = context.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#dcfce7');
        grad.addColorStop(1, '#bbf7d0');
        context.fillStyle = grad;
        context.fillRect(0, 0, width, height);
        return;
    }
    if (value === 'custom') {
        context.fillStyle = sheetBackgroundColor.value;
        context.fillRect(0, 0, width, height);
        return;
    }
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
}

function getBackgroundLabel() {
    const value = sheetBackgroundSelect.value;
    if (value === 'lightGray') return 'Light Gray';
    if (value === 'ivory') return 'Ivory';
    if (value === 'blueGradient') return 'Blue Gradient';
    if (value === 'greenGradient') return 'Green Gradient';
    if (value === 'custom') return `Custom (${sheetBackgroundColor.value.toUpperCase()})`;
    return 'White';
}

function getImageBackgroundStyle(context, x, y, width, height) {
    const value = imageBackgroundSelect.value;
    if (value === 'lightGray') context.fillStyle = '#f3f4f6';
    else if (value === 'ivory') context.fillStyle = '#fffbf0';
    else if (value === 'black') context.fillStyle = '#000000';
    else if (value === 'custom') context.fillStyle = imageBackgroundColor.value;
    else context.fillStyle = '#ffffff';
    context.fillRect(x, y, width, height);
}

function getImageBackgroundLabel() {
    const value = imageBackgroundSelect.value;
    if (value === 'lightGray') return 'Light Gray';
    if (value === 'ivory') return 'Ivory';
    if (value === 'black') return 'Black';
    if (value === 'custom') return `Custom (${imageBackgroundColor.value.toUpperCase()})`;
    return 'White';
}

function createBackgroundRemovedCanvas(sourceImage) {
    const canvas = document.createElement('canvas');
    canvas.width = sourceImage.width;
    canvas.height = sourceImage.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(sourceImage, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const sample = [];
    const samplePositions = [
        { x: 0, y: 0 },
        { x: canvas.width - 1, y: 0 },
        { x: 0, y: canvas.height - 1 },
        { x: canvas.width - 1, y: canvas.height - 1 },
        { x: Math.floor(canvas.width / 2), y: 0 },
        { x: Math.floor(canvas.width / 2), y: canvas.height - 1 }
    ];

    samplePositions.forEach(({ x, y }) => {
        const index = (y * canvas.width + x) * 4;
        sample.push({ r: pixels[index], g: pixels[index + 1], b: pixels[index + 2] });
    });

    const baseColor = sample.reduce((acc, color) => ({
        r: acc.r + color.r,
        g: acc.g + color.g,
        b: acc.b + color.b
    }), { r: 0, g: 0, b: 0 });

    const referenceColor = {
        r: Math.round(baseColor.r / sample.length),
        g: Math.round(baseColor.g / sample.length),
        b: Math.round(baseColor.b / sample.length)
    };

    const threshold = 70;

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const alpha = pixels[i + 3];
        const distance = Math.abs(r - referenceColor.r) + Math.abs(g - referenceColor.g) + Math.abs(b - referenceColor.b);
        if (alpha < 120 || distance < threshold) {
            pixels[i + 3] = 0;
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

function drawPhotoBackdrop(context, x, y, width, height) {
    if (photoBackdropImage) {
        context.save();
        context.globalAlpha = 0.95;
        context.drawImage(photoBackdropImage, x, y, width, height);
        context.restore();
        return;
    }

    getImageBackgroundStyle(context, x, y, width, height);
}

function drawPhotoText(context, x, y, width, height) {
    const text = photoTextInput.value.trim();
    if (!text) return;

    const fontSize = Math.max(16, parseInt(photoTextSize.value, 10));
    const padding = Math.max(8, Math.round(width * 0.035));
    const boxHeight = Math.max(28, Math.round(fontSize * 1.5));
    const textMetrics = context.measureText(text);
    const boxWidth = textMetrics.width + padding * 2;
    const centerX = x + width / 2;
    const boxX = centerX - boxWidth / 2;
    let boxY = y + height - boxHeight - padding;

    if (photoTextPositionSelect.value === 'top') {
        boxY = y + padding;
    } else if (photoTextPositionSelect.value === 'center') {
        boxY = y + (height - boxHeight) / 2;
    }

    context.save();
    context.fillStyle = 'rgba(0, 0, 0, 0.72)';
    context.fillRect(boxX, boxY, boxWidth, boxHeight);
    context.fillStyle = photoTextColor.value;
    context.font = `${fontSize}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, centerX, boxY + boxHeight / 2);
    context.restore();
}

function drawDecorativeFrame(context, x, y, width, height) {
    const style = decorativeStyleSelect.value;
    if (style === 'none') return;

    context.save();
    if (style === 'rounded') {
        context.strokeStyle = '#3b82f6';
        context.lineWidth = Math.max(3, width * 0.02);
        const radius = Math.min(24, width * 0.08);
        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius);
        context.lineTo(x + width, y + height - radius);
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context.lineTo(x + radius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.stroke();
    } else if (style === 'colorful') {
        const grad = context.createLinearGradient(x, y, x + width, y + height);
        grad.addColorStop(0, '#fb7185');
        grad.addColorStop(0.5, '#8b5cf6');
        grad.addColorStop(1, '#38bdf8');
        context.strokeStyle = grad;
        context.lineWidth = Math.max(4, width * 0.025);
        context.strokeRect(x, y, width, height);
    } else if (style === 'elegant') {
        context.strokeStyle = '#1f2937';
        context.lineWidth = Math.max(3, width * 0.015);
        const corner = Math.min(25, width * 0.12);
        context.beginPath();
        context.moveTo(x, y + corner);
        context.lineTo(x, y);
        context.lineTo(x + corner, y);
        context.moveTo(x + width - corner, y);
        context.lineTo(x + width, y);
        context.lineTo(x + width, y + corner);
        context.moveTo(x + width, y + height - corner);
        context.lineTo(x + width, y + height);
        context.lineTo(x + width - corner, y + height);
        context.moveTo(x + corner, y + height);
        context.lineTo(x, y + height);
        context.lineTo(x, y + height - corner);
        context.stroke();
    }
    context.restore();
}

function drawPhotoCell(context, img, x, y, photoWidth, photoHeight) {
    const padding = Math.max(10, Math.round(Math.min(photoWidth, photoHeight) * 0.05));
    drawPhotoBackdrop(context, x, y, photoWidth, photoHeight);
    context.strokeStyle = '#cbd5e1';
    context.lineWidth = 1.5;
    context.strokeRect(x, y, photoWidth, photoHeight);

    const innerX = x + padding;
    const innerY = y + padding;
    const innerW = photoWidth - padding * 2;
    const innerH = photoHeight - padding * 2;

    const renderImage = backgroundRemovalCheckbox.checked ? getDisplayImage(img) : img;
    const imageRatio = renderImage.width / renderImage.height;
    const innerRatio = innerW / innerH;
    let drawWidth = innerW;
    let drawHeight = innerH;
    let offsetX = innerX;
    let offsetY = innerY;

    if (imageRatio > innerRatio) {
        drawHeight = innerH;
        drawWidth = Math.round(imageRatio * drawHeight);
        offsetX = innerX - Math.round((drawWidth - innerW) / 2);
    } else {
        drawWidth = innerW;
        drawHeight = Math.round(drawWidth / imageRatio);
        offsetY = innerY - Math.round((drawHeight - innerH) / 2);
    }

    context.save();
    context.beginPath();
    context.rect(innerX, innerY, innerW, innerH);
    context.clip();
    context.drawImage(renderImage, offsetX, offsetY, drawWidth, drawHeight);

    if (showDateOnPhotoCheckbox.checked && photoDateInput.value) {
        const text = new Date(photoDateInput.value).toLocaleDateString('en-GB');
        const dateHeight = Math.max(24, Math.round(innerH * 0.12));
        context.fillStyle = '#000000';
        context.fillRect(innerX, innerY + innerH - dateHeight, innerW, dateHeight);
        context.fillStyle = '#ffffff';
        context.font = `${Math.max(14, Math.round(dateHeight * 0.65))}px Arial`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, innerX + innerW / 2, innerY + innerH - dateHeight / 2);
    }

    context.restore();
    drawPhotoText(context, x, y, photoWidth, photoHeight);
    drawDecorativeFrame(context, x, y, photoWidth, photoHeight);
}

function getDisplayImage(sourceImage) {
    if (!backgroundRemovalCheckbox.checked) {
        return sourceImage;
    }

    if (!backgroundRemovedCanvas || backgroundRemovedCanvas.width !== sourceImage.width || backgroundRemovedCanvas.height !== sourceImage.height) {
        backgroundRemovedCanvas = createBackgroundRemovedCanvas(sourceImage);
    }

    return backgroundRemovedCanvas;
}

function drawPreviewSheet() {
    const a4Size = getA4Dimensions();
    const displayDpi = 120;
    const canvasWidth = Math.round(a4Size.width * displayDpi);
    const canvasHeight = Math.round(a4Size.height * displayDpi);

    printPreviewCanvas.width = canvasWidth;
    printPreviewCanvas.height = canvasHeight;

    getBackgroundStyle(previewCtx, canvasWidth, canvasHeight);
    previewCtx.strokeStyle = '#94a3b8';
    previewCtx.lineWidth = 3;
    previewCtx.strokeRect(0, 0, canvasWidth, canvasHeight);

    if (!printImage) {
        clearPreview();
        updatePreviewInfo();
        return;
    }

    const mainSize = printSizes[printSizeSelect.value];
    const additionalSize = printSizes[additionalSizeSelect.value];
    const mainQty = Math.max(1, parseInt(printQuantitySelect.value, 10));
    const additionalQty = Math.max(0, parseInt(additionalQuantitySelect.value, 10));
    const margin = Math.round(displayDpi * 0.25);
    const gap = Math.round(displayDpi * 0.12);

    const placements = [];
    const sizes = [{ size: mainSize, count: mainQty }, { size: additionalSize, count: additionalQty }];
    let currentY = margin;

    for (const item of sizes) {
        if (item.count <= 0) continue;
        const photoWidth = Math.round(item.size.width * displayDpi);
        const photoHeight = Math.round(item.size.height * displayDpi);
        const availableWidth = canvasWidth - margin * 2 + gap;
        const cols = Math.max(1, Math.floor(availableWidth / (photoWidth + gap)));

        for (let index = 0; index < item.count; index++) {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = margin + col * (photoWidth + gap);
            const y = currentY + row * (photoHeight + gap);
            placements.push({ x, y, photoWidth, photoHeight });
        }
        const rows = Math.max(1, Math.ceil(item.count / cols));
        currentY += rows * (photoHeight + gap);
    }

    previewCtx.fillStyle = '#f1f5f9';
    previewCtx.strokeStyle = '#cbd5e1';
    previewCtx.lineWidth = 2;

    for (const placement of placements) {
        const { x, y, photoWidth, photoHeight } = placement;
        drawPhotoCell(previewCtx, printImage, x, y, photoWidth, photoHeight);
    }

    updatePreviewInfo();
}

function drawDateLabel(context, width, height) {
    const dateValue = photoDateInput.value;
    if (!dateValue) {
        return;
    }
    context.fillStyle = '#0f172a';
    context.font = `${Math.max(12, Math.round(width * 0.018))}px Arial`;
    context.textAlign = 'right';
    context.textBaseline = 'bottom';
    const text = new Date(dateValue).toLocaleDateString('en-GB');
    context.fillText(text, width - 20, height - 20);
}

function createExportCanvas() {
    const a4Size = getA4Dimensions();
    const exportDpi = 150;
    const exportWidth = Math.round(a4Size.width * exportDpi);
    const exportHeight = Math.round(a4Size.height * exportDpi);

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = exportWidth;
    exportCanvas.height = exportHeight;
    const exportCtx = exportCanvas.getContext('2d');

    getBackgroundStyle(exportCtx, exportWidth, exportHeight);
    exportCtx.strokeStyle = '#999999';
    exportCtx.lineWidth = Math.max(2, exportDpi * 0.006);
    exportCtx.strokeRect(0, 0, exportWidth, exportHeight);

    const mainSize = printSizes[printSizeSelect.value];
    const additionalSize = printSizes[additionalSizeSelect.value];
    const mainQty = Math.max(1, parseInt(printQuantitySelect.value, 10));
    const additionalQty = Math.max(0, parseInt(additionalQuantitySelect.value, 10));
    const margin = Math.round(exportDpi * 0.25);
    const gap = Math.round(exportDpi * 0.12);

    const placements = [];
    const sizes = [{ size: mainSize, count: mainQty }, { size: additionalSize, count: additionalQty }];
    let currentY = margin;

    for (const item of sizes) {
        if (item.count <= 0) continue;
        const photoWidth = Math.round(item.size.width * exportDpi);
        const photoHeight = Math.round(item.size.height * exportDpi);
        const availableWidth = exportWidth - margin * 2 + gap;
        const cols = Math.max(1, Math.floor(availableWidth / (photoWidth + gap)));

        for (let index = 0; index < item.count; index++) {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = margin + col * (photoWidth + gap);
            const y = currentY + row * (photoHeight + gap);
            placements.push({ x, y, photoWidth, photoHeight });
        }
        const rows = Math.max(1, Math.ceil(item.count / cols));
        currentY += rows * (photoHeight + gap);
    }

    exportCtx.fillStyle = '#f1f5f9';
    exportCtx.strokeStyle = '#cbd5e1';
    exportCtx.lineWidth = Math.max(1, Math.round(exportDpi * 0.007));

    for (const placement of placements) {
        const { x, y, photoWidth, photoHeight } = placement;
        drawPhotoCell(exportCtx, printImage, x, y, photoWidth, photoHeight);
    }

    return exportCanvas;
}

function updateQuantityOptions() {
    const a4Size = getA4Dimensions();
    const mainSize = printSizes[printSizeSelect.value];
    const additionalSize = printSizes[additionalSizeSelect.value];
    const margin = 0.25;
    const gap = 0.12;

    function getMaxCount(size) {
        const availableWidth = a4Size.width - margin * 2 + gap;
        const cols = Math.max(1, Math.floor(availableWidth / (size.width + gap)));
        const rows = Math.max(1, Math.floor((a4Size.height - margin * 2 + gap) / (size.height + gap)));
        return Math.max(1, cols * rows);
    }

    const maxMain = getMaxCount(mainSize);
    const maxAdditional = getMaxCount(additionalSize);
    const currentMain = parseInt(printQuantitySelect.value, 10);
    const currentAdditional = parseInt(additionalQuantitySelect.value, 10);

    printQuantitySelect.innerHTML = '';
    for (let qty = 1; qty <= maxMain; qty++) {
        printQuantitySelect.appendChild(new Option(`${qty} copy${qty > 1 ? 'ies' : ''}`, qty.toString()));
    }
    additionalQuantitySelect.innerHTML = '';
    additionalQuantitySelect.appendChild(new Option('0 copies', '0'));
    for (let qty = 1; qty <= maxAdditional; qty++) {
        additionalQuantitySelect.appendChild(new Option(`${qty} copy${qty > 1 ? 'ies' : ''}`, qty.toString()));
    }

    if (!Number.isNaN(currentMain) && currentMain >= 1 && currentMain <= maxMain) {
        printQuantitySelect.value = currentMain.toString();
    }
    if (!Number.isNaN(currentAdditional) && currentAdditional >= 0 && currentAdditional <= maxAdditional) {
        additionalQuantitySelect.value = currentAdditional.toString();
    }
}

printImageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            printImage = img;
            backgroundRemovedCanvas = null;
            drawPreviewSheet();
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

backgroundImageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            photoBackdropImage = img;
            drawPreviewSheet();
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

[printSizeSelect, printQuantitySelect, orientationSelect, sheetBackgroundSelect, sheetBackgroundColor, imageBackgroundSelect, imageBackgroundColor, showDateOnPhotoCheckbox, photoDateInput, additionalSizeSelect, additionalQuantitySelect, backgroundRemovalCheckbox, photoTextInput, photoTextColor, photoTextSize, photoTextPositionSelect].forEach((control) => {
    control.addEventListener('change', () => {
        updateQuantityOptions();
        updatePhotoSizeText();
        drawPreviewSheet();
    });
});

[photoTextInput, photoTextColor, photoTextSize, photoTextPositionSelect].forEach((control) => {
    control.addEventListener('input', () => {
        drawPreviewSheet();
    });
});

backgroundRemovalCheckbox.addEventListener('change', () => {
    backgroundRemovedCanvas = null;
    drawPreviewSheet();
});

sheetBackgroundSelect.addEventListener('change', () => {
    customBackgroundField.style.display = sheetBackgroundSelect.value === 'custom' ? 'block' : 'none';
});

imageBackgroundSelect.addEventListener('change', () => {
    customImageBackgroundField.style.display = imageBackgroundSelect.value === 'custom' ? 'block' : 'none';
});

downloadPrintSheet.addEventListener('click', () => {
    if (!printImage) return;
    const exportCanvas = createExportCanvas();
    const link = document.createElement('a');
    link.href = exportCanvas.toDataURL('image/jpeg', 0.92);
    link.download = 'print-sheet.jpg';
    link.click();
});

window.addEventListener('load', () => {
    updateQuantityOptions();
    updatePhotoSizeText();
    clearPreview();
    updatePreviewInfo();
});
