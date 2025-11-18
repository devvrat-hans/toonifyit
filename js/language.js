// Language Detection and Switcher
(function() {
  'use strict';

  const LANGUAGES = ['es', 'fr', 'pt', 'hi', 'id', 'ja', 'nl', 'zh', 'ur', 'de', 'ko', 'sv', 'ar', 'he', 'it', 'pl', 'ru', 'tr', 'vi'];

  // Detect current language from URL
  function getCurrentLanguage() {
    const path = window.location.pathname;
    for (const lang of LANGUAGES) {
      if (path.startsWith(`/${lang}/`) || path.startsWith(`/${lang}`)) {
        return lang;
      }
    }
    return 'en';
  }

  // Update language button to show current language
  function updateLanguageButton() {
    const langBtn = document.getElementById('current-lang');
    const currentLang = getCurrentLanguage();
    
    if (langBtn) {
      langBtn.textContent = currentLang.toUpperCase();
    }

    // Highlight current language in dropdown
    const langOptions = document.querySelectorAll('.nav__lang-option');
    langOptions.forEach(option => {
      const optionLang = option.getAttribute('data-lang');
      if (optionLang === currentLang) {
        option.style.backgroundColor = 'var(--bg-tertiary)';
        option.style.borderLeft = '3px solid var(--accent)';
      }
    });
  }

  // Get base path by removing language prefix
  function getBasePath(currentPath, currentLang) {
    if (currentLang === 'en') return currentPath;
    return currentPath.replace(`/${currentLang}/`, '/').replace(`/${currentLang}`, '/');
  }

  // Get localized path for a target language
  function getLocalizedPath(basePath, targetLang) {
    if (targetLang === 'en') return basePath || '/';
    return basePath === '/' ? `/${targetLang}/` : `/${targetLang}${basePath}`;
  }

  // Update hreflang links dynamically based on current page
  function updateHreflangLinks() {
    const currentLang = getCurrentLanguage();
    const currentPath = window.location.pathname;
    const basePath = getBasePath(currentPath, currentLang);
    
    // Remove existing hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());

    const head = document.head;
    
    // Add hreflang for all supported languages
    ['en', ...LANGUAGES].forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `https://toonifyit.com${getLocalizedPath(basePath, lang)}`;
      head.appendChild(link);
    });

    // Add x-default
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `https://toonifyit.com${basePath}`;
    head.appendChild(defaultLink);
  }

  // Initialize language functionality
  function initLanguage() {
    updateLanguageButton();
    updateHreflangLinks();

    // Add keyboard navigation for language switcher
    const langBtn = document.querySelector('.nav__lang-btn');
    const langDropdown = document.querySelector('.nav__lang-dropdown');

    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
        langBtn.setAttribute('aria-expanded', !isExpanded);
        langDropdown.classList.toggle('active');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
          langBtn.setAttribute('aria-expanded', 'false');
          langDropdown.classList.remove('active');
        }
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
  } else {
    initLanguage();
  }

  // Re-run when templates load
  window.addEventListener('templatesLoaded', initLanguage);
  setTimeout(initLanguage, 100);
})();
