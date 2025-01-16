---
title: "SSG Templates"
description: Templates are what makes static site generators work. They take your content and tell the SSG how to display it.
eleventyNavigation:
  key : "SSG templates"
  parent: Migration
  order: 2
---

For someone who started creating web sites in the mid-1990s, it's incredibly fun to build out a site using just HTML and CSS!

## Configuration

The `eleventy.config.js` file is the main configuration file for Eleventy. This file defines default directories across the site, the plugins you want to use to expand Eleventy's functionality, and "Passthrough copies", which are files that you want copied over to the location where your site is generated.

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
module.exports = function (eleventyConfig) {
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

| Parameter | Description|
|-|-|
| `syntaxHighlight`| Enables syntax color-coding based on the syntax selected in Markdown.|
| `addPassthroughCopy`| These are the files that are in your folder structure that you need to copy to the generated site folder for things to display correctly. This includes items like `.css` files and your images folder.|
| `addPlugin`| Eleventy has official and contributed plugins that add functionality like syntax highlighting and navigation.|
| `dir` | These are optional parameters that tell Eleventy where to look for items. In this case, all of my content resides in the `content` folder. Includes, which in this case are `.css` files (but others can be added), and my `images` folder.|

## Learning curve

Who knew the hardest part would be to figure out pathing?