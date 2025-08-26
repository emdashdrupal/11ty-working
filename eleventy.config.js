// Core plugins
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"); // Plugin for syntax highlighting in code blocks
const { feedPlugin } = require("@11ty/eleventy-plugin-rss"); // Plugin for generating RSS feeds

// Markdown plugins
const markdownIt = require("markdown-it"); // Markdown parser
const anchor = require("markdown-it-anchor"); // Plugin to add anchor links to headings
const mila = require("markdown-it-link-attributes"); // Plugin to add attributes to links

// Configuration objects
const config = {
  // Markdown configuration options
  markdown: {
    html: false, // Don't allow HTML in markdown
    breaks: false, // Don't convert newlines to <br>
    linkify: true, // Convert URL-like text to links
    typographer: true // Enable smartquotes and other typographic replacements
  },

  // Syntax highlighting configuration
  syntaxHighlight: {
    templateFormats: ["njk", "md"], // Apply to these file formats
    alwaysWrapLineHighlights: false, // Don't wrap line highlights
    trim: true // Trim whitespace
  },

  // RSS feed configuration
  feed: {
    type: "rss", // Output format
    outputPath: "/feed.xml", // Where to save the feed
    collection: {
      name: "all", // Which collection to use
      limit: 0 // No limit on items
    },
    metadata: {
      language: "en",
      title: "Content Content podcast",
      subtitle: "Ed Marsh interviews professionals in technical communication, content strategy, content marketing, information architecture, and others who create, organize, and maintain content online.",
      base: "https://edmar.sh/", // Base URL for the site
      author: {
        name: "Ed Marsh"
      }
    }
  }
};

// Configure markdown-it with anchor plugin
const md = new markdownIt(config.markdown).use(anchor, {
  permalink: anchor.permalink.headerLink(), // Add anchor links to headings
});

