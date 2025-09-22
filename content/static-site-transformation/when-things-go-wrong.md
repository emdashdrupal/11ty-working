---
title: When your content strategy goes wrong
description: Writing this blog post wasn't part of my plan.
date: 2025-09-09
fontAwesomeIcon: solid fa-car-burst
---

A major part of my content strategy for my new site was releasing blog posts on a regular cadence to drive traffic. As I built my site, I documented the process through partially written Markdown files. I stored these blog post stubs in a DON'T DELETE branch in my Git repository. Not quite best practice, but also not unusual to those who have had to clean up obsolete branches.

When it came time to pull one out of that branch, I decided the content reuse piece was in pretty good shape. I published the post, and felt good about where I'd taken it.  It followed an [AI-related post](/static-site-transformation/writing-with-ai) that was widely viewed (surprise!). Not surprisingly, the AI post was a bigger draw than content reuse.

&hellip;Then I noticed I'd already used a large portion of it on my [site structure post](/static-site-transformation/the-how). Ironically, my blog post about reusing content duplicated my own content.

## Test case

Once I discovered the mistake a few days later, I left both up for a couple of weeks to see what happened (also to figure out what to do next). Either no one noticed or no one notified me. Based on my Google Analytics, it seems to be the former.

## Lessons learned

In a production environment with a team of writers, my error would probably be noted in a pull request (PR) review by someone who's familiar with the existing content. But this relies on humans, which is why it's important to have governance and automated quality checks in place.

In my case, I had a chance to fix things that no one noticed. I restructured posts to make for tighter, more focused topics. The reality is that this is a luxury you *don't* have when you publish professional content at scale.

Posting regular blog posts is doing what I expected: driving eyeballs. But based on metrics, it's a one-and-done. I'm a believer in Mark Baker's book *Every Page is Page One*, and in this case, it actually seems to be true: each blog post is a piece of content unto itself, regardless of duplication.

