// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqButtons = document.querySelectorAll('.faq__question');
  
  if (faqButtons.length === 0) {
    return;
  }
  
  faqButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const faqItem = button.closest('.faq__item');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      // Toggle current item
      const newExpandedState = !isExpanded;
      button.setAttribute('aria-expanded', String(newExpandedState));
      
      if (newExpandedState) {
        faqItem.classList.add('active');
      } else {
        faqItem.classList.remove('active');
      }
    });
    
    // Keyboard accessibility
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
});
