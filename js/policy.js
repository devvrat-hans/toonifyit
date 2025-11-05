/* Policy Pages JavaScript - toonifyit.com */
/* Shared TOC highlighting for Privacy, Terms, Disclaimer, and Cookie Policy pages */

document.addEventListener('DOMContentLoaded', () => {
  const tocLinks = document.querySelectorAll('.policy__toc-link, .policy__toc a');
  const sections = document.querySelectorAll('.policy__section');

  // Highlight active TOC link based on scroll position
  function highlightTOC() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Smooth scroll to sections
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Update TOC on scroll with requestAnimationFrame for smooth updates
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        highlightTOC();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial highlight
  highlightTOC();
});
