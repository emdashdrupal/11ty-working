---
title: Deploying my site
description: I scheduled a full day to try deploying my new site on a new host on a completely new service for me. It took six minutes.
date: 2025-03-19
FontAwesomeIcon: solid fa-gears
---

You can also just use GitHub pages, which uses Jekyll as its SSG. I didn't want to use Jekyll or a canned set of themes.


Netlify and Cloudflare seem to be the two most popular hosts for SSGs. Both seem very robust.

Deploying my test site was this simple:

1. Create a Netlify account by connecting it to my GitHub repo.
2. Point Netlify to the branch I wanted to publish from (`main`).
3. Select **Eleventy** as my SSG.
4. Press **Publish**.

In a process that was fraught, it was a relief to know I could go live so quickly and easily. I even pointed one of the domains I own to Netlify so I could test on various devices.