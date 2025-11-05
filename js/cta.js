const CTA = (() => {
  const init = () => {
    console.log('CTA section initialized');
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', CTA.init);
