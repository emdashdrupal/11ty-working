---
title : Creating the content strategy and information architecture
description: Working as writer, content strategist, and developer helped me understand how to orchestrate between the three roles.
FontAwesomeIcon: solid fa-folder-tree
featured: true
featuredOrder: 1
---

Structuring, planning, and maintaining content is critical.

## Who are my users?

The first question of technical writing is *who is the user*? The users you identify inform and guide your content strategy. In my case, my users include:

- Potential employers.
- Technical writers &mdash; both experienced and new.
- Listeners (and potential listeners) of my podcast.
- Those who want to learn about static site generators (SSGs) and/or docs-as-code.

## Content goals

- Highlight my skills to attract employers.
- Create a series of blog posts about my experience migrating from WordPress to a static site generator.
- Highlight my podcast, as the old site really didn't. I'm also considering reviving the podcast so this is high-priority
- Get rid of legacy content.
- Ensure the site is accessible.

### Blogging strategy

My content strategy for the conversion from WordPress to a static site generator (SSG) included:

- Blogging about the entire conversion, somewhere between 10-20 posts. This includes the migration, the build-out, and the content creation and revision processes along the way.
- Put that content out on a regular cadence to keep content fresh and drive continuous engagement.
- Inspire tech writers to get more technical.
- Understand and explain how content is consumed programmatically.

#### Publishing cadence for the SSG series

As part of my site rollout, I wanted to have four solid blog posts ready on debut, with the plan to roll out the others &mdash; in either small batches or individually &mdash; to keep traffic coming to my site, and to show recruiters and employers that I was still actively updating my site and the series.

## Content types

I created three main content types (page types):

- **Homepage**: Intro and a headshot, and galleries of the four most important, or recent, items that have been updated in three categories: podcasts, skills, and this series of blog posts.
- **Grid pages**: Overview pages that list each of my skills, blog posts, and podcast episodes.
- **Details pages**: For each of the categories:
  - Blog posts,
  - Podcast episodes,including show notes and an episode player.
  - More information about each of my skills, the relevant tools used, and any relation presentations or publications I've created.

## Metadata

Most technical writers and content strategists are familiar with metadata (also referred to as *front matter* or *frontmatter*). You can use it to define page titles, keywords, tags, and categories right out of the box. The real power comes by adding custom metadata; highly structured content expands the possibilities of the template engine and site generator.

### Taxonomies

*Collections* in Eleventy are powerful tools to display items on page(s) programmatically. Eleventy comes with `tags` and `categories` by default. You can expand these to create your own frontmatter as well.

For example, on the homepage I wanted to loop through the lists of podcast posts, my skill set, and this series on static site generators. On the homepage and each landing page, I wanted to programmatically display them in a grid with their photo, title, description, and link. On each individual podcast page, the link to the mp3 is programmatically generated.

You can also use collections to filter your content once you have it structured with your metadata. For example, I needed a way to tell the SSG to display *four specific* blog posts and skills I wanted to highlight. I created `featured` and `featuredOrder` metadata fields, so it's easy to implement and maintain.

## Content reuse

Using metadata and collections enables reuse. Copy-pasted content across pages is a maintenance nightmare. Someone has to remember to update it, and also *all the places* where the content is pasted.

As I built out the site, I wanted to re-use the first sentence of each details page to display as descriptions on the cards on the grid pages. This also allowed me to style the descriptions separately.

### Separating content from presentation

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
