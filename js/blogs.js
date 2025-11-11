const blogPosts = [
  {
    id: 'llm-token-optimization',
    title: 'LLM Token Optimization: Reduce AI Costs by 30-90%',
    description: 'Complete guide to LLM token optimization. Learn proven strategies including prompt engineering, model tiering, caching, batch processing, and JSON to TOON conversion to reduce AI costs by 30-90%.',
    excerpt: 'Master LLM token optimization with proven strategies that organizations use to achieve 30-90% cost reductions. Learn prompt engineering, model tiering, caching, batch processing, RAG optimization, and how converting JSON to TOON saves 30-60% tokens.',
    date: '2025-11-11',
    readTime: '22 min read',
    url: '/blog/llm-token-optimization.html'
  },
  {
    id: 'what-is-toon',
    title: 'What is TOON Format? Complete JSON to TOON Conversion Guide',
    description: 'Learn how TOON format reduces LLM token usage by 30-60% compared to JSON. Complete guide with conversion examples, syntax, and best practices.',
    excerpt: 'Discover TOON (Token-Oriented Object Notation) - a revolutionary data format designed specifically for Large Language Models. Learn how converting JSON to TOON can reduce your token costs by up to 60% while maintaining perfect readability.',
    date: '2025-10-30',
    readTime: '12 min read',
    url: '/blog/what-is-toon.html'
  },
  {
    id: 'toon-vs-json',
    title: 'TOON vs JSON: A Comparative Analysis for LLM Token Efficiency',
    description: 'Comprehensive comparison of TOON format vs JSON for LLM applications. See how converting JSON to TOON reduces token usage by 30-60% with real-world benchmarks.',
    excerpt: 'Compare TOON vs JSON for Large Language Model applications. Discover why TOON format beats JSON with 30-60% token reduction, improved accuracy, and real-world cost savings. Complete analysis with benchmarks and practical examples.',
    date: '2025-10-25',
    readTime: '15 min read',
    url: '/blog/toon-vs-json.html'
  },
  {
    id: 'convert-json-to-toon',
    title: 'How to Convert JSON to TOON: Complete Guide',
    description: 'Learn how to convert JSON to TOON format with our comprehensive step-by-step guide. Save 30-60% on LLM tokens using our JSON to TOON converter. Includes examples and best practices.',
    excerpt: 'Master JSON to TOON conversion with this comprehensive tutorial. Learn methods, tools, and best practices to reduce LLM token usage by 30-60%. Real-world examples show $77,760 annual savings.',
    date: '2025-10-17',
    readTime: '18 min read',
    url: '/blog/convert-json-to-toon.html'
  }
];

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderBlogPosts() {
  const container = document.getElementById('blog-posts-container');
  if (!container) return;

  container.innerHTML = '';

  blogPosts.forEach((post) => {
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderBlogPosts);
} else {
  renderBlogPosts();
}
