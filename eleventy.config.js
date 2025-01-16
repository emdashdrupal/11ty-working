const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_includes/css/base.css");
  eleventyConfig.addPassthroughCopy("_includes/css/tw.css");
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
};
dir: {
  input: "content";
  includes: "_includes";
  output: "_site";
}
