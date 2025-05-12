const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const anchor = require('markdown-it-anchor');

// Configuration objects
const mdOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
};

const syntaxHighlightOptions = {
  templateFormats: ["njk", "md"],
  alwaysWrapLineHighlights: true,
  trim: true,
};

const feedOptions = {
  type: "rss",
  outputPath: "/feed.xml",
  collection: {
    name: "all",
    limit: 0,
  },
  metadata: {
    language: "en",
    title: "Content Content podcast",
    subtitle: "Ed Marsh interviews professionals in technical communication, content strategy, content marketing, information architecture, and others who create, organize, and maintain content online.",
    base: "https://edmar.sh/",
    author: {
      name: "Ed Marsh",
    },
  },
};

// Configure markdown-it with anchor plugin
const md = new markdownIt(mdOptions).use(anchor, {
  permalink: anchor.permalink.headerLink()
});

module.exports = function (eleventyConfig) {
  // Filters
  eleventyConfig.addFilter('filterBy', function(array, key, value) {
    if (!array || !key) return [];
    try {
      return array.filter(item => {
        const keyPath = key.split('.');
        let data = item;
        for (const path of keyPath) {
          if (!data || typeof data !== 'object') return false;
          data = data[path];
        }
        return data === value;
      });
    } catch (error) {
      console.error(`Error in filterBy filter: ${error.message}`);
      return [];
    }
  });

  eleventyConfig.addFilter('limit', (array, limit) =>
    Array.isArray(array) ? array.slice(0, limit) : []);

  eleventyConfig.addFilter("markdown", content => {
    if (!content) return "";
    return md.render(String(content));
  });

  eleventyConfig.addFilter("filterByCategory", (presentations, category) => {
    if (!category || !presentations) return [];
    return presentations.filter(presentation => {
      const categories = Array.isArray(presentation.category)
        ? presentation.category
        : [presentation.category];
      return categories.includes(category);
    });
  });

  eleventyConfig.addFilter("filterToolsByCategory", (tools, category) => {
    if (!category || !tools) return [];
    return tools.filter(tool => {
      if (!tool.category) return false;
      const categories = Array.isArray(tool.category)
        ? tool.category
        : [tool.category];
      return categories.includes(category);
    });
  });

  eleventyConfig.addFilter("reject", (array, value) =>
    Array.isArray(array) ? array.filter(item => item !== value) : []);

  // Plugins
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addPlugin(syntaxHighlight, syntaxHighlightOptions);
  eleventyConfig.addPlugin(feedPlugin, feedOptions);

  // Global Data
  try {
    eleventyConfig.addGlobalData("presentations", () =>
      require("./_data/presentations.json"));
    eleventyConfig.addGlobalData("tools", () =>
      require("./_data/tools.json"));
  } catch (error) {
    console.error(`Error loading data files: ${error.message}`);
  }

  // Shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Passthrough copies
  eleventyConfig.addPassthroughCopy({
    "_includes/css/base.css": "css/base.css",
    "_includes/css/tw.css": "css/tw.css",
    "_includes/css/pagefind-overrides.css": "css/pagefind-overrides.css",
    "assets/images": "assets/images",
    "_includes/js/copyCode.js": "js/copyCode.js",
  });

  // Collections
  const collections = ["skills", "podcasts", "blog"];
  collections.forEach(collection => {
    eleventyConfig.addCollection(collection, collectionApi =>
      collectionApi
        .getAll()
        .filter(item => item.data.tags?.includes(collection))
    );
  });

  // Configuration object
  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
