---
title : Content strategy and Information Architecture for static site generators
description: Structuring content is always important. Working as a developer, I can appreciate why using metadata (front matter) is critical.
FontAwesomeIcon: solid fa-folder-tree
featured: true
---

## Front matter

Front matter is basically metadata.

### Taxonomies

Out of the box: `tags` and `categories`. These *collections* are very powerful to display items on page(s) programmatically.

This includes things like looping through podcast posts and displaying them all in a grid with their photo, title, description, and link. On each individual podcast page, the link to the mp3 is programmatically generated.

Eventually I made the grid collection-agnostic, but while I was building out the site there were several grid template pages.
