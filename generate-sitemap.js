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

// Current date in YYYY-MM-DD format for files without dates
const today = new Date().toISOString().split('T')[0];

// Main sections of the site
const mainSections = [
  { path: '/', priority: defaultPriority.home, changefreq: 'weekly' },
  { path: '/about/about-ed-marsh/', priority: defaultPriority.section, changefreq: 'monthly' },
  { path: '/contact/', priority: defaultPriority.section, changefreq: 'monthly' },
  { path: '/skills/', priority: defaultPriority.section, changefreq: 'weekly' },
  { path: '/podcasts/', priority: defaultPriority.section, changefreq: 'weekly' },
  { path: '/static-site-transformation/', priority: defaultPriority.section, changefreq: 'weekly' }
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
  let url = filePath.replace(contentDir + '/', '').replace(/\.(md|njk|html)$/, '');

  // Handle index files
  if (url.endsWith('/index')) {
    url = url.replace('/index', '/');
  }

  // Ensure URL starts and ends with slash
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  if (!url.endsWith('/') && !path.extname(url)) {
    url = url + '/';
  }

  return url;
}

// Function to determine priority based on path
function getPriority(url) {
  if (url === '/') return defaultPriority.home;

  // Check if it's a main section
  const section = mainSections.find(section => section.path === url);
  if (section) return section.priority;

  // Check if it's a direct child of a main section
  const parentSection = mainSections.find(section =>
    url.startsWith(section.path) && url.split('/').length === section.path.split('/').length + 1
  );
  if (parentSection) return defaultPriority.page;

  return defaultPriority.post;
}

// Function to determine change frequency
function getChangeFreq(url) {
  if (url === '/') return 'weekly';

  const section = mainSections.find(section => section.path === url);
  if (section) return section.changefreq;

  return defaultChangeFreq;
}

// Generate sitemap entries
function generateSitemapEntries() {
  const entries = [];

  // Add main sections first
  mainSections.forEach(section => {
    entries.push({
      loc: siteUrl + section.path,
      lastmod: today,
      changefreq: section.changefreq,
      priority: section.priority
    });
  });

  // Find all content files
  const contentFiles = glob.sync(`${contentDir}/**/*.{md,njk,html}`, { ignore: `${contentDir}/**/index.{md,njk,html}` });

  // Process each file
  contentFiles.forEach(file => {
    try {
      // Skip files with eleventyExcludeFromCollections: true
      const fileContent = fs.readFileSync(file, 'utf8');
      const { data } = matter(fileContent);

      if (data.eleventyExcludeFromCollections === true) {
        return;
      }

      const url = getUrlFromFilePath(file);
      const lastmod = getDateFromFile(file);
      const priority = getPriority(url);
      const changefreq = getChangeFreq(url);

      entries.push({
        loc: siteUrl + url,
        lastmod,
        changefreq,
        priority
      });
    } catch (error) {
      console.error(`Error processing ${file}: ${error.message}`);
    }
  });

  return entries;
}

// Generate sitemap XML
function generateSitemap() {
  const entries = generateSitemapEntries();

  let xml = '<?xml version="1.0" encoding="utf-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  entries.forEach(entry => {
    xml += '  <url>\n';
    xml += `    <loc>${entry.loc}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  fs.writeFileSync(outputFile, xml);
  console.log(`Sitemap generated at ${outputFile}`);
}

// Run the generator
generateSitemap();