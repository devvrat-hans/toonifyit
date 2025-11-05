/* Blog Search Functionality - toonifyit.com */

const BlogSearch = {
  // Define all blog posts for searching
  blogPosts: [
    {
      title: 'What is TOON Format? A Complete Guide',
      url: '/blog/what-is-toon.html',
      excerpt: 'Learn about TOON (Token-Oriented Object Notation) format and how it reduces token usage by 30-60% for LLM prompts compared to JSON',
      keywords: 'toon format json llm tokens optimization prompt engineering',
      date: 'November 5, 2025',
      category: 'Tutorial'
    }
    // Add more blog posts here as they are created
  ],

  // Search function
  search(query) {
    if (!query || query.trim().length < 2) {
      return this.blogPosts; // Return all posts if no query
    }

    const normalizedQuery = query.toLowerCase().trim();
    const results = [];

    this.blogPosts.forEach(post => {
      let score = 0;
      
      // Check title match (highest weight)
      if (post.title.toLowerCase().includes(normalizedQuery)) {
        score += 15;
      }

      // Check excerpt match (high weight)
      if (post.excerpt.toLowerCase().includes(normalizedQuery)) {
        score += 8;
      }

      // Check keywords match (medium weight)
      if (post.keywords.toLowerCase().includes(normalizedQuery)) {
        score += 5;
      }

      // Check category match
      if (post.category.toLowerCase().includes(normalizedQuery)) {
        score += 3;
      }

      // Check for partial word matches
      const queryWords = normalizedQuery.split(' ');
      queryWords.forEach(word => {
        if (word.length >= 3) {
          if (post.title.toLowerCase().includes(word)) score += 4;
          if (post.excerpt.toLowerCase().includes(word)) score += 2;
          if (post.keywords.toLowerCase().includes(word)) score += 1;
        }
      });

      if (score > 0) {
        results.push({
          ...post,
          score
        });
      }
    });

    // Sort by score (highest first), then by date
    results.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.date) - new Date(a.date);
    });

    return results;
  },

  // Highlight query terms in text
  highlightText(text, query) {
    if (!query || query.trim().length < 2) return text;
    
    const normalizedQuery = query.toLowerCase().trim();
    const words = normalizedQuery.split(' ').filter(w => w.length >= 3);
    
    let highlighted = text;
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });
    
    return highlighted;
  },

  // Display results
  displayResults(results, query, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (results.length === 0) {
      container.innerHTML = `
        <div class="blog-search-no-results">
          <svg class="no-results-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <h3>No blog posts found</h3>
          <p>Try different keywords or browse all posts below.</p>
        </div>
      `;
      return;
    }

    const resultsHTML = results.map(post => {
      const highlightedTitle = this.highlightText(post.title, query);
      const highlightedExcerpt = this.highlightText(post.excerpt, query);
      
      return `
        <article class="blog-card">
          <div class="blog-card__content">
            <div class="blog-card__meta">
              <span class="blog-card__category">${post.category}</span>
              <span class="blog-card__date">${post.date}</span>
            </div>
            <h2 class="blog-card__title">
              <a href="${post.url}">${highlightedTitle}</a>
            </h2>
            <p class="blog-card__excerpt">${highlightedExcerpt}</p>
            <a href="${post.url}" class="blog-card__link">Read more →</a>
          </div>
        </article>
      `;
    }).join('');

    const countText = results.length === this.blogPosts.length 
      ? `Showing all ${results.length} post${results.length !== 1 ? 's' : ''}`
      : `Found ${results.length} post${results.length !== 1 ? 's' : ''}`;

    container.innerHTML = `
      <div class="blog-search-results">
        <p class="blog-search-count">${countText}</p>
        <div class="blog-posts-grid">
          ${resultsHTML}
        </div>
      </div>
    `;
  }
};

// Initialize blog search
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('blog-search-input');
  const searchResultsContainer = document.querySelector('.blog-posts-container');

  if (searchInput && searchResultsContainer) {
    // Display all posts initially
    BlogSearch.displayResults(BlogSearch.blogPosts, '', '.blog-posts-container');

    // Real-time search as user types (debounced)
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      searchTimeout = setTimeout(() => {
        const results = BlogSearch.search(query);
        BlogSearch.displayResults(results, query, '.blog-posts-container');
        
        // Track search event
        if (typeof gtag === 'function' && query.length >= 3) {
          gtag('event', 'search', {
            search_term: query,
            search_type: 'blog',
            results_count: results.length
          });
        }
      }, 300);
    });

    // Clear search
    const clearButton = document.querySelector('.blog-search-clear');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        searchInput.value = '';
        BlogSearch.displayResults(BlogSearch.blogPosts, '', '.blog-posts-container');
        searchInput.focus();
      });
    }
  }
});

// Export for use in other contexts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BlogSearch;
}
