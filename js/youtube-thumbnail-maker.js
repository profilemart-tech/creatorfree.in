/**
 * Minimalist YouTube Thumbnail Generator & HD Extractor Engine - creatorsfree.in
 * Features: Unified Layer Stacking (Z-Index Reordering), Client-Side MediaPipe BG Removal, Offline Title Suggester, & Quick Templates.
 */

document.addEventListener('DOMContentLoaded', () => {
  const state = {
    currentVideoId: 'dQw4w9WgXcQ',
    currentImage: null,
    bgColor: '#0f172a',
    
    // Unified Layers Array (Index 0 = Bottom/Back, Index N = Top/Front)
    // Supports both type: 'text' and type: 'photo' layers for 3D depth effects!
    allLayers: [
      {
        id: 'txt_1',
        type: 'text',
        text: '',
        fontFamily: 'Bebas Neue',
        fontSize: 70,
        textColor: '#ffffff',
        bgColor: '#ef4444',
        hasBg: true,
        x: 640,
        y: 120
      },
      {
        id: 'txt_2',
        type: 'text',
        text: '',
        fontFamily: 'Teko',
        fontSize: 85,
        textColor: '#fbbf24',
        bgColor: '#0f172a',
        hasBg: true,
        x: 640,
        y: 230
      }
    ]
  };

  // Dynamic Power-Word Synonym Banks for Real Variety
  const SYNONYM_BANKS = {
    shock: ["चौंक जाओगे", "हैरान हो जाओगे", "यकीन नहीं होगा", "दिमाग घूम जाएगा", "होश उड़ जाएंगे"],
    warning: ["यह गलती मत करना", "भूलकर भी मत करना", "सावधान रहें", "पहले यह देख लो", "वरना पछताओगे"],
    proof: ["100% साबित सच", "असली सच्चाई", "सबका पर्दाफाश", "सीधा लाइव प्रूफ", "ब्रांड न्यू सीक्रेट"],
    emojiShock: ["😱", "🤯", "😲", "🚨"],
    emojiWarning: ["🛑", "⚠️", "🚫", "⚡"],
    emojiFire: ["🔥", "💥", "🚀", "📌"]
  };

  // 30 Categorized High-CTR Title Templates (100% Offline Rule Engine)
  // BUCKET 1: Short-Keyword Safe (1-3 words like "gaming setup", "iPhone 16")
  const SHORT_KEYWORD_TEMPLATES = [
    // Category A: Shock & Curiosity
    "{emojiShock} {keyword} — {shock}!",
    "{emojiShock} {keyword} का असली सच आया सामने!",
    "{emojiFire} {keyword} — बड़ा खुलासा 2026!",
    "{emojiShock} 99% लोग {keyword} में यह नहीं जानते!",
    
    // Category B: Warning & Caution
    "{emojiWarning} {keyword} में यह भारी नुकसान हो सकता है!",
    
    // Category C: List & Proven Rules
    "{emojiFire} 📌 {keyword}: 5 बातें जो आपको पता होनी चाहिए",
    "{emojiFire} 📌 NO.1 {keyword} Guide in Hindi 2026",
    "{emojiFire} 📌 Best 4 Tips for {keyword}",
    "{emojiFire} 📌 {keyword} का Step-by-Step फार्मूला",

    // Category D: Comparison & Truth
    "{emojiFire} {keyword}: Real Truth Exposed!",
    "{emojiFire} {keyword} — Worth It Or Waste Of Money?",
    "{emojiFire} Honest Review: {keyword}",

    // Category E: Personal Storytelling
    "{emojiFire} {keyword} का मेरा 30 दिनों का अनुभव",
    "{emojiFire} MY 1-YEAR EXPERIENCE WITH {keyword}",
    "{emojiFire} {keyword} के बाद मेरी लाइफ बदल गई!",
    "{emojiFire} {keyword} पर मेरी इमानदार राय",
    "{emojiFire} How I Mastered {keyword} in 7 Days"
  ];

  // BUCKET 2: Phrase & Question Safe (4+ words or full questions like "konsa phone lu")
  const PHRASE_KEYWORD_TEMPLATES = [
    // Category A: Shock & Curiosity
    "{emojiFire} सच जानकर {shock} — {keyword}!",
    "{emojiShock} {keyword}: जो कोई नहीं बताता!",

    // Category B: Warning & Caution
    "{emojiWarning} {warning} — {keyword}!",
    "{emojiWarning} {keyword} से पहले यह ज़रूर देखें!",
    "{emojiWarning} {keyword}? 3 सबसे बड़ी गलतियां!",
    "{emojiWarning} भूलकर भी मत करना — {keyword}!",
    "{emojiWarning} STOP! {keyword} करने से पहले सावधान!",

    // Category C: List & Proven Rules
    "{emojiFire} 📌 5 BIG RULES: {keyword}",
    "{emojiFire} 📌 Top 3 Secret Hacks: {keyword}",

    // Category D: Comparison & Truth
    "{emojiFire} {keyword} — सही या गलत? {proof}",
    "{emojiFire} {keyword} का सच vs झूठ!",
    "{emojiFire} क्या {keyword} वाकई काम करता है?",

    // Category E: Personal Storytelling
    "{emojiFire} मैंने {keyword} ट्राई किया, फिर यह हुआ..."
  ];

  // Quick Niche Templates Config Objects
  const QUICK_TEMPLATES = {
    gaming: [
      { id: 'txt_1', type: 'text', text: 'EPIC GAMING', fontFamily: 'Bebas Neue', fontSize: 90, textColor: '#ffffff', bgColor: '#ef4444', hasBg: true, x: 640, y: 120 },
      { id: 'txt_2', type: 'text', text: '100% UNBEATABLE', fontFamily: 'Anton', fontSize: 65, textColor: '#fbbf24', bgColor: '#0f172a', hasBg: true, x: 640, y: 240 }
    ],
    vlog: [
      { id: 'txt_1', type: 'text', text: 'MY DAILY VLOG', fontFamily: 'Teko', fontSize: 85, textColor: '#0f172a', bgColor: '#fbbf24', hasBg: true, x: 640, y: 120 },
      { id: 'txt_2', type: 'text', text: 'सच आया सामने 🔥', fontFamily: 'Rozha One', fontSize: 60, textColor: '#ffffff', bgColor: '#ef4444', hasBg: true, x: 640, y: 230 }
    ],
    tutorial: [
      { id: 'txt_1', type: 'text', text: 'STEP-BY-STEP GUIDE', fontFamily: 'Montserrat', fontSize: 70, textColor: '#ffffff', bgColor: '#0284c7', hasBg: true, x: 640, y: 120 },
      { id: 'txt_2', type: 'text', text: '100% FREE METHOD', fontFamily: 'Bebas Neue', fontSize: 60, textColor: '#fbbf24', bgColor: '#0f172a', hasBg: true, x: 640, y: 220 }
    ],
    devotional: [
      { id: 'txt_1', type: 'text', text: 'जय श्री राम 🛕', fontFamily: 'Rozha One', fontSize: 75, textColor: '#ffffff', bgColor: '#d97706', hasBg: true, x: 640, y: 130 },
      { id: 'txt_2', type: 'text', text: 'पावन दर्शन 2026', fontFamily: 'Teko', fontSize: 70, textColor: '#fbbf24', bgColor: '#0f172a', hasBg: true, x: 640, y: 240 }
    ],
    tech: [
      { id: 'txt_1', type: 'text', text: 'DON\'T BUY THIS!', fontFamily: 'Anton', fontSize: 80, textColor: '#ffffff', bgColor: '#ef4444', hasBg: true, x: 640, y: 120 },
      { id: 'txt_2', type: 'text', text: 'FULL TRUTH EXPOSED', fontFamily: 'Montserrat', fontSize: 55, textColor: '#38bdf8', bgColor: '#0f172a', hasBg: true, x: 640, y: 230 }
    ],
    comedy: [
      { id: 'txt_1', type: 'text', text: 'यह क्या हो गया?! 😱', fontFamily: 'Teko', fontSize: 85, textColor: '#0f172a', bgColor: '#f97316', hasBg: true, x: 640, y: 120 },
      { id: 'txt_2', type: 'text', text: 'FUNNIEST MOMENT', fontFamily: 'Bebas Neue', fontSize: 65, textColor: '#ffffff', bgColor: '#ef4444', hasBg: true, x: 640, y: 230 }
    ]
  };

  // DOM Handles
  const ytCanvas = document.getElementById('ytCanvas');
  const ytCtx = ytCanvas ? ytCanvas.getContext('2d') : null;

  const ytUrlInput = document.getElementById('ytUrlInput');
  const btnFetchThumbnail = document.getElementById('btnFetchThumbnail');
  const customBgInput = document.getElementById('customBgInput');
  
  const btnAddTextLayer = document.getElementById('btnAddTextLayer');
  const textLayerListContainer = document.getElementById('textLayerListContainer');

  const multiCutoutInput = document.getElementById('multiCutoutInput');
  const layerListContainer = document.getElementById('layerListContainer');

  const btnDownloadHd = document.getElementById('btnDownloadHd');

  const topicInput = document.getElementById('topicInput');
  const btnSuggestTitles = document.getElementById('btnSuggestTitles');
  const btnRegenerateTitles = document.getElementById('btnRegenerateTitles');

  init();

  function init() {
    setupEventListeners();
    renderTextLayerListUI();
    renderLayerListUI();

    // Default initial thumbnail load
    fetchThumbnailFromUrl();
  }

  function setupEventListeners() {
    if (btnFetchThumbnail) {
      btnFetchThumbnail.addEventListener('click', () => fetchThumbnailFromUrl());
    }

    if (ytUrlInput) {
      ytUrlInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') fetchThumbnailFromUrl();
      });
    }

    if (customBgInput) {
      customBgInput.addEventListener('change', e => {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = ev => {
            const img = new Image();
            img.onload = () => {
              state.currentImage = img;
              renderCanvas();
            };
            img.src = ev.target.result;
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }

    // MULTI-CUTOUT UPLOAD & AUTO BG REMOVAL
    if (multiCutoutInput) {
      multiCutoutInput.addEventListener('change', e => {
        if (e.target.files && e.target.files.length > 0) {
          Array.from(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = ev => {
              const img = new Image();
              img.onload = () => {
                const defaultW = 320;
                const aspect = img.height / img.width;
                const defaultH = defaultW * aspect;

                const newLayer = {
                  id: 'layer_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                  type: 'photo',
                  name: file.name || 'Cutout Photo',
                  img: img,
                  x: 1280 / 2 - defaultW / 2,
                  y: 720 - defaultH,
                  width: defaultW,
                  height: defaultH
                };

                state.allLayers.push(newLayer);
                renderLayerListUI();
                renderCanvas();
              };
              img.src = ev.target.result;
            };
            reader.readAsDataURL(file);
          });
        }
      });
    }

    if (btnSuggestTitles) {
      btnSuggestTitles.addEventListener('click', suggestHighCtrTitles);
    }

    if (btnRegenerateTitles) {
      btnRegenerateTitles.addEventListener('click', suggestHighCtrTitles);
    }

    if (topicInput) {
      topicInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') suggestHighCtrTitles();
      });
    }

    document.querySelectorAll('.quick-template-card').forEach(card => {
      card.addEventListener('click', () => {
        const presetKey = card.dataset.preset;
        if (QUICK_TEMPLATES[presetKey]) {
          // Keep photo layers, replace text layers
          const photoLayers = state.allLayers.filter(l => l.type === 'photo');
          const newTextLayers = JSON.parse(JSON.stringify(QUICK_TEMPLATES[presetKey]));
          state.allLayers = [...newTextLayers, ...photoLayers];
          renderTextLayerListUI();
          renderLayerListUI();
          renderCanvas();
        }
      });
    });

    if (btnAddTextLayer) {
      btnAddTextLayer.addEventListener('click', (e) => {
        e.preventDefault();
        const textCount = state.allLayers.filter(l => l.type === 'text').length + 1;
        const fontList = ['Bebas Neue', 'Teko', 'Rozha One', 'Montserrat', 'Poppins', 'Anton'];
        const chosenFont = fontList[(textCount - 1) % fontList.length];

        const newText = {
          id: 'txt_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
          type: 'text',
          text: '',
          fontFamily: chosenFont,
          fontSize: 64,
          textColor: textCount % 2 === 0 ? '#fbbf24' : '#ffffff',
          bgColor: textCount % 2 === 0 ? '#0f172a' : '#ef4444',
          hasBg: true,
          x: 640,
          y: Math.min(640, 100 + ((textCount - 1) * 95))
        };

        state.allLayers.push(newText);
        renderTextLayerListUI();
        renderCanvas();

        setTimeout(() => {
          if (textLayerListContainer) {
            const newlyAddedInput = textLayerListContainer.querySelector(`.input-text-val[data-id="${newText.id}"]`);
            if (newlyAddedInput) {
              newlyAddedInput.focus();
            }
          }
        }, 50);
      });
    }

    if (btnDownloadHd) {
      btnDownloadHd.addEventListener('click', downloadCanvasImage);
    }
  }

  // UNIFIED LAYER STACKING CONTROLS (Z-INDEX REORDERING)
  function moveLayerTop(id) {
    const idx = state.allLayers.findIndex(l => l.id === id);
    if (idx === -1 || idx === state.allLayers.length - 1) return;
    const item = state.allLayers.splice(idx, 1)[0];
    state.allLayers.push(item);
    renderAllLayerUIs();
  }

  function moveLayerBottom(id) {
    const idx = state.allLayers.findIndex(l => l.id === id);
    if (idx === -1 || idx === 0) return;
    const item = state.allLayers.splice(idx, 1)[0];
    state.allLayers.unshift(item);
    renderAllLayerUIs();
  }

  function moveLayerStepUp(id) {
    const idx = state.allLayers.findIndex(l => l.id === id);
    if (idx === -1 || idx === state.allLayers.length - 1) return;
    const temp = state.allLayers[idx];
    state.allLayers[idx] = state.allLayers[idx + 1];
    state.allLayers[idx + 1] = temp;
    renderAllLayerUIs();
  }

  function moveLayerStepDown(id) {
    const idx = state.allLayers.findIndex(l => l.id === id);
    if (idx === -1 || idx === 0) return;
    const temp = state.allLayers[idx];
    state.allLayers[idx] = state.allLayers[idx - 1];
    state.allLayers[idx - 1] = temp;
    renderAllLayerUIs();
  }

  function renderAllLayerUIs() {
    renderTextLayerListUI();
    renderLayerListUI();
    renderCanvas();
  }

  // MEDIAPIPE LAZY SCRIPT LOADER & BG REMOVER
  let selfieSegmentation = null;
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
        reject(new Error('Failed to load MediaPipe script'));
      };
      document.head.appendChild(script);
    });
  }

  async function processBackgroundRemoval(layerId) {
    const layer = state.allLayers.find(l => l.id === layerId);
    if (!layer || !layer.img) return;

    const statusBox = document.getElementById('bgRemoveStatus');
    const statusText = document.getElementById('bgRemoveStatusText');

    if (statusBox) statusBox.style.display = 'block';
    if (statusText) statusText.textContent = '⚡ Downloading AI Model... (~1-3s)';

    try {
      await loadMediaPipeScript();

      if (!selfieSegmentation) {
        selfieSegmentation = new window.SelfieSegmentation({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
        });
        selfieSegmentation.setOptions({
          modelSelection: 1 // Landscape mode (high accuracy)
        });
      }

      if (statusText) statusText.textContent = '⚡ Removing Background...';

      selfieSegmentation.onResults((results) => {
        try {
          const offCanvas = document.createElement('canvas');
          const w = layer.img.naturalWidth || layer.img.width || 640;
          const h = layer.img.naturalHeight || layer.img.height || 640;
          offCanvas.width = w;
          offCanvas.height = h;

          const ctx = offCanvas.getContext('2d');
          ctx.drawImage(results.segmentationMask, 0, 0, w, h);
          ctx.globalCompositeOperation = 'source-in';
          ctx.drawImage(layer.img, 0, 0, w, h);

          const cutoutImg = new Image();
          cutoutImg.onload = () => {
            layer.img = cutoutImg;
            layer.name = '✨ BG Removed Photo';
            if (statusBox) statusBox.style.display = 'none';
            renderLayerListUI();
            renderCanvas();
          };
          cutoutImg.src = offCanvas.toDataURL('image/png');
        } catch (err) {
          if (statusText) statusText.textContent = '⚠️ Error processing photo. Keeping original.';
          setTimeout(() => { if (statusBox) statusBox.style.display = 'none'; }, 2500);
        }
      });

      await selfieSegmentation.send({ image: layer.img });
    } catch (e) {
      if (statusText) statusText.textContent = '⚠️ Network offline. Background removal unavailable.';
      setTimeout(() => { if (statusBox) statusBox.style.display = 'none'; }, 3000);
    }
  }

  // SMART TITLE GENERATOR FUNCTION (Fisher-Yates Shuffle & Synonym Banks)
  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function fisherYatesShuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function suggestHighCtrTitles() {
    const topicInput = document.getElementById('topicInput');
    const container = document.getElementById('suggestedTitleChips');
    if (!container) return;

    const raw = topicInput ? topicInput.value.trim() : '';
    const kw = raw ? raw.toUpperCase() : 'SECRET';

    // Step 3: Keyword Type Detection (Grammar Protection)
    const wordCount = raw.split(/\s+/).filter(Boolean).length;
    const isQuestionPhrase = /(kaise|konsa|kon|kyun|kya|kaun|how|what|why|which)/i.test(raw);
    const isPhrase = wordCount >= 4 || isQuestionPhrase;

    // Pick candidate pool based on grammar bucket
    const pool = isPhrase 
      ? [...PHRASE_KEYWORD_TEMPLATES]
      : [...PHRASE_KEYWORD_TEMPLATES, ...SHORT_KEYWORD_TEMPLATES];

    // Fisher-Yates Shuffle for true non-repeating randomness
    const shuffled = fisherYatesShuffle(pool);
    const selected = shuffled.slice(0, 4);

    let html = '';
    selected.forEach(tmpl => {
      let phrase = tmpl.replace('{keyword}', kw)
        .replace('{shock}', getRandomItem(SYNONYM_BANKS.shock))
        .replace('{warning}', getRandomItem(SYNONYM_BANKS.warning))
        .replace('{proof}', getRandomItem(SYNONYM_BANKS.proof))
        .replace('{emojiShock}', getRandomItem(SYNONYM_BANKS.emojiShock))
        .replace('{emojiWarning}', getRandomItem(SYNONYM_BANKS.emojiWarning))
        .replace('{emojiFire}', getRandomItem(SYNONYM_BANKS.emojiFire));

      html += `<div class="title-chip" data-text="${phrase}">${phrase}</div>`;
    });

    container.innerHTML = html;

    container.querySelectorAll('.title-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.dataset.text;
        const textLayers = state.allLayers.filter(l => l.type === 'text');
        const emptyLayer = textLayers.find(l => !l.text || !l.text.trim());

        if (emptyLayer) {
          emptyLayer.text = text;
        } else {
          state.allLayers.push({
            id: 'txt_' + Date.now(),
            type: 'text',
            text: text,
            fontFamily: 'Teko',
            fontSize: 75,
            textColor: '#0f172a',
            bgColor: '#fbbf24',
            hasBg: true,
            x: 640,
            y: 150
          });
        }
        renderTextLayerListUI();
        renderCanvas();
      });
    });
  }

  function extractVideoId(input) {
    if (!input || !input.trim()) return 'dQw4w9WgXcQ';
    const str = input.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
    const match = str.match(/(?:v=|\/shorts\/|\/live\/|youtu\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
    if (match && match[1]) return match[1];
    return 'dQw4w9WgXcQ';
  }

  function fetchThumbnailFromUrl() {
    const raw = ytUrlInput ? ytUrlInput.value : '';
    const videoId = extractVideoId(raw);
    state.currentVideoId = videoId;

    const maxUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    const hqUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      state.currentImage = img;
      renderCanvas();
    };
    img.onerror = () => {
      const fallbackImg = new Image();
      fallbackImg.crossOrigin = 'anonymous';
      fallbackImg.onload = () => {
        state.currentImage = fallbackImg;
        renderCanvas();
      };
      fallbackImg.src = hqUrl;
    };
    img.src = maxUrl;
  }

  // RENDER CANVAS (UNIFIED LAYER STACKING IN EXACT ARRAY ORDER)
  function renderCanvas() {
    if (!ytCanvas || !ytCtx) return;

    ytCtx.save();
    ytCtx.clearRect(0, 0, 1280, 720);

    // 1. Background
    if (state.currentImage) {
      ytCtx.drawImage(state.currentImage, 0, 0, 1280, 720);
    } else {
      ytCtx.fillStyle = '#0f172a';
      ytCtx.fillRect(0, 0, 1280, 720);
    }

    // 2. Draw ALL Layers in Unified Z-Order Sequence
    state.allLayers.forEach(layer => {
      if (layer.type === 'photo') {
        if (layer.img) {
          ytCtx.drawImage(layer.img, layer.x, layer.y, layer.width, layer.height);
        }
      } else if (layer.type === 'text') {
        renderSingleTextLayer(layer);
      }
    });

    ytCtx.restore();
  }

  function renderSingleTextLayer(layer) {
    if (layer.text === undefined || layer.text === null || layer.text === '') return;

    const text = layer.text;
    const fontSize = layer.fontSize || 64;
    const fontFamily = layer.fontFamily || 'Bebas Neue';

    ytCtx.save();
    ytCtx.font = `900 ${fontSize}px "${fontFamily}", "Noto Sans Devanagari", Impact, sans-serif`;
    ytCtx.textAlign = 'center';
    ytCtx.textBaseline = 'middle';

    const metrics = ytCtx.measureText(text);
    const padX = Math.round(fontSize * 0.4);
    const padY = Math.round(fontSize * 0.25);
    const bgW = metrics.width + padX * 2;
    const bgH = fontSize + padY * 2;

    if (layer.hasBg) {
      ytCtx.save();
      ytCtx.fillStyle = layer.bgColor || '#ef4444';
      ytCtx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ytCtx.shadowBlur = 10;

      const rx = layer.x - bgW / 2;
      const ry = layer.y - bgH / 2;
      const radius = Math.min(12, fontSize * 0.2);

      ytCtx.beginPath();
      if (ytCtx.roundRect) {
        ytCtx.roundRect(rx, ry, bgW, bgH, radius);
      } else {
        ytCtx.rect(rx, ry, bgW, bgH);
      }
      ytCtx.fill();
      ytCtx.restore();
    }

    ytCtx.strokeStyle = '#000000';
    ytCtx.lineWidth = Math.max(6, Math.round(fontSize * 0.15));
    ytCtx.lineJoin = 'round';
    ytCtx.miterLimit = 2;
    ytCtx.strokeText(text, layer.x, layer.y);

    ytCtx.fillStyle = layer.textColor || '#ffffff';
    ytCtx.fillText(text, layer.x, layer.y);

    ytCtx.restore();
  }

  function renderTextLayerListUI() {
    if (!textLayerListContainer) return;

    const textLayers = state.allLayers.filter(l => l.type === 'text');
    if (textLayers.length === 0) {
      textLayerListContainer.innerHTML = `<div style="font-size:0.8rem; color:#94a3b8; text-align:center; padding:8px;">Tap "➕ Add Text" to add headline overlays!</div>`;
      return;
    }

    let html = '';
    textLayers.forEach((layer, idx) => {
      const overallIndex = state.allLayers.findIndex(l => l.id === layer.id);
      const totalCount = state.allLayers.length;

      html += `
        <div style="background:#1e293b; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-weight:700; font-size:0.82rem; color:#fbbf24;">Headline #${idx + 1} (Order: ${overallIndex + 1}/${totalCount})</span>
            
            <!-- Unified Layer Z-Ordering Buttons -->
            <div style="display:flex; gap:4px; flex-wrap:wrap;">
              <button type="button" class="btn-z-top" data-id="${layer.id}" style="background:#334155; color:#fff; border:none; border-radius:4px; padding:2px 5px; font-size:0.7rem; font-weight:700; cursor:pointer;" title="Bring to Front (Over Cutouts)">🔝 Front</button>
              <button type="button" class="btn-z-up" data-id="${layer.id}" style="background:#334155; color:#fff; border:none; border-radius:4px; padding:2px 5px; font-size:0.7rem; font-weight:700; cursor:pointer;" title="Move Step Up">⬆️</button>
              <button type="button" class="btn-z-down" data-id="${layer.id}" style="background:#334155; color:#fff; border:none; border-radius:4px; padding:2px 5px; font-size:0.7rem; font-weight:700; cursor:pointer;" title="Move Step Down">⬇️</button>
              <button type="button" class="btn-z-bottom" data-id="${layer.id}" style="background:#334155; color:#fff; border:none; border-radius:4px; padding:2px 5px; font-size:0.7rem; font-weight:700; cursor:pointer;" title="Send to Back (Behind Cutouts)">🔻 Back</button>
              <button type="button" class="btn-text-del" data-id="${layer.id}" style="background:#ef4444; color:#fff; border:none; border-radius:4px; padding:2px 5px; font-size:0.7rem; cursor:pointer;" title="Delete Layer">🗑️</button>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:6px;">
            <input type="text" class="input-text-val tool-input" data-id="${layer.id}" value="${layer.text}" placeholder="Type text here (Hindi / English)..." style="padding:6px 8px; font-weight:700;">
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
              <div>
                <label style="font-size:0.7rem; color:#94a3b8;">Font</label>
                <select class="select-text-font tool-input" data-id="${layer.id}" style="padding:4px; font-size:0.78rem;">
                  <option value="Bebas Neue" ${layer.fontFamily === 'Bebas Neue' ? 'selected' : ''}>Bebas Neue</option>
                  <option value="Teko" ${layer.fontFamily === 'Teko' ? 'selected' : ''}>Teko (Hindi/Eng)</option>
                  <option value="Rozha One" ${layer.fontFamily === 'Rozha One' ? 'selected' : ''}>Rozha One (Serif)</option>
                  <option value="Montserrat" ${layer.fontFamily === 'Montserrat' ? 'selected' : ''}>Montserrat</option>
                  <option value="Poppins" ${layer.fontFamily === 'Poppins' ? 'selected' : ''}>Poppins</option>
                  <option value="Anton" ${layer.fontFamily === 'Anton' ? 'selected' : ''}>Anton</option>
                </select>
              </div>

              <div>
                <label style="font-size:0.7rem; color:#94a3b8;">Size: ${layer.fontSize}px</label>
                <input type="range" class="input-text-size" data-id="${layer.id}" min="20" max="130" value="${layer.fontSize}" style="width:100%;">
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
              <div>
                <label style="font-size:0.7rem; color:#94a3b8;">Text Color</label>
                <input type="color" class="input-text-color" data-id="${layer.id}" value="${layer.textColor}" style="width:100%; height:26px; border:none; background:none; cursor:pointer;">
              </div>
              <div>
                <label style="font-size:0.7rem; color:#94a3b8;">Box Color</label>
                <input type="color" class="input-bg-color" data-id="${layer.id}" value="${layer.bgColor}" style="width:100%; height:26px; border:none; background:none; cursor:pointer;">
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
              <div>
                <label style="font-size:0.7rem; color:#94a3b8;">X Pos: ${Math.round(layer.x)}</label>
                <input type="range" class="input-text-x" data-id="${layer.id}" min="50" max="1230" value="${Math.round(layer.x)}" style="width:100%;">
              </div>
              <div>
                <label style="font-size:0.7rem; color:#94a3b8;">Y Pos: ${Math.round(layer.y)}</label>
                <input type="range" class="input-text-y" data-id="${layer.id}" min="40" max="680" value="${Math.round(layer.y)}" style="width:100%;">
              </div>
            </div>
          </div>
        </div>
      `;
    });

    textLayerListContainer.innerHTML = html;

    // Attach Z-Ordering & Control listeners
    textLayerListContainer.querySelectorAll('.btn-z-top').forEach(btn => btn.addEventListener('click', () => moveLayerTop(btn.dataset.id)));
    textLayerListContainer.querySelectorAll('.btn-z-up').forEach(btn => btn.addEventListener('click', () => moveLayerStepUp(btn.dataset.id)));
    textLayerListContainer.querySelectorAll('.btn-z-down').forEach(btn => btn.addEventListener('click', () => moveLayerStepDown(btn.dataset.id)));
    textLayerListContainer.querySelectorAll('.btn-z-bottom').forEach(btn => btn.addEventListener('click', () => moveLayerBottom(btn.dataset.id)));

    textLayerListContainer.querySelectorAll('.btn-text-del').forEach(btn => {
      btn.addEventListener('click', () => {
        state.allLayers = state.allLayers.filter(t => t.id !== btn.dataset.id);
        renderAllLayerUIs();
      });
    });

    textLayerListContainer.querySelectorAll('.input-text-val').forEach(input => {
      input.addEventListener('input', e => {
        const layer = state.allLayers.find(t => t.id === input.dataset.id);
        if (layer) { layer.text = e.target.value; renderCanvas(); }
      });
    });

    textLayerListContainer.querySelectorAll('.select-text-font').forEach(sel => {
      sel.addEventListener('change', e => {
        const layer = state.allLayers.find(t => t.id === sel.dataset.id);
        if (layer) { layer.fontFamily = e.target.value; renderCanvas(); }
      });
    });

    textLayerListContainer.querySelectorAll('.input-text-size').forEach(input => {
      input.addEventListener('input', e => {
        const layer = state.allLayers.find(t => t.id === input.dataset.id);
        if (layer) { layer.fontSize = parseInt(e.target.value); renderCanvas(); }
      });
    });

    textLayerListContainer.querySelectorAll('.input-text-color').forEach(input => {
      input.addEventListener('input', e => {
        const layer = state.allLayers.find(t => t.id === input.dataset.id);
        if (layer) { layer.textColor = e.target.value; renderCanvas(); }
      });
    });

    textLayerListContainer.querySelectorAll('.input-bg-color').forEach(input => {
      input.addEventListener('input', e => {
        const layer = state.allLayers.find(t => t.id === input.dataset.id);
        if (layer) { layer.bgColor = e.target.value; renderCanvas(); }
      });
    });

    textLayerListContainer.querySelectorAll('.input-text-x').forEach(input => {
      input.addEventListener('input', e => {
        const layer = state.allLayers.find(t => t.id === input.dataset.id);
        if (layer) { layer.x = parseInt(e.target.value); renderCanvas(); }
      });
    });

    textLayerListContainer.querySelectorAll('.input-text-y').forEach(input => {
      input.addEventListener('input', e => {
        const layer = state.allLayers.find(t => t.id === input.dataset.id);
        if (layer) { layer.y = parseInt(e.target.value); renderCanvas(); }
      });
    });
  }

  function renderLayerListUI() {
    if (!layerListContainer) return;

    const photoLayers = state.allLayers.filter(l => l.type === 'photo');
    if (photoLayers.length === 0) {
      layerListContainer.innerHTML = `<div style="font-size:0.8rem; color:#94a3b8; text-align:center; padding:6px;">No photo cutouts added.</div>`;
      return;
    }

    let html = '';
    photoLayers.forEach((layer, idx) => {
      const overallIndex = state.allLayers.findIndex(l => l.id === layer.id);
      const totalCount = state.allLayers.length;

      html += `
        <div style="background:#1e293b; border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-weight:700; font-size:0.8rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:140px;">${layer.name || 'Photo Layer ' + (idx + 1)} (Order: ${overallIndex + 1}/${totalCount})</span>
            
            <div style="display:flex; gap:4px; flex-wrap:wrap;">
              <button type="button" class="btn-remove-bg" data-id="${layer.id}" style="background:#3DDC84; color:#0f172a; border:none; border-radius:4px; padding:2px 5px; font-weight:800; font-size:0.7rem; cursor:pointer;" title="Remove Background via MediaPipe AI">✨ Remove BG</button>
              <button type="button" class="btn-z-top" data-id="${layer.id}" style="background:#334155; color:#fff; border:none; border-radius:4px; padding:2px 5px; font-size:0.7rem; font-weight:700; cursor:pointer;" title="Bring Front (In Front of Text)">🔝 Front</button>
              <button type="button" class="btn-z-up" data-id="${layer.id}" style="background:#334155; color:#fff; border:none; border-radius:4px; padding:2px 5px; font-size:0.7rem; font-weight:700; cursor:pointer;" title="Move Up">⬆️</button>
              <button type="button" class="btn-z-down" data-id="${layer.id}" style="background:#334155; color:#fff; border:none; border-radius:4px; padding:2px 5px; font-size:0.7rem; font-weight:700; cursor:pointer;" title="Move Down">⬇️</button>
              <button type="button" class="btn-z-bottom" data-id="${layer.id}" style="background:#334155; color:#fff; border:none; border-radius:4px; padding:2px 5px; font-size:0.7rem; font-weight:700; cursor:pointer;" title="Send Back (Behind Text)">🔻 Back</button>
              <button type="button" class="btn-layer-del" data-id="${layer.id}" style="background:#ef4444; color:#fff; border:none; border-radius:4px; padding:2px 5px; font-size:0.7rem; cursor:pointer;" title="Delete Cutout">🗑️</button>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px;">
            <div>
              <label style="font-size:0.68rem; color:#94a3b8;">Size</label>
              <input type="range" class="input-layer-size" data-id="${layer.id}" min="100" max="1000" value="${Math.round(layer.width)}" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.68rem; color:#94a3b8;">X Pos</label>
              <input type="range" class="input-layer-x" data-id="${layer.id}" min="-300" max="1200" value="${Math.round(layer.x)}" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.68rem; color:#94a3b8;">Y Pos</label>
              <input type="range" class="input-layer-y" data-id="${layer.id}" min="-300" max="720" value="${Math.round(layer.y)}" style="width:100%;">
            </div>
          </div>
        </div>
      `;
    });

    layerListContainer.innerHTML = html;

    // Attach Z-Ordering & BG Removal listeners
    layerListContainer.querySelectorAll('.btn-remove-bg').forEach(btn => btn.addEventListener('click', () => processBackgroundRemoval(btn.dataset.id)));
    layerListContainer.querySelectorAll('.btn-z-top').forEach(btn => btn.addEventListener('click', () => moveLayerTop(btn.dataset.id)));
    layerListContainer.querySelectorAll('.btn-z-up').forEach(btn => btn.addEventListener('click', () => moveLayerStepUp(btn.dataset.id)));
    layerListContainer.querySelectorAll('.btn-z-down').forEach(btn => btn.addEventListener('click', () => moveLayerStepDown(btn.dataset.id)));
    layerListContainer.querySelectorAll('.btn-z-bottom').forEach(btn => btn.addEventListener('click', () => moveLayerBottom(btn.dataset.id)));

    layerListContainer.querySelectorAll('.btn-layer-del').forEach(btn => {
      btn.addEventListener('click', () => {
        state.allLayers = state.allLayers.filter(l => l.id !== btn.dataset.id);
        renderAllLayerUIs();
      });
    });

    layerListContainer.querySelectorAll('.input-layer-size').forEach(input => {
      input.addEventListener('input', e => {
        const layer = state.allLayers.find(l => l.id === input.dataset.id);
        if (layer) {
          const aspect = layer.img.height / layer.img.width;
          layer.width = parseInt(e.target.value);
          layer.height = layer.width * aspect;
          renderCanvas();
        }
      });
    });

    layerListContainer.querySelectorAll('.input-layer-x').forEach(input => {
      input.addEventListener('input', e => {
        const layer = state.allLayers.find(l => l.id === input.dataset.id);
        if (layer) { layer.x = parseInt(e.target.value); renderCanvas(); }
      });
    });

    layerListContainer.querySelectorAll('.input-layer-y').forEach(input => {
      input.addEventListener('input', e => {
        const layer = state.allLayers.find(l => l.id === input.dataset.id);
        if (layer) { layer.y = parseInt(e.target.value); renderCanvas(); }
      });
    });
  }

  function downloadCanvasImage() {
    if (!ytCanvas) return;
    try {
      const link = document.createElement('a');
      link.download = `YouTube_Thumbnail_${state.currentVideoId}.jpg`;
      link.href = ytCanvas.toDataURL('image/jpeg', 0.95);
      link.click();
    } catch (e) {
      alert('Could not export image directly. Try right-clicking the canvas to save.');
    }
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => renderCanvas());
  }
});
