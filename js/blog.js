// Blog Posts Data
const blogPosts = [
  {
    id: 'what-is-toon',
    title: 'What is TOON Format? Complete JSON to TOON Conversion Guide',
    description: 'Learn how TOON format reduces LLM token usage by 30-60% compared to JSON. Complete guide with conversion examples, syntax, and best practices.',
    excerpt: 'Discover TOON (Token-Oriented Object Notation) - a revolutionary data format designed specifically for Large Language Models. Learn how converting JSON to TOON can reduce your token costs by up to 60% while maintaining perfect readability.',
    date: '2025-01-15',
    readTime: '12 min read',
    slug: 'what-is-toon',
    url: '/blog/what-is-toon.html',
    keywords: ['json to toon', 'toon format', 'llm optimization', 'token reduction'],
    featured: true
  }
  // Add more blog posts here as they are created
];

// Function to render blog posts
function renderBlogPosts() {
  const container = document.getElementById('blog-posts-container');
  
  if (!container) {
    console.error('Blog posts container not found');
    return;
  }

  // Clear container first
  container.innerHTML = '';

  if (blogPosts.length === 0) {
    container.innerHTML = `
      <div class="blog__empty">
        <h2 class="blog__empty-title">No blog posts yet</h2>
        <p class="blog__empty-text">Check back soon for insightful articles about TOON format, LLM optimization, and more!</p>
      </div>
    `;
    return;
  }

  // Render each blog post
  blogPosts.forEach(post => {
    const card = document.createElement('article');
    card.className = 'blog__card';
    card.innerHTML = `
      <div class="blog__card-content">
        <div class="blog__card-meta">
          <span class="blog__card-date">${formatDate(post.date)}</span>
          <span class="blog__card-divider">•</span>
          <span class="blog__card-read-time">${post.readTime}</span>
        </div>
        <h2 class="blog__card-title"><a href="${post.url}">${post.title}</a></h2>
        <p class="blog__card-excerpt">${post.excerpt}</p>
        <a href="${post.url}" class="blog__card-link">
          Read More
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    `;
    
    container.appendChild(card);
  });
}

// Function to format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

// Function to filter blog posts based on search
function filterBlogPosts(searchTerm) {
  const filtered = blogPosts.filter(post => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.description.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
    );
  });
  
  return filtered;
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById('blog-search');
  const searchButton = document.getElementById('blog-search-btn');
  const clearButton = document.getElementById('blog-clear-search');
  const container = document.getElementById('blog-posts-container');
  const resultsInfo = document.getElementById('search-results-info');

  if (!searchInput || !container) {
    return;
  }

  // Search function
  const performSearch = () => {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
      renderBlogPosts();
      if (resultsInfo) resultsInfo.textContent = '';
      if (clearButton) clearButton.style.display = 'none';
      return;
    }

    const filtered = filterBlogPosts(searchTerm);
    
    // Clear container
    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="blog__empty">
          <h2 class="blog__empty-title">No results found</h2>
          <p class="blog__empty-text">Try different keywords or <button class="blog__empty-clear" onclick="clearSearch()">clear search</button></p>
        </div>
      `;
      if (resultsInfo) resultsInfo.textContent = `No results found for "${searchTerm}"`;
    } else {
      // Render filtered posts
      filtered.forEach(post => {
        const card = document.createElement('article');
        card.className = 'blog__card';
        card.innerHTML = `
          <div class="blog__card-content">
            <div class="blog__card-meta">
              <span class="blog__card-date">${formatDate(post.date)}</span>
              <span class="blog__card-divider">•</span>
              <span class="blog__card-read-time">${post.readTime}</span>
            </div>
            <h2 class="blog__card-title"><a href="${post.url}">${post.title}</a></h2>
            <p class="blog__card-excerpt">${post.excerpt}</p>
            <a href="${post.url}" class="blog__card-link">
              Read More
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        `;
        container.appendChild(card);
      });
      
      if (resultsInfo) {
        resultsInfo.textContent = `Found ${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${searchTerm}"`;
      }
    }

    if (clearButton) clearButton.style.display = 'inline-block';
  };

  // Event listeners
  if (searchButton) {
    searchButton.addEventListener('click', performSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  if (clearButton) {
    clearButton.addEventListener('click', clearSearch);
  }
}

// Clear search function
function clearSearch() {
  const searchInput = document.getElementById('blog-search');
  const resultsInfo = document.getElementById('search-results-info');
  const clearButton = document.getElementById('blog-clear-search');
  
  if (searchInput) searchInput.value = '';
  if (resultsInfo) resultsInfo.textContent = '';
  if (clearButton) clearButton.style.display = 'none';
  
  renderBlogPosts();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Only run if we're on the blog page
  if (document.getElementById('blog-posts-container')) {
    renderBlogPosts();
    setupSearch();
  }
});
