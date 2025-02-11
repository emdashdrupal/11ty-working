---
title : Content strategy and Information Architecture for static site generators
description: Structuring content is always important. Working as a developer, I can appreciate why using metadata (front matter) is critical.
FontAwesomeIcon: solid fa-folder-tree
featured: true
---

## Front matter

Front matter is metadata. You can use it to define page titles, keywords, tags, and categories right out of the box. However, adding custom metadata the template engine and site generator can use really expands the possibilities of highly structured content.

### Taxonomies

Out of the box: `tags` and `categories`. These *collections* are very powerful to display items on page(s) programmatically.

This includes things like looping through podcast posts and displaying them all in a grid with their photo, title, description, and link. On each individual podcast page, the link to the mp3 is programmatically generated.

Eventually I made the grid collection-agnostic, but while I was building out the site there were several grid template pages. 

## Exploration

There was a *lot* of experimenting and seeing what was what. Some of it involved content reuse: I knew that I wanted to re-use the first sentence of each 'details' page to display on cards on the grid pages
