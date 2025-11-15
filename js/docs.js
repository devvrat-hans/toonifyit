// Documentation Page JavaScript

// Smooth scroll for TOC links
document.addEventListener('DOMContentLoaded', () => {
  const tocLinks = document.querySelectorAll('.policy__toc-link');
  
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active state
        tocLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Update URL without scrolling
        history.pushState(null, '', `#${targetId}`);
      }
    });
  });

  // Highlight active section on scroll
  const sections = document.querySelectorAll('.policy__section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Handle initial hash on page load
  if (window.location.hash) {
    const targetId = window.location.hash.slice(1);
    const targetLink = document.querySelector(`.policy__toc-link[href="#${targetId}"]`);
    if (targetLink) {
      setTimeout(() => {
        targetLink.click();
      }, 100);
    }
  }

  // Copy code blocks functionality
  function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      const button = document.createElement('button');
      button.className = 'code-copy-btn';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      
      pre.style.position = 'relative';
      pre.appendChild(button);
      
      button.addEventListener('click', async () => {
        const code = codeBlock.textContent;
        try {
          await navigator.clipboard.writeText(code);
          button.classList.add('copied');
          button.textContent = 'Copied!';
          
          setTimeout(() => {
            button.classList.remove('copied');
            button.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          // Copy failed - show error briefly
          button.textContent = 'Failed';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 1500);
        }
      });
    });
  }

  // Initialize code copy functionality
  initCodeCopy();
});
