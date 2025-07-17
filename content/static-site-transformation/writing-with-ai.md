---
title: 'Asking AI to write documentation'
description: "Everyone in tech is asking the same question: *Is AI going to take my job*? The answer for coders is *not yet*. For those on the more creative end, including technical writers, it's a bit more grey."
FontAwesomeIcon: solid fa-keyboard
featured: false
featuredOrder: 4
---
I've always [dabbled in code](/skills/code-development/), but I always had difficulty expressing the logic in my head in code. So I asked AI to do a tech writer's job and document the code for my site.

My first forays into large language models were with Google Gemini (n&#233;e Bard). I asked how to write code for automation tasks in Windows Powershell and Python. Fast-forward a year or two, and GitHub Copilot is baked into VS Code.

## AI documentation output

I asked GitHub Copilot (and other AI LLMs) to do my job by documenting my codebase, write summaries, and even read through my own content. My prompt was `think like a technical writer and create a markdown file that documents this site`.

This is a good example of what AI can do for you, but also where humans are invaluable. A large language model (LLM) can write a code sample, but can't tell if it displays correctly.

> Because the output includes a mix of Markdown, template code, and HTML, it's nearly impossible to display correctly in a codeblock. I [created a separate branch](https://github.com/emdashdrupal/11ty-working/blob/ai-outputs/content/static-site-transformation) and excluded these from collections using the `eleventyExcludeFromCollections: true` parameter in my front matter, which means it won't appear as a page on the site.
>
> - [Original output](https://github.com/emdashdrupal/11ty-working/blob/ai-outputs/content/static-site-transformation/ai-doc-output-orig.md) for the first draft of the site.
> - [Version 2](https://github.com/emdashdrupal/11ty-working/blob/ai-outputs/content/static-site-transformation/ai-doc-output-v2.md)
> - [Most recent version](https://github.com/emdashdrupal/11ty-working/blob/ai-outputs/content/static-site-transformation/ai-output-17-june-2025.md)
>

If you look at the output, it's pretty impressive that AI can get to this level of granularity. But the results are only high-level overviews, and parts are not entirely correct&thinsp;&mdash;&thinsp;partially as a result of my lack of coding experience. For example, in the original the Featured content section is technically correct. However, at the time I asked the question it wasn't working.

There's still a need for a person to review and verify generated output, particularly for liability purposes. Attorneys won't be happy if their organization is sued for incorrect documentation that's written by AI.

## The llms.txt file

I read about the [`llms.txt` file](https://llmstxt.org/), which gave me *exactly* the distraction I needed from writing content that I'd been putting off.

I ran three different online `llms.txt` generators against both my current production and my development site. These generators request your website's URL, crawl it, and create an `llms.txt` Markdown file for you.

What I took away is how my site is interpreted by people, bots, and generative AI. It's interesting to see how the generators return *similar* but not *identical* results from what's essentially the same content:

- A podcast episode discussing project management and technical communication in the hardware industry with Viqui Dill.
- Discussing project management and technical communication with Viqui Dill in a podcast format.
- Discussing the intersection of project management and technical communication through Viqui Dill's insights and experiences.

## Conclusions

There's plenty to learn from this output, especially because it's only going to get better. I think there's opportunity for technical communicators to improve and verify AI-generated documentation. There's also huge potential for tech writers to use AI to describe their codebase, generate code samples, and translate content into useful info.

I'm not ~~proud~~ shocked by how much I relied on a chatbot to program this website, but it helped me deliver (toward the end of this project I learned this is called 'vibe-coding'). I'm not a developer, and my goal wasn't to become one, so using AI allowed me to (eventually) focus on the content I wanted to focus on. It did make me appreciate specialized development roles, because no one can do it all, even with AI.