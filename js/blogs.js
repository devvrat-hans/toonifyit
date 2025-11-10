// Blog Posts Data
const blogPosts = [
  {
    id: 'convert-json-to-toon',
    title: 'How to Convert JSON to TOON: Complete Guide',
    description: 'Learn how to convert JSON to TOON format with our comprehensive step-by-step guide. Save 30-60% on LLM tokens using our JSON to TOON converter. Includes examples and best practices.',
    excerpt: 'Master JSON to TOON conversion with this comprehensive tutorial. Learn methods, tools, and best practices to reduce LLM token usage by 30-60%. Real-world examples show $77,760 annual savings.',
    date: '2025-01-17',
    readTime: '18 min read',
    slug: 'convert-json-to-toon',
    url: '/blog/convert-json-to-toon.html',
    keywords: ['how to convert json to toon', 'json to toon converter', 'convert json to toon', 'json to toon', 'toon converter', 'json toon'],
    featured: true
  },
  {
    id: 'toon-vs-json',
    title: 'TOON vs JSON: A Comparative Analysis for LLM Token Efficiency',
    description: 'Comprehensive comparison of TOON format vs JSON for LLM applications. See how converting JSON to TOON reduces token usage by 30-60% with real-world benchmarks.',
    excerpt: 'Compare TOON vs JSON for Large Language Model applications. Discover why TOON format beats JSON with 30-60% token reduction, improved accuracy, and real-world cost savings. Complete analysis with benchmarks and practical examples.',
    date: '2025-01-16',
    readTime: '15 min read',
    slug: 'toon-vs-json',
    url: '/blog/toon-vs-json.html',
    keywords: ['toon vs json', 'json vs toon', 'json to toon', 'toon format', 'llm optimization', 'token efficiency'],
    featured: true
  },
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
function initBlogPage() {
  // Only run if we're on the blog page
  const container = document.getElementById('blog-posts-container');
  if (container) {
    renderBlogPosts();
    setupSearch();
  }
}

// Wait for templates to load first, then initialize
function init() {
  // Check if templates are loaded
  if (typeof Templates !== 'undefined' && Templates.isLoaded) {
    initBlogPage();
  } else {
    // Wait for templatesLoaded event
    window.addEventListener('templatesLoaded', initBlogPage);
  }
}

// Initialize with multiple triggers to ensure it runs
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM is already loaded
  init();
}
