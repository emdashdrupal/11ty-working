---
title: Static site takeaways
description: "A frustrating process (and situation) is ultimately satisfying in multiple ways."
FontAwesomeIcon: "solid fa-plane-departure"
featured: true
featuredOrder: 3
---

Working in just HTML and CSS was invigorating because I'd done it since the 1990s. There was something simple, pure, and frankly *nostalgic* about it.

Working with a static site generator indirectly made *writing* fun again (note I'm writing this sentence two weeks into the new year). To be able to update stuff, and have something not work-related (well, someone else's work) to write about, in such a simple format as Markdown, felt really good, and rapid changes were easy.

I didn't need a reminder about the importance of structure, metadata, reuse, and strategy, but it all felt natural &mdash; almost like I've done it for over 30 years.

Trying to work with documentation for several different pieces of software reminds me that yes, I too hate to RTFM. But there is a difference between good docs and bad docs, and it's obvious. There is lots of opportunities for technical writers to improve developer documentation &mdash; if businesses are willing to pay for it. In my experience, they're often not until it's too late.

I now know how to: 

- Create Nunjucks templates to write HTML from unstructured content.
- Use metadata better to create a successful CMS experience.
- Run an email server.
- Set up DNS records.
- Use CloudFlare.
- Use Netlify to host my site at zero cost.
- Unravel Cloudflare from my site once I found out CloudFlare and Netlify essentially do the same thing.
- Set up the Netlify development environment about three months too late.
- Better understand CSS frameworks and how to override them.

## Accessibility

The other nice thing about creating sites from HTML is that you can control how it's generated, and be sure to use the built-in elements to make my site accessible. I made sure there were `alt` and `title` tags for images, and that `aria` tags were included. I used tools like the Firefox developer accessibility tool and Screaming Frog SEO crawler to ensure a good experience for all site visitors, which is important regardless of the kind of site your site is.

## Unfinished business

There are so, *so* many things I want to add or fix after this buildout, but I also knew I had to be realistic with what I could accomplish under my timeframe. There were many times that I had to tell myself "that's out of scope" or "not for release". Thanks to the feedback of some friends/former colleagues, I was able to improve before release. There is a list of incremental fixes and more features to build out, once the blog posts are all rolled out (and probably in between).

## Final thoughts

Like any project, learning and implementing is a process. I often think I can skip steps in the process, especially when one of my end goals for this project is to promote myself while looking for a job. You can tell the early writing of these pages by the sheer amount of frustration in my (written) voice. When you're not a full-time developer, writing code and building a website is more fun than video games. It's also a lot easier to control everything when you're a one-man shop. I did not do testing. I didn't have to tell management when I introduced a bug into production (though management is pretty accepting when you're the same person whose making the mistakes).
