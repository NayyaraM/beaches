const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

assert.match(html, /<form[^>]*id="searchForm"[^>]*>/i, 'Search form should have id="searchForm"');
assert.match(html, /<input[^>]*id="searchInput"[^>]*>/i, 'Search input should have id="searchInput"');
assert.match(html, /<h3[^>]*class="beach"[^>]*id="orchard-beach"[^>]*data-search="orchard beach"[^>]*>Orchard Beach<\/h3>/i, 'Orchard beach should be searchable via data attributes');
assert.match(html, /<script src="script.js"><\/script>/i, 'The page should load the shared script');

console.log('Search bar wiring checks passed');
