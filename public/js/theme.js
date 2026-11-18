(() => {
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const storageKey = 'lecturesum-color-mode';

  
  function applyMode(mode, save = true) {
        const nextMode = mode === 'dark' ? 'dark' : 'light';
        root.dataset.theme = nextMode;

        if (toggle) {
            const isDark = nextMode === 'dark';
            toggle.setAttribute('aria-checked', String(isDark));
            toggle.setAttribute('aria-label', isDark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap');
            toggle.title = isDark ? 'Tema gelap aktif — klik untuk tema terang' : 'Tema terang aktif — klik untuk tema gelap';
            const sun = toggle.querySelector('.theme-sun');
            const moon = toggle.querySelector('.theme-moon');
            if (sun) sun.hidden = isDark;
            if (moon) moon.hidden = !isDark;
            toggle.classList.toggle('is-dark', isDark);
        }

        if (save) localStorage.setItem(storageKey, nextMode);
    }

    let savedMode = 'light';
    try { savedMode = localStorage.getItem(storageKey) || 'light'; } catch (_) {}
    applyMode(savedMode, false);

    if (toggle) {
        toggle.addEventListener('click', () => {
            applyMode(root.dataset.theme === 'dark' ? 'light' : 'dark');
        });
    }
})();