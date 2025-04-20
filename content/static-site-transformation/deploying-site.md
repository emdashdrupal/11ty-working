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

## Cloudflare deploy

As I moved forward with this and other projects, I set up a Cloudflare account. This was mostly unrelated to the site build, but it gave me the opportunity to test deployment on Cloudflare.

In a nutshell, this was the frustrating experience I expected. The builds were confusing and didn't work out of the box. According to the log, the eleventy build ran correctly but deployment to Cloudflare was the issue:

```
 ⛅️ wrangler 4.12.0
-------------------
✘ [ERROR] Missing entry-point to Worker script or to assets directory
 If there is code to deploy, you can either:
  - Specify an entry-point to your Worker script via the command line (ex: `npx wrangler deploy src/index.ts`)
- Or create a "wrangler.jsonc" file containing:

{
  "name": "worker-name",
  "compatibility_date": "2025-04-20",
	    "main": "src/index.ts"
	  }

```

This seems like an easy fix, but adds complexity I don't need since I already had Netlify set up. It was nice to confirm I made the correct choice for my use case.