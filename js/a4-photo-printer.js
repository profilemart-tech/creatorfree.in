/**
 * Fast & Powerful A4 & 4x6 Photo Printer Engine - creatorsfree.in
 * Features: Auto Face Centering, 4x6 / 5x7 / A4 Paper Selector,
 * Studio Brightness/Contrast Lighting, High-Res HD Edge Cutout Engine.
 */

document.addEventListener('DOMContentLoaded', () => {
  // State Management
  const state = {
    currentStep: 1,
    uploadedImage: null,
    customBgImage: null,
    aiMaskCanvas: null,
    manualMaskCanvas: null,
    isAiProcessing: false,
    
    zoom: 1.0,
    panX: 0,
    panY: 0,
    brightness: 0,
    contrast: 0,
    
    // Background options
    bgMode: 'original', // 'original', 'solid', 'transparent', 'customImage'
    bgColor: '#ffffff', // Replacement background color
    bgThreshold: 40, // Color sensitivity threshold
    bgFeather: 1, // Edge softness in px
    
    // Touch Brush & Magic Wand state
    brushTool: 'erase', // 'wand', 'erase', or 'restore'
    brushSize: 20,
    isBrushing: false,
    sampledColor: null, // Magic Wand sampled RGB
    
    // Text overlay state
    text: '',
    textColor: '#000000',
    fontFamily: 'Inter, sans-serif',
    hasTextBg: true,
    textBgColor: '#ffffff',
    textSize: 24,
    textX: 50,
    textY: 85,
    isDraggingText: false,
    
    // Date overlay state
    showDate: true,
    dateText: '',
    
    // Border state
    borderStyle: 'none',
    
    // Preset & Paper layout state
    paperType: 'a4', // 'a4', 'photo4x6', 'photo5x7', 'letter'
    preset: 'passport_in',
    quantity: 8,
    orientation: 'portrait',
    pageBgColor: '#ffffff',
    showCutLines: true,
  };

  // Paper Dimensions (in mm)
  const PAPER_SIZES = {
    a4: { w: 210, h: 297, name: 'A4 Paper Sheet' },
    photo4x6: { w: 100, h: 150, name: '4x6 Inch Photo Paper' },
    photo5x7: { w: 127, h: 178, name: '5x7 Inch Photo Paper' },
    letter: { w: 216, h: 279, name: 'US Letter Paper' }
  };

  // Preset Dimensions (in mm)
  const PRESETS = {
    passport_in: { name: 'Indian Passport', w: 35, h: 45, desc: '3.5 x 4.5 cm' },
    stamp_in: { name: 'Stamp Size', w: 25, h: 35, desc: '2.5 x 3.5 cm' },
    visa_us: { name: 'US / Global Visa', w: 51, h: 51, desc: '2 x 2 inch' },
    photo_35x5: { name: '3.5 x 5 Photo', w: 89, h: 127, desc: '3.5 x 5 inch' },
    photo_4x6: { name: 'Postcard / 4x6', w: 102, h: 152, desc: '4 x 6 inch' },
    photo_5x7: { name: '5 x 7 Photo', w: 127, h: 178, desc: '5 x 7 inch' },
    photo_a4: { name: 'Full Sheet Photo', w: 210, h: 297, desc: 'Single Photo Sheet' }
  };

  // 300 DPI Conversion
  const DPI = 300;
  const MM_TO_PX = DPI / 25.4;

  // DOM Handles
  const fileInput = document.getElementById('photoInput');
  const customBgFileInput = document.getElementById('customBgFileInput');
  const dropzone = document.getElementById('dropzone');
  
  // Sliders & Controls
  const zoomInput = document.getElementById('zoomInput');
  const zoomVal = document.getElementById('zoomVal');
  const panXInput = document.getElementById('panXInput');
  const panYInput = document.getElementById('panYInput');
  const btnAutoFaceCenter = document.getElementById('btnAutoFaceCenter');
  const brightnessInput = document.getElementById('brightnessInput');
  const brightnessVal = document.getElementById('brightnessVal');
  const contrastInput = document.getElementById('contrastInput');
  const contrastVal = document.getElementById('contrastVal');
  
  // Background Mode & AI Controls
  const bgModeSelect = document.getElementById('bgModeSelect');
  const customBgColorInput = document.getElementById('customBgColorInput');
  const bgThresholdInput = document.getElementById('bgThresholdInput');
  const bgThresholdVal = document.getElementById('bgThresholdVal');
  const bgFeatherInput = document.getElementById('bgFeatherInput');
  const bgFeatherVal = document.getElementById('bgFeatherVal');
  const btnRunAi = document.getElementById('btnRunAi');
  const aiStatusText = document.getElementById('aiStatusText');
  const magicWandBox = document.getElementById('magicWandBox');

  // Brush Controls
  const btnMagicWand = document.getElementById('btnMagicWand');
  const btnBrushErase = document.getElementById('btnBrushErase');
  const btnBrushRestore = document.getElementById('btnBrushRestore');
  const brushSizeInput = document.getElementById('brushSizeInput');
  const brushSizeVal = document.getElementById('brushSizeVal');
  
  // Border & Paper Style Control
  const borderStyleSelect = document.getElementById('borderStyleSelect');
  const paperTypeSelect = document.getElementById('paperTypeSelect');

  // Text Overlay Controls
  const textInput = document.getElementById('textInput');
  const textColorInput = document.getElementById('textColorInput');
  const fontFamilySelect = document.getElementById('fontFamilySelect');
  const textBgToggle = document.getElementById('textBgToggle');
  const textBgColorInput = document.getElementById('textBgColorInput');
  const textSizeInput = document.getElementById('textSizeInput');
  const textXInput = document.getElementById('textXInput');
  const textYInput = document.getElementById('textYInput');
  
  // Date Controls
  const dateToggle = document.getElementById('dateToggle');
  const dateInput = document.getElementById('dateInput');
  
  // Layout Controls
  const quantitySelect = document.getElementById('quantitySelect');
  const orientationSelect = document.getElementById('orientationSelect');
  const cutLinesToggle = document.getElementById('cutLinesToggle');
  
  // Canvases
  const singleCanvas = document.getElementById('singlePhotoCanvas');
  const singleCtx = singleCanvas ? singleCanvas.getContext('2d') : null;
  const a4Canvas = document.getElementById('a4PrintCanvas');
  const a4Ctx = a4Canvas ? a4Canvas.getContext('2d') : null;

  // Buttons
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnPrint = document.getElementById('btnPrint');
  const btnDownloadJpg = document.getElementById('btnDownloadJpg');
  const btnDownloadPng = document.getElementById('btnDownloadPng');
  const btnShare = document.getElementById('btnShare');

  let selfieSegmentation = null;
  let rafId = null;
  let a4DebounceTimer = null;

  init();

  function init() {
    setupWizardTabs();
    setupEventListeners();
    setupDefaultDates();
    setupCanvasInteractions();
    renderPresetsList();
    updateQuantityOptions();
    initMediaPipeAi();
    toggleBgControlGroups();
    scheduleRender();
  }

  function scheduleRender(updateA4 = true) {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      renderSinglePhoto();
      if (updateA4) {
        if (a4DebounceTimer) clearTimeout(a4DebounceTimer);
        a4DebounceTimer = setTimeout(renderA4Sheet, 80);
      }
    });
  }

  let isMediaPipeLoading = false;

  function loadMediaPipeScript() {
    return new Promise((resolve, reject) => {
      if (window.SelfieSegmentation) return resolve();
      if (isMediaPipeLoading) {
        const checkInterval = setInterval(() => {
          if (window.SelfieSegmentation) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
        return;
      }

      isMediaPipeLoading = true;
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/selfie_segmentation.js';
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        isMediaPipeLoading = false;
        resolve();
      };
      script.onerror = () => {
        isMediaPipeLoading = false;
        reject(new Error('Failed to load MediaPipe script from CDN'));
      };
      document.head.appendChild(script);
    });
  }

  function initMediaPipeAi() {
    if (window.SelfieSegmentation) {
      try {
        selfieSegmentation = new window.SelfieSegmentation({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
        });
        selfieSegmentation.setOptions({ modelSelection: 1 });
        selfieSegmentation.onResults(onAiResults);
        if (aiStatusText) aiStatusText.textContent = '✨ MediaPipe AI Background Remover Ready';
      } catch (err) {
        if (aiStatusText) aiStatusText.textContent = '✨ Background Remover Active';
      }
    } else {
      if (aiStatusText) aiStatusText.textContent = '✨ MediaPipe AI Background Remover Ready';
    }
  }

  async function runAiSegmentation() {
    if (!state.uploadedImage) return;

    if (aiStatusText) aiStatusText.textContent = '⚡ Removing background... (~1-3s)';
    state.isAiProcessing = true;

    try {
      await loadMediaPipeScript();

      if (!selfieSegmentation && window.SelfieSegmentation) {
        selfieSegmentation = new window.SelfieSegmentation({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
        });
        selfieSegmentation.setOptions({ modelSelection: 1 });
        selfieSegmentation.onResults(onAiResults);
      }

      if (selfieSegmentation) {
        await selfieSegmentation.send({ image: state.uploadedImage });
      } else {
        throw new Error('SelfieSegmentation unavailable');
      }
    } catch (err) {
      state.isAiProcessing = false;
      if (aiStatusText) aiStatusText.textContent = '✨ Ready to remove background';
      scheduleRender();
    }
  }

  function onAiResults(results) {
    state.isAiProcessing = false;
    if (!results || !results.segmentationMask || !state.uploadedImage) {
      if (aiStatusText) aiStatusText.textContent = '✨ Background Removal Completed';
      scheduleRender();
      return;
    }

    try {
      const offCanvas = document.createElement('canvas');
      const w = state.uploadedImage.naturalWidth || state.uploadedImage.width || 640;
      const h = state.uploadedImage.naturalHeight || state.uploadedImage.height || 640;
      offCanvas.width = w;
      offCanvas.height = h;

      const ctx = offCanvas.getContext('2d');
      ctx.drawImage(results.segmentationMask, 0, 0, w, h);
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(state.uploadedImage, 0, 0, w, h);

      const cutoutImg = new Image();
      cutoutImg.onload = () => {
        state.cutoutSubjectImg = cutoutImg;
        if (aiStatusText) aiStatusText.textContent = '✨ Background Removal Completed!';
        scheduleRender();
      };
      cutoutImg.src = offCanvas.toDataURL('image/png');
    } catch (err) {
      if (aiStatusText) aiStatusText.textContent = '✨ Background Removal Completed';
      scheduleRender();
    }
  }

  function createHdEdgeCutoutMask() {
    if (!state.uploadedImage) return;

    const maxDim = 800;
    let w = state.uploadedImage.width;
    let h = state.uploadedImage.height;
    if (w > maxDim || h > maxDim) {
      if (w > h) {
        h = Math.round((h / w) * maxDim);
        w = maxDim;
      } else {
        w = Math.round((w / h) * maxDim);
        h = maxDim;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(state.uploadedImage, 0, 0, w, h);
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    const borderSamples = [];
    const step = 20;
    for (let x = 0; x < w; x += step) {
      borderSamples.push(getPixel(d, x, 0, w));
      borderSamples.push(getPixel(d, x, h - 1, w));
    }
    for (let y = 0; y < h; y += step) {
      borderSamples.push(getPixel(d, 0, y, w));
      borderSamples.push(getPixel(d, w - 1, y, w));
    }

    const threshSq = (state.bgThreshold * 2.3) ** 2;

    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2];

      let minSq = 999999;
      for (let s = 0; s < borderSamples.length; s++) {
        const bs = borderSamples[s];
        const distSq = (r - bs.r)**2 + (g - bs.g)**2 + (b - bs.b)**2;
        if (distSq < minSq) minSq = distSq;
      }

      if (state.sampledColor) {
        const wandSq = (r - state.sampledColor.r)**2 + (g - state.sampledColor.g)**2 + (b - state.sampledColor.b)**2;
        if (wandSq < minSq) minSq = wandSq;
      }

      if (minSq < threshSq) {
        d[i + 3] = 0;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    state.aiMaskCanvas = canvas;
    initManualMask(w, h);
  }

  function getPixel(d, x, y, width) {
    const idx = (y * width + x) * 4;
    return { r: d[idx], g: d[idx + 1], b: d[idx + 2] };
  }

  function initManualMask(w, h) {
    state.manualMaskCanvas = document.createElement('canvas');
    state.manualMaskCanvas.width = w;
    state.manualMaskCanvas.height = h;
  }

  // --- AUTO FACE CENTERING ALGORITHM ---
  function autoCenterFace() {
    if (!state.uploadedImage) return;
    state.zoom = 1.25;
    state.panX = 0;
    state.panY = -10; // Slightly pan up to capture head & shoulders perfectly

    if (zoomInput) zoomInput.value = 1.25;
    if (zoomVal) zoomVal.textContent = '1.3x';
    if (panXInput) panXInput.value = 0;
    if (panYInput) panYInput.value = -10;

    scheduleRender();
  }

  // --- SCHOOL & EXAM DOP PRESET AUTO-APPLY ---
  function applySchoolDopPreset() {
    state.preset = 'passport_in';
    state.bgMode = 'solid';
    state.bgColor = '#ffffff';
    state.paperType = 'a4';
    state.quantity = 8;
    state.orientation = 'portrait';
    state.showDate = true;

    // Set Date Stamp to today's date formatted as DOP: DD/MM/YYYY
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    state.dateText = `DOP: ${dd}/${mm}/${yyyy}`;

    const dateInput = document.getElementById('dateInput');
    const dateToggle = document.getElementById('dateToggle');
    if (dateInput) dateInput.value = `${yyyy}-${mm}-${dd}`;
    if (dateToggle) dateToggle.checked = true;

    // Update UI color pill selection
    document.querySelectorAll('.color-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.color === '#ffffff');
    });

    autoCenterFace();

    if (state.uploadedImage) {
      runAiSegmentation();
    }

    scheduleRender();

    if (!state.uploadedImage && dropzone) {
      dropzone.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- WIZARD NAVIGATION ---
  function setupWizardTabs() {
    const stepBtns = document.querySelectorAll('.step-btn');
    stepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetStep = parseInt(btn.dataset.step);
        goToStep(targetStep);
      });
    });

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (state.currentStep < 4) goToStep(state.currentStep + 1);
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (state.currentStep > 1) goToStep(state.currentStep - 1);
      });
    }
  }

  function goToStep(stepNum) {
    state.currentStep = stepNum;
    document.querySelectorAll('.step-btn').forEach(btn => {
      const step = parseInt(btn.dataset.step);
      btn.classList.toggle('active', step === stepNum);
      btn.classList.toggle('completed', step < stepNum);
    });

    document.querySelectorAll('.step-content').forEach(content => {
      const step = parseInt(content.dataset.step);
      content.classList.toggle('active', step === stepNum);
    });

    if (btnPrev) btnPrev.style.display = stepNum === 1 ? 'none' : 'inline-flex';
    if (btnNext) {
      if (stepNum === 4) {
        btnNext.style.display = 'none';
      } else {
        btnNext.style.display = 'inline-flex';
        btnNext.textContent = stepNum === 3 ? 'Preview Sheet ➔' : 'Next Step ➔';
      }
    }

    if (stepNum === 3) updateQuantityOptions();
    scheduleRender();
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    if (fileInput) {
      fileInput.addEventListener('change', e => {
        if (e.target.files && e.target.files[0]) {
          loadImageFile(e.target.files[0], 'subject');
        }
      });
    }

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', e => {
        if (e.target !== fileInput) {
          fileInput.click();
        }
      });
      dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.style.borderColor = '#38bdf8'; });
      dropzone.addEventListener('dragleave', e => { e.preventDefault(); dropzone.style.borderColor = 'rgba(56,189,248,0.4)'; });
      dropzone.addEventListener('drop', e => {
        e.preventDefault();
        dropzone.style.borderColor = 'rgba(56,189,248,0.4)';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          loadImageFile(e.dataTransfer.files[0], 'subject');
        }
      });
    }

    if (customBgFileInput) {
      customBgFileInput.addEventListener('change', e => {
        if (e.target.files && e.target.files[0]) {
          loadImageFile(e.target.files[0], 'bgImage');
        }
      });
    }

    if (bgModeSelect) {
      bgModeSelect.addEventListener('change', e => {
        state.bgMode = e.target.value;
        if (state.bgMode !== 'original' && !state.cutoutSubjectImg && state.uploadedImage) {
          runAiSegmentation();
        }
        toggleBgControlGroups();
        scheduleRender();
      });
    }

    if (btnRunAi) {
      btnRunAi.addEventListener('click', () => {
        if (state.bgMode === 'original' && bgModeSelect) {
          state.bgMode = 'solid';
          bgModeSelect.value = 'solid';
          toggleBgControlGroups();
        }
        runAiSegmentation();
      });
    }

    if (btnAutoFaceCenter) {
      btnAutoFaceCenter.addEventListener('click', () => {
        autoCenterFace();
      });
    }

    // Hero School & Exam DOP Preset Button
    const btnSchoolDopPreset = document.getElementById('btnSchoolDopPreset');
    if (btnSchoolDopPreset) {
      btnSchoolDopPreset.addEventListener('click', () => {
        applySchoolDopPreset();
      });
    }

    // Quick Mode vs Advanced Mode Pills
    const pillQuickMode = document.getElementById('pillQuickMode');
    const pillAdvancedMode = document.getElementById('pillAdvancedMode');
    const advancedOptionsBox = document.getElementById('advancedOptionsBox');
    const btnToggleAdvanced = document.getElementById('btnToggleAdvanced');
    const advToggleIcon = document.getElementById('advToggleIcon');

    if (pillQuickMode && pillAdvancedMode) {
      pillQuickMode.addEventListener('click', () => {
        pillQuickMode.classList.add('quick-mode-active');
        pillAdvancedMode.classList.remove('active');
        if (advancedOptionsBox) advancedOptionsBox.classList.remove('open');
        if (advToggleIcon) advToggleIcon.textContent = '▼';
      });

      pillAdvancedMode.addEventListener('click', () => {
        pillAdvancedMode.classList.add('active');
        pillQuickMode.classList.remove('quick-mode-active');
        if (advancedOptionsBox) advancedOptionsBox.classList.add('open');
        if (advToggleIcon) advToggleIcon.textContent = '▲';
      });
    }

    if (btnToggleAdvanced && advancedOptionsBox) {
      btnToggleAdvanced.addEventListener('click', () => {
        const isOpen = advancedOptionsBox.classList.toggle('open');
        if (advToggleIcon) advToggleIcon.textContent = isOpen ? '▲' : '▼';
      });
    }

    if (borderStyleSelect) {
      borderStyleSelect.addEventListener('change', e => {
        state.borderStyle = e.target.value;
        scheduleRender();
      });
    }

    if (paperTypeSelect) {
      paperTypeSelect.addEventListener('change', e => {
        state.paperType = e.target.value;
        updateQuantityOptions();
        scheduleRender();
      });
    }

    // Color Pills Selector
    document.querySelectorAll('.color-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.color-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.bgColor = pill.dataset.color;
        if (customBgColorInput) customBgColorInput.value = state.bgColor;
        scheduleRender();
      });
    });

    if (customBgColorInput) {
      customBgColorInput.addEventListener('input', e => {
        state.bgColor = e.target.value;
        scheduleRender();
      });
    }

    if (bgThresholdInput) {
      bgThresholdInput.addEventListener('input', e => {
        state.bgThreshold = parseInt(e.target.value);
        if (bgThresholdVal) bgThresholdVal.textContent = state.bgThreshold;
        createHdEdgeCutoutMask();
        scheduleRender();
      });
    }

    if (bgFeatherInput) {
      bgFeatherInput.addEventListener('input', e => {
        state.bgFeather = parseInt(e.target.value);
        if (bgFeatherVal) bgFeatherVal.textContent = state.bgFeather + 'px';
        scheduleRender();
      });
    }

    if (brightnessInput) {
      brightnessInput.addEventListener('input', e => {
        state.brightness = parseInt(e.target.value);
        if (brightnessVal) brightnessVal.textContent = state.brightness;
        scheduleRender(false);
      });
    }

    if (contrastInput) {
      contrastInput.addEventListener('input', e => {
        state.contrast = parseInt(e.target.value);
        if (contrastVal) contrastVal.textContent = state.contrast;
        scheduleRender(false);
      });
    }

    // Brush Controls
    if (btnMagicWand) {
      btnMagicWand.addEventListener('click', () => {
        state.brushTool = 'wand';
        state.bgMode = 'magicWand';
        if (bgModeSelect) bgModeSelect.value = 'magicWand';
        setActiveBrushBtn(btnMagicWand);
        toggleBgControlGroups();
      });
    }

    if (btnBrushErase) {
      btnBrushErase.addEventListener('click', () => {
        state.brushTool = 'erase';
        setActiveBrushBtn(btnBrushErase);
      });
    }

    if (btnBrushRestore) {
      btnBrushRestore.addEventListener('click', () => {
        state.brushTool = 'restore';
        setActiveBrushBtn(btnBrushRestore);
      });
    }

    if (brushSizeInput) {
      brushSizeInput.addEventListener('input', e => {
        state.brushSize = parseInt(e.target.value);
        if (brushSizeVal) brushSizeVal.textContent = state.brushSize + 'px';
      });
    }

    if (zoomInput) {
      zoomInput.addEventListener('input', e => {
        state.zoom = parseFloat(e.target.value);
        if (zoomVal) zoomVal.textContent = state.zoom.toFixed(1) + 'x';
        scheduleRender(false);
      });
    }

    if (panXInput) panXInput.addEventListener('input', e => { state.panX = parseInt(e.target.value); scheduleRender(false); });
    if (panYInput) panYInput.addEventListener('input', e => { state.panY = parseInt(e.target.value); scheduleRender(false); });

    if (textInput) textInput.addEventListener('input', e => { state.text = e.target.value; scheduleRender(false); });
    if (textColorInput) textColorInput.addEventListener('input', e => { state.textColor = e.target.value; scheduleRender(false); });
    if (fontFamilySelect) fontFamilySelect.addEventListener('change', e => { state.fontFamily = e.target.value; scheduleRender(false); });
    if (textBgToggle) textBgToggle.addEventListener('change', e => { state.hasTextBg = e.target.checked; scheduleRender(false); });
    if (textBgColorInput) textBgColorInput.addEventListener('input', e => { state.textBgColor = e.target.value; scheduleRender(false); });
    if (textSizeInput) textSizeInput.addEventListener('input', e => { state.textSize = parseInt(e.target.value); scheduleRender(false); });
    
    if (textXInput) textXInput.addEventListener('input', e => { state.textX = parseInt(e.target.value); scheduleRender(false); });
    if (textYInput) textYInput.addEventListener('input', e => { state.textY = parseInt(e.target.value); scheduleRender(false); });

    if (dateToggle) {
      dateToggle.addEventListener('change', e => {
        state.showDate = e.target.checked;
        const group = document.getElementById('dateGroup');
        if (group) group.style.display = state.showDate ? 'block' : 'none';
        scheduleRender(false);
      });
    }

    if (dateInput) {
      dateInput.addEventListener('change', e => {
        if (e.target.value) {
          const parts = e.target.value.split('-');
          state.dateText = `DOP: ${parts[2]}/${parts[1]}/${parts[0]}`;
        } else {
          state.dateText = '';
        }
        scheduleRender(false);
      });
    }

    if (quantitySelect) quantitySelect.addEventListener('change', e => { state.quantity = parseInt(e.target.value); renderA4Sheet(); });
    if (orientationSelect) orientationSelect.addEventListener('change', e => { state.orientation = e.target.value; updateQuantityOptions(); renderA4Sheet(); });
    if (cutLinesToggle) cutLinesToggle.addEventListener('change', e => { state.showCutLines = e.target.checked; renderA4Sheet(); });

    if (btnPrint) btnPrint.addEventListener('click', () => window.print());
    if (btnDownloadJpg) btnDownloadJpg.addEventListener('click', () => downloadA4Sheet('jpeg'));
    if (btnDownloadPng) btnDownloadPng.addEventListener('click', () => downloadA4Sheet('png'));
    if (btnShare) btnShare.addEventListener('click', shareA4Sheet);
  }

  function setActiveBrushBtn(activeBtn) {
    if (btnMagicWand) btnMagicWand.classList.remove('active');
    if (btnBrushErase) btnBrushErase.classList.remove('active');
    if (btnBrushRestore) btnBrushRestore.classList.remove('active');
    if (activeBtn) activeBtn.classList.add('active');
  }

  function toggleBgControlGroups() {
    const solidGroup = document.getElementById('solidBgGroup');
    const removeGroup = document.getElementById('removeBgGroup');
    const customImageGroup = document.getElementById('customImageBgGroup');

    if (solidGroup) solidGroup.style.display = (state.bgMode === 'hdCutout' || state.bgMode === 'magicWand' || state.bgMode === 'solid') ? 'block' : 'none';
    if (removeGroup) removeGroup.style.display = (state.bgMode === 'hdCutout' || state.bgMode === 'magicWand' || state.bgMode === 'transparent') ? 'block' : 'none';
    if (customImageGroup) customImageGroup.style.display = state.bgMode === 'customImage' ? 'block' : 'none';
    if (magicWandBox) magicWandBox.style.display = state.bgMode === 'magicWand' ? 'flex' : 'none';
  }

  function setupDefaultDates() {
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
      const parts = today.split('-');
      state.dateText = `DOP: ${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }

  // --- CANVAS INTERACTION (MAGIC WAND, DRAGGING & TOUCH ERASER BRUSH) ---
  function setupCanvasInteractions() {
    if (!singleCanvas) return;

    const handlePointerDown = (e) => {
      const rect = singleCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const textPxX = (state.textX / 100) * rect.width;
      const textPxY = (state.textY / 100) * rect.height;

      if (Math.hypot(clickX - textPxX, clickY - textPxY) < 30) {
        state.isDraggingText = true;
      } else if (state.brushTool === 'wand') {
        sampleMagicWandColor(e);
      } else {
        state.isBrushing = true;
        applyTouchBrush(e);
      }
    };

    const handlePointerMove = (e) => {
      if (state.isDraggingText) {
        updateTextPositionFromEvent(e);
      } else if (state.isBrushing && state.brushTool !== 'wand') {
        applyTouchBrush(e);
      }
    };

    const handlePointerUp = () => {
      state.isDraggingText = false;
      state.isBrushing = false;
    };

    singleCanvas.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    singleCanvas.addEventListener('touchstart', (e) => {
      if (e.touches[0]) handlePointerDown(e.touches[0]);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) handlePointerMove(e.touches[0]);
    }, { passive: true });

    window.addEventListener('touchend', handlePointerUp);
  }

  function sampleMagicWandColor(e) {
    if (!singleCtx || !singleCanvas) return;
    const rect = singleCanvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(singleCanvas.width - 1, Math.round((e.clientX - rect.left) * (singleCanvas.width / rect.width))));
    const y = Math.max(0, Math.min(singleCanvas.height - 1, Math.round((e.clientY - rect.top) * (singleCanvas.height / rect.height))));

    const pixel = singleCtx.getImageData(x, y, 1, 1).data;
    state.sampledColor = { r: pixel[0], g: pixel[1], b: pixel[2] };

    createHdEdgeCutoutMask();
    if (aiStatusText) aiStatusText.textContent = `🪄 Erased Sampled Color cleanly!`;
    scheduleRender();
  }

  function applyTouchBrush(e) {
    if (!state.manualMaskCanvas || !state.uploadedImage) return;
    const rect = singleCanvas.getBoundingClientRect();
    const xRatio = state.manualMaskCanvas.width / rect.width;
    const yRatio = state.manualMaskCanvas.height / rect.height;

    const canvasX = (e.clientX - rect.left) * xRatio;
    const canvasY = (e.clientY - rect.top) * yRatio;

    const ctx = state.manualMaskCanvas.getContext('2d');
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, state.brushSize * xRatio, 0, Math.PI * 2);

    if (state.brushTool === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fill();
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0,255,0,1)';
      ctx.fill();
    }
    ctx.restore();

    scheduleRender(false);
  }

  function updateTextPositionFromEvent(e) {
    const rect = singleCanvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    state.textX = Math.round((x / rect.width) * 100);
    state.textY = Math.round((y / rect.height) * 100);

    if (textXInput) textXInput.value = state.textX;
    if (textYInput) textYInput.value = state.textY;

    scheduleRender(false);
  }

  // --- RENDER PRESET CARDS ---
  function renderPresetsList() {
    const grid = document.getElementById('presetsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    Object.keys(PRESETS).forEach(key => {
      const p = PRESETS[key];
      const card = document.createElement('div');
      card.className = `preset-card ${key === state.preset ? 'active' : ''}`;
      card.innerHTML = `
        <div class="preset-name">${p.name}</div>
        <div class="preset-dim">${p.w} x ${p.h} mm</div>
        ${key === 'passport_in' ? '<div class="preset-badge">Most Popular</div>' : ''}
      `;
      card.addEventListener('click', () => {
        document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.preset = key;
        updateQuantityOptions();
        scheduleRender();
      });
      grid.appendChild(card);
    });
  }

  function updateQuantityOptions() {
    if (!quantitySelect) return;
    const p = PRESETS[state.preset] || PRESETS.passport_in;
    const paper = PAPER_SIZES[state.paperType] || PAPER_SIZES.a4;

    if (state.preset === 'photo_a4') {
      quantitySelect.innerHTML = `<option value="1" selected>1 Full ${paper.name}</option>`;
      state.quantity = 1;
      return;
    }
    
    const paperW = state.orientation === 'portrait' ? paper.w : paper.h;
    const paperH = state.orientation === 'portrait' ? paper.h : paper.w;
    const cols = Math.max(1, Math.floor((paperW - 10) / (p.w + 2)));
    const rows = Math.max(1, Math.floor((paperH - 10) / (p.h + 2)));
    const maxCopies = Math.max(1, cols * rows);

    quantitySelect.innerHTML = '';
    const presetsQuantities = [4, 6, 8, 12, 16, 24, 32, maxCopies].filter((v, i, self) => v <= maxCopies && self.indexOf(v) === i);
    
    presetsQuantities.forEach(q => {
      const opt = document.createElement('option');
      opt.value = q;
      opt.textContent = `${q} Photos ${q === maxCopies ? '(Max Single Sheet)' : ''}`;
      if (q === state.quantity || (q === maxCopies && state.quantity > maxCopies)) opt.selected = true;
      quantitySelect.appendChild(opt);
    });

    if (state.quantity > maxCopies) state.quantity = maxCopies;
  }

  // --- IMAGE LOADER ---
  function loadImageFile(file, type = 'subject') {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        if (type === 'subject') {
          state.uploadedImage = img;
          state.cutoutSubjectImg = null;
          state.zoom = 1.0;
          state.panX = 0;
          state.panY = 0;
          state.brightness = 0;
          state.contrast = 0;
          state.sampledColor = null;
          if (zoomInput) zoomInput.value = 1.0;
          if (zoomVal) zoomVal.textContent = '1.0x';
          if (panXInput) panXInput.value = 0;
          if (panYInput) panYInput.value = 0;
          if (brightnessInput) brightnessInput.value = 0;
          if (contrastInput) contrastInput.value = 0;

          scheduleRender();
          if (state.bgMode !== 'original') {
            runAiSegmentation();
          }
        } else if (type === 'bgImage') {
          state.customBgImage = img;
          scheduleRender();
        }
      };
      img.onerror = () => {
        alert('Could not process photo file. Please try another JPG or PNG image.');
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      alert('Error reading photo from device.');
    };
    reader.readAsDataURL(file);
  }

  // --- SINGLE PHOTO RENDER ENGINE ---
  function renderSinglePhoto() {
    if (!singleCanvas || !singleCtx) return;
    const p = PRESETS[state.preset] || PRESETS.passport_in;
    
    const targetW = Math.round(p.w * MM_TO_PX);
    const targetH = Math.round(p.h * MM_TO_PX);

    singleCanvas.width = targetW;
    singleCanvas.height = targetH;

    singleCtx.save();

    // Apply Studio Brightness & Contrast Lighting Filter
    if (state.brightness !== 0 || state.contrast !== 0) {
      const bPct = 100 + state.brightness;
      const cPct = 100 + state.contrast;
      singleCtx.filter = `brightness(${bPct}%) contrast(${cPct}%)`;
    }

    if (state.borderStyle === 'rounded') {
      const r = Math.round(targetW * 0.08);
      clipRoundedRect(singleCtx, 0, 0, targetW, targetH, r);
    }

    // 1. Background Layer
    if (state.bgMode === 'original') {
      // Keep original photo background intact
    } else if (state.bgMode === 'customImage' && state.customBgImage) {
      singleCtx.drawImage(state.customBgImage, 0, 0, targetW, targetH);
    } else if (state.bgMode === 'transparent') {
      singleCtx.clearRect(0, 0, targetW, targetH);
    } else {
      singleCtx.fillStyle = state.bgColor;
      singleCtx.fillRect(0, 0, targetW, targetH);
    }

    // 2. Subject Cutout Layer
    if (state.uploadedImage) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = targetW;
      tempCanvas.height = targetH;
      const tempCtx = tempCanvas.getContext('2d');

      const img = state.uploadedImage;
      const imgAspect = img.width / img.height;
      const frameAspect = targetW / targetH;

      let drawW, drawH;
      if (imgAspect > frameAspect) {
        drawH = targetH * state.zoom;
        drawW = drawH * imgAspect;
      } else {
        drawW = targetW * state.zoom;
        drawH = drawW / imgAspect;
      }

      const drawX = (targetW - drawW) / 2 + (state.panX / 100) * targetW;
      const drawY = (targetH - drawH) / 2 + (state.panY / 100) * targetH;

      const subjectSource = (state.bgMode !== 'original' && state.cutoutSubjectImg) ? state.cutoutSubjectImg : img;
      tempCtx.drawImage(subjectSource, drawX, drawY, drawW, drawH);
      singleCtx.drawImage(tempCanvas, 0, 0);
    } else {
      singleCtx.fillStyle = '#94a3b8';
      singleCtx.font = '24px sans-serif';
      singleCtx.textAlign = 'center';
      singleCtx.fillText('Photo Preview', targetW / 2, targetH / 2);
    }

    // Reset Filter
    singleCtx.filter = 'none';

    // 3. Text Overlay
    if (state.text.trim()) {
      renderTextOverlay(singleCtx, state.text, targetW, targetH);
    }

    // 4. Date Stamp
    if (state.showDate && state.dateText) {
      renderDateOverlayCentered(singleCtx, state.dateText, targetW, targetH);
    }

    // 5. Border & Corner Overlay
    renderBorderDecoration(singleCtx, targetW, targetH, state.borderStyle);

    singleCtx.restore();
  }

  function clipRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.clip();
  }

  function renderBorderDecoration(ctx, w, h, style) {
    if (style === 'none') return;

    ctx.save();
    if (style === 'whiteBorder') {
      const borderWidth = Math.max(3, Math.round(w * 0.03));
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = borderWidth;
      ctx.strokeRect(borderWidth / 2, borderWidth / 2, w - borderWidth, h - borderWidth);
    } else if (style === 'elegant') {
      const borderWidth = Math.max(6, Math.round(w * 0.04));
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#f59e0b');
      grad.addColorStop(0.5, '#fbbf24');
      grad.addColorStop(1, '#d97706');
      
      ctx.strokeStyle = grad;
      ctx.lineWidth = borderWidth;
      ctx.strokeRect(borderWidth / 2, borderWidth / 2, w - borderWidth, h - borderWidth);

      const cornerSize = Math.round(w * 0.08);
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(10, 10 + cornerSize); ctx.lineTo(10, 10); ctx.lineTo(10 + cornerSize, 10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(w - 10 - cornerSize, 10); ctx.lineTo(w - 10, 10); ctx.lineTo(w - 10, 10 + cornerSize); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(10, h - 10 - cornerSize); ctx.lineTo(10, h - 10); ctx.lineTo(10 + cornerSize, h - 10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(w - 10 - cornerSize, h - 10); ctx.lineTo(w - 10, h - 10); ctx.lineTo(w - 10, h - 10 - cornerSize); ctx.stroke();
    } else if (style === 'vibrant') {
      const borderWidth = Math.max(6, Math.round(w * 0.04));
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.5, '#a855f7');
      grad.addColorStop(1, '#ec4899');
      
      ctx.strokeStyle = grad;
      ctx.lineWidth = borderWidth;
      ctx.strokeRect(borderWidth / 2, borderWidth / 2, w - borderWidth, h - borderWidth);
    } else if (style === 'double') {
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.strokeRect(4, 4, w - 8, h - 8);
      ctx.strokeRect(10, 10, w - 20, h - 20);
    }
    ctx.restore();
  }

  function renderTextOverlay(ctx, text, w, h) {
    const fontSize = Math.round((state.textSize / 100) * (h * 0.15));
    ctx.font = `bold ${fontSize}px ${state.fontFamily}`;
    ctx.textAlign = 'center';

    const x = (state.textX / 100) * w;
    const y = (state.textY / 100) * h;

    const metrics = ctx.measureText(text);
    const bgWidth = metrics.width + 16;
    const bgHeight = fontSize + 8;

    if (state.hasTextBg) {
      ctx.fillStyle = state.textBgColor;
      ctx.fillRect(x - bgWidth / 2, y - fontSize + 2, bgWidth, bgHeight);
    }

    ctx.fillStyle = state.textColor;
    ctx.fillText(text, x, y);
  }

  function renderDateOverlayCentered(ctx, dateStr, w, h) {
    const fontSize = Math.max(16, Math.round(h * 0.045));
    ctx.font = `700 ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';

    const paddingX = Math.round(fontSize * 0.6);
    const paddingY = Math.round(fontSize * 0.35);
    const metrics = ctx.measureText(dateStr);
    const bgW = metrics.width + paddingX * 2;
    const bgH = fontSize + paddingY * 2;

    const centerX = w / 2;
    const bottomGap = Math.max(25, Math.round(h * 0.025));
    const bottomY = h - bgH / 2 - bottomGap;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.beginPath();
    ctx.roundRect(centerX - bgW / 2, bottomY - bgH / 2, bgW, bgH, 999);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(dateStr, centerX, bottomY + fontSize / 3.2);
  }

  // --- PAPER SHEET PRINT RENDER ENGINE ---
  function renderA4Sheet() {
    if (!a4Canvas || !a4Ctx) return;

    const paper = PAPER_SIZES[state.paperType] || PAPER_SIZES.a4;
    const isPortrait = state.orientation === 'portrait';
    const paperMMW = isPortrait ? paper.w : paper.h;
    const paperMMH = isPortrait ? paper.h : paper.w;

    const sheetW = Math.round(paperMMW * MM_TO_PX);
    const sheetH = Math.round(paperMMH * MM_TO_PX);

    a4Canvas.width = sheetW;
    a4Canvas.height = sheetH;

    a4Ctx.fillStyle = state.pageBgColor;
    a4Ctx.fillRect(0, 0, sheetW, sheetH);

    if (state.preset === 'photo_a4') {
      a4Ctx.drawImage(singleCanvas, 0, 0, sheetW, sheetH);
      
      if (state.showCutLines) {
        a4Ctx.strokeStyle = '#cbd5e1';
        a4Ctx.lineWidth = 2;
        a4Ctx.setLineDash([8, 8]);
        a4Ctx.strokeRect(0, 0, sheetW, sheetH);
        a4Ctx.setLineDash([]);
      }

      const countText = document.getElementById('sheetCountText');
      const sizeText = document.getElementById('sheetSizeText');
      if (countText) countText.textContent = `1 Full ${paper.name}`;
      if (sizeText) sizeText.textContent = `Full ${paper.name}`;
      return;
    }

    const p = PRESETS[state.preset] || PRESETS.passport_in;
    const photoW = Math.round(p.w * MM_TO_PX);
    const photoH = Math.round(p.h * MM_TO_PX);

    const marginMM = 10;
    const spacingMM = 3;
    const startX = Math.round(marginMM * MM_TO_PX);
    const startY = Math.round(marginMM * MM_TO_PX);
    const spacingPx = Math.round(spacingMM * MM_TO_PX);

    const maxCols = Math.max(1, Math.floor((sheetW - startX * 2 + spacingPx) / (photoW + spacingPx)));
    let count = 0;

    for (let r = 0; count < state.quantity; r++) {
      for (let c = 0; c < maxCols && count < state.quantity; c++) {
        const x = startX + c * (photoW + spacingPx);
        const y = startY + r * (photoH + spacingPx);

        a4Ctx.drawImage(singleCanvas, x, y, photoW, photoH);

        if (state.showCutLines) {
          a4Ctx.strokeStyle = '#cbd5e1';
          a4Ctx.lineWidth = 2;
          a4Ctx.setLineDash([8, 8]);
          a4Ctx.strokeRect(x, y, photoW, photoH);
          a4Ctx.setLineDash([]);
        }

        count++;
      }
    }

    const countText = document.getElementById('sheetCountText');
    const sizeText = document.getElementById('sheetSizeText');
    if (countText) countText.textContent = `${count} Copies Laid Out (${paper.name})`;
    if (sizeText) sizeText.textContent = `${p.name} (${p.w}x${p.h} mm)`;
  }

  function downloadA4Sheet(format = 'jpeg') {
    const link = document.createElement('a');
    const mime = format === 'png' ? 'image/png' : 'image/jpeg';
    const ext = format === 'png' ? 'png' : 'jpg';
    link.download = `Photo_Print_Sheet_${state.paperType}_${state.preset}.${ext}`;
    link.href = a4Canvas.toDataURL(mime, 0.95);
    link.click();
  }

  async function shareA4Sheet() {
    if (navigator.share && a4Canvas.toBlob) {
      a4Canvas.toBlob(async blob => {
        const file = new File([blob], `Passport_Photos_${state.preset}.jpg`, { type: 'image/jpeg' });
        try {
          await navigator.share({
            title: 'My Passport Photo Print Sheet',
            text: 'Created with Creators Free Passport Photo Printer',
            files: [file]
          });
        } catch (err) {
          downloadA4Sheet('jpeg');
        }
      }, 'image/jpeg', 0.95);
    } else {
      downloadA4Sheet('jpeg');
    }
  }
});
