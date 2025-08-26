---
title: Learning about SSG templates
description: Templates are what makes static site generators work. They take your content and tell the SSG how to display it.
FontAwesomeIcon: 'solid fa-file-code'
---

For someone who started creating web sites in the mid-1990s, it's incredibly fun to build out a site using just HTML and CSS!

## Configuration

The `eleventy.config.js` file is the main configuration file for Eleventy. This file defines default directories across the site, the plugins you want to use to expand Eleventy's functionality, and "Passthrough copies", which are files that you want copied over to the location where your site is generated.

```js
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_includes/css/base.css");
  eleventyConfig.addPassthroughCopy("_includes/css/tw.css");
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
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
| `addShortcode`| A small snippet of script you can call in your templates.|
| `dir` | These are optional parameters that tell Eleventy where to look for items. In this case, all of my content resides in the `content` folder. Includes, which in this case are `.css` files (but others can be added), and my `images` folder.|

## Learning curve

Who knew the hardest part would be to figure out pathing? Well, I'm guessing most developers probably did. Between figuring out relative pathing the way the SSG wants it, and how to reference items using dot notation, this was my biggest source of confusion and frustration. I'm sure everyone in their career has had a "Why won't this *work*" moment; trying to learn everything at once and figuring out why one change broke everything was *annoying*.

I ended up with three main page templates: `index.njk` for the homepage, grid pages for the interior landing pages, and details pages for the longform content. These were supported by multiple "partial" templates for:

- The navigation (menu) bar.
- The breadcrumb trail.
- The cards that populated the grid pages.
- The "hero image" that displayed the relevant podcast headshot of the guest (or in the case of the earlier episodes without headshots, the Content Content podcast logo), or for the static site and examples pages, the relevant font awesome icon I chose (and referenced using metadata).
- The header and footer.
- "Macros" that helped build the cards and drop-down menus.

You can view all of these in the repo. I tried as much as possible to not repeat myself to be consistent in both content and code, but I'm sure there's still a lot of optimization left on the table. This is where having [AI like GitHub Copilot helped out](/static-site-transformation/writing-with-ai).

## Structure

The more I worked with it, the more I realized structure mattered &mdash; not only the content but the classes and IDs that are assigned to elements. These things make it easier to 'grab' data from content. For example, I wanted the button macro to download mp3 files on the podcast pages. However, the initial logic I wrote set the button to download *every* button item, which meant you weren't going to a page, but downloading it. I was able to isolate the button to only download on podcast pages, but first attempts made it download both the HTML and MP3 files. The tricky part was figuring out the granular logic.

## Adding AI into the mix

After I learned some Nunjucks and released the site, I started playing with large language models (LLMs) locally using [Ollama](https://ollama.com/), [LM Studio](https://lmstudio.ai/docs/app), and [PrivateGPT](https://docs.privategpt.dev/overview/welcome/introduction). In the Model-Context-Program model for prompts and replies, it turns out system prompts use the [Jinja templating language](https://jinja.palletsprojects.com/en/stable/), which is the predecessor to Nunjucks. I'm already ahead of the curve!