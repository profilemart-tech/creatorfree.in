/**
 * Header and Footer Loader - creatorsfree.in
 * Robust relative path fetching with fallback HTML insertion to prevent 404 / GET errors.
 */

document.addEventListener("DOMContentLoaded", function () {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    // =========================================================
    // MOBILE STICKY HEADER
    // =========================================================
    function makeHeaderSticky() {
        if (!headerPlaceholder) return;

        if (window.innerWidth <= 768) {
            headerPlaceholder.style.position = "sticky";
            headerPlaceholder.style.top = "0";
            headerPlaceholder.style.zIndex = "1000";
            headerPlaceholder.style.width = "100%";
        } else {
            headerPlaceholder.style.position = "";
            headerPlaceholder.style.top = "";
            headerPlaceholder.style.zIndex = "";
            headerPlaceholder.style.width = "";
        }
    }

    // Load Header
    if (headerPlaceholder) {
        fetch('components/header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Header not found at relative path");
                }
                return response.text();
            })
            .then(data => {
                headerPlaceholder.innerHTML = data;

                // Make common header sticky on mobile
                makeHeaderSticky();

                setupMobileDropdowns();
            })
            .catch(() => {
                fetch('components/header.html')
                    .then(res => res.text())
                    .then(data => {
                        headerPlaceholder.innerHTML = data;

                        // Make common header sticky on mobile
                        makeHeaderSticky();

                        setupMobileDropdowns();
                    })
                    .catch(() => {
                        renderDefaultHeader(headerPlaceholder);

                        // Make fallback header sticky on mobile
                        makeHeaderSticky();

                        setupMobileDropdowns();
                    });
            });
    }

    // Keep sticky behavior correct if screen size changes
    window.addEventListener("resize", makeHeaderSticky);


    // =========================================================
    // LOAD FOOTER
    // =========================================================

    if (footerPlaceholder) {
        fetch('components/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Footer not found at relative path");
                }
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(() => {
                fetch('components/footer.html')
                    .then(res => res.text())
                    .then(data => {
                        footerPlaceholder.innerHTML = data;
                    })
                    .catch(() => {
                        renderDefaultFooter(footerPlaceholder);
                    });
            });
    }


    // =========================================================
    // FALLBACK HEADER RENDERER
    // =========================================================

    function renderDefaultHeader(el) {
        el.innerHTML = `
            <header class="site-header" style="background: #0f172a; border-bottom: 1px solid #1e293b; padding: 15px 0;">
                <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 15px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">

                    <a href="index.html" style="text-decoration: none; font-size: 1.4rem; font-weight: 800; color: #ffffff; display: flex; align-items: center; gap: 10px;">
                        <img src="images/favicon.png" alt="CF Logo" style="height: 34px; width: auto; object-fit: contain; border-radius: 4px;">
                        <span>CREATORS <span style="color: #ff6b00;">FREE</span></span>
                    </a>

                    <nav style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">

                        <a href="index.html" style="color: #cbd5e1; text-decoration: none; font-size: 0.92rem; font-weight: 600;">
                            Home
                        </a>

                        <!-- YouTube Thumbnail Dropdown -->
                        <div class="dropdown" style="position: relative; display: inline-block;">

                            <a href="youtube-thumbnail-maker.html" style="color: #ff4b4b; text-decoration: none; font-size: 0.92rem; font-weight: 700; padding-bottom: 5px;">
                                YouTube Thumbnail ▾
                            </a>

                            <div class="dropdown-content" style="display: none; position: absolute; background-color: #1e293b; min-width: 250px; box-shadow: 0px 8px 16px rgba(0,0,0,0.4); border: 1px solid #334155; border-radius: 8px; padding: 8px 0; z-index: 100; top: 100%;">

                                <a href="youtube-thumbnail-maker.html" style="color: #f8fafc; padding: 10px 16px; text-decoration: none; display: block; font-size: 0.9rem; font-weight: 700;">
                                    🔍 1080p HD Thumbnail Extractor
                                </a>

                                <a href="youtube-thumbnail-maker.html?tab=editor" style="color: #fbbf24; padding: 10px 16px; text-decoration: none; display: block; font-size: 0.9rem; font-weight: 700;">
                                    🎨 High-CTR Text Badge Editor
                                </a>

                                <a href="creator-assets.html" style="color: #38bdf8; padding: 10px 16px; text-decoration: none; display: block; font-size: 0.9rem; font-weight: 800;">
                                    ✨ Free Creator Asset Hub
                                </a>

                                <div style="border-top: 1px solid #334155; margin: 4px 0;"></div>

                                <a href="youtube-thumbnail-maker.html?query=Tech+Reviews+India" style="color: #f8fafc; padding: 8px 16px; text-decoration: none; display: block; font-size: 0.85rem; font-weight: 500;">
                                    📱 Tech & Gadget Thumbnails
                                </a>

                                <a href="youtube-thumbnail-maker.html?query=Stock+Market+India" style="color: #f8fafc; padding: 8px 16px; text-decoration: none; display: block; font-size: 0.85rem; font-weight: 500;">
                                    📈 Finance & Trading Styles
                                </a>

                                <a href="youtube-thumbnail-maker.html?query=SSC+CGL+Preparation" style="color: #f8fafc; padding: 8px 16px; text-decoration: none; display: block; font-size: 0.85rem; font-weight: 500;">
                                    📚 Education & Exam Preparation
                                </a>

                                <a href="youtube-thumbnail-maker.html?query=Indian+Daily+Vlog" style="color: #f8fafc; padding: 8px 16px; text-decoration: none; display: block; font-size: 0.85rem; font-weight: 500;">
                                    🎬 Vlogs & Lifestyle Thumbnails
                                </a>

                                <a href="youtube-thumbnail-maker.html?query=Indian+Recipes+Cooking" style="color: #f8fafc; padding: 8px 16px; text-decoration: none; display: block; font-size: 0.85rem; font-weight: 500;">
                                    🍔 Cooking & Recipe Thumbnails
                                </a>

                                <a href="youtube-thumbnail-maker.html?query=Hindi+Motivation+Video" style="color: #f8fafc; padding: 8px 16px; text-decoration: none; display: block; font-size: 0.85rem; font-weight: 500;">
                                    🏋️ Fitness & Motivation Styles
                                </a>

                            </div>
                        </div>


                        <!-- Free Assets Dropdown -->
                        <div class="dropdown" style="position: relative; display: inline-block;">

                            <a href="javascript:void(0)" style="color: #38bdf8; text-decoration: none; font-size: 0.92rem; font-weight: 700; padding-bottom: 5px;">
                                ✨ Free Assets ▾
                            </a>

                            <div class="dropdown-content" style="display: none; position: absolute; background-color: #1e293b; min-width: 230px; box-shadow: 0px 8px 16px rgba(0,0,0,0.4); border: 1px solid #334155; border-radius: 8px; padding: 8px 0; z-index: 100; top: 100%;">

                                <a href="creator-assets.html" style="color: #38bdf8; padding: 10px 16px; text-decoration: none; display: block; font-size: 0.9rem; font-weight: 700;">
                                    ✨ 3D PNG Asset Hub
                                </a>

                                <a href="sound-effects.html" style="color: #3DDC84; padding: 10px 16px; text-decoration: none; display: block; font-size: 0.9rem; font-weight: 700;">
                                    🔊 Free Sound Effects (SFX)
                                </a>

                                <a href="video-effects.html" style="color: #c084fc; padding: 10px 16px; text-decoration: none; display: block; font-size: 0.9rem; font-weight: 700;">
                                    ⚡ Video FX Overlays (VFX)
                                </a>

                            </div>
                        </div>


                        <a href="independence-day-poster-maker.html" style="color: #ff9933; text-decoration: none; font-size: 0.92rem; font-weight: 700;">
                            🇮🇳 15th August Poster
                        </a>

                        <a href="resume-creator.html" style="color: #cbd5e1; text-decoration: none; font-size: 0.92rem; font-weight: 600;">
                            Resume Builder
                        </a>


                        <div class="dropdown" style="position: relative; display: inline-block;">

                            <a href="a4-photo-printer.html" style="color: #cbd5e1; text-decoration: none; font-size: 0.92rem; font-weight: 600; padding-bottom: 5px;">
                                Photo Print ▾
                            </a>

                            <div class="dropdown-content" style="display: none; position: absolute; background-color: #1e293b; min-width: 230px; box-shadow: 0px 8px 16px rgba(0,0,0,0.4); border: 1px solid #334155; border-radius: 8px; padding: 8px 0; z-index: 100; top: 100%;">

                                <a href="a4-photo-printer.html" style="color: #f8fafc; padding: 10px 16px; text-decoration: none; display: block; font-size: 0.9rem; font-weight: 600;">
                                    🖼️ A4 Passport Photo Printer
                                </a>

                                <a href="photo-print-presets.html" style="color: #f8fafc; padding: 10px 16px; text-decoration: none; display: block; font-size: 0.9rem; font-weight: 600;">
                                    📐 Photo Print Presets
                                </a>

                            </div>
                        </div>


                        <a href="application-letter-generator.html" style="color: #cbd5e1; text-decoration: none; font-size: 0.92rem; font-weight: 600;">
                            Application Writer
                        </a>

                    </nav>
                </div>
            </header>
        `;
    }


    // =========================================================
    // FALLBACK FOOTER RENDERER
    // =========================================================

    function renderDefaultFooter(el) {
        el.innerHTML = `
            <footer class="site-footer" style="background: #0f172a; border-top: 1px solid #1e293b; padding: 40px 0 20px 0; color: #cbd5e1; font-family: 'Inter', system-ui, sans-serif;">

                <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">

                    <div>
                        <h3 style="color:#fff; margin-top:0; display:flex; align-items:center; gap:8px;">
                            <img src="images/favicon.png" alt="CF Logo" style="height:28px; width:auto;">
                            Creators Free
                        </h3>

                        <p style="font-size:0.88rem; color:#94a3b8; line-height:1.6;">
                            100% Free, privacy-first web utilities and document tools for creators, students, and job seekers across India.
                        </p>
                    </div>


                    <div>
                        <h4 style="color:#fff; margin-top:0; font-size:1rem;">
                            Popular Tools
                        </h4>

                        <ul style="list-style:none; padding:0; margin:0; font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">

                            <li>
                                <a href="index.html" style="color:#cbd5e1; text-decoration:none;">
                                    Home
                                </a>
                            </li>

                            <li>
                                <a href="youtube-thumbnail-maker.html" style="color:#38bdf8; text-decoration:none;">
                                    YouTube Thumbnail Maker
                                </a>
                            </li>

                            <li>
                                <a href="a4-photo-printer.html" style="color:#3DDC84; text-decoration:none;">
                                    A4 Passport Photo Printer
                                </a>
                            </li>

                            <li>
                                <a href="resume-creator.html" style="color:#cbd5e1; text-decoration:none;">
                                    Resume Builder
                                </a>
                            </li>

                            <li>
                                <a href="application-letter-generator.html" style="color:#cbd5e1; text-decoration:none;">
                                    Application Writer
                                </a>
                            </li>

                        </ul>
                    </div>


                    <div>
                        <h4 style="color:#fff; margin-top:0; font-size:1rem;">
                            Legal & Policies
                        </h4>

                        <ul style="list-style:none; padding:0; margin:0; font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">

                            <li>
                                <a href="privacy-policy.html" style="color:#cbd5e1; text-decoration:none;">
                                    Privacy Policy
                                </a>
                            </li>

                            <li>
                                <a href="terms.html" style="color:#cbd5e1; text-decoration:none;">
                                    Terms & Conditions
                                </a>
                            </li>

                            <li>
                                <a href="about.html" style="color:#cbd5e1; text-decoration:none;">
                                    About Us
                                </a>
                            </li>

                            <li>
                                <a href="contact.html" style="color:#cbd5e1; text-decoration:none;">
                                    Contact Us
                                </a>
                            </li>

                        </ul>
                    </div>


                    <div>
                        <h4 style="color:#fff; margin-top:0; font-size:1rem;">
                            Contact & Support
                        </h4>

                        <p style="font-size:0.88rem; color:#94a3b8; margin:0 0 6px 0;">
                            📧 Email:
                            <a href="mailto:profilemart@gmail.com" style="color:#38bdf8; text-decoration:none;">
                                profilemart@gmail.com
                            </a>
                        </p>

                        <p style="font-size:0.88rem; color:#94a3b8; margin:0 0 6px 0;">
                            📞 Phone:
                            <a href="tel:+917015851699" style="color:#38bdf8; text-decoration:none;">
                                +91 7015851699
                            </a>
                        </p>

                        <p style="font-size:0.88rem; color:#94a3b8; margin:0;">
                            📍 India • 100% Free & Private
                        </p>
                    </div>

                </div>


                <div style="text-align:center; border-top:1px solid #1e293b; margin-top:30px; padding-top:18px; font-size:0.85rem; color:#64748b;">
                    © 2026 Creators Free (creatorsfree.in). Designed for creators, students, and job seekers. All rights reserved.
                </div>

            </footer>
        `;
    }


    // =========================================================
    // MOBILE DROPDOWN NAVIGATION
    // =========================================================

    window.toggleMobileDropdown = function (el, e) {

        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const dropdown = el.closest('.dropdown');

        if (!dropdown) return;

        const content = dropdown.querySelector('.dropdown-content');

        const isOpened = dropdown.classList.contains('open');


        // Close all other open dropdowns
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('open');
        });

        document.querySelectorAll('.dropdown-content').forEach(c => {
            c.style.display = '';
            c.classList.remove('mobile-active');
        });


        if (!isOpened) {

            dropdown.classList.add('open');

            if (content) {
                content.style.display = 'block';
                content.classList.add('mobile-active');
            }

        }

    };


    function setupMobileDropdowns() {

        document.addEventListener('click', function (e) {

            if (!e.target.closest('.dropdown')) {

                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('open');
                });

                document.querySelectorAll('.dropdown-content').forEach(c => {
                    c.style.display = '';
                    c.classList.remove('mobile-active');
                });

            }

        });

    }

});
