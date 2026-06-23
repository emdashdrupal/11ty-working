const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');

// Configuration
const siteUrl = 'https://edmar.sh';
const contentDir = 'content';
const outputFile = 'sitemap.xml';
const defaultChangeFreq = 'monthly';
const defaultPriority = {
  home: 1.0,
  section: 0.9,
  page: 0.8,
  post: 0.7
};

// Current date in YYYY-MM-DD format for fallback if everything else fails
const today = new Date().toISOString().split('T')[0];

// Configuration for specific paths
const pathConfigs = [
  { path: '/', priority: defaultPriority.home, changefreq: 'monthly' },
  { path: '/about/', priority: defaultPriority.section, changefreq: 'monthly' },
  { path: '/contact/', priority: defaultPriority.section, changefreq: 'monthly' },
  { path: '/skills/', priority: defaultPriority.section, changefreq: 'monthly' },
  { path: '/podcasts/', priority: defaultPriority.section, changefreq: 'monthly' },
  { path: '/blog/', priority: defaultPriority.section, changefreq: 'weekly' }
];

// Function to extract date from frontmatter
function getDateFromFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    if (data.date) {
      // Convert date to YYYY-MM-DD format
      const date = new Date(data.date);
      return date.toISOString().split('T')[0];
    }

    // If no date in frontmatter, use file modification date
    const stats = fs.statSync(filePath);
    return new Date(stats.mtime).toISOString().split('T')[0];
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
    return today;
  }
}

// Function to determine URL from file path
function getUrlFromFilePath(filePath) {
  // Remove content directory and file extension
  let relativePath = filePath.replace(contentDir + '/', '');
  let url = relativePath.replace(/\.(md|njk|html)$/, '');

  // Handle index files
  if (url === 'index') {
    url = '/';
  } else if (url.endsWith('/index')) {
    url = '/' + url.replace('/index', '/');
  } else {
    // Ensure URL starts and ends with slash
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    if (!url.endsWith('/')) {
      url = url + '/';
    }
  }

  return url;
}

// Function to determine priority based on path
function getPriority(url) {
  if (url === '/') return defaultPriority.home;

  // Check if it's in our explicit path configs
  const config = pathConfigs.find(c => c.path === url);
  if (config) return config.priority;

  // Check if it's a direct child of a main section (e.g., /blog/some-post/)
  const parts = url.split('/').filter(Boolean);
  if (parts.length === 1) return defaultPriority.section;
  if (parts.length === 2) return defaultPriority.page;

  return defaultPriority.post;
}

// Function to determine change frequency
function getChangeFreq(url) {
  const config = pathConfigs.find(c => c.path === url);
  if (config) return config.changefreq;

  return defaultChangeFreq;
}

// Generate sitemap entries
function generateSitemapEntries() {
  const entriesMap = new Map();

  // Find all content files including index files
  const contentFiles = glob.sync(`${contentDir}/**/*.{md,njk,html}`);

  // Process each file
  contentFiles.forEach(file => {
    try {
      const fileContent = fs.readFileSync(file, 'utf8');
      const { data } = matter(fileContent);

      // Skip files with eleventyExcludeFromCollections: true
      if (data.eleventyExcludeFromCollections === true) {
        return;
      }

      const url = getUrlFromFilePath(file);
      const lastmod = getDateFromFile(file);
      const priority = getPriority(url);
      const changefreq = getChangeFreq(url);

      // Avoid duplicates, keep the one with the most recent date if multiple files map to same URL (unlikely but safe)
      if (!entriesMap.has(url) || entriesMap.get(url).lastmod < lastmod) {
        entriesMap.set(url, {
          loc: siteUrl + url,
          lastmod,
          changefreq,
          priority
        });
      }
    } catch (error) {
      console.error(`Error processing ${file}: ${error.message}`);
    }
  });

  return Array.from(entriesMap.values());
}

// Generate sitemap XML
function generateSitemap() {
  const entries = generateSitemapEntries();

  // Sort entries by priority descending, then by loc
  entries.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.loc.localeCompare(b.loc);
  });

  let xml = '<?xml version="1.0" encoding="utf-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  entries.forEach(entry => {
    xml += '  <url>\n';
    xml += `    <loc>${entry.loc}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  fs.writeFileSync(outputFile, xml);
  console.log(`Sitemap generated at ${outputFile} with ${entries.length} entries.`);
}

// Run the generator
generateSitemap();
