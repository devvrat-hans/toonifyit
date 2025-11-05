// Blog Page JavaScript

// Blog posts data (will be populated as posts are created)
const blogPosts = [
  {
    title: "What is TOON Format? A Complete Guide to Token-Efficient Data Serialization",
    slug: "what-is-toon",
    excerpt: "Learn how TOON format reduces LLM token usage by 30-60% compared to JSON. Complete guide with examples, benchmarks, and best practices for optimizing your AI applications.",
    category: "tutorial",
    date: "2025-01-15",
    readTime: "12 min",
    icon: "📚"
  }
];

// Initialize blog page
document.addEventListener('DOMContentLoaded', () => {
  const blogGrid = document.getElementById('blog-grid');
  const searchInput = document.getElementById('blog-search');
  const filterButtons = document.querySelectorAll('.blog__filter');
  
  let currentFilter = 'all';
  let currentSearch = '';

  // Render blog posts
  function renderPosts() {
    const filteredPosts = blogPosts.filter(post => {
      const matchesFilter = currentFilter === 'all' || post.category.toLowerCase() === currentFilter.toLowerCase();
      const matchesSearch = post.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(currentSearch.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    if (filteredPosts.length === 0) {
      blogGrid.innerHTML = `
        <div class="blog__empty">
          <div class="blog__empty-icon">📝</div>
          <h3 class="blog__empty-title">No blog posts yet</h3>
          <p class="blog__empty-text">We're working on creating amazing content about TOON format. Check back soon!</p>
          <a href="/" class="btn btn--primary">Try the Converter</a>
        </div>
      `;
      return;
    }

    blogGrid.innerHTML = filteredPosts.map(post => `
      <article class="blog__card">
        <div class="blog__card-image">
          ${post.icon || '📄'}
        </div>
        <div class="blog__card-content">
          <div class="blog__card-meta">
            <span class="blog__card-category">${post.category}</span>
            <span class="blog__card-date">
              📅 ${new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h2 class="blog__card-title">
            <a href="/blog/${post.slug}.html">${post.title}</a>
          </h2>
          <p class="blog__card-excerpt">${post.excerpt}</p>
          <div class="blog__card-footer">
            <span class="blog__card-read-time">⏱️ ${post.readTime} read</span>
            <a href="/blog.html${post.slug}.html" class="blog__card-link">
              Read more →
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Category filter
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentFilter = button.dataset.filter;
      renderPosts();
    });
  });

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderPosts();
    });
  }

  // Initial render
  renderPosts();
});
