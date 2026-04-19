const fs = require('fs');
const path = require('path');

// Leer data.js
const dataPath = path.join(__dirname, 'src', 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Leer guidesData.js
const guidesPath = path.join(__dirname, 'src', 'guidesData.js');
let guidesContent = '';
if (fs.existsSync(guidesPath)) {
    guidesContent = fs.readFileSync(guidesPath, 'utf8');
}

// Extraer toolIds y blogIds
const toolIdsMatch = [...dataContent.matchAll(/"?id"?:\s*['"]([^'"]*)['"]/g)];
const toolIds = toolIdsMatch.map(m => m[1]);
const blogIds = toolIds.filter(id => id.startsWith('blog-'));
const realToolIds = toolIds.filter(id => !id.startsWith('blog-'));

// Extraer Categories
const sectorsMatch = [...dataContent.matchAll(/"?sector"?:\s*['"]([^'"]*)['"]/g)].map(m => m[1]);
const uniqueSectors = [...new Set(sectorsMatch)];
const categorySlugs = uniqueSectors.map(c => c.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'));

// Extraer Guides
const guideIds = [...guidesContent.matchAll(/"?id"?:\s*['"]([^'"]*)['"]/g)].map(m => m[1]);

const baseUrl = 'https://myiadirectory.com'; // Cambiar por el dominio real si se conoce
const date = new Date().toISOString().split('T')[0];

const staticPages = [
    '/', '/about', '/submit-tool', '/contact', '/privacy', '/cookies', '/terms-and-conditions',
    '/blog', '/guides', '/glossary', '/compare', '/surprise', '/stack-builder', 
    '/automation-risk', '/matchmaker', '/prompts', '/viral'
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Add static pages
staticPages.forEach(page => {
    let priority = 0.8;
    if (page === '/') priority = 1.0;
    if (['/privacy', '/cookies', '/terms-and-conditions'].includes(page)) priority = 0.3;
    
    sitemap += `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${date}</lastmod>
    <priority>${priority}</priority>
  </url>\n`;
});

// Blog Posts
blogIds.forEach(id => {
    sitemap += `  <url>
    <loc>${baseUrl}/blog/${id}</loc>
    <lastmod>${date}</lastmod>
    <priority>0.7</priority>
  </url>\n`;
});

// Tools
realToolIds.forEach(id => {
    sitemap += `  <url>
    <loc>${baseUrl}/tool/${id}</loc>
    <lastmod>${date}</lastmod>
    <priority>0.6</priority>
  </url>\n`;
});

// Categories
categorySlugs.forEach(slug => {
    sitemap += `  <url>
    <loc>${baseUrl}/category/${slug}</loc>
    <lastmod>${date}</lastmod>
    <priority>0.7</priority>
  </url>\n`;
});

// Guides
guideIds.forEach(id => {
    sitemap += `  <url>
    <loc>${baseUrl}/guide/${id}</loc>
    <lastmod>${date}</lastmod>
    <priority>0.8</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
console.log('Sitemap generado con ' + (staticPages.length + blogIds.length + realToolIds.length + categorySlugs.length + guideIds.length) + ' URLs.');
