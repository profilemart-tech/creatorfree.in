/**
 * Independence Day Social Media Template & Graphics Engine - creatorsfree.in
 * Zero-form readymade poster templates with live canvas preview, 1-click photo & logo upload.
 */

document.addEventListener('DOMContentLoaded', () => {
  // State Data Model
  const state = {
    template: 'tiranga_card', // 'tiranga_card', 'golden_chakra', 'proud_leader', 'clean_story'
    wishText: '78वें स्वतंत्रता दिवस की हार्दिक शुभकामनाएं! 🇮🇳',
    name: 'Rajesh Kumar',
    designation: 'Founder & Owner @ Tech Store',
    photoUrl: '',
    logoUrl: '',
    photoScale: 100,
    photoX: 0,
    photoY: 0
  };

  // DOM Elements
  const canvas = document.getElementById('posterCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const templateCards = document.querySelectorAll('.template-card');
  const userPhotoInput = document.getElementById('userPhotoInput');
  const logoPhotoInput = document.getElementById('logoPhotoInput');
  const nameInput = document.getElementById('nameInput');
  const desigInput = document.getElementById('desigInput');
  const wishTextInput = document.getElementById('wishTextInput');
  const wishChips = document.querySelectorAll('.wish-chip');
  
  const photoScaleSlider = document.getElementById('photoScaleSlider');
  const photoXSlider = document.getElementById('photoXSlider');
  const photoYSlider = document.getElementById('photoYSlider');
  
  const btnDownloadPng = document.getElementById('btnDownloadPng');
  const btnDownloadJpg = document.getElementById('btnDownloadJpg');
  const btnSharePoster = document.getElementById('btnSharePoster');

  // Loaded Image Instances
  const userImg = new Image();
  const logoImg = new Image();
  let isUserImgLoaded = false;
  let isLogoImgLoaded = false;

  // SAMPLE PRESET WISHES
  const PRESET_WISHES = [
    '78वें स्वतंत्रता दिवस की हार्दिक शुभकामनाएं! 🇮🇳',
    'Celebrating 78 Years of Freedom - Proud to be an Indian! 🇮🇳',
    'स्वतंत्र भारत, समृद्ध भारत! जय हिंद, जय भारत! 🚩',
    'Salute to the Freedom Fighters & Heroes of our Nation! 🇮🇳',
    'Happy Independence Day! May our tricolor fly high forever. 🕊️'
  ];

  init();

  function init() {
    setupTemplateSelector();
    setupInputs();
    setupWishChips();
    setupImageLoaders();
    setupExportButtons();
    setupLightbox();

    // Default Sample Avatar Generator
    createSampleAvatar();

    renderCanvas();
  }

  // SETUP FULLSCREEN LIGHTBOX PREVIEW POPUP
  function setupLightbox() {
    const wrapper = document.getElementById('canvasWrapper');
    const hintBtn = document.getElementById('btnFullscreenHint');
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxCloseBtn');

    if (!wrapper || !modal || !modalImg) return;

    function openLightbox() {
      modalImg.src = canvas.toDataURL('image/png');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    wrapper.addEventListener('click', openLightbox);
    if (hintBtn) hintBtn.addEventListener('click', openLightbox);

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // CREATE DEFAULT SAMPLE USER AVATAR CANVAS
  function createSampleAvatar() {
    const avatarCanvas = document.createElement('canvas');
    avatarCanvas.width = 300;
    avatarCanvas.height = 300;
    const actx = avatarCanvas.getContext('2d');

    // Background gradient
    const grad = actx.createLinearGradient(0, 0, 300, 300);
    grad.addColorStop(0, '#38bdf8');
    grad.addColorStop(1, '#1e3a8a');
    actx.fillStyle = grad;
    actx.fillRect(0, 0, 300, 300);

    // Draw user icon silhouette
    actx.fillStyle = '#ffffff';
    actx.beginPath();
    actx.arc(150, 110, 45, 0, Math.PI * 2);
    actx.fill();

    actx.beginPath();
    actx.arc(150, 270, 90, 0, Math.PI * 2);
    actx.fill();

    userImg.src = avatarCanvas.toDataURL();
    userImg.onload = () => {
      isUserImgLoaded = true;
      renderCanvas();
    };
  }

  // SETUP TEMPLATE SELECTOR
  function setupTemplateSelector() {
    templateCards.forEach(card => {
      card.addEventListener('click', () => {
        templateCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.template = card.dataset.template;
        renderCanvas();
      });
    });
  }

  // SETUP FORM INPUTS
  function setupInputs() {
    if (nameInput) {
      nameInput.value = state.name;
      nameInput.addEventListener('input', e => { state.name = e.target.value; renderCanvas(); });
    }

    if (desigInput) {
      desigInput.value = state.designation;
      desigInput.addEventListener('input', e => { state.designation = e.target.value; renderCanvas(); });
    }

    if (wishTextInput) {
      wishTextInput.value = state.wishText;
      wishTextInput.addEventListener('input', e => { state.wishText = e.target.value; renderCanvas(); });
    }

    if (photoScaleSlider) {
      photoScaleSlider.addEventListener('input', e => {
        state.photoScale = parseInt(e.target.value);
        document.getElementById('photoScaleVal').innerText = state.photoScale + '%';
        renderCanvas();
      });
    }

    if (photoXSlider) {
      photoXSlider.addEventListener('input', e => {
        state.photoX = parseInt(e.target.value);
        document.getElementById('photoXVal').innerText = state.photoX + 'px';
        renderCanvas();
      });
    }

    if (photoYSlider) {
      photoYSlider.addEventListener('input', e => {
        state.photoY = parseInt(e.target.value);
        document.getElementById('photoYVal').innerText = state.photoY + 'px';
        renderCanvas();
      });
    }
  }

  // SETUP WISH CHIPS
  function setupWishChips() {
    wishChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.dataset.wish;
        if (text) {
          state.wishText = text;
          if (wishTextInput) wishTextInput.value = text;
          renderCanvas();
        }
      });
    });
  }

  // IMAGE LOADERS
  function setupImageLoaders() {
    if (userPhotoInput) {
      userPhotoInput.addEventListener('change', e => {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = ev => {
            userImg.src = ev.target.result;
            userImg.onload = () => {
              isUserImgLoaded = true;
              renderCanvas();
            };
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }

    if (logoPhotoInput) {
      logoPhotoInput.addEventListener('change', e => {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = ev => {
            logoImg.src = ev.target.result;
            logoImg.onload = () => {
              isLogoImgLoaded = true;
              renderCanvas();
            };
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }
  }

  // EXPORT BUTTONS
  function setupExportButtons() {
    if (btnDownloadPng) {
      btnDownloadPng.addEventListener('click', () => downloadPoster('png'));
    }

    if (btnDownloadJpg) {
      btnDownloadJpg.addEventListener('click', () => downloadPoster('jpg'));
    }

    if (btnSharePoster) {
      btnSharePoster.addEventListener('click', sharePoster);
    }
  }

  function downloadPoster(format) {
    const link = document.createElement('a');
    const filename = `Independence_Day_Poster_${(state.name || 'Post').replace(/\s+/g, '_')}.${format}`;
    link.download = filename;
    link.href = canvas.toDataURL(format === 'jpg' ? 'image/jpeg' : 'image/png', 0.95);
    link.click();
  }

  async function sharePoster() {
    if (navigator.share && canvas.toBlob) {
      canvas.toBlob(async blob => {
        const file = new File([blob], 'Independence_Day_Poster.png', { type: 'image/png' });
        try {
          await navigator.share({
            title: 'Independence Day Poster',
            text: `Happy Independence Day! Wishes from ${state.name}`,
            files: [file]
          });
        } catch (err) {
          downloadPoster('png');
        }
      });
    } else {
      downloadPoster('png');
    }
  }

  // ==========================================================================
  // GRAPHICS CANVAS RENDERING ENGINE
  // ==========================================================================
  function renderCanvas() {
    // Set Dimensions (1080x1080 for Square Posts, 1080x1920 for Story)
    if (state.template === 'clean_story') {
      canvas.width = 1080;
      canvas.height = 1920;
    } else {
      canvas.width = 1080;
      canvas.height = 1080;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Route to specific template renderer
    switch (state.template) {
      case 'golden_chakra':
        renderGoldenChakraTemplate();
        break;
      case 'proud_leader':
        renderProudLeaderTemplate();
        break;
      case 'clean_story':
        renderCleanStoryTemplate();
        break;
      case 'tiranga_card':
      default:
        renderTirangaCardTemplate();
        break;
    }
  }

  // --- DRAW ASHOKA CHAKRA VECTOR ---
  function drawAshokaChakra(cx, cy, radius, strokeColor = '#000080', spokes = 24) {
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(3, radius * 0.08);

    // Outer Circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Hub
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = strokeColor;
    ctx.fill();

    // 24 Spokes
    for (let i = 0; i < spokes; i++) {
      const angle = (Math.PI * 2 / spokes) * i;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius * 0.95, cy + Math.sin(angle) * radius * 0.95);
      ctx.stroke();
    }
    ctx.restore();
  }

  // --- DRAW USER CIRCULAR PORTRAIT BADGE ---
  function drawUserPortraitBadge(cx, cy, radius, borderColor = '#ff9933', borderWidth = 8) {
    if (!isUserImgLoaded) return;

    ctx.save();

    // Outer Glow / Border Ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius + borderWidth, 0, Math.PI * 2);
    ctx.fillStyle = borderColor;
    ctx.fill();

    // White inner ring gap
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Clipping Mask Circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    // Calculate Scaled & Offset Image Dimensions
    const scale = (state.photoScale / 100);
    const aspect = userImg.width / userImg.height;
    
    let drawWidth, drawHeight;
    if (aspect > 1) {
      drawHeight = (radius * 2.2) * scale;
      drawWidth = drawHeight * aspect;
    } else {
      drawWidth = (radius * 2.2) * scale;
      drawHeight = drawWidth / aspect;
    }

    const drawX = (cx - drawWidth / 2) + state.photoX;
    const drawY = (cy - drawHeight / 2) + state.photoY;

    ctx.drawImage(userImg, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  }

  // --- TEMPLATE 1: TIRANGA CARD (1080x1080) ---
  function renderTirangaCardTemplate() {
    const W = canvas.width;
    const H = canvas.height;

    // Saffron Top Banner Block
    ctx.fillStyle = '#ff9933';
    ctx.fillRect(0, 0, W, H * 0.28);

    // Subtle Saffron to White transition arc
    ctx.beginPath();
    ctx.ellipse(W / 2, H * 0.28, W * 0.6, 60, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // White Center Section
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, H * 0.28, W, H * 0.52);

    // Ashoka Chakra Watermark background
    ctx.globalAlpha = 0.08;
    drawAshokaChakra(W / 2, H * 0.52, 220, '#000080');
    ctx.globalAlpha = 1.0;

    // Green Bottom Footer Block
    ctx.fillStyle = '#138808';
    ctx.fillRect(0, H * 0.80, W, H * 0.20);

    // Gold accent separator bar
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, H * 0.80 - 4, W, 4);

    // Header Text: HAPPY INDEPENDENCE DAY
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 8;
    ctx.fillText('HAPPY INDEPENDENCE DAY', W / 2, 70);
    ctx.shadowBlur = 0;

    ctx.font = '800 32px sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText('🇮🇳 15th AUGUST 🇮🇳', W / 2, 125);

    // User Portrait Badge (Center Left/Top)
    const portraitX = W * 0.25;
    const portraitY = H * 0.48;
    const portraitRadius = 150;
    drawUserPortraitBadge(portraitX, portraitY, portraitRadius, '#ff9933', 10);

    // Wish Text Block (Center Right)
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 34px sans-serif';

    const wishX = W * 0.46;
    const wishY = H * 0.36;
    wrapText(ctx, state.wishText || 'Happy Independence Day!', wishX, wishY, W * 0.50, 48);

    // Bottom Footer Info (Name & Designation)
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 36px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(state.name || 'YOUR NAME', 60, H * 0.86);

    ctx.font = '500 24px sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(state.designation || 'Your Title / Business Name', 60, H * 0.91);

    // Brand Logo (Bottom Right)
    if (isLogoImgLoaded) {
      const logoRadius = 45;
      const logoX = W - 100;
      const logoY = H * 0.88;

      ctx.save();
      ctx.beginPath();
      ctx.arc(logoX, logoY, logoRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();
      ctx.drawImage(logoImg, logoX - logoRadius, logoY - logoRadius, logoRadius * 2, logoRadius * 2);
      ctx.restore();
    }
  }

  // --- TEMPLATE 2: GOLDEN ASHOKA CHAKRA (1080x1080) ---
  function renderGoldenChakraTemplate() {
    const W = canvas.width;
    const H = canvas.height;

    // Dark Royal Navy Gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#0a0f1d');
    grad.addColorStop(0.5, '#0f172a');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Radiant Golden Ashoka Chakra in Center Background
    ctx.globalAlpha = 0.25;
    drawAshokaChakra(W / 2, H * 0.42, 280, '#f59e0b');
    ctx.globalAlpha = 1.0;

    // Top Tricolor Ribbons
    ctx.fillStyle = '#ff9933';
    ctx.fillRect(0, 0, W, 12);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 12, W, 12);
    ctx.fillStyle = '#138808';
    ctx.fillRect(0, 24, W, 12);

    // Header Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f59e0b';
    ctx.font = '800 28px sans-serif';
    ctx.fillText('✨ 78TH INDEPENDENCE DAY CELEBRATION ✨', W / 2, 75);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 52px sans-serif';
    ctx.fillText('JAI HIND! 🇮🇳', W / 2, 140);

    // User Portrait Badge (Center Top)
    const portraitX = W / 2;
    const portraitY = H * 0.44;
    const portraitRadius = 160;
    drawUserPortraitBadge(portraitX, portraitY, portraitRadius, '#f59e0b', 10);

    // Wish Text Block (Below Portrait)
    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 32px sans-serif';
    wrapTextCenter(ctx, state.wishText || 'Happy Independence Day!', W / 2, H * 0.68, W * 0.85, 46);

    // Bottom Gold Card Footer
    const footerGrad = ctx.createLinearGradient(0, H * 0.82, W, H * 0.82);
    footerGrad.addColorStop(0, '#d97706');
    footerGrad.addColorStop(0.5, '#f59e0b');
    footerGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = footerGrad;
    ctx.fillRect(0, H * 0.83, W, H * 0.17);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 36px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(state.name || 'YOUR NAME', 50, H * 0.89);

    ctx.font = '600 24px sans-serif';
    ctx.fillStyle = '#fef3c7';
    ctx.fillText(state.designation || 'Your Designation / Brand', 50, H * 0.94);

    // Brand Logo
    if (isLogoImgLoaded) {
      const logoRadius = 45;
      const logoX = W - 90;
      const logoY = H * 0.905;

      ctx.save();
      ctx.beginPath();
      ctx.arc(logoX, logoY, logoRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();
      ctx.drawImage(logoImg, logoX - logoRadius, logoY - logoRadius, logoRadius * 2, logoRadius * 2);
      ctx.restore();
    }
  }

  // --- TEMPLATE 3: PROUD LEADER POST (1080x1080) ---
  function renderProudLeaderTemplate() {
    const W = canvas.width;
    const H = canvas.height;

    // Full Tricolor Vertical Bands Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ff9933';
    ctx.fillRect(0, 0, W, H * 0.22);

    ctx.fillStyle = '#138808';
    ctx.fillRect(0, H * 0.82, W, H * 0.18);

    // Ashoka Chakra Emblem top center
    drawAshokaChakra(W / 2, 75, 45, '#000080');

    // Header Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 46px sans-serif';
    ctx.fillText('HAPPY INDEPENDENCE DAY', W / 2, 175);

    // Portrait (Right Side)
    const portraitX = W * 0.72;
    const portraitY = H * 0.52;
    const portraitRadius = 175;
    drawUserPortraitBadge(portraitX, portraitY, portraitRadius, '#138808', 8);

    // Wish Text (Left Side)
    ctx.textAlign = 'left';
    ctx.fillStyle = '#1e293b';
    ctx.font = '800 36px sans-serif';
    wrapText(ctx, state.wishText || 'Happy Independence Day!', 50, H * 0.32, W * 0.44, 50);

    // Footer Block
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 36px sans-serif';
    ctx.fillText(state.name || 'YOUR NAME', 50, H * 0.88);

    ctx.font = '600 24px sans-serif';
    ctx.fillStyle = '#d1fae5';
    ctx.fillText(state.designation || 'Business / Brand Handle', 50, H * 0.94);

    // Brand Logo
    if (isLogoImgLoaded) {
      const logoRadius = 45;
      const logoX = W - 90;
      const logoY = H * 0.905;

      ctx.save();
      ctx.beginPath();
      ctx.arc(logoX, logoY, logoRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();
      ctx.drawImage(logoImg, logoX - logoRadius, logoY - logoRadius, logoRadius * 2, logoRadius * 2);
      ctx.restore();
    }
  }

  // --- TEMPLATE 4: CLEAN INSTAGRAM STORY (1080x1920) ---
  function renderCleanStoryTemplate() {
    const W = canvas.width;
    const H = canvas.height;

    // Full Vertical Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);

    // Saffron Top Section
    const topGrad = ctx.createLinearGradient(0, 0, 0, H * 0.35);
    topGrad.addColorStop(0, '#ff9933');
    topGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, W, H * 0.35);

    // Ashoka Chakra Top Center
    drawAshokaChakra(W / 2, 180, 85, '#ffffff');

    // Header Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 56px sans-serif';
    ctx.fillText('INDEPENDENCE DAY', W / 2, 330);

    ctx.font = '700 36px sans-serif';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('15TH AUGUST 🇮🇳', W / 2, 395);

    // Centered Portrait Badge
    const portraitX = W / 2;
    const portraitY = H * 0.44;
    const portraitRadius = 240;
    drawUserPortraitBadge(portraitX, portraitY, portraitRadius, '#ff9933', 12);

    // Wish Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 42px sans-serif';
    wrapTextCenter(ctx, state.wishText || 'Happy Independence Day!', W / 2, H * 0.65, W * 0.85, 60);

    // Bottom Green Footer Section
    const botGrad = ctx.createLinearGradient(0, H * 0.82, 0, H);
    botGrad.addColorStop(0, '#0f172a');
    botGrad.addColorStop(0.3, '#138808');
    botGrad.addColorStop(1, '#059669');
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, H * 0.80, W, H * 0.20);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(state.name || 'YOUR NAME', W / 2, H * 0.88);

    ctx.font = '600 30px sans-serif';
    ctx.fillStyle = '#d1fae5';
    ctx.fillText(state.designation || 'Designation / Brand Name', W / 2, H * 0.93);

    // Brand Logo Top Right
    if (isLogoImgLoaded) {
      const logoRadius = 55;
      const logoX = W - 90;
      const logoY = 100;

      ctx.save();
      ctx.beginPath();
      ctx.arc(logoX, logoY, logoRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();
      ctx.drawImage(logoImg, logoX - logoRadius, logoY - logoRadius, logoRadius * 2, logoRadius * 2);
      ctx.restore();
    }
  }

  // --- TEXT WRAP HELPERS ---
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, currY);
        line = words[n] + ' ';
        currY += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, currY);
  }

  function wrapTextCenter(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, currY);
        line = words[n] + ' ';
        currY += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, currY);
  }
});
