// ============================================
// Blog Posts Data and Functionality
// ============================================

// Blog Posts Data
const blogPosts = [
  {
    id: 'llm-token-optimization',
    title: 'LLM Token Optimization: Reduce AI Costs by 30-90%',
    description: 'Complete guide to LLM token optimization. Learn proven strategies including prompt engineering, model tiering, caching, batch processing, and JSON to TOON conversion to reduce AI costs by 30-90%.',
    excerpt: 'Master LLM token optimization with proven strategies that organizations use to achieve 30-90% cost reductions. Learn prompt engineering, model tiering, caching, batch processing, RAG optimization, and how converting JSON to TOON saves 30-60% tokens.',
    date: '2025-11-11',
    readTime: '22 min read',
    slug: 'llm-token-optimization',
    url: '/blog/llm-token-optimization.html',
    keywords: ['llm token optimization', 'reduce llm costs', 'prompt engineering', 'json to toon', 'toon format', 'ai cost optimization', 'token efficiency'],
    featured: true
  },
  // {
  //   id: 'prompt-engineering-for-llms',
  //   title: 'Prompt Engineering for LLMs: Complete 2025 Masterclass',
  //   description: 'Master prompt engineering for LLMs with proven techniques: few-shot prompting, chain-of-thought, role assignment, ReAct, and structured prompting. Achieve 3-5x better AI performance with this complete guide.',
  //   excerpt: 'Complete masterclass on prompt engineering for Large Language Models. Learn foundational principles, advanced techniques (few-shot, chain-of-thought, ReAct, structured prompting), common mistakes, and real-world examples. Achieve 3-5x better performance.',
  //   date: '2025-11-10',
  //   readTime: '22 min read',
  //   slug: 'prompt-engineering-for-llms',
  //   url: '/blog/prompt-engineering-for-llms.html',
  //   keywords: ['prompt engineering', 'llm prompting', 'few-shot prompting', 'chain of thought', 'json to toon', 'toon format', 'ai optimization', 'llm optimization'],
  //   featured: true
  // },
  {
    id: 'what-is-toon',
    title: 'What is TOON Format? Complete JSON to TOON Conversion Guide',
    description: 'Learn how TOON format reduces LLM token usage by 30-60% compared to JSON. Complete guide with conversion examples, syntax, and best practices.',
    excerpt: 'Discover TOON (Token-Oriented Object Notation) - a revolutionary data format designed specifically for Large Language Models. Learn how converting JSON to TOON can reduce your token costs by up to 60% while maintaining perfect readability.',
    date: '2025-10-30',
    readTime: '12 min read',
    slug: 'what-is-toon',
    url: '/blog/what-is-toon.html',
    keywords: ['json to toon', 'toon format', 'llm optimization', 'token reduction'],
    featured: true
  },
  {
    id: 'toon-vs-json',
    title: 'TOON vs JSON: A Comparative Analysis for LLM Token Efficiency',
    description: 'Comprehensive comparison of TOON format vs JSON for LLM applications. See how converting JSON to TOON reduces token usage by 30-60% with real-world benchmarks.',
    excerpt: 'Compare TOON vs JSON for Large Language Model applications. Discover why TOON format beats JSON with 30-60% token reduction, improved accuracy, and real-world cost savings. Complete analysis with benchmarks and practical examples.',
    date: '2025-10-25',
    readTime: '15 min read',
    slug: 'toon-vs-json',
    url: '/blog/toon-vs-json.html',
    keywords: ['toon vs json', 'json vs toon', 'json to toon', 'toon format', 'llm optimization', 'token efficiency'],
    featured: true
  },
  {
    id: 'convert-json-to-toon',
    title: 'How to Convert JSON to TOON: Complete Guide',
    description: 'Learn how to convert JSON to TOON format with our comprehensive step-by-step guide. Save 30-60% on LLM tokens using our JSON to TOON converter. Includes examples and best practices.',
    excerpt: 'Master JSON to TOON conversion with this comprehensive tutorial. Learn methods, tools, and best practices to reduce LLM token usage by 30-60%. Real-world examples show $77,760 annual savings.',
    date: '2025-10-17',
    readTime: '18 min read',
    slug: 'convert-json-to-toon',
    url: '/blog/convert-json-to-toon.html',
    keywords: ['how to convert json to toon', 'json to toon converter', 'convert json to toon', 'json to toon', 'toon converter', 'json toon'],
    featured: true
  }
];

