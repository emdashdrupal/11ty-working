const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { globSync } = require('glob');
const { execFileSync } = require('child_process');

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

// Current date in YYYY-MM-DD format for fallback
const today = new Date().toISOString().split('T')[0];

// Cache for git dates
let gitDatesCache = null;

/**
 * Function to load all git dates at once
 * @param {string} dir The directory to get git dates for
 * @returns {Map<string, string>} A map of file paths to their last commit dates
 */
function loadGitDates(dir = contentDir) {
  if (gitDatesCache) return gitDatesCache;

  gitDatesCache = new Map();
  try {
    // Run git log once to get the last commit date for all files in specified directory
    // Format: DATE:YYYY-MM-DD followed by files changed in that commit
    // We use reverse chronological order (default) so the first time a file appears, it's its latest change.
    const output = execFileSync('git', ['log', '--format=DATE:%as', '--name-only', '--', dir], { encoding: 'utf8' });
    const lines = output.split('\n');
    let currentDate = null;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      if (trimmedLine.startsWith('DATE:')) {
        currentDate = trimmedLine.substring(5);
      } else if (currentDate) {
        // Normalize path to use forward slashes for consistency across platforms
        const normalizedPath = trimmedLine.split(path.sep).join('/');
        // If we haven't seen this file yet, the first time it appears in git log
        // is its most recent modification date.
        if (!gitDatesCache.has(normalizedPath)) {
          gitDatesCache.set(normalizedPath, currentDate);
        }
      }
    }
  } catch (e) {
    // Git might fail in some environments (e.g., CI without git history, or non-git environments)
    console.warn(`Warning: Could not load git dates for ${dir}. Falling back to file modification times.`);
  }
  return gitDatesCache;
}

// Configuration for specific paths to ensure they get the right priority and changefreq
const pathConfigs = new Map([
  ['/', { priority: defaultPriority.home, changefreq: 'monthly' }],
  ['/about/about-ed-marsh/', { priority: defaultPriority.section, changefreq: 'monthly' }],
  ['/contact/', { priority: defaultPriority.section, changefreq: 'monthly' }],
  ['/skills/', { priority: defaultPriority.section, changefreq: 'monthly' }],
  ['/podcasts/', { priority: defaultPriority.section, changefreq: 'monthly' }],
  ['/blog/', { priority: defaultPriority.section, changefreq: 'weekly' }]
]);

// Function to get last commit date from Git
function getGitDate(filePath) {
  const cache = loadGitDates();
  // Ensure the path is normalized for cache lookup
  const normalizedPath = filePath.split(path.sep).join('/');
  return cache.get(normalizedPath) || null;
}

// Function to extract date from frontmatter or Git
function getDateFromFile(filePath, data) {
  try {
    // 1. Priority: Frontmatter date (if it's a valid date string/object)
    if (data.date && data.date !== 'Last Modified') {
      const date = new Date(data.date);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    }

    // 2. Secondary: Git commit date (stable across checkouts)
    const gitDate = getGitDate(filePath);
    if (gitDate) return gitDate;

    // 3. Fallback: File modification date
    const stats = fs.statSync(filePath);
    return new Date(stats.mtime).toISOString().split('T')[0];
  } catch (error) {
    console.error(`Error processing date for ${filePath}: ${error.message}`);
    return today;
  }
}

// Function to determine URL from file path
function getUrlFromFilePath(filePath) {
  const relativePath = path.relative(contentDir, filePath);
  const parsed = path.parse(relativePath);

  let urlPath = path.join(parsed.dir, parsed.name).replace(/\\/g, '/');

  // Handle index files
  if (parsed.name === 'index') {
    urlPath = parsed.dir;
  }
  // Handle case where filename matches directory name (e.g., contact/contact.md -> /contact/)
  else if (path.basename(parsed.dir) === parsed.name) {
    urlPath = parsed.dir;
  }

  // Normalize slashes
  if (!urlPath || urlPath === '.') {
    return '/';
  }

  return `/${urlPath}/`;
}

// Function to determine path configuration (priority and changefreq)
function getPathConfig(url) {
  const config = pathConfigs.get(url);

  if (config) {
    return {
      priority: config.priority,
      changefreq: config.changefreq
    };
  }

  const parts = url.split('/').filter(Boolean);
  let priority;

  if (parts.length === 1) {
    priority = defaultPriority.section;
  } else if (parts.length === 2) {
    priority = defaultPriority.page;
  } else {
    priority = defaultPriority.post;
  }

  return {
    priority,
    changefreq: defaultChangeFreq
  };
}

// Function to get priority for a URL (for testing)
function getPriority(url) {
  return getPathConfig(url).priority;
}

// Function to get changefreq for a URL (for testing)
function getChangeFreq(url) {
  return getPathConfig(url).changefreq;
}

// Generate sitemap entries
function generateSitemapEntries() {
  const entriesMap = new Map();
  const contentFiles = globSync(`${contentDir}/**/*.{md,njk,html}`);

  contentFiles.forEach(file => {
    try {
      const fileContent = fs.readFileSync(file, 'utf8');
      const { data } = matter(fileContent);

      if (data.eleventyExcludeFromCollections === true) {
        return;
      }

      const url = getUrlFromFilePath(file);
      const lastmod = getDateFromFile(file, data);
      const { priority, changefreq } = getPathConfig(url);

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

if (require.main === module) {
  generateSitemap();
}

module.exports = {
  loadGitDates,
  getGitDate,
  getDateFromFile,
  getUrlFromFilePath,
  getPriority,
  getChangeFreq,
  generateSitemapEntries,
  generateSitemap
};
