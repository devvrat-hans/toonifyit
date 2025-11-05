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

  // Reading progress bar
  function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 76px;
      left: 0;
      width: 0;
      height: 3px;
      background: var(--accent);
      z-index: 999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      progressBar.style.width = progress + '%';
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
      button.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--bg-secondary);
        color: var(--text-primary);
        border: 1px solid var(--border);
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;
        opacity: 0;
        transition: opacity 0.2s ease;
      `;
      
      pre.style.position = 'relative';
      pre.appendChild(button);
      
      pre.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
      });
      
      pre.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
      });
      
      button.addEventListener('click', async () => {
        const code = codeBlock.textContent;
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = 'Copied!';
          button.style.background = 'var(--success)';
          button.style.color = 'white';
          
          setTimeout(() => {
            button.textContent = 'Copy';
            button.style.background = 'var(--bg-secondary)';
            button.style.color = 'var(--text-primary)';
          }, 2000);
        } catch (err) {
          // Copy failed - fail silently
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
    initReadingProgress();
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
