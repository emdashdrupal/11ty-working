const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");

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
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Add shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Add passthrough copies
  eleventyConfig.addPassthroughCopy("_includes/css/base.css");
  eleventyConfig.addPassthroughCopy("_includes/css/tw.css");
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("assets/podcasts");

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
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk"]
  };
};
