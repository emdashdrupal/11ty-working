---
title: Choosing a static site generator
description: I knew what I wanted (ease-of-use) and didn't want (&ldquo;ease of use&rdquo;) when building a site with static site generators (SSGs).
tags : "content-strategy"
featured: true
featuredOrder: 2
FontAwesomeIcon: "solid fa-file-waveform"
---

When rebuilding my site, it made sense to use an SSG because it's fast, self-contained, and relevant to what we do as technical communicators. The underlying architecture is also far simpler than a database-driven site like my current WordPress site. WordPress development evolved too far for my limited PHP skills to 'just tweak'.

The good news is there are a lot of static site generators to choose from, and that they all work similarly. The bad news is there are a lot of static site generators to choose from, and that they all work similarly. Once you learn the basic principles, it's easier to figure out the nuances of each SSG and decide which is best for you.

## My initial SSG requirements

I played around with static site generators in the past. In a prior role, our output went through a heavily customized version of [Gatsby](https://gatsbyjs.com). I wasn't hands-on with it because we needed a team of developers to support it.

These were my requirements when choosing an SSG:

- Avoid complex SSGs like Gatsby. I don't have a dev team behind me, nor did I have time to learn modern JavaScript or Typescript.
- As plug-and-play as possible (in retrospect, ha!).
- As low-code as possible (in retrospect, ha!). I can play with HTML, CSS, and configuration and template files.
- Quick time to market&thinsp;&mdash;&thinsp;I needed to quickly build out the site to be relevant to my job search.

## Getting my head around it all

Since I had a lot of free time, I watched videos, read tutorials and blogs, looked up the pros and cons of templating approaches, and the SSG choice itself.

I started to learn with the [Hugo SSG](https://gohugo.io/). Eventually I moved to [Eleventy (11ty)](https://eleventy.dev). Why? Not surprisingly, a *lack of documentation*. In most cases, this will be trial and error based on your individual needs.

Eleventy's docs aren't much better. It's just more open, so there are more available resources. For example, you can create your templates in numerous templating languages, including HTML and Markdown, so it's easy to find answers.

Since I didn't know anything about Eleventy, I stayed with its default [Nunjucks templating language](https://mozilla.github.io/nunjucks/), and it's based on the [Liquid templating language](https://liquidjs.com/index.html) so there was a lot of history. Amusingly, I found during the process that [Tom Johnson referenced Liquid](/podcasts/content-content-podcast-episode-4-curse-of-knowledge-with-tom-johnson/) in our podcast together almost 10 years ago.

The learning curve was slightly softened by *abstraction*; each piece of the site-building puzzle is discrete, so you can focus on one aspect at a time. This helps with decision paralysis.

My progression included:

- Edit, revise, update, delete, and reorganize content.
- Decide how I want to display each content type.
- Write blog posts that document my journey.
- Get the SSG running.
- Understand how to create and use templates.
- Choose a CSS styling framework.
- Build out logic to display individual pieces on the templates.
- Write and implement content grids.

There is a lot *to do* to build a site:
![Kanban board showing to-do list for site](/assets/images/any-do-kanban-board.png)

I started building the site during the winter holiday downtime. It took me about three weeks to start "getting" how it all works. Does that mean it came quickly and easily? No. There were many "why isn't this thing that's supposed to *work* not working?" moments. Once I realized this is part of the process, it made it easier for me to look at this as a learning experience (if only it were that easy&hellip;).

The important part was to structure the content to display correctly. Abstraction is key; your content is in once place, and your site is generated by templates that display the content.

## Lessons learned

When you decide to build a website from scratch with an SSG, you're building it from *scratch*. There are many starter themes and frameworks. But at that early stage of the process I didn't understand enough about how the SSGs worked to know how to properly use them. I also had the time to build from scratch, and inclination to learn some new tech. I got to play the role of a developer and understand how content is programmatically consumed, while revamping the content, architecture, and content strategy of my site.

A *big* distraction was that I wanted to play with *all the toys*, so the focus on content came last. This explains why a content-first approach is so often ignored by developers, and where there's a ton of opportunity for content creators to work with their development team to create the best-possible user experience.
