/* Common JS utilities - toonifyit.com */

// Toast notification function
const Toast = (() => {
  const show = (message, duration = 3000) => {
    const toast = document.querySelector('.toast') || createToast();
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  };

  const createToast = () => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
    return toast;
  };

  return { show };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Toast;
}
