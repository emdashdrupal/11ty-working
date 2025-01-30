const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const md = new markdownIt();

module.exports = function (eleventyConfig) {
  // Add markdown filter
  eleventyConfig.addFilter("markdown", function(value) {
    if (!value) return '';
    return md.render(value);
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
