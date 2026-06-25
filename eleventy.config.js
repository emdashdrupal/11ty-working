// Core plugins
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
// Markdown plugins
const markdownIt = require("markdown-it");
const anchor = require("markdown-it-anchor");
const mila = require("markdown-it-link-attributes");

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
    templateFormats: ["njk", "md", "html", "css", "javascript", "yml", "yaml", "json", "xml"], // Apply to these file formats
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
      title: "Ed Marsh",
      subtitle: "Technical communicator, content strategist, mentor, podcaster",
      base: "https://edmar.sh/", // Base URL for the site
      author: {
        name: "Ed Marsh"
      }
    }
  }
};

// Configure markdown-it with anchor plugin
const md = new markdownIt(config.markdown).use(anchor, {
  permalink: anchor.permalink.headerLink(),
});

module.exports = function (eleventyConfig) {
  // ===== FILTERS =====
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Date formatting filter
  eleventyConfig.addFilter("date", function(date, format) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    const normalizedFormat = typeof format === 'string' ? format.replace(/\s+/g, '') : format;
    if (normalizedFormat === "YYYY-MM-DD" || normalizedFormat === "YYYY-MMM-DD") {
      const parts = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: normalizedFormat === "YYYY-MM-DD" ? '2-digit' : 'short',
        day: '2-digit',
        timeZone: 'UTC'
      }).formatToParts(d);
      const hash = parts.reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {});
      return `${hash.year}-${hash.month}-${hash.day}`;
    }
    return date;
  });

  // Filter array items by a key-value pair (supports nested properties like "data.title")
  eleventyConfig.addFilter("filterBy", function (array, key, value) {
    if (!array || !key) return [];
    try {
      const keyPath = key.split(".");
      return array.filter((item) => {
        let data = item;
        for (const path of keyPath) {
          // Safely check if data is an object before accessing properties
          if (data === null || typeof data !== "object") return false;
          data = data[path];
        }
        // Safely compare values, handling undefined/null cases
        return data == value; // Use loose equality for flexible value comparison
      });
    } catch (error) {
      console.error(`Error in filterBy filter: ${error.message}`);
      return [];
    }
  });

  // Configure markdown-it-link-attributes plugin for external links
  const milaOptions = {
    matcher(href) {
      return href.match(/^https?:\/\//);
    },
    attrs: {
      target: "_blank",
      rel: "noopener",
    },
  };
  md.use(mila, milaOptions);

  // Limit array to specified number of items
  eleventyConfig.addFilter("limit", (array, limit) =>
    Array.isArray(array) ? array.slice(0, limit) : []
  );

  // Render markdown content as HTML
  eleventyConfig.addFilter("markdown", (content) => {
    if (!content) return "";
    return md.render(String(content));
  });

  // Filter items by category (supports single category or array of categories)
  eleventyConfig.addFilter("filterByCategory", (items, category) => {
    if (!items || !category) return [];
    const categories = Array.isArray(category) ? category : [category];

    return items.filter(item => {
      if (!item.categories) return false;
      const itemCategories = Array.isArray(item.categories) ? item.categories : [item.categories];
      return categories.some(cat => itemCategories.includes(cat));
    });
  });

  // Filter tools by category (handles both category and categories properties)
  eleventyConfig.addFilter("filterToolsByCategory", (tools, category) => {
    if (!tools || !category) return [];
    const categories = Array.isArray(category) ? category : [category];

    return tools.filter(tool => {
      const toolCategories = tool.categories || tool.category || [];
      const normalizedToolCats = Array.isArray(toolCategories) ? toolCategories : [toolCategories];
      return categories.some(cat => normalizedToolCats.includes(cat));
    });
  });

  // Remove specified value from array
  eleventyConfig.addFilter("reject", (array, value) =>
    Array.isArray(array) ? array.filter((item) => item !== value) : []
  );

  // Determine if date should be shown based on URL
  eleventyConfig.addFilter("shouldShowDate", function(page) {
    if (!page || typeof page.url !== "string") return false;
    if (page.data && page.data.showDate === false) return false;

    // 1. Exclude exact URL matches for site root and landing pages
    const excludedUrls = ["/", "/about/", "/contact/", "/skills/", "/blog/", "/podcasts/"];
    if (excludedUrls.includes(page.url)) return false;

    // 2. Exclude all content in specific sections (including subpages)
    const excludedSections = ["/about/", "/contact/", "/skills/"];
    if (excludedSections.some(pattern => page.url.startsWith(pattern))) return false;

    // 3. Exclude index files for blog and podcasts (landing and sub-index pages)
    const isIndexFile = page.inputPath && page.inputPath.endsWith("index.md");
    if (isIndexFile && (page.url.startsWith("/blog/") || page.url.startsWith("/podcasts/"))) {
      return false;
    }

    return true;
  });


  // ===== PLUGINS =====
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addPlugin(syntaxHighlight, config.syntaxHighlight);
  eleventyConfig.addPlugin(feedPlugin, config.feed);

  // ===== CSS TEMPLATE FORMAT SETUP =====
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function(inputContent) {
      return async function() {
        return inputContent;
      };
    }
  });

  // ===== CSS PROCESSING WITH POSTCSS =====
  const postcss = require('postcss');

  eleventyConfig.addTransform("postcss-css", async function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith('.css')) {
      return content;
    }

    if (outputPath.includes('pagefind') || outputPath.includes('node_modules')) {
      return content;
    }

    try {
      const plugins = [
        require('autoprefixer'),
        require('cssnano')({ preset: 'default' })
      ];

      const result = await postcss(plugins).process(content, {
        from: undefined,
        to: outputPath,
        map: false
      });
      return result.css;
    } catch (error) {
      console.error(`PostCSS error processing ${outputPath}:`, error.message);
      return content;
    }
  });

  // ===== GLOBAL DATA =====
  try {
    eleventyConfig.addGlobalData("presentations", () => require("./_data/presentations.json"));
    eleventyConfig.addGlobalData("tools", () => require("./_data/tools.json"));
  } catch (error) {
    console.error(`Error loading data files: ${error.message}`);
  }

  // ===== SHORTCODES =====
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // ===== PASSTHROUGH FILE COPIES =====
  eleventyConfig.addPassthroughCopy({
    "assets/": "assets",
    "_includes/js": "js/",
    "podcast.xml": "podcast.xml",
    "llms.txt": "llms.txt",
    "netlify.toml": "netlify.toml",
  });

  // ===== COLLECTIONS =====
  const collections = ["skills", "podcasts", "blog"];
  collections.forEach((collection) => {
    eleventyConfig.addCollection(collection, (collectionApi) =>
      collectionApi.getAll().filter((item) => item.data.tags?.includes(collection))
    );
  });

  // ===== ELEVENTY CONFIGURATION =====
  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site",
      data: "../_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html", "css"],
  };
};