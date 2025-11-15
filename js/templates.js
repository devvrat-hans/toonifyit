const Templates = (() => {
  let isLoading = false;
  let isLoaded = false;

  // Detect current language from URL
  const getCurrentLanguage = () => {
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
    return 'en';
  };

  const loadTemplate = async (templateName, targetSelector) => {
    try {
      // Get the current page's location
      const currentPath = window.location.pathname;
      const currentLang = getCurrentLanguage();
      
      // Determine if we're in a subdirectory (blog/, etc.)
      const pathSegments = currentPath.split('/').filter(segment => segment);
      const isInSubdir = pathSegments.length > 1 || (pathSegments.length === 1 && pathSegments[0].includes('.html'));
      const isInBlogDir = currentPath.includes('/blog/');
      const isInEsDir = currentPath.startsWith('/es/');
      const isInFrDir = currentPath.startsWith('/fr/');
      const isInPtDir = currentPath.startsWith('/pt/');
      const isInHiDir = currentPath.startsWith('/hi/');
      const isInIdDir = currentPath.startsWith('/id/');
      const isInJaDir = currentPath.startsWith('/ja/');
      const isInNlDir = currentPath.startsWith('/nl/');
      const isInZhDir = currentPath.startsWith('/zh/');
      const isInUrDir = currentPath.startsWith('/ur/');
      const isInDeDir = currentPath.startsWith('/de/');
      const isInKoDir = currentPath.startsWith('/ko/');
      
      // Try multiple paths in order of likelihood
      const pathsToTry = [];
      
      if (isInBlogDir) {
        // For blog subdirectory pages
        if (currentLang === 'es') {
          pathsToTry.push(`../templates/es/${templateName}.html`);
        } else if (currentLang === 'pt') {
          pathsToTry.push(`../templates/pt/${templateName}.html`);
        } else if (currentLang === 'hi') {
          pathsToTry.push(`../templates/hi/${templateName}.html`);
        } else if (currentLang === 'ur') {
          pathsToTry.push(`../templates/ur/${templateName}.html`);
        } else if (currentLang === 'de') {
          pathsToTry.push(`../templates/de/${templateName}.html`);
        }
        pathsToTry.push(`../templates/${templateName}.html`);
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInEsDir) {
        // For Spanish pages in /es/ directory
        pathsToTry.push(`/templates/es/${templateName}.html`);
        pathsToTry.push(`../templates/es/${templateName}.html`);
        pathsToTry.push(`./templates/es/${templateName}.html`);
        // Fallback to English templates
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInPtDir) {
        // For Portuguese pages in /pt/ directory
        pathsToTry.push(`/templates/pt/${templateName}.html`);
        pathsToTry.push(`../templates/pt/${templateName}.html`);
        pathsToTry.push(`./templates/pt/${templateName}.html`);
        // Fallback to English templates
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInHiDir) {
        // For Hindi pages in /hi/ directory
        pathsToTry.push(`/templates/hi/${templateName}.html`);
        pathsToTry.push(`../templates/hi/${templateName}.html`);
        pathsToTry.push(`./templates/hi/${templateName}.html`);
        // Fallback to English templates
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInUrDir) {
        // For Urdu pages in /ur/ directory
        pathsToTry.push(`/templates/ur/${templateName}.html`);
        pathsToTry.push(`../templates/ur/${templateName}.html`);
        pathsToTry.push(`./templates/ur/${templateName}.html`);
        // Fallback to English templates
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInDeDir) {
        // For German pages in /de/ directory
        pathsToTry.push(`/templates/de/${templateName}.html`);
        pathsToTry.push(`../templates/de/${templateName}.html`);
        pathsToTry.push(`./templates/de/${templateName}.html`);
        // Fallback to English templates
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInFrDir) {
        // For French pages in /fr/ directory
        pathsToTry.push(`/templates/fr/${templateName}.html`);
        pathsToTry.push(`../templates/fr/${templateName}.html`);
        pathsToTry.push(`./templates/fr/${templateName}.html`);
        // Fallback to English templates
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInIdDir) {
        // For Indonesian pages in /id/ directory
        pathsToTry.push(`/templates/id/${templateName}.html`);
        pathsToTry.push(`../templates/id/${templateName}.html`);
        pathsToTry.push(`./templates/id/${templateName}.html`);
        // Fallback to English templates
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInJaDir) {
        // For Japanese pages in /ja/ directory
        pathsToTry.push(`/templates/ja/${templateName}.html`);
        pathsToTry.push(`../templates/ja/${templateName}.html`);
        pathsToTry.push(`./templates/ja/${templateName}.html`);
        // Fallback to English templates
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInNlDir) {
        // For Dutch pages in /nl/ directory
        pathsToTry.push(`/templates/nl/${templateName}.html`);
        pathsToTry.push(`../templates/nl/${templateName}.html`);
        pathsToTry.push(`./templates/nl/${templateName}.html`);
        // Fallback to English templates
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInZhDir) {
        // For Chinese pages in /zh/ directory
        pathsToTry.push(`/templates/zh/${templateName}.html`);
        pathsToTry.push(`../templates/zh/${templateName}.html`);
        pathsToTry.push(`./templates/zh/${templateName}.html`);
        // Fallback to English templates
        pathsToTry.push(`/templates/${templateName}.html`);
      } else if (isInKoDir) {
        // For Korean pages in /ko/ directory
        pathsToTry.push(`/templates/ko/${templateName}.html`);
        pathsToTry.push(`../templates/ko/${templateName}.html`);
        pathsToTry.push(`./templates/ko/${templateName}.html`);
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
          console.log(`[Templates] Trying path for ${templateName}: ${path}`);
          const response = await fetch(path);
          console.log(`[Templates] Response for ${path}: status=${response.status}, ok=${response.ok}`);
          if (response.ok) {
            html = await response.text();
            successPath = path;
            console.log(`[Templates] SUCCESS! Loaded ${templateName} from: ${successPath}`);
            break;
          }
        } catch (err) {
          // Continue to next path
          console.log(`[Templates] Failed to fetch ${path}:`, err.message);
          continue;
        }
      }
      
      if (!html) {
        throw new Error(`Could not load template ${templateName} from any path`);
      }
      
      console.log(`[Templates] Successfully fetched ${templateName}, HTML length: ${html.length}`);
      console.log(`[Templates] Template ${templateName} first 100 chars:`, html.substring(0, 100));
      
      // Insert the template
      const target = document.querySelector(targetSelector);
      console.log(`[Templates] Target for ${templateName} (${targetSelector}):`, target);
      
      if (target) {
        target.innerHTML = html;
        console.log(`[Templates] Inserted ${templateName}, new innerHTML length: ${target.innerHTML.length}`);
      } else {
        // Only warn if it's an ID selector and there's no data-template alternative
        if (targetSelector.startsWith('#')) {
          const templateName = targetSelector.replace('#', '').replace('-placeholder', '');
          const dataTemplateExists = document.querySelector(`[data-template="${templateName}"]`);
          if (!dataTemplateExists) {
            console.warn(`Target selector ${targetSelector} not found for ${templateName}`);
          }
        } else {
          console.warn(`Target selector ${targetSelector} not found for ${templateName}`);
        }
      }
    } catch (error) {
      console.error(`Template loading error for ${templateName}:`, error);
    }
  };

  const loadAll = async () => {
    // Prevent multiple simultaneous loads
    if (isLoading || isLoaded) {
      return;
    }
    
    isLoading = true;

    try {
      // Wait for DOM to be ready
      await new Promise((resolve) => {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', resolve);
        } else {
          resolve();
        }
      });

      // Load templates using ID placeholders
      await Promise.all([
        loadTemplate('navbar', '#navbar-placeholder'),
        loadTemplate('footer', '#footer-placeholder'),
        loadTemplate('cta', '#cta-placeholder')
      ]);

      // Also support data-template attribute format
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
      
      // Dispatch custom event to notify other scripts that templates are loaded
      window.dispatchEvent(new Event('templatesLoaded'));
      
      // Initialize hamburger menu after templates load with a small delay
      setTimeout(() => {
        initHamburgerMenu();
      }, 100);
    } catch (error) {
      console.error('Error loading templates:', error);
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
    console.warn('Hamburger menu elements not found, retrying...');
    // Retry after a short delay
    setTimeout(initHamburgerMenu, 200);
    return;
  }
  
  console.log('Hamburger menu initialized');
  
  // Toggle menu on button click
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
    console.log('Menu toggled:', isActive);
  });
  
  // Close menu when clicking a nav link
  const links = navLinks.querySelectorAll('a:not(.nav__language-current)');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navToggle.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.classList.contains('active')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Auto-initialize templates with multiple triggers to ensure it runs
(function initTemplates() {
  // Try immediately if DOM is already loaded
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    Templates.loadAll();
  } else {
    // Otherwise wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => Templates.loadAll());
  }
  
  // Also try on window load as a fallback
  window.addEventListener('load', () => {
    if (!Templates.isLoaded) {
      Templates.loadAll();
    }
  });
})();
