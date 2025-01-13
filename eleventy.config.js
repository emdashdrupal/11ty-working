const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_includes/css/skill.css");
  eleventyConfig.addPassthroughCopy("_includes/css/base.css");
  eleventyConfig.addPassthroughCopy("_includes/css/tw.css");
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Podcasts collection
    eleventyConfig.addCollection("podcasts", function(collectionApi) {
      return collectionApi.getFilteredByTag("podcasts");
    });

    // Technical writing collection
    eleventyConfig.addCollection("examples", function(collectionApi) {
      return collectionApi.getFilteredByTag("examples");
    });

    // Skills collection
    eleventyConfig.addCollection("skills", function(collectionApi) {
      return collectionApi.getFilteredByTag("skills");
    });

    // All items collection (optional, if not automatically included)
    eleventyConfig.addCollection("all", function(collectionApi) {
      return collectionApi.getAll();
    });
  };


dir: {
  input: "content";
  includes: "_includes";
  output: "_site";
}
