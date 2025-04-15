const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

// markdown-it configuration
const mdOptions = {
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable smartquotes and other typographic replacements
};

const md = new markdownIt(mdOptions)
  .use(require("markdown-it-anchor")) // Add anchor links to headings
  .use(require("markdown-it-attrs")); // Add attribute support

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('filterBy', function(array, key, value) {
    return array.filter(item => {
      const keyPath = key.split('.');
      let data = item;
      for (const path of keyPath) {
        data = data[path];
      }
      return data === value;
    });
  });

  eleventyConfig.addFilter('limit', function(array, limit) {
    return array.slice(0, limit);
  });
  // Set markdown-it as the markdown processor
  eleventyConfig.setLibrary("md", md);

  // Add markdown filter with type checking
  eleventyConfig.addFilter("markdown", function (content) {
    if (!content) {
      return "";
    }
    // Ensure content is a string
    const stringContent = String(content);
    return md.render(stringContent);
  });

  // Improve the filterByCategory filter
  eleventyConfig.addFilter(
    "filterByCategory",
    function (presentations, category) {
      if (!category || !presentations) return [];

      return presentations.filter((presentation) => {
        const categories = Array.isArray(presentation.category)
          ? presentation.category
          : [presentation.category];
        return categories.includes(category);
      });
    }
  );

  // Add filter for tools categories
  eleventyConfig.addFilter("filterToolsByCategory", function (tools, category) {
    if (!category || !tools) return [];

    return tools.filter((tool) => {
      if (!tool.category) return false;
      const categories = Array.isArray(tool.category)
        ? tool.category
        : [tool.category];
      return categories.includes(category);
    });
  });

  // Add filter for filtering categories
  eleventyConfig.addFilter("reject", function (array, value) {
    if (!array) return [];
    return array.filter((item) => item !== value);
  });

  // Add plugins
  eleventyConfig.addPlugin(syntaxHighlight, {
    // Change which Eleventy template formats use syntax highlighters
    templateFormats: ["njk", "md"],
    alwaysWrapLineHighlights: true,
    trim: true,
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: {
      name: "all",
      limit: 0, // 0 = no limit
    },
    metadata: {
      language: "en",
      title: "Testing",
      subtitle:
        "Ed Marsh interviews professionals in technical communication, content strategy, content marketing, information architecture, and others who create, organize, and maintain content online.",
      base: "https://edmar.sh/",
      author: {
        name: "Ed Marsh",
      },
    },
  });

  eleventyConfig.addGlobalData("presentations", () => {
    return require("./_data/presentations.json");
  });
  eleventyConfig.addGlobalData("tools", () => {
    return require("./_data/tools.json");
  });

  // Add shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Add passthrough copies
  eleventyConfig.addPassthroughCopy({
    "_includes/css/base.css": "css/base.css",
    "_includes/css/tw.css": "css/tw.css",
    "_includes/css/pagefind-overrides.css": "css/pagefind-overrides.css",
    "assets/images": "assets/images",
    "assets/podcasts": "assets/podcasts",
    "_includes/js/copyCode.js": "js/copyCode.js",
  });

  const collections = ["skills", "podcasts", "ssg", "examples"];

  collections.forEach((collection) => {
    eleventyConfig.addCollection(collection, (collectionApi) =>
      collectionApi
        .getAll()
        .filter((item) => item.data.tags && item.data.tags.includes(collection))
    );
  });

  // Return directory configuration LAST
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
