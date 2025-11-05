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
          Toast.show(`Email copied: ${email}`);
        }).catch(err => {
          // Copy failed - fail silently
        });
      }
    });
  });
  
  // Track external link clicks for analytics (optional)
  const externalLinks = document.querySelectorAll('.contact__link[target="_blank"]');
  
  externalLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (link.hostname !== window.location.hostname) {
        // External link tracking could be added here if needed
      }
    });
  });
});
