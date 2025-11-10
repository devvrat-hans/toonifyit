const Templates = (() => {
  let isLoading = false;
  let isLoaded = false;

  // Detect current language from URL
  const getCurrentLanguage = () => {
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
      const isInPtDir = currentPath.startsWith('/pt/');
      const isInHiDir = currentPath.startsWith('/hi/');
      const isInUrDir = currentPath.startsWith('/ur/');
      const isInDeDir = currentPath.startsWith('/de/');
      
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
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      isLoading = false;
    }
  };

  return { loadAll };
})();

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
