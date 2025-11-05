/* Contact Page JavaScript - toonifyit.com */
/* Handles email copying and social link interactions */

document.addEventListener('DOMContentLoaded', () => {
  // Add copy-to-clipboard functionality for email addresses
  const emailLinks = document.querySelectorAll('.contact__link[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Extract email from mailto: link
      const email = link.href.replace('mailto:', '');
      
      // Copy to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Email copied: ${email}`);
        }).catch(err => {
          console.error('Failed to copy email:', err);
        });
      }
    });
  });
  
  // Track external link clicks for analytics (optional)
  const externalLinks = document.querySelectorAll('.contact__link[target="_blank"]');
  
  externalLinks.forEach(link => {
    link.addEventListener('click', () => {
      console.log('External link clicked:', link.href);
      // Add analytics tracking here if needed
    });
  });
});

// Toast notification helper
function showToast(message, duration = 3000) {
  const toast = document.querySelector('.toast') || createToast();
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

function createToast() {
  const toast = document.createElement('div');
  toast.className = 'toast';
  document.body.appendChild(toast);
  return toast;
}
