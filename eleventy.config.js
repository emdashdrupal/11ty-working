const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const timeToRead = require('eleventy-plugin-time-to-read');
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");


// Create markdown-it instance with custom configuration
const mdOptions = {
  html: true,        // Enable HTML tags in source
  breaks: true,      // Convert '\n' in paragraphs into <br>
  linkify: true,     // Autoconvert URL-like text to links
  typographer: true  // Enable smartquotes and other typographic replacements
};

const md = new markdownIt(mdOptions)
  .use(require('markdown-it-anchor'))  // Add anchor links to headings
  .use(require('markdown-it-attrs'));  // Add attribute support

module.exports = function (eleventyConfig) {
  // Set markdown-it as the markdown processor
  eleventyConfig.setLibrary("md", md);

  // Add markdown filter with type checking
  eleventyConfig.addFilter("markdown", function(content) {
    if (!content) {
      return '';
    }
    // Ensure content is a string
    const stringContent = String(content);
    return md.render(stringContent);
  });

  // Add plugins
  eleventyConfig.addPlugin(syntaxHighlight, {

    // Change which Eleventy template formats use syntax highlighters
    templateFormats: ["njk", "md"],
    alwaysWrapLineHighlights: true,
    trim: true,
});
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(timeToRead);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: {
        name: "podcasts",
        limit: 0,     // 0 means no limit
    },
    metadata: {
        language: "en",
        title: "Content Content podcast",
        subtitle: "Ed Marsh interviews professionals in technical communication, content strategy, content marketing, information architecture, and others who create, organize, and maintain content online.",
        base: "https://edmar.sh/podcasts",
        author: {
            name: "Ed Marsh",
        }
    }
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
    "_includes/js/copyCode.js": "js/copyCode.js"
  });

  // Add collections
  eleventyConfig.addCollection("skills", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => item.data.tags && item.data.tags.includes("skills"));
  });
  eleventyConfig.addCollection("podcasts", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => item.data.tags && item.data.tags.includes("podcasts"));
  });
  eleventyConfig.addCollection("ssg", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => item.data.tags && item.data.tags.includes("ssg"));
  });
  eleventyConfig.addCollection("examples", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => item.data.tags && item.data.tags.includes("examples"));
  });

  // Return directory configuration LAST
  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine:["njk", "html"],
    templateFormats: ["md", "njk", "html"]
  };
};
