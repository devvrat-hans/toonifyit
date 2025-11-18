const Templates = (() => {
  let isLoading = false;
  let isLoaded = false;

  // Detect current language from URL
  const getCurrentLanguage = () => {
    const path = window.location.pathname;
    const languages = ['es', 'fr', 'pt', 'hi', 'id', 'ja', 'nl', 'zh', 'ur', 'de', 'ko', 'ar', 'he', 'it', 'pl', 'ru', 'sv', 'tr', 'vi'];
    
    for (const lang of languages) {
      if (path.startsWith(`/${lang}/`) || path.startsWith(`/${lang}`)) {
        return lang;
      }
    }
    return 'en';
  };

  const loadTemplate = async (templateName, targetSelector) => {
    try {
      const currentPath = window.location.pathname;
      const currentLang = getCurrentLanguage();
      
      const isInBlogDir = currentPath.includes('/blog/');
      const isInLangDir = currentLang !== 'en';
      
      // Build paths to try
      const pathsToTry = [];
      
      if (isInBlogDir) {
        // For blog subdirectory pages
        if (isInLangDir) {
          pathsToTry.push(`../templates/${currentLang}/${templateName}.html`);
        }
        pathsToTry.push(`../templates/${templateName}.html`);
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInLangDir) {
        // For language directory pages
        pathsToTry.push(`/templates/${currentLang}/${templateName}.html`);
        pathsToTry.push(`../templates/${currentLang}/${templateName}.html`);
        pathsToTry.push(`./templates/${currentLang}/${templateName}.html`);
        // Fallback to English templates
        pathsToTry.push(`/templates/${templateName}.html`);
      } else {
        // For root level pages (English)
        pathsToTry.push(`/templates/${templateName}.html`);
        pathsToTry.push(`./templates/${templateName}.html`);
        pathsToTry.push(`templates/${templateName}.html`);
      }
      
      let html = null;
      let successPath = null;
      
      // Try each path until one works
      for (const path of pathsToTry) {
        try {
          const response = await fetch(path);
          if (response.ok) {
            html = await response.text();
            successPath = path;
            break;
          }
        } catch (err) {
          // Continue to next path
          continue;
        }
      }
      
      if (!html) {
        throw new Error(`Could not load template ${templateName} from any path`);
      }
      
      // Insert the template
      const target = document.querySelector(targetSelector);
      
      if (target) {
        target.innerHTML = html;
      } else {
        // Target selector not found - silently skip
      }
    } catch (error) {
      // Template loading error - silently skip
    }
  };

  const loadAll = async () => {
    if (isLoading || isLoaded) return;
    
    isLoading = true;

    try {
      // Load templates using data-template attributes
      const dataTemplateElements = document.querySelectorAll('[data-template]');
      if (dataTemplateElements.length > 0) {
        await Promise.all(
          Array.from(dataTemplateElements).map(element => {
            const templateName = element.getAttribute('data-template');
            return loadTemplate(templateName, `[data-template="${templateName}"]`);
          })
        );
      }

      isLoaded = true;
      window.dispatchEvent(new Event('templatesLoaded'));
      
      // Initialize hamburger menu after templates load
      setTimeout(() => {
        initHamburgerMenu();
      }, 50);
    } catch (error) {
      // Error loading templates - silently skip
    } finally {
      isLoading = false;
    }
  };

  return { loadAll, get isLoaded() { return isLoaded; } };
})();

// Hamburger Menu Toggle
function initHamburgerMenu() {
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  
  if (!navToggle || !navLinks) {
    setTimeout(initHamburgerMenu, 100);
    return;
  }
  
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
  });
  
  const links = navLinks.querySelectorAll('a:not(.nav__language-current)');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
  
  document.addEventListener('click', (e) => {
    if (navToggle.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.classList.contains('active')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Auto-initialize templates
(function initTemplates() {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    Templates.loadAll();
  } else {
    document.addEventListener('DOMContentLoaded', () => Templates.loadAll());
  }
  
  window.addEventListener('load', () => {
    if (!Templates.isLoaded) {
      Templates.loadAll();
    }
  });
})();
