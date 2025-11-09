/* Search Functionality - toonifyit.com */

// Simple client-side search implementation
const SearchEngine = {
  // Define searchable content across the website
  searchablePages: [
    {
      title: 'Home - JSON to TOON Converter',
      url: '/',
      keywords: 'json toon converter tool free online token optimization llm prompt engineering',
      description: 'Convert JSON to TOON format to reduce token usage for LLM prompts'
    },
    {
      title: 'Blog - Toonifyit',
      url: '/blogs.html',
      keywords: 'blog articles tutorials guides toon json format',
      description: 'Read articles and tutorials about TOON format and token optimization'
    },
    {
      title: 'What is TOON?',
      url: '/blog/what-is-toon.html',
      keywords: 'toon format token-oriented object notation llm optimization reduce tokens',
      description: 'Learn about TOON format and how it reduces token usage for LLMs'
    },
    {
      title: 'Documentation',
      url: '/docs.html',
      keywords: 'documentation docs toon format syntax specification guide reference',
      description: 'Complete documentation for TOON format syntax and usage'
    },
    {
      title: 'About Us',
      url: '/about.html',
      keywords: 'about toonifyit team mission company information',
      description: 'Learn about Toonifyit and our mission to optimize LLM token usage'
    },
    {
      title: 'Contact',
      url: '/contact.html',
      keywords: 'contact email support help feedback questions',
      description: 'Get in touch with the Toonifyit team'
    },
    {
      title: 'Privacy Policy',
      url: '/privacy.html',
      keywords: 'privacy policy data protection gdpr ccpa user data',
      description: 'Learn how we handle your privacy and protect your data'
    },
    {
      title: 'Terms of Service',
      url: '/terms.html',
      keywords: 'terms service conditions usage agreement legal',
      description: 'Terms and conditions for using Toonifyit'
    },
    {
      title: 'Cookie Policy',
      url: '/cookie-policy.html',
      keywords: 'cookie policy tracking analytics consent',
      description: 'Learn about how we use cookies on our website'
    },
    {
      title: 'Disclaimer',
      url: '/disclaimer.html',
      keywords: 'disclaimer legal liability warranty',
      description: 'Important legal disclaimers for using Toonifyit'
    }
  ],

  // Search function
  search(query) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const results = [];

    this.searchablePages.forEach(page => {
      let score = 0;
      
      // Check title match (highest weight)
      if (page.title.toLowerCase().includes(normalizedQuery)) {
        score += 10;
      }

      // Check keywords match (medium weight)
      if (page.keywords.toLowerCase().includes(normalizedQuery)) {
        score += 5;
      }

      // Check description match (lower weight)
      if (page.description.toLowerCase().includes(normalizedQuery)) {
        score += 2;
      }

      // Check for partial word matches
      const queryWords = normalizedQuery.split(' ');
      queryWords.forEach(word => {
        if (word.length >= 3) {
          if (page.title.toLowerCase().includes(word)) score += 3;
          if (page.keywords.toLowerCase().includes(word)) score += 2;
          if (page.description.toLowerCase().includes(word)) score += 1;
        }
      });

      if (score > 0) {
        results.push({
          ...page,
          score
        });
      }
    });

    // Sort by score (highest first)
    results.sort((a, b) => b.score - a.score);

    // Return top 10 results
    return results.slice(0, 10);
  },

  // Display results
  displayResults(results, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (results.length === 0) {
      container.innerHTML = `
        <div class="search-no-results">
          <p>No results found. Try different keywords.</p>
        </div>
      `;
      return;
    }

    const resultsHTML = results.map(result => `
      <a href="${result.url}" class="search-result-item">
        <h3 class="search-result-title">${result.title}</h3>
        <p class="search-result-description">${result.description}</p>
        <span class="search-result-url">${result.url}</span>
      </a>
    `).join('');

    container.innerHTML = `
      <div class="search-results">
        <p class="search-results-count">Found ${results.length} result${results.length !== 1 ? 's' : ''}</p>
        <div class="search-results-list">
          ${resultsHTML}
        </div>
      </div>
    `;
  }
};

// Initialize search on 404 page
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.getElementById('search-input');
  const searchResultsContainer = document.createElement('div');
  searchResultsContainer.className = 'search-results-container';

  if (searchForm && searchInput) {
    // Insert results container after search form
    searchForm.parentNode.insertBefore(searchResultsContainer, searchForm.nextSibling);

    // Handle form submission
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      
      if (query) {
        const results = SearchEngine.search(query);
        SearchEngine.displayResults(results, '.search-results-container');
        
        // Track search event
        if (typeof gtag === 'function') {
          gtag('event', 'search', {
            search_term: query,
            results_count: results.length
          });
        }
      }
    });

    // Real-time search as user types (debounced)
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length >= 3) {
        searchTimeout = setTimeout(() => {
          const results = SearchEngine.search(query);
          SearchEngine.displayResults(results, '.search-results-container');
        }, 300);
      } else if (query.length === 0) {
        searchResultsContainer.innerHTML = '';
      }
    });
  }
});

// Export for use in other pages if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchEngine;
}
