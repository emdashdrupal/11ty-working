const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const timeToRead = require('eleventy-plugin-time-to-read');

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

module.exports = function(eleventyConfig) {
  // Set markdown-it as the markdown processor
  eleventyConfig.setLibrary("md", md);

  // Add markdown filter with type checking
  eleventyConfig.addFilter("markdown", function(content) {
    if (!content) {
      return '';
    }
    return md.render(String(content));
  });

  // Add plugins
  eleventyConfig.addPlugin(syntaxHighlight, {
    templateFormats: ["njk", "md"],
    alwaysWrapLineHighlights: true,
    trim: true
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(timeToRead);

  // Add shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Add passthrough copy for assets
  eleventyConfig.addPassthroughCopy({
    "assets/": "assets/",
    "_includes/css/": "css/"
  });

  // Watch target for CSS files
  eleventyConfig.addWatchTarget("./_includes/css/");

  // Add collections
  const collections = ["skills", "podcasts", "ssg", "examples"];

  collections.forEach(collection => {
    eleventyConfig.addCollection(collection, collectionApi =>
      collectionApi
        .getAll()
        .filter(item => item.data.tags && item.data.tags.includes(collection))
    );
  });

  // Return configuration object
  return {
    dir: {
      input: "content",
      includes: "../_includes",  // Relative to input directory
      layouts: "../_includes/layouts",  // Relative to input directory
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk"],
    pathPrefix: "/",  // Added for proper URL handling
    passthroughFileCopy: true  // Ensure passthrough copy works
  };
};
