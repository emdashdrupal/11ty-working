---
title : Content strategy and information architecture for static site generators
description: Structuring content is always important. Working as a developer, I can appreciate even more why using metadata (front matter) is critical.
FontAwesomeIcon: solid fa-folder-tree
featured: true
---

## Content types

I created three main content types (page types):

- The homepage, which gives my intro and a headshot, and galleries of the four most important, or recent, items that have been updated in three categories: podcasts, skills, and this series of blog posts.
- Grid pages, which drill down into things like skills, blog posts, and my podcast episodes.
- Details pages, which are the landing pages for each podcast episode, and the meat of the other content pages.

## Metadata

Most technical writers and content strategists are familiar with metadata (referred to in the SSG world as *front matter* and/or *frontmatter*). You can use it to define page titles, keywords, tags, and categories right out of the box. The real power comes by adding custom metadata; highly structured content expands the possibilities of the template engine and site generator.

### Taxonomies

*Collections* in Eleventy are powerful metadata tools to display items on page(s) programmatically. Eleventy comes with the `tags` and `categories` by default. You can expand these to create your own frontmatter as well.

For example, on the homepage I wanted to loop through the lists of podcast posts, my skillset, and this series on static site generators. On the homepage and each landing page, I wanted to programmatically display them in a grid with their photo, title, description, and link. On each individual podcast page, the link to the mp3 is programmatically generated.

You can also use collections to filter your content once you have it structured with your metadata.

While I was building out the site there were grid template pages for each of those content types. Eventually I made the grid collection-agnostic.

### Content reuse

Using metadata and collections enables reuse. Copy-pasted content across pages is a maintenance nightmare. Someone has to remember to update it, and also remember that content is pasted in several places. As I built out the site, I wanted to re-use the first sentence of each 'details' page to display as descriptions on the cards on the grid pages.

## Exploration

There was a *lot* of experimenting and seeing what was what. Once I grasped *how* to use the metadata programmatically, it opened my eyes how much structured front matter makes a difference in how content is used, sorted, filtered, and displayed.
