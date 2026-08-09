/**
 * Free Creator Asset Library Engine - creatorsfree.in
 * Search, Filter, Direct HD Downloads, and 1-Click transfer to YouTube Thumbnail Maker.
 */

document.addEventListener('DOMContentLoaded', () => {
  const HUB_ASSETS = [
    {
      id: 'asset_rupee_3d',
      cat: 'money',
      title: '3D Glossy Golden Rupee (₹)',
      tag: '3D Money Asset',
      imgPath: 'images/assets/asset_rupee_3d.jpg',
      desc: 'High-CTR 3D golden Rupee symbol for finance, trading & earn money thumbnails.'
    },
    {
      id: 'asset_fire_3d',
      cat: 'emoji',
      title: '3D Fire Flame Emoji (🔥)',
      tag: '3D Emoji Asset',
      imgPath: 'images/assets/asset_fire_3d.jpg',
      desc: 'Vibrant 3D glowing fire flame icon for viral, trending & reaction thumbnails.'
    },
    {
      id: 'asset_red_flare',
      cat: 'glow',
      title: 'Red Neon Lens Flare Burst',
      tag: 'Neon Light Flare',
      imgPath: 'images/assets/asset_red_flare.jpg',
      desc: 'Vibrant red light streak overlay for dramatic & news thumbnail backgrounds.'
    },
    {
      id: 'asset_green_arrow',
      cat: 'money',
      title: '+500% Stock Growth Arrow',
      tag: 'Growth Graphic',
      imgPath: 'images/assets/asset_green_arrow.jpg',
      desc: '3D glossy green stock market growth arrow going up 45 degrees.'
    },
    {
      id: 'bg_yellow_box',
      cat: 'badge',
      title: 'Glowing Yellow Slanted Text Box',
      tag: 'Text Background',
      imgPath: 'images/assets/bg_yellow_box.jpg',
      desc: '3D glossy glowing yellow slanted banner box for bold headline text.'
    },
    {
      id: 'bg_red_bar',
      cat: 'badge',
      title: 'Red Alert News Headline Bar',
      tag: 'Text Background',
      imgPath: 'images/assets/bg_red_bar.jpg',
      desc: 'Vibrant red glowing news bar for breaking news & warning headlines.'
    },
    {
      id: 'bg_dark_glass',
      cat: 'badge',
      title: 'Dark Cyan Glassmorphism Box',
      tag: 'Text Background',
      imgPath: 'images/assets/bg_dark_glass.jpg',
      desc: 'Modern dark glassmorphism box with glowing cyan border light overlay.'
    },
    {
      id: 'bg_gold_banner',
      cat: 'badge',
      title: 'Metallic Gold 3D Ribbon Banner',
      tag: 'Text Background',
      imgPath: 'images/assets/bg_gold_banner.jpg',
      desc: '3D metallic gold gradient ribbon banner for premium headline badges.'
    }
  ];

  const assetSearchInput = document.getElementById('assetSearchInput');
  const mainAssetsGrid = document.getElementById('mainAssetsGrid');

  let currentCategory = 'all';
  let searchQuery = '';

  init();

  function init() {
    setupCategoryFilters();
    setupSearchInput();
    renderAssetsGrid();
  }

  function setupCategoryFilters() {
    document.querySelectorAll('.assets-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.assets-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.cat;
        renderAssetsGrid();
      });
    });
  }

  function setupSearchInput() {
    if (assetSearchInput) {
      assetSearchInput.addEventListener('input', e => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderAssetsGrid();
      });
    }
  }

  function renderAssetsGrid() {
    if (!mainAssetsGrid) return;

    const filtered = HUB_ASSETS.filter(item => {
      const matchCat = currentCategory === 'all' || item.cat === currentCategory;
      const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery) || item.desc.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      mainAssetsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:60px 20px; background:#1e293b; border-radius:16px; border:1px solid rgba(255,255,255,0.1);">
          <div style="font-size:3rem; margin-bottom:12px;">🔍</div>
          <h3 style="color:#f8fafc; margin:0 0 8px 0;">No matching assets found</h3>
          <p style="color:#94a3b8; margin:0;">Try searching for "Rupee", "Fire", "Glow", or "Arrow". More assets are added daily!</p>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(asset => {
      html += `
        <article class="asset-hub-card">
          <div>
            <div class="asset-preview-frame">
              <img src="${asset.imgPath}" alt="${asset.title}" loading="lazy">
            </div>
            <div class="asset-hub-tag">${asset.tag}</div>
            <h3 class="asset-hub-title">${asset.title}</h3>
            <p style="font-size:0.85rem; color:#94a3b8; margin:0 0 16px 0; line-height:1.4;">${asset.desc}</p>
          </div>

          <div class="asset-hub-actions">
            <a href="${asset.imgPath}" download="${asset.id}.jpg" class="btn-asset-download">📥 Download HD</a>
            <a href="youtube-thumbnail-maker.html?tab=editor" class="btn-asset-maker">🎨 Use in Editor</a>
          </div>
        </article>
      `;
    });

    mainAssetsGrid.innerHTML = html;
  }
});
