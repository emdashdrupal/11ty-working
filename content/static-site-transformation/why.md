---
title : 'The why: Behind my SSG conversion project'
description: I put myself in *every* role of building out a website to better understand how content is programmatically consumed and displayed.
FontAwesomeIcon: solid fa-person-circle-question
featured: true
featuredOrder: 0
---

I knew from an early age I'd be involved in writing in some way. I interviewed friends on cassette in elementary school. I had my own 'zine. But since the days of the Commodore VIC-20, I've always been [curious about and dabbled in software development](/skills/code-development/). I started building websites in 1996, which led me to a Drupal site, and also a WordPress personal site I built in 2008:

![My WordPress homepage as of 1 May 2025](/assets/images/edmarsh-dot-com-homepage-1-may-2025.png)

That site and its scope expanded when I started my podcast in 2015:

![Legacy podcast landing page](/assets/images/edmarsh-dot-com-podcast-page-1-may-2025.png)

Actually *starting* this project was strategic. I don't have any recent writing samples to share with potential employers or clients due to intellectual property (IP) laws, which I take seriously. The public-facing samples I *did* write were woefully out-of-date, as was my WordPress site. I didn't realize *just* how out-of-date the site was until I got deep into this project.

When I decided to update my site ten years later, getting seriously hands-on appealed to me. This was a rare greenfield opportunity to:

- Audit a lifetime's worth of content dating back to LiveJournal blogs.
- Get rid of cruft.
- Reduce costs.
- Understand how content is programmatically consumed and displayed to users.
- Learn some new skills without a lot of deadline pressure.
- Explain to others what starting a site from scratch entails.

## Technical goals

- Update a 10-year-old design.
- Retire a complex WordPress site that didn't get much traffic and needed maintenance.
- "Quickly" revamp my website to increase my chances at getting hired.
- Add value by developing with SSGs, which isn't a skill a lot of technical writers have.
- Learn newer technologies (that ended up leveraging old ones I'm very familiar with&thinsp;&mdash;&thinsp;HTML and CSS).

## Content goals

- A steady stream of content to drive traffic and show as writing samples.
- Give back by documenting the static site implementation process.
- Review all the content on my site and see if and how it's promoting me in the best light.
- Decide whether to archive old content, like those *very* early blog posts.
- Understand how to structure content not only for SSGs, but other programmatic use.
- Enjoy writing again.
- Do something for *me*.

## Cost savings goals

My [web host (mddhosting)](https://www.mddhosting.com) is great and worth the cost while I was actively updating the site. I no longer needed the complexity and related costs of it, so my goals were to reduce my financial and labor costs:

- Minimize the overhead of maintaining a content management system. I no longer needed the complexity of a self-managed WordPress site. I hadn't blogged in some time, and my [podcast](/podcasts/) has been on hiatus since 2022 (stay tuned&hellip;). Maintenance included:
  - Keeping up with plugin updates.
  - WordPress updates.
  - Processing the hundreds of spam comments that came through every day.
- Reduce hosting costs. SSGs don't require heavy infrastructure such as a database, so they can be hosted in places that WordPress sites can't. This gave me flexibility to move to a zero- or low-cost host. That *doesn't* mean there are zero costs to hosting the site:
  - My existing site host was also my mail server, so I had to find and set up my own mail hosting. To add to the frustration, my first choice was too difficult to set up.
  - Upgrading my podcast hosting. My podcast archive puts me at the limit of free disk space and bandwidth on GitHub, so I had to offload that to a paid service. The upside to this is I get [metrics](/skills/metrics/) I wouldn't if they were self-hosted.
  - Downsizing from a web host I'd undergrown meant I could re-allocate those resources.

While this solution is cheaper in long-term costs, there was considerable investment in upskilling, setting up infrastructure, creating templates, and making mistakes. I took on mail server costs and administration (which so far has been minimal).
