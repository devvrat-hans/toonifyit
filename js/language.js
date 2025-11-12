// Language Detection and Switcher
(function() {
  'use strict';

  // Detect current language from URL
  function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/es/') || path.startsWith('/es')) {
      return 'es';
    }
    if (path.startsWith('/fr/') || path.startsWith('/fr')) {
      return 'fr';
    }
    if (path.startsWith('/pt/') || path.startsWith('/pt')) {
      return 'pt';
    }
    if (path.startsWith('/hi/') || path.startsWith('/hi')) {
      return 'hi';
    }
    if (path.startsWith('/id/') || path.startsWith('/id')) {
      return 'id';
    }
    if (path.startsWith('/ja/') || path.startsWith('/ja')) {
      return 'ja';
    }
    if (path.startsWith('/nl/') || path.startsWith('/nl')) {
      return 'nl';
    }
    if (path.startsWith('/zh/') || path.startsWith('/zh')) {
      return 'zh';
    }
    if (path.startsWith('/ur/') || path.startsWith('/ur')) {
      return 'ur';
    }
    if (path.startsWith('/de/') || path.startsWith('/de')) {
      return 'de';
    }
    if (path.startsWith('/ko/') || path.startsWith('/ko')) {
      return 'ko';
    }
    if (path.startsWith('/sv/') || path.startsWith('/sv')) {
      return 'sv';
    }
    if (path.startsWith('/ar/') || path.startsWith('/ar')) {
      return 'ar';
    }
    if (path.startsWith('/he/') || path.startsWith('/he')) {
      return 'he';
    }
    if (path.startsWith('/it/') || path.startsWith('/it')) {
      return 'it';
    }
    if (path.startsWith('/pl/') || path.startsWith('/pl')) {
      return 'pl';
    }
    if (path.startsWith('/ru/') || path.startsWith('/ru')) {
      return 'ru';
    }
    if (path.startsWith('/tr/') || path.startsWith('/tr')) {
      return 'tr';
    }
    if (path.startsWith('/vi/') || path.startsWith('/vi')) {
      return 'vi';
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
    } else if (currentLang === 'sv') {
      pagePath = currentPath.replace('/sv/', '/').replace('/sv', '/');
    } else if (currentLang === 'ar') {
      pagePath = currentPath.replace('/ar/', '/').replace('/ar', '/');
    } else if (currentLang === 'he') {
      pagePath = currentPath.replace('/he/', '/').replace('/he', '/');
    } else if (currentLang === 'it') {
      pagePath = currentPath.replace('/it/', '/').replace('/it', '/');
    } else if (currentLang === 'pl') {
      pagePath = currentPath.replace('/pl/', '/').replace('/pl', '/');
    } else if (currentLang === 'ru') {
      pagePath = currentPath.replace('/ru/', '/').replace('/ru', '/');
    } else if (currentLang === 'tr') {
      pagePath = currentPath.replace('/tr/', '/').replace('/tr', '/');
    } else if (currentLang === 'vi') {
      pagePath = currentPath.replace('/vi/', '/').replace('/vi', '/');
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

    // Swedish version
    const svLink = document.createElement('link');
    svLink.rel = 'alternate';
    svLink.hreflang = 'sv';
    const svPath = pagePath === '/' ? '/sv/' : `/sv${pagePath}`;
    svLink.href = `https://toonifyit.com${svPath}`;
    head.appendChild(svLink);

    // Arabic version
    const arLink = document.createElement('link');
    arLink.rel = 'alternate';
    arLink.hreflang = 'ar';
    const arPath = pagePath === '/' ? '/ar/' : `/ar${pagePath}`;
    arLink.href = `https://toonifyit.com${arPath}`;
    head.appendChild(arLink);

    // Hebrew version
    const heLink = document.createElement('link');
    heLink.rel = 'alternate';
    heLink.hreflang = 'he';
    const hePath = pagePath === '/' ? '/he/' : `/he${pagePath}`;
    heLink.href = `https://toonifyit.com${hePath}`;
    head.appendChild(heLink);

    // Italian version
    const itLink = document.createElement('link');
    itLink.rel = 'alternate';
    itLink.hreflang = 'it';
    const itPath = pagePath === '/' ? '/it/' : `/it${pagePath}`;
    itLink.href = `https://toonifyit.com${itPath}`;
    head.appendChild(itLink);

    // Polish version
    const plLink = document.createElement('link');
    plLink.rel = 'alternate';
    plLink.hreflang = 'pl';
    const plPath = pagePath === '/' ? '/pl/' : `/pl${pagePath}`;
    plLink.href = `https://toonifyit.com${plPath}`;
    head.appendChild(plLink);

    // Russian version
    const ruLink = document.createElement('link');
    ruLink.rel = 'alternate';
    ruLink.hreflang = 'ru';
    const ruPath = pagePath === '/' ? '/ru/' : `/ru${pagePath}`;
    ruLink.href = `https://toonifyit.com${ruPath}`;
    head.appendChild(ruLink);

    // Turkish version
    const trLink = document.createElement('link');
    trLink.rel = 'alternate';
    trLink.hreflang = 'tr';
    const trPath = pagePath === '/' ? '/tr/' : `/tr${pagePath}`;
    trLink.href = `https://toonifyit.com${trPath}`;
    head.appendChild(trLink);

    // Vietnamese version
    const viLink = document.createElement('link');
    viLink.rel = 'alternate';
    viLink.hreflang = 'vi';
    const viPath = pagePath === '/' ? '/vi/' : `/vi${pagePath}`;
    viLink.href = `https://toonifyit.com${viPath}`;
    head.appendChild(viLink);

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
        } else if (currentLang === 'sv') {
          const enPath = currentPath.replace('/sv/', '/').replace('/sv', '/');
          option.href = enPath || '/';
        } else if (currentLang === 'ar') {
          const enPath = currentPath.replace('/ar/', '/').replace('/ar', '/');
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
        } else if (currentLang === 'sv') {
          const basePath = currentPath.replace('/sv/', '/').replace('/sv', '/');
          const esPath = basePath === '/' ? '/es/' : `/es${basePath}`;
          option.href = esPath;
        } else if (currentLang === 'ar') {
          const basePath = currentPath.replace('/ar/', '/').replace('/ar', '/');
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
        } else if (currentLang === 'sv') {
          const basePath = currentPath.replace('/sv/', '/').replace('/sv', '/');
          const ptPath = basePath === '/' ? '/pt/' : `/pt${basePath}`;
          option.href = ptPath;
        } else if (currentLang === 'ar') {
          const basePath = currentPath.replace('/ar/', '/').replace('/ar', '/');
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
        } else if (currentLang === 'sv') {
          const basePath = currentPath.replace('/sv/', '/').replace('/sv', '/');
          const hiPath = basePath === '/' ? '/hi/' : `/hi${basePath}`;
          option.href = hiPath;
        } else if (currentLang === 'ar') {
          const basePath = currentPath.replace('/ar/', '/').replace('/ar', '/');
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
        } else if (currentLang === 'sv') {
          const basePath = currentPath.replace('/sv/', '/').replace('/sv', '/');
          const urPath = basePath === '/' ? '/ur/' : `/ur${basePath}`;
          option.href = urPath;
        } else if (currentLang === 'ar') {
          const basePath = currentPath.replace('/ar/', '/').replace('/ar', '/');
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
        } else if (currentLang === 'sv') {
          const basePath = currentPath.replace('/sv/', '/').replace('/sv', '/');
          const dePath = basePath === '/' ? '/de/' : `/de${basePath}`;
          option.href = dePath;
        } else if (currentLang === 'ar') {
          const basePath = currentPath.replace('/ar/', '/').replace('/ar', '/');
          const dePath = basePath === '/' ? '/de/' : `/de${basePath}`;
          option.href = dePath;
        } else {
          option.href = currentPath || '/de/';
        }
      } else if (targetLang === 'sv') {
        // For Swedish, add /sv/ prefix if not present
        if (currentLang === 'en') {
          const svPath = currentPath === '/' ? '/sv/' : `/sv${currentPath}`;
          option.href = svPath;
        } else if (currentLang === 'es') {
          const basePath = currentPath.replace('/es/', '/').replace('/es', '/');
          const svPath = basePath === '/' ? '/sv/' : `/sv${basePath}`;
          option.href = svPath;
        } else if (currentLang === 'pt') {
          const basePath = currentPath.replace('/pt/', '/').replace('/pt', '/');
          const svPath = basePath === '/' ? '/sv/' : `/sv${basePath}`;
          option.href = svPath;
        } else if (currentLang === 'hi') {
          const basePath = currentPath.replace('/hi/', '/').replace('/hi', '/');
          const svPath = basePath === '/' ? '/sv/' : `/sv${basePath}`;
          option.href = svPath;
        } else if (currentLang === 'ur') {
          const basePath = currentPath.replace('/ur/', '/').replace('/ur', '/');
          const svPath = basePath === '/' ? '/sv/' : `/sv${basePath}`;
          option.href = svPath;
        } else if (currentLang === 'de') {
          const basePath = currentPath.replace('/de/', '/').replace('/de', '/');
          const svPath = basePath === '/' ? '/sv/' : `/sv${basePath}`;
          option.href = svPath;
        } else {
          option.href = currentPath || '/sv/';
        }
      } else if (targetLang === 'ar') {
        // For Arabic, add /ar/ prefix if not present
        if (currentLang === 'en') {
          const arPath = currentPath === '/' ? '/ar/' : `/ar${currentPath}`;
          option.href = arPath;
        } else if (currentLang === 'es') {
          const basePath = currentPath.replace('/es/', '/').replace('/es', '/');
          const arPath = basePath === '/' ? '/ar/' : `/ar${basePath}`;
          option.href = arPath;
        } else if (currentLang === 'pt') {
          const basePath = currentPath.replace('/pt/', '/').replace('/pt', '/');
          const arPath = basePath === '/' ? '/ar/' : `/ar${basePath}`;
          option.href = arPath;
        } else if (currentLang === 'hi') {
          const basePath = currentPath.replace('/hi/', '/').replace('/hi', '/');
          const arPath = basePath === '/' ? '/ar/' : `/ar${basePath}`;
          option.href = arPath;
        } else if (currentLang === 'ur') {
          const basePath = currentPath.replace('/ur/', '/').replace('/ur', '/');
          const arPath = basePath === '/' ? '/ar/' : `/ar${basePath}`;
          option.href = arPath;
        } else if (currentLang === 'de') {
          const basePath = currentPath.replace('/de/', '/').replace('/de', '/');
          const arPath = basePath === '/' ? '/ar/' : `/ar${basePath}`;
          option.href = arPath;
        } else if (currentLang === 'sv') {
          const basePath = currentPath.replace('/sv/', '/').replace('/sv', '/');
          const arPath = basePath === '/' ? '/ar/' : `/ar${basePath}`;
          option.href = arPath;
        } else {
          option.href = currentPath || '/ar/';
        }
      }
    });
  }

  // Initialize language functionality
  function initLanguage() {
    updateLanguageButton();
    updateHreflangLinks();
    // DISABLED: updateLanguageSwitcherLinks() - navbar templates already have correct absolute path hrefs
    // updateLanguageSwitcherLinks();

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

  // Re-run when templates load (if templates.js is used)
  window.addEventListener('templatesLoaded', initLanguage);
  
  // Also run after a short delay to ensure navbar is rendered
  setTimeout(initLanguage, 100);
})();
