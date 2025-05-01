---
title : Creating the content strategy and information architecture
description:  Working as a writer, content strategist, and developer helped me understand how to orchestrate between the three roles.
FontAwesomeIcon: solid fa-folder-tree
featured: true
featuredOrder: 1

---

Structuring content is always important. I appreciate even more why using metadata (front matter) is critical.

The content strategy was to blog about the process, and to put that content out on a regular cadence to draw traffic. I also hope to inspire other tech writers to get more technical, and understand how the content we create is consumed programmatically.


### Who are my users?

The first question of technical writing is *who is the user*? The users you identify inform and guide your content strategy. In my case, my users are:

- Potential employers.
- Technical writers &mdash; both experienced and new.
- Listeners of my podcast.
- Those who want to learn about static site generators (SSGs).

## Content goals

- Highlight my skills to attract employers.
- Create a series of blog posts about my experience migrating from WordPress to a static site generator.
- Release those blog posts on a schedule to keep content fresh and drive continuous engagement.
- Highlight my podcast, as the old site really didn't. I'm also considering reviving it.
- Get rid of legacy content.
- Ensure the site is accessible.

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

Then I added two json files of related webinars, podcasts, and other talks i've done, as well as the tools used for each of the skills. it was fun, and refreshing, and again, holy cow structured content.

Being on this side of the equation makes it clear how much structuring your content helps your developers.

It also helped me narrow my focus on skills, as well as tell a story across all of my content.

## Separating content from presentation

- Using metadata reduces input errors.
- you can restrict what's entered via pipelines and/or linters
- make it easier for people to contribute, and have a consistent voice.
- Portable, multi-channel
- Reuse

## Publishing cadence for the SSG series

As part of my site rollout, I wanted to have four solid blog posts ready on debut, with the plan to roll out the others in either small batches or individually to keep traffic coming to my site, and to show recruiters and employers that I was still actively updating my site and the series.

This meant I needed to set up a way to tell the SSG to display *these four* blog posts and skills I want to highlight. I created `featured` and `featuredOrder` metadata fields, so it's easy to implement and maintain.
