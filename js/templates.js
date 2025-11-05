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
      console.error(`Error loading template ${templateName}:`, error);
    }
  };

  const loadAll = async () => {
    await Promise.all([
      loadTemplate('navbar', '[data-template="navbar"]'),
      loadTemplate('footer', '[data-template="footer"]'),
      loadTemplate('cta', '[data-template="cta"]')
    ]);
  };

  return { loadAll };
})();

document.addEventListener('DOMContentLoaded', async () => {
  await Templates.loadAll();
});
