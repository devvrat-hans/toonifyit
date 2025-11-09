const Templates = (() => {
  let isLoading = false;
  let isLoaded = false;

  const loadTemplate = async (templateName, targetSelector) => {
    try {
      // Get the current page's location
      const currentPath = window.location.pathname;
      
      // Determine if we're in a subdirectory (blog/, etc.)
      const pathSegments = currentPath.split('/').filter(segment => segment);
      const isInSubdir = pathSegments.length > 1 || (pathSegments.length === 1 && pathSegments[0].includes('.html'));
      const isInBlogDir = currentPath.includes('/blog/');
      
      // Try multiple paths in order of likelihood
      const pathsToTry = [];
      
      if (isInBlogDir) {
        // For blog subdirectory pages
        pathsToTry.push(`../templates/${templateName}.html`);
        pathsToTry.push(`/templates/${templateName}.html`);
      } else {
        // For root level pages
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
        console.warn(`Target selector ${targetSelector} not found for ${templateName}`);
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
