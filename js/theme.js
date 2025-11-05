const ThemeManager = (() => {
  const THEME_KEY = 'toonifyit-theme';
  
  const state = {
    theme: localStorage.getItem(THEME_KEY) || 'dark'
  };

  const applyTheme = (theme) => {
    document.body.classList.remove('dark-mode', 'light-mode');
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.add('light-mode');
    }
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
      // Remove all existing listeners by cloning the element
      const newThemeToggle = themeToggle.cloneNode(true);
      themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle);
      
      // Add fresh listener
      newThemeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
      updateThemeIcons(state.theme);
    }
  };

  const init = () => {
    applyTheme(state.theme);
    
    setupThemeToggle();
    
    const observer = new MutationObserver(() => {
      setupThemeToggle();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  };

  // Wait for DOM to be ready before applying theme
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
    });
  } else {
    init();
  }

  return {
    init,
    toggleTheme,
    getTheme,
    applyTheme
  };
})();
