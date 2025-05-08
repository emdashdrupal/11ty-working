---
title: Choosing a static site generator
description: The good news is there are a lot of static site generators to choose from, and that they all work similarly. The bad news is there are a lot of static site generators to choose from, and that they all work similarly.
date: 2024-11-26
tags : "content-strategy"
featured: true
featuredOrder: 2
FontAwesomeIcon: "solid fa-file-waveform"
---

I knew what I wanted (ease-of-use) and didn't want ("ease of use") out of static site generators (SSGs).

When rebuilding my site, it made sense to me to build the site with an SSG because it's fast, self-contained, and relevant to what we do as technical communicators. The underlying architecture is also far simpler than a database-driven site like my current WordPress site. WordPress development evolved too far for my limited skills to 'just tweak'.

## My initial SSG requirements

I played around with static site generators (SSGs) in the past, and in a prior role our output went through a heavily customized version of [Gatsby](https://gatsbyjs.com). I wasn't hands-on with it because we needed a team of developers to support it.

When choosing an SSG to implement, these were my requirements:

- I wanted to avoid Gatsby.
- I was looking for as plug-and-play as possible (in retrospect, ha!).
- As low-code as possible (in retrospect, ha!). I can play with HTML, CSS, and configuration and template files, but I didn't really have time to learn modern JavaScript or Typescript.
- Time to market &mdash; how quickly could I build out the site while it was relevant to my job search?

After starting to learn the [Hugo SSG](https://gohugo.io/), I tried a "newer" system: Eleventy (11ty). Why? Not surprisingly, a *lack of documentation*. In most cases, this will be a trial and error thing based on your individual needs.

Eleventy's docs aren't much better. It's just more open, so there are more available resources. For example, you can create your templates in numerous templating languages, including HTML and Markdown, so it's easy to find answers.

Since I didn't know anything about Eleventy, I stayed with its default [Nunjucks templating language](https://mozilla.github.io/nunjucks/), and it's based on the [Liquid templating language](https://liquidjs.com/index.html) so there was a lot of history. Amusingly, I found during the process that [Tom Johnson referenced Liquid](Content_Content_podcast_S1E4_Curse_of_knowledge_with_Tom_Johnson.mp3) in our podcast together almost 10 years ago.

## Getting my head around it all


Since I had a lot of free time, I watched videos, read tutorials and blogs, looked up the pros and cons of each of several approaches for templating, CSS, SSG choice itself, etc.

The learning curve was slightly softened by *abstraction*; each piece of the site-building puzzle is discrete, so you can focus on one aspect at a time. This helps with decision paralysis.

My initial progression included:

- Edit, revise, update, delete, reorganize content.
- Decide how I want to display each piece of content.
- Add blog posts documenting my journey.
- Get the SSG running.
- Understand how to display everything using templates.
- Choosing a CSS styling framework.
- Building out logic to display individual pieces on the templates.
- Grids.

Once the downtime really started during the holidays, I'd say it took me about three weeks to really start "getting" how all of this works. Does that mean it came quickly and easily? No. There were many "why isn't this thing that's supposed to work not working"? Once I realized this is part of the process, it made it easier for me to look at this as a learning experience.

Again, the important part was to structure the content correctly so the system I was building knew what was what.

The good news is once you learn the basic principles of static site generators, it's easier to figure out the nuances of each SSG. Again, abstraction is key; your content is in once place, and your site and templates display the content.

## Lessons learned

However, I quickly learned that when you decide to build a website from scratch with an SSG, you're building it from *scratch*. There are many starter themes and frameworks; I played with a few. But at that early stage of the process I didn't understand enough about how the SSGs worked to know how to properly use them. I also had the time to build from scratch, and inclination to learn some newer tech. I get to play the role of a developer and understand how content is programmatically consumed while revamping the content and content strategy of my site.

A *big* problem ended up being that I wanted to play with all the toys and build the site, so the focus on the content came last. This explains so much why a content-first approach is so often ignored by developers. But in my case I think this worked out, as I had lots of opportunity to update my messaging, and create a cohesive framework of this series, and make the content more portable.

Also, there is just a lot *to do*
![Kanban board showing to-do list for site](/assets/images/any-do-kanban-board.png)
