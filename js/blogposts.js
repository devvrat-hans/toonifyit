// Blogpost JavaScript functionality
(function() {
  'use strict';

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          history.pushState(null, null, href);
        }
      });
    });
  }

  // Copy code blocks
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

  // Table of contents highlighting
  function initTocHighlight() {
    const tocLinks = document.querySelectorAll('.policy__toc a');
    const sections = document.querySelectorAll('.policy__section[id]');
    
    if (tocLinks.length === 0 || sections.length === 0) return;

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
    }, {
      rootMargin: '-100px 0px -80% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // Estimate reading time
  function initReadingTime() {
    const content = document.querySelector('.policy__content');
    if (!content) return;

    const text = content.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min

    const metaSection = document.querySelector('.blogpost__meta');
    if (metaSection) {
      const timeElement = document.createElement('div');
      timeElement.className = 'blogpost__meta-item';
      timeElement.innerHTML = `<span>⏱️</span><span>${readingTime} min read</span>`;
      metaSection.appendChild(timeElement);
    }
  }

  // Lazy load images
  function initLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // Initialize all features when DOM is ready
  function init() {
    initSmoothScroll();
    initCodeCopy();
    initTocHighlight();
    initReadingTime();
    initLazyLoad();
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
