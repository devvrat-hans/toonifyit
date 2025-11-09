// Language Detection and Switcher
(function() {
  'use strict';

  // Detect current language from URL
  function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/es/') || path.startsWith('/es')) {
      return 'es';
    }
    if (path.startsWith('/pt/') || path.startsWith('/pt')) {
      return 'pt';
    }
    if (path.startsWith('/hi/') || path.startsWith('/hi')) {
      return 'hi';
    }
    if (path.startsWith('/ur/') || path.startsWith('/ur')) {
      return 'ur';
    }
    if (path.startsWith('/de/') || path.startsWith('/de')) {
      return 'de';
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

  // Update hreflang links dynamically based on current page
  function updateHreflangLinks() {
    const currentLang = getCurrentLanguage();
    const currentPath = window.location.pathname;
    
    // Remove existing hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => {
      link.remove();
    });

    // Determine the base path (page name)
    let pagePath = currentPath;
    if (currentLang === 'es') {
      pagePath = currentPath.replace('/es/', '/').replace('/es', '/');
    } else if (currentLang === 'pt') {
      pagePath = currentPath.replace('/pt/', '/').replace('/pt', '/');
    } else if (currentLang === 'hi') {
      pagePath = currentPath.replace('/hi/', '/').replace('/hi', '/');
    } else if (currentLang === 'ur') {
      pagePath = currentPath.replace('/ur/', '/').replace('/ur', '/');
    } else if (currentLang === 'de') {
      pagePath = currentPath.replace('/de/', '/').replace('/de', '/');
    }

    // Add hreflang tags
    const head = document.head;
    
    // English version
    const enLink = document.createElement('link');
    enLink.rel = 'alternate';
    enLink.hreflang = 'en';
    enLink.href = `https://toonifyit.com${pagePath}`;
    head.appendChild(enLink);

    // Spanish version
    const esLink = document.createElement('link');
    esLink.rel = 'alternate';
    esLink.hreflang = 'es';
    const esPath = pagePath === '/' ? '/es/' : `/es${pagePath}`;
    esLink.href = `https://toonifyit.com${esPath}`;
    head.appendChild(esLink);

    // Portuguese version
    const ptLink = document.createElement('link');
    ptLink.rel = 'alternate';
    ptLink.hreflang = 'pt';
    const ptPath = pagePath === '/' ? '/pt/' : `/pt${pagePath}`;
    ptLink.href = `https://toonifyit.com${ptPath}`;
    head.appendChild(ptLink);

    // Hindi version
    const hiLink = document.createElement('link');
    hiLink.rel = 'alternate';
    hiLink.hreflang = 'hi';
    const hiPath = pagePath === '/' ? '/hi/' : `/hi${pagePath}`;
    hiLink.href = `https://toonifyit.com${hiPath}`;
    head.appendChild(hiLink);

    // Urdu version
    const urLink = document.createElement('link');
    urLink.rel = 'alternate';
    urLink.hreflang = 'ur';
    const urPath = pagePath === '/' ? '/ur/' : `/ur${pagePath}`;
    urLink.href = `https://toonifyit.com${urPath}`;
    head.appendChild(urLink);

    // German version
    const deLink = document.createElement('link');
    deLink.rel = 'alternate';
    deLink.hreflang = 'de';
    const dePath = pagePath === '/' ? '/de/' : `/de${pagePath}`;
    deLink.href = `https://toonifyit.com${dePath}`;
    head.appendChild(deLink);

    // Default version (x-default)
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `https://toonifyit.com${pagePath}`;
    head.appendChild(defaultLink);
  }

  // Update language switcher links to maintain same page in different language
  function updateLanguageSwitcherLinks() {
    const currentLang = getCurrentLanguage();
    const currentPath = window.location.pathname;
    
    const langOptions = document.querySelectorAll('.nav__lang-option');
    
    langOptions.forEach(option => {
      const targetLang = option.getAttribute('data-lang');
      
      if (targetLang === 'en') {
        // For English, remove language prefix if present
        if (currentLang === 'es') {
          const enPath = currentPath.replace('/es/', '/').replace('/es', '/');
          option.href = enPath || '/';
        } else if (currentLang === 'pt') {
          const enPath = currentPath.replace('/pt/', '/').replace('/pt', '/');
          option.href = enPath || '/';
        } else if (currentLang === 'hi') {
          const enPath = currentPath.replace('/hi/', '/').replace('/hi', '/');
          option.href = enPath || '/';
        } else if (currentLang === 'ur') {
          const enPath = currentPath.replace('/ur/', '/').replace('/ur', '/');
          option.href = enPath || '/';
        } else if (currentLang === 'de') {
          const enPath = currentPath.replace('/de/', '/').replace('/de', '/');
          option.href = enPath || '/';
        } else {
          option.href = currentPath || '/';
        }
      } else if (targetLang === 'es') {
        // For Spanish, add /es/ prefix if not present
        if (currentLang === 'en') {
          const esPath = currentPath === '/' ? '/es/' : `/es${currentPath}`;
          option.href = esPath;
        } else if (currentLang === 'pt') {
          const basePath = currentPath.replace('/pt/', '/').replace('/pt', '/');
          const esPath = basePath === '/' ? '/es/' : `/es${basePath}`;
          option.href = esPath;
        } else if (currentLang === 'hi') {
          const basePath = currentPath.replace('/hi/', '/').replace('/hi', '/');
          const esPath = basePath === '/' ? '/es/' : `/es${basePath}`;
          option.href = esPath;
        } else if (currentLang === 'ur') {
          const basePath = currentPath.replace('/ur/', '/').replace('/ur', '/');
          const esPath = basePath === '/' ? '/es/' : `/es${basePath}`;
          option.href = esPath;
        } else if (currentLang === 'de') {
          const basePath = currentPath.replace('/de/', '/').replace('/de', '/');
          const esPath = basePath === '/' ? '/es/' : `/es${basePath}`;
          option.href = esPath;
        } else {
          option.href = currentPath || '/es/';
        }
      } else if (targetLang === 'pt') {
        // For Portuguese, add /pt/ prefix if not present
        if (currentLang === 'en') {
          const ptPath = currentPath === '/' ? '/pt/' : `/pt${currentPath}`;
          option.href = ptPath;
        } else if (currentLang === 'es') {
          const basePath = currentPath.replace('/es/', '/').replace('/es', '/');
          const ptPath = basePath === '/' ? '/pt/' : `/pt${basePath}`;
          option.href = ptPath;
        } else if (currentLang === 'hi') {
          const basePath = currentPath.replace('/hi/', '/').replace('/hi', '/');
          const ptPath = basePath === '/' ? '/pt/' : `/pt${basePath}`;
          option.href = ptPath;
        } else if (currentLang === 'ur') {
          const basePath = currentPath.replace('/ur/', '/').replace('/ur', '/');
          const ptPath = basePath === '/' ? '/pt/' : `/pt${basePath}`;
          option.href = ptPath;
        } else if (currentLang === 'de') {
          const basePath = currentPath.replace('/de/', '/').replace('/de', '/');
          const ptPath = basePath === '/' ? '/pt/' : `/pt${basePath}`;
          option.href = ptPath;
        } else {
          option.href = currentPath || '/pt/';
        }
      } else if (targetLang === 'hi') {
        // For Hindi, add /hi/ prefix if not present
        if (currentLang === 'en') {
          const hiPath = currentPath === '/' ? '/hi/' : `/hi${currentPath}`;
          option.href = hiPath;
        } else if (currentLang === 'es') {
          const basePath = currentPath.replace('/es/', '/').replace('/es', '/');
          const hiPath = basePath === '/' ? '/hi/' : `/hi${basePath}`;
          option.href = hiPath;
        } else if (currentLang === 'pt') {
          const basePath = currentPath.replace('/pt/', '/').replace('/pt', '/');
          const hiPath = basePath === '/' ? '/hi/' : `/hi${basePath}`;
          option.href = hiPath;
        } else if (currentLang === 'ur') {
          const basePath = currentPath.replace('/ur/', '/').replace('/ur', '/');
          const hiPath = basePath === '/' ? '/hi/' : `/hi${basePath}`;
          option.href = hiPath;
        } else if (currentLang === 'de') {
          const basePath = currentPath.replace('/de/', '/').replace('/de', '/');
          const hiPath = basePath === '/' ? '/hi/' : `/hi${basePath}`;
          option.href = hiPath;
        } else {
          option.href = currentPath || '/hi/';
        }
      } else if (targetLang === 'ur') {
        // For Urdu, add /ur/ prefix if not present
        if (currentLang === 'en') {
          const urPath = currentPath === '/' ? '/ur/' : `/ur${currentPath}`;
          option.href = urPath;
        } else if (currentLang === 'es') {
          const basePath = currentPath.replace('/es/', '/').replace('/es', '/');
          const urPath = basePath === '/' ? '/ur/' : `/ur${basePath}`;
          option.href = urPath;
        } else if (currentLang === 'pt') {
          const basePath = currentPath.replace('/pt/', '/').replace('/pt', '/');
          const urPath = basePath === '/' ? '/ur/' : `/ur${basePath}`;
          option.href = urPath;
        } else if (currentLang === 'hi') {
          const basePath = currentPath.replace('/hi/', '/').replace('/hi', '/');
          const urPath = basePath === '/' ? '/ur/' : `/ur${basePath}`;
          option.href = urPath;
        } else if (currentLang === 'de') {
          const basePath = currentPath.replace('/de/', '/').replace('/de', '/');
          const urPath = basePath === '/' ? '/ur/' : `/ur${basePath}`;
          option.href = urPath;
        } else {
          option.href = currentPath || '/ur/';
        }
      } else if (targetLang === 'de') {
        // For German, add /de/ prefix if not present
        if (currentLang === 'en') {
          const dePath = currentPath === '/' ? '/de/' : `/de${currentPath}`;
          option.href = dePath;
        } else if (currentLang === 'es') {
          const basePath = currentPath.replace('/es/', '/').replace('/es', '/');
          const dePath = basePath === '/' ? '/de/' : `/de${basePath}`;
          option.href = dePath;
        } else if (currentLang === 'pt') {
          const basePath = currentPath.replace('/pt/', '/').replace('/pt', '/');
          const dePath = basePath === '/' ? '/de/' : `/de${basePath}`;
          option.href = dePath;
        } else if (currentLang === 'hi') {
          const basePath = currentPath.replace('/hi/', '/').replace('/hi', '/');
          const dePath = basePath === '/' ? '/de/' : `/de${basePath}`;
          option.href = dePath;
        } else if (currentLang === 'ur') {
          const basePath = currentPath.replace('/ur/', '/').replace('/ur', '/');
          const dePath = basePath === '/' ? '/de/' : `/de${basePath}`;
          option.href = dePath;
        } else {
          option.href = currentPath || '/de/';
        }
      }
    });
  }

  // Initialize language functionality
  function initLanguage() {
    updateLanguageButton();
    updateHreflangLinks();
    updateLanguageSwitcherLinks();

    // Add keyboard navigation for language switcher
    const langBtn = document.querySelector('.nav__lang-btn');
    const langDropdown = document.querySelector('.nav__lang-dropdown');

    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', () => {
        const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
        langBtn.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
          langDropdown.style.opacity = '1';
          langDropdown.style.visibility = 'visible';
          langDropdown.style.transform = 'translateY(0)';
        } else {
          langDropdown.style.opacity = '0';
          langDropdown.style.visibility = 'hidden';
          langDropdown.style.transform = 'translateY(-10px)';
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
          langBtn.setAttribute('aria-expanded', 'false');
          langDropdown.style.opacity = '0';
          langDropdown.style.visibility = 'hidden';
          langDropdown.style.transform = 'translateY(-10px)';
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
})();
