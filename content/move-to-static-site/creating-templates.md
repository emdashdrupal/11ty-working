---
title: "SSG Templates"
---

For someone who started creating web sites in the mid-1990s, it's incredibly fun to build out a site using just HTML and CSS!

## Configuration

Who knew the hardest part would be to figure out pathing?

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_includes/css/skill.css");
  eleventyConfig.addPassthroughCopy("_includes/css/base.css");
  eleventyConfig.addPassthroughCopy("_includes/css/tw.css");
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
};


dir: {
  input: "content";
  includes: "_includes";
  output: "_site";
}
```
