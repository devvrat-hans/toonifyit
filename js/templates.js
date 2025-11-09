const Templates = (() => {
  const loadTemplate = async (templateName, targetSelector) => {
    try {
      // Try multiple path strategies
      const paths = [
        `/templates/${templateName}.html`,
        `./templates/${templateName}.html`,
        `templates/${templateName}.html`
      ];
      
      let response = null;
      let lastError = null;
      
      for (const path of paths) {
        try {
          response = await fetch(path);
          if (response.ok) break;
        } catch (err) {
          lastError = err;
        }
      }
      
      if (!response || !response.ok) {
        console.error(`Failed to load ${templateName} template from any path`);
        return;
      }
      
      const html = await response.text();
      const target = document.querySelector(targetSelector);
      if (target) {
        target.innerHTML = html;
      }
    } catch (error) {
      console.error(`Template loading error for ${templateName}:`, error);
    }
  };

  const loadAll = async () => {
    // Load templates using ID placeholders
    await Promise.all([
      loadTemplate('navbar', '#navbar-placeholder'),
      loadTemplate('footer', '#footer-placeholder'),
      loadTemplate('cta', '#cta-placeholder')
    ]);

    // Also support data-template attribute format
    const dataTemplateElements = document.querySelectorAll('[data-template]');
    await Promise.all(
      Array.from(dataTemplateElements).map(element => {
        const templateName = element.getAttribute('data-template');
        return loadTemplate(templateName, `[data-template="${templateName}"]`);
      })
    );
  };

  return { loadAll };
})();

// Load templates when DOM is ready, but don't block other scripts
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', async () => {
    await Templates.loadAll();
  });
} else {
  Templates.loadAll();
}
