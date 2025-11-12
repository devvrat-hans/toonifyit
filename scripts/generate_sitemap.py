#!/usr/bin/env python3
"""Generate complete sitemap.xml with all 20 language versions."""

from datetime import date

today = date.today().isoformat()

# All 20 languages
languages = ['en', 'es', 'fr', 'nl', 'zh', 'ja', 'ko', 'vi', 'id', 'pt', 'hi', 'ur', 'de', 'sv', 'ar', 'he', 'it', 'pl', 'ru', 'tr']

sitemap_content = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage (English) -->
  <url>
    <loc>https://toonifyit.com/</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
'''.format(today=today)

# Add all language versions
for lang in languages:
    if lang == 'en':
        continue  # Already added English homepage above
    
    sitemap_content += f'''  <!-- {lang.upper()} Language Version -->
  <url>
    <loc>https://toonifyit.com/{lang}/</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
'''

# Add main pages
main_pages = [
    ('blogs.html', 'Blog Homepage', '0.9'),
    ('docs.html', 'Documentation', '0.8'),
    ('about.html', 'About Us', '0.7'),
    ('contact.html', 'Contact', '0.7'),
    ('privacy.html', 'Privacy Policy', '0.5'),
    ('terms.html', 'Terms of Service', '0.5'),
    ('cookie-policy.html', 'Cookie Policy', '0.5'),
    ('disclaimer.html', 'Disclaimer', '0.5'),
]

sitemap_content += '  <!-- Main Pages -->\n'
for page, title, priority in main_pages:
    sitemap_content += f'''  <url>
    <loc>https://toonifyit.com/{page}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>{priority}</priority>
  </url>
  
'''

# Add blog posts
blog_posts = [
    'what-is-toon.html',
    'toon-vs-json.html',
    'llm-token-optimization.html',
    'convert-json-to-toon.html',
    'prompt-engineering-for-llms.html',
]

sitemap_content += '  <!-- Blog Posts -->\n'
for post in blog_posts:
    sitemap_content += f'''  <url>
    <loc>https://toonifyit.com/blog/{post}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
'''

sitemap_content += '</urlset>'

# Write sitemap
with open('/Users/devvrathans/toonifyit/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap_content)

print(f"✓ Generated sitemap.xml with all 20 languages")
print(f"✓ Date: {today}")
print(f"✓ Total URLs: {len(languages) + len(main_pages) + len(blog_posts)}")
print(f"✓ Languages: {', '.join(languages)}")
