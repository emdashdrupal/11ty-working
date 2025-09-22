---
title : 'The how: Building the site structure'
description : 'I started my information architecture with the existing architecture of my WordPress site. Then I started to put all the content pieces together.'
tags : content-strategy
featured : true
featuredOrder : 3
FontAwesomeIcon : solid fa-file-waveform
date: 2025-01-10
---
When you start with a decade-old information architecture with lots of legacy content that evolved to include podcasts, it shouldn't be surprising that very few parts of that structure ended up in the new site.

I quickly decided it wasn't worth maintaining all of my old personal and professional blog posts. Most were outdated and not helpful to the technical writing portfolio I wanted the site to be.

## Content types

I designed three main content types (page types):

- Homepage, which included an intro, headshot, and galleries of the four most important, or recent, items that have been updated in three categories: podcasts, skills, and this series of blog posts.
- Grid pages that are gallery pages with cards for each skill, blog post, and podcast episode.
- Details pages for each of the categories:
  - Blog posts.
  - Podcast episodes,including show notes and an episode player.
  - More information about each of my skills, the relevant tools used, and any relation presentations or publications I've created.

## Separating content from presentation

There was a *lot* of experimenting. Once I grasped *how* to use the metadata programmatically, it opened my eyes to how much structured front matter makes a difference in how content is used, sorted, filtered, and displayed.

While I was building out the site there were grid template pages for each of those content types. Eventually I made the grid collection-agnostic.

Then I added two `json` files to pull data from:

- Webinars, podcasts, and other publications I've done.
- Tools used for each of the skills.

This let me leverage the built-in `category` metadata to populate each skills page with the relevant work and tools I used. It was fun, refreshing, and again, holy cow structured content. Here's an example of the `json` file containing my tool skill set on pages with the same category. You can [see the full file in this repo](https://github.com/emdashdrupal/11ty-working/blob/main/_data/tools.json).

```json
[
  {
    "category": ["docs-as-code", "coding-experience", "technical-writing"],
    "publisher": "Nunjucks",
    "title": "Nunjucks templating engine"
  },
  {
    "category": ["technical-writing", "image-editing"],
    "publisher": "Adobe",
    "title": "Photoshop"
  },
  {
    "category": ["technical-writing", "page-layout", "structured-authoring"],
    "publisher": "Adobe",
    "title": "FrameMaker"
  },
]
```

Taking an active development role makes it clear how structuring your content helps your developers and your readers. It also helped me narrow my focus on skills, as well as tell a story across all of my content. Abstracting my content taught me:

- Using metadata reduces input errors.
- You can restrict what's entered via pipelines and/or linters.
- It makes it easier for people to contribute.
- Sites can have a consistent voice and experience.
- Ultimately your content is portable and easier to publish across multiple channels.

## Accessibility

I used the [WAVE browser plugin](https://wave.webaim.org/extension/) to test my pages and ensure they were accessible. My wife is a developer and accessibility advocate and as a technical communicator, I wanted my site to be accessible to everyone.

![Screenshot of WAVE accessibility plugin results](/assets/images/wave-plugin-screenshot.png)
