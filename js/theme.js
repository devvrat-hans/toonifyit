const ThemeManager = (() => {
  const THEME_KEY = 'toonifyit-theme';
  
  const state = {
    theme: localStorage.getItem(THEME_KEY) || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  };

  const applyTheme = (theme) => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    state.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcons(theme);
  };

  const updateThemeIcons = (theme) => {
    const themeToggle = document.querySelector('[data-action="toggle-theme"]');
    if (!themeToggle) return;

    const moonIcon = themeToggle.querySelector('[data-icon="moon"]');
    const sunIcon = themeToggle.querySelector('[data-icon="sun"]');
    
    if (moonIcon && sunIcon) {
      if (theme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
      } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };

  const getTheme = () => state.theme;

  const setupThemeToggle = () => {
    const themeToggle = document.querySelector('[data-action="toggle-theme"]');
    if (themeToggle) {
      themeToggle.removeEventListener('click', toggleTheme);
      themeToggle.addEventListener('click', toggleTheme);
      updateThemeIcons(state.theme);
    }
  };

  const init = () => {
    applyTheme(state.theme);
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    setupThemeToggle();
    
    const observer = new MutationObserver(() => {
      setupThemeToggle();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  };

  if (state.theme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(init, 200);
  });

  return {
    init,
    toggleTheme,
    getTheme,
    applyTheme
  };
})();
