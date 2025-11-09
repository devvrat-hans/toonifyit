const Templates = (() => {
  let isLoading = false;
  let isLoaded = false;

  const loadTemplate = async (templateName, targetSelector) => {
    try {
      const currentPath = window.location.pathname;
      const isInBlogSubdir = currentPath.includes('/blog/');
      
      // Determine correct path based on current location
      let templatePath;
      if (isInBlogSubdir) {
        // For pages in blog/ subdirectory, go up one level
        templatePath = `../templates/${templateName}.html`;
      } else {
        // For root-level pages
        templatePath = `/templates/${templateName}.html`;
      }
      
      const response = await fetch(templatePath);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      
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

// Auto-initialize templates
(function initTemplates() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Templates.loadAll());
  } else {
    Templates.loadAll();
  }
})();
