---
title : 'The where: Working with a static site generator'
description : I knew what I wanted (ease-of-use) and didn't want (&ldquo;ease of use&rdquo;) when building a site with static site generators (SSGs).
tags : content-strategy
featured : true
featuredOrder : 2
FontAwesomeIcon : "solid fa-file-waveform"
date: 2024-12-10
---
When rebuilding my site, it made sense to use an SSG because it's fast, self-contained, and relevant to what we do as technical communicators. The WordPress site I had for over a decade not longer served my purpose&mdash;both technologically and maintenance. The WordPress world also evolved too far for my limited PHP skills from a decade ago to 'just tweak'. I no longer needed the WordPress complexity, infrastructure, features, and plugins that require maintenance. Using an SSG also fit my [cost reduction goal](/static-site-transformation/why/).

The good news is there are a lot of static site generators to choose from, and that they all work similarly. The bad news is there are a lot of static site generators to choose from, and that they all work similarly. Once you learn the basic principles, it's easier to figure out the nuances of each SSG and decide which is best for you.

Working with SSGs is *not* a plug and play experience. In a prior role, our output went through a heavily customized version of [Gatsby](https://gatsbyjs.com). I wasn't hands-on with it because we needed a team of developers to support it.

## My SSG requirements

These were my requirements when choosing an SSG:

- As plug-and-play as possible (in retrospect, ha!). I can play with HTML, CSS, and configuration and template files, but I don't have a dev team behind me. Nor did I have time to learn modern JavaScript or Typescript.
- Well-supported.
- Quick time to market&thinsp;&mdash;&thinsp;I needed to quickly build out the site to be relevant to my job search.

## The learning process

The important part to understand is that the SSG is just a generator. There are parameters and configuration, but what SSGs do is display the content you create through templates. The key takeaway was making sure to structure my content, regardless of the tools.

I had time, so I watched videos, read tutorials and blogs, looked up the pros and cons of templating approaches, and the SSG choice itself. I started to learn with the [Hugo SSG](https://gohugo.io/). Eventually I moved to [Eleventy (11ty)](https://eleventy.dev). Why? Not surprisingly, a *lack of documentation*.

Eleventy's docs aren't much better, but its infrastructure is more open. Since I didn't know anything about Eleventy, I stayed with its default [Nunjucks templating language](https://mozilla.github.io/nunjucks/), which ultimately renders the HTML in your output. It's based on the [Liquid templating language](https://liquidjs.com/index.html) so there was a lot of history and documentation to refer to. Amusingly, I found during the process that [Tom Johnson referenced Liquid](/podcasts/content-content-podcast-episode-4-curse-of-knowledge-with-tom-johnson/) in our podcast together almost 10 years ago.

## Lessons learned

When you decide to build a website from scratch with an SSG, you're building it from *scratch*. Every SSG has starter themes and frameworks, but at that stage of the process, I didn't understand enough about how SSGs worked to know how to properly use those themes. I also had the time and inclination to learn some new tech, so I decided to play every role of developing a website to help me appreciate how content is programmatically consumed.

I started building the site during the winter holiday downtime. It took me about three weeks to start "getting" how it all works. Does that mean it came quickly and easily? No. There were many "why isn't this thing that's supposed to *work* not working?" moments. Once I realized this is part of the process, it made it easier for me to look at this as a learning experience (if only it were that easy&hellip;).
