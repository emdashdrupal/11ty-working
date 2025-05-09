---
title: Asking AI to write documentation
description: I asked AI to do a tech writer's job and document the code it's written.
FontAwesomeIcon: solid fa-keyboard
featured: true
featuredOrder: 3
---

Everyone in tech is asking the same question: *Is AI going to take my job*? The answer for coders is "not yet". For those on the more creative end, including technical writers, it's a bit more grey.

I've always dabbled in code. My problem has always been that I think I understand the logic, but I don't know how to express that in code. My first forays into using large language models like Google Gemini (n&#233;e Bard) was to ask questions about how to write code for various automation tasks in Windows Powershell and Python. Fast-forward a year or two, and GitHub Copilot is baked into VS Code.

I asked GitHub Copilot to do my job by documenting my codebase, write summaries, and even read through my own content. My prompt was `think like a technical writer and create a markdown file that documents this site`.

## AI documentation output

This is a good example of what AI can do for you, but also where humans are invaluable. A large language model (LLM) can write a code sample, but can't tell if it displays correctly.

> Because the output includes a mix of Markdown, template code, and HTML, it's nearly impossible to display correctly in a codeblock. I [created a separate page](/static-site-transformation/ai-doc-output) and excluded it from collections using the `eleventyExcludeFromCollections: true` parameter in my front matter, which means it won't appear as a page on the site.
>
> I also [saved the original output](/static-site-transformation/ai-doc-output-orig) for the first draft of the site.

If you look at the output, it's pretty impressive that AI can get to this level of granularity. But the result is only a high level overview, and parts are not entirely correct &mdash; partially as a result of my lack of coding experience. For example, the Featured content section is technically correct. However, at the time I asked the question it wasn't working.

There's still a need for a person to review and verify generated output, particularly for liability purposes. Attorneys won't be happy if their organization is sued for incorrect documentation that's written by AI.

## The llms.txt file for AI

I read about the [`llms.txt` file](https://llmstxt.org/), which gave me *exactly* the distraction I needed from writing content that I'd been putting off.

There are several online generators that will take your URL and create an `llms.txt` markdown file for you. What I took away from these generators is how my site is interpreted by people and let's face it, bots and generative AI.

I ran three different online `llms.txt` generators against both my current production and my development site. It's interesting to see how it returns *similar* but not *identical* results from what's essentially the same content:

- A podcast episode discussing project management and technical communication in the hardware industry with Viqui Dill.
- Discussing project management and technical communication with Viqui Dill in a podcast format.
- Discussing the intersection of project management and technical communication through Viqui Dill's insights and experiences.

https://edmarsh.sh/llms.txt

## Conclusions

There's plenty to learn from this output, especially because it's only going to get better. I think there's opportunity for technical communicators to improve and verify AI-generated documentation. There's also huge potential for tech writers to use AI to describe their codebase, generate code samples, and translate content into useful info.

I'm not proud of how much I relied on a chatbot to program this website. But I'm also not a developer, and my goal wasn't to become one, but to facilitate the content I wanted to focus on.