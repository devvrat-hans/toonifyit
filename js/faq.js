// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqButtons = document.querySelectorAll('.faq__question');
  
  if (!faqButtons.length) return;
  
  faqButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const faqItem = button.closest('.faq__item');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      button.setAttribute('aria-expanded', !isExpanded);
      faqItem.classList.toggle('active', !isExpanded);
    });
    
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
});
