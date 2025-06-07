const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const anchor = require("markdown-it-anchor");
const mila = require("markdown-it-link-attributes");
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
    subtitle:
      "Ed Marsh interviews professionals in technical communication, content strategy, content marketing, information architecture, and others who create, organize, and maintain content online.",
    base: "https://edmar.sh/",
    author: {
      name: "Ed Marsh",
    },
  },
};

// Configure markdown-it with anchor plugin
const md = new markdownIt(mdOptions).use(anchor, {
  permalink: anchor.permalink.headerLink(),
});

module.exports = function (eleventyConfig) {
  // Filters
  eleventyConfig.addFilter("filterBy", function (array, key, value) {
    if (!array || !key) return [];
    try {
      return array.filter((item) => {
        const keyPath = key.split(".");
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

  const milaOptions = {
    matcher(href) {
      return href.match(/^https?:\/\//);
    },
    attrs: {
      target: "_blank",
      rel: "noopener",
    },
  };
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(mila, milaOptions));

  eleventyConfig.addFilter("limit", (array, limit) =>
    Array.isArray(array) ? array.slice(0, limit) : []
  );

  eleventyConfig.addFilter("markdown", (content) => {
    if (!content) return "";
    return md.render(String(content));
  });

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

  eleventyConfig.addFilter("filterToolsByCategory", (tools, category) => {
    if (!tools || !category) return [];
    
    // Handle both single categories and arrays
    const categories = Array.isArray(category) ? category : [category];
    
    return tools.filter(tool => {
      if (!tool.categories) return false;
      
      // Ensure tool categories is always an array
      const toolCategories = Array.isArray(tool.categories) 
        ? tool.categories 
        : [tool.categories];
      
      // Check if any of the categories match
      return categories.some(cat => 
        toolCategories.includes(cat)
      );
    });
  });

  eleventyConfig.addFilter("reject", (array, value) =>
    Array.isArray(array) ? array.filter((item) => item !== value) : []
  );

  // Plugins
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addPlugin(syntaxHighlight, syntaxHighlightOptions);
  eleventyConfig.addPlugin(feedPlugin, feedOptions);

  // Global Data
  try {
    eleventyConfig.addGlobalData("presentations", () =>
      require("./_data/presentations.json")
    );
    eleventyConfig.addGlobalData("tools", () => require("./_data/tools.json"));
  } catch (error) {
    console.error(`Error loading data files: ${error.message}`);
  }

  // Shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Passthrough copies
  eleventyConfig.addPassthroughCopy({
    "_includes/css/": "css",
    "assets/": "assets",
    "_includes/js": "js/",
    "podcast.xml": "podcast.xml",
    "llms.txt": "llms.txt",
    "sitemap.xml": "sitemap.xml",
  });

  // Collections
  const collections = ["skills", "podcasts", "blog"];
  collections.forEach((collection) => {
    eleventyConfig.addCollection(collection, (collectionApi) =>
      collectionApi
        .getAll()
        .filter((item) => item.data.tags?.includes(collection))
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
