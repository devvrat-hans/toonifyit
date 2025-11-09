const Templates = (() => {
  const loadTemplate = async (templateName, targetSelector) => {
    try {
      const response = await fetch(`/templates/${templateName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load ${templateName} template`);
      }
      const html = await response.text();
      const target = document.querySelector(targetSelector);
      if (target) {
        target.innerHTML = html;
      }
    } catch (error) {
      // Template loading failed - fail silently
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
