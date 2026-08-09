/**
 * CreatorsFree.in - Main Global Logic & Theme Switcher
 */

// Theme Controller
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleUI(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleUI(newTheme);
}

function updateThemeToggleUI(theme) {
    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(btn => {
        if (theme === 'light') {
            btn.innerHTML = '🌙 Dark Mode';
        } else {
            btn.innerHTML = '☀️ Light Mode';
        }
    });
}

// Execute Theme Setup Immediately
initTheme();

document.addEventListener("DOMContentLoaded", function () {
    initTheme();
});