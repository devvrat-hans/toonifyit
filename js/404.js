/* 404 Error Page JavaScript - toonifyit.com */

document.addEventListener('DOMContentLoaded', () => {
  // Track 404 errors for analytics (if Google Analytics is available)
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', {
      page_title: '404 Error',
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }

  // Handle search form submission
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.getElementById('search-input');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      
      if (query) {
        // Redirect to home page with search query
        // You can implement actual search functionality here
        window.location.href = `/?search=${encodeURIComponent(query)}`;
      }
    });
  }

  // Add animation to suggestion cards on load
  const suggestionCards = document.querySelectorAll('.suggestion-card');
  suggestionCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
