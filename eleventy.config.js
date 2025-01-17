const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_includes/css/base.css");
  eleventyConfig.addPassthroughCopy("_includes/css/tw.css");
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
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

};
dir: {
  input: "content";
  includes: "_includes";
  output: "_site";
}
