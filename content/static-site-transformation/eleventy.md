---
title : "Moving to Eleventy SSG"
description : The good news is there are a lot of static site generators to choose from, and that they all work similarly. The bad news is there are a lot of static site generators to choose from, and that they all work similarly.
FontAwesomeIcon: 'solid fa-person-walking'
---

After attempting to use Hugo, I tried a "newer" system: Eleventy (11ty). Why? Surprisingly, a *lack of documentation*. In most cases, this will be a trial and error thing based on your individual needs. I knew I didn't want Gatsby due to prior experience. I wanted a more plug-and-play experience that I could tweak. Wordpress development evolved too far for my limited skills to 'just tweak'.

Not that Eleventy's docs are better. It's just more open, so there are more resources out there. For example, you can create your templates in several different languages, including HTML and Markdown, so it's easy to find answers. You can also use numerous templating languages, so you can pick and choose based on what you do or don't know.

Since I didn't know anything, staying with Nunjucks made the most sense, as it is the default in a lot of Eleventy examples, and it's based on the Liquid templating language. Amusingly, I found during the process that Tom Johnson referenced Liquid in our podcast together almost 10 years ago.

## How long it took to get my head around this

The learning curve was made easy by abstraction; each piece of the puzzle is discrete, so you can focus on one aspect at a time. This helps with decision paralysis.

Since I had a lot of free time, I watched videos, read tutorials and blogs, looked up the pros and cons of each of several approaches for templating, CSS, SSG choice itself, etc.

My progression:

- Edit, revise, update, reorganize content
- Decide how I want to display each piece of content
- Add blog posts documenting my journey
- Getting the SSG running
- Understanding how to display everything via templates
- Choosing a CSS styling framework
- Building out logic to display individual pieces on the templates
- Grids

Once the downtime really started during the holidays, I'd say it took me about three weeks to really start "getting" how all of this works. Does that mean it came quickly and easily? No. There were many "why isn't this thing that's supposed to work not working"? Once I realized this is part of the process, it made it easier for me to look at this as a learning experience.

Again, the important part was to structure the content correctly so the system I was building knew what was what.

The good news is once you learn the basic principles of static site generators, it's easier to figure out the nuances of each SSG. Again, abstraction is key; your content is in once place, and your site and templates display the content.