// ============================================
// Render Functions
// ============================================

function renderBlogPosts(postsToRender = null) {
  const container = document.getElementById('blog-posts-container');
  
  if (!container) {
    console.error('Blog posts container not found');
    return;
  }

  // Clear container first
  container.innerHTML = '';

  // Use provided posts or default to all blog posts
  const posts = postsToRender || blogPosts;

  if (posts.length === 0) {
    container.innerHTML = `
      <div class="blog__empty">
        <p class="blog__empty-text">No blog posts found matching your search.</p>
      </div>
    `;
    return;
  }

  // Render each blog post
  posts.forEach((post) => {
    const card = document.createElement('article');
    card.className = 'blog__card';
    card.innerHTML = `
      <div class="blog__card-content">
        <div class="blog__card-meta">
          <span class="blog__card-date">${formatDate(post.date)}</span>
          <span class="blog__card-divider">•</span>
          <span class="blog__card-read-time">${post.readTime}</span>
        </div>
        <h2 class="blog__card-title">
          <a href="${post.url}">${post.title}</a>
        </h2>
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

// ============================================
// Utility Functions
// ============================================

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

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

// ============================================
// Search Functionality
// ============================================

function setupSearch() {
  const searchInput = document.getElementById('blog-search');
  const searchButton = document.getElementById('blog-search-btn');
  const clearButton = document.getElementById('blog-clear-search');
  const resultsInfo = document.getElementById('search-results-info');

  if (!searchInput) {
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
    renderBlogPosts(filtered);

    if (filtered.length === 0) {
      if (resultsInfo) resultsInfo.textContent = `No results found for "${searchTerm}"`;
    } else {
      if (resultsInfo) {
        resultsInfo.textContent = `Found ${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${searchTerm}"`;
      }
    }

    if (clearButton) clearButton.style.display = 'inline-block';
  };

  // Clear search function
  const clearSearch = () => {
    if (searchInput) searchInput.value = '';
    if (resultsInfo) resultsInfo.textContent = '';
    if (clearButton) clearButton.style.display = 'none';
    renderBlogPosts();
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

    // Show/hide clear button based on input
    searchInput.addEventListener('input', () => {
      if (clearButton) {
        clearButton.style.display = searchInput.value.trim() ? 'inline-block' : 'none';
      }
    });
  }

  if (clearButton) {
    clearButton.addEventListener('click', clearSearch);
  }
}

// ============================================
// Initialization
// ============================================

function initBlogPage() {
  // Only run if we're on the blog page
  const container = document.getElementById('blog-posts-container');
  if (!container) {
    return;
  }

  // Render blog posts
  renderBlogPosts();
  
  // Setup search functionality
  setupSearch();
}

// Wait for both DOM and templates to be ready
function init() {
  // Check if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAfterTemplates);
  } else {
    initAfterTemplates();
  }
}

function initAfterTemplates() {
  // Check if templates are loaded
  if (typeof Templates !== 'undefined' && Templates.isLoaded) {
    // Templates are already loaded
    initBlogPage();
  } else {
    // Wait for templates to load
    window.addEventListener('templatesLoaded', initBlogPage);
    
    // Also add a timeout fallback to ensure blog posts render even if template event doesn't fire
    setTimeout(() => {
      const container = document.getElementById('blog-posts-container');
      if (container && container.children.length === 0) {
        initBlogPage();
      }
    }, 1000);
  }
}

// Start initialization
init();
