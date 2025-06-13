---
title : 'The how: Building the site structure'
description : Putting all of the content pieces together.
tags : content-strategy
featured : true
featuredOrder : 3
FontAwesomeIcon : solid fa-file-waveform
---

My initial site architecture was based on the existing architecture in WordPress:

- Home: promotes posts across all of the content types&thinsp;&mdash;&thinsp;podcast, writing samples, skills, and this SSG series.
- About
- Skills: List of the ways I can help a potential client/employer
- Tech writing examples: gallery page
- Speaking engagements/presentations: gallery page
- Blog (etc): gallery page
- Podcast pages: gallery page
- A sidebar that displays a tag cloud
- Photo galleries (?)
- Contact
- Resume(?)

Very few parts of this structure ended up in version 1.0 of the site. If you've ever revamped lots of legacy content, this probably isn't surprising.

## Content types

In support of this architecture, I designed three main content types (page types):

- **Homepage**: Intro and a headshot, and galleries of the four most important, or recent, items that have been updated in three categories: podcasts, skills, and this series of blog posts.
- **Grid pages**: Overview pages that list each of my skills, blog posts, and podcast episodes.
- **Details pages**: For each of the categories:
  - Blog posts.
  - Podcast episodes,including show notes and an episode player.
  - More information about each of my skills, the relevant tools used, and any relation presentations or publications I've created.

## Content reuse

Using metadata and collections enables reuse. Copy-pasted content across pages is a maintenance nightmare. Someone has to remember to update it, and also *all the places* where the content is pasted.

## Metadata

Most technical writers and content strategists are familiar with metadata (also referred to as *front matter* or *frontmatter*). You can use it to define page titles, keywords, tags, and categories right out of the box. The real power comes by adding custom metadata; highly structured content expands the possibilities of the template engine and site generator.

When I built out this site, I wanted to re-use the first sentence of each details page to display as descriptions on the cards on the grid pages. This also allowed me to style the descriptions separately.

```yml
title: 'The how: Asking AI to write documentation'
description: I asked AI to do a tech writer's job and document the code for my site.
FontAwesomeIcon: solid fa-keyboard
featured: true
featuredOrder: 3
```

### Taxonomies

*Collections* in Eleventy are powerful tools to display items on page(s) programmatically. Eleventy comes with `tags` and `categories` by default. You can expand these to create your own frontmatter as well.

For example, on the homepage I wanted to loop through the lists of podcast posts, my skill set, and this series on static site generators. On the homepage and each landing page, I wanted to programmatically display them in a grid with their photo, title, description, and link. On each individual podcast page, the link to the mp3 is programmatically generated.

You can also use collections to filter your content once you have it structured with your metadata. For example, I needed a way to tell the SSG to display *four specific* blog posts and skills I wanted to highlight. I created `featured` and `featuredOrder` metadata fields, so it's easy to implement and maintain.

## Separating content from presentation

While these don't really apply to my use case, trying to abstract as much as possible taught me:

- Using metadata reduces input errors.
- You can restrict what's entered via pipelines and/or linters.
- It makes it easier for people to contribute.
- Sites can have a consistent voice and experience.
- Portable, multi-channel.

## Exploration

There was a *lot* of experimenting and seeing what was what. Once I grasped *how* to use the metadata programmatically, it opened my eyes to how much structured front matter makes a difference in how content is used, sorted, filtered, and displayed.

While I was building out the site there were grid template pages for each of those content types. Eventually I made the grid collection-agnostic.

Then I added two `json` files of related webinars, podcasts, and other talks I've done, as well as the tools used for each of the skills. It was fun, and refreshing, and again, holy cow structured content.

Being on this side of the equation makes it clear how much structuring your content helps your developers. It also helped me narrow my focus on skills, as well as tell a story across all of my content.

My progression included:

- Get the SSG running.
- Understand how to create and use templates.
- Decide how I want to display each content type.
- Choose a CSS styling framework.
- Build out logic to display individual pieces on the templates.
- Create grid pages to display categories with multiple entries (blog, podcast, skills).