module.exports = function (eleventyConfig) {
  // ===== FILTERS =====

  // Date formatting filter
  eleventyConfig.addFilter("date", function(date, format) {
    if (!date) return "";
    const d = new Date(date);
    if (format === "YYYY-MM-DD") {
      // Format as YYYY-MM-DD (e.g., 2025-07-23)
      return d.getFullYear() + '-' +
             String(d.getMonth() + 1).padStart(2, '0') + '-' +
             String(d.getDate()).padStart(2, '0');
    }
    if (format === "YYYY-MMM-DD") {
      // Format as YYYY-MMM-DD (e.g., 2025-Jul-23)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return d.getFullYear() + '-' +
             months[d.getMonth()] + '-' +
             String(d.getDate()).padStart(2, '0');
    }
    return date; // Return original date if format not recognized
  });

  // Filter array items by a key-value pair
  eleventyConfig.addFilter("filterBy", function (array, key, value) {
    if (!array || !key) return [];
    try {
      return array.filter((item) => {
        const keyPath = key.split("."); // Support for nested properties (e.g., "data.title")
        let data = item;
        for (const path of keyPath) {
          if (!data || typeof data !== "object") return false;
          data = data[path];
        }
        return data === value;
      });
    } catch (error) {
      console.error(`Error in filterBy filter: ${error.message}`);
      return [];
    }
  });

  // Configure markdown-it-link-attributes plugin
  const milaOptions = {
    matcher(href) {
      return href.match(/^https?:\/\//); // Match external links (http:// or https://)
    },
    attrs: {
      target: "_blank", // Open external links in new tab
      rel: "noopener", // Security best practice for target="_blank"
    },
  };
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(mila, milaOptions));

  // Limit array to specified number of items
  eleventyConfig.addFilter("limit", (array, limit) =>
    Array.isArray(array) ? array.slice(0, limit) : []
  );

  // Render markdown content as HTML
  eleventyConfig.addFilter("markdown", (content) => {
    if (!content) return "";
    return md.render(String(content));
  });

  // Filter items by category (supports both single category and array of categories)
  eleventyConfig.addFilter("filterByCategory", (items, category) => {
    if (!items || !category) return [];

    // Handle both single categories and arrays
    const categories = Array.isArray(category) ? category : [category];

    return items.filter(item => {
      if (!item.categories) return false;

      // Ensure item categories is always an array
      const itemCategories = Array.isArray(item.categories)
        ? item.categories
        : [item.categories];

      // Check if any of the categories match
      return categories.some(cat =>
        itemCategories.includes(cat)
      );
    });
  });

  // Filter tools by category (handles both category and categories properties)
  eleventyConfig.addFilter("filterToolsByCategory", (tools, category) => {
    if (!tools || !category) return [];

    const categories = Array.isArray(category) ? category : [category];

    return tools.filter(tool => {
        // Handle both category and categories properties
        const toolCategories = tool.categories || tool.category || [];
        const normalizedToolCats = Array.isArray(toolCategories) ?
            toolCategories : [toolCategories];

        return categories.some(cat =>
            normalizedToolCats.includes(cat)
        );
    });
  });

  // Remove specified value from array
  eleventyConfig.addFilter("reject", (array, value) =>
    Array.isArray(array) ? array.filter((item) => item !== value) : []
  );

  // Determine if date should be shown based on URL

eleventyConfig.addFilter("shouldShowDate", function(page) {
    // If showDate is explicitly set to false, don't show the date
    if (page.data && page.data.showDate === false) return false;

    // Otherwise, use the URL exclusion list
    const excludedUrls = ["/", "/about/", "/contact/", "/skills/"];

    // Check for exact URL matches
    if (excludedUrls.includes(page.url)) return false;

    // Check for URL patterns (sections to exclude)
    const excludedPatterns = ["/skills/", "/about/", "/contact/"];
    if (excludedPatterns.some(pattern => page.url.startsWith(pattern))) return false;

    return true;
  });


  // ===== PLUGINS =====
  eleventyConfig.setLibrary("md", md); // Set markdown library
  eleventyConfig.addPlugin(syntaxHighlight, config.syntaxHighlight); // Add syntax highlighting
  eleventyConfig.addPlugin(feedPlugin, config.feed); // Add RSS feed generation

  // ===== GLOBAL DATA =====
  try {
    // Make presentations data available globally
    eleventyConfig.addGlobalData("presentations", () =>
      require("./_data/presentations.json")
    );
    // Make tools data available globally
    eleventyConfig.addGlobalData("tools", () => require("./_data/tools.json"));
  } catch (error) {
    console.error(`Error loading data files: ${error.message}`);
  }

  // ===== SHORTCODES =====
  // Add shortcode to output current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // ===== PASSTHROUGH FILE COPIES =====
  // Copy these files/directories as-is to the output directory
  eleventyConfig.addPassthroughCopy({
    "_includes/css/": "css", // CSS files
    "assets/": "assets", // Asset files (images, etc.)
    "_includes/js": "js/", // JavaScript files
    "podcast.xml": "podcast.xml", // Podcast feed
    "llms.txt": "llms.txt", // LLMs configuration
    "netlify.toml": "netlify.toml", // Redirects from edmarsh.com legacy URLs
  });

  // ===== COLLECTIONS =====
  // Create collections based on tags
  const collections = ["skills", "podcasts", "blog"];
  collections.forEach((collection) => {
    eleventyConfig.addCollection(collection, (collectionApi) =>
      collectionApi
        .getAll()
        .filter((item) => item.data.tags?.includes(collection))
    );
  });

  // ===== ELEVENTY CONFIGURATION =====
  // Return configuration object
  return {
    dir: {
      input: "content", // Source directory
      includes: "../_includes", // Includes directory (relative to input)
      output: "_site", // Output directory
      data: "_data", // Data directory (relative to input)
    },
    markdownTemplateEngine: "njk", // Process markdown files with Nunjucks
    htmlTemplateEngine: "njk", // Process HTML files with Nunjucks
    templateFormats: ["md", "njk", "html"], // File formats to process
  };
};