---
title: Asking AI to write documentation
description: I decided to ask AI to do my job for code it's written.
FontAwesomeIcon: solid fa-keyboard
---

Everyone in tech is asking the same question: Is AI going to take my job? The answer for coders is "not yet". For those on the more creative end, including technical writers, it's a bit more grey. Over the course of this project, I asked GitHub Copilot to do my job and document my codebase.

I've always dabbled in code. My problem has always been that I (think!) I understand the logic, but I don't know how to express that in code. My first forays into using large language models like Google Gemini (nee Bard) was to ask questions about how to write code for various automation tasks in Windows Powershell and Python. Fast-forward a year or two, and GitHub Copilot is baked into VS Code.

My prompt was to `think like a technical writer and create a markdown file that documents this process`.

## Output

Because the output includes a mix of Markdown, template code, and HTML, it's nearly impossible to embed on this page and have it display corrected. I've instead [created a separate page](/static-site-transformation/ai-doc-output/) and excluded it from collections using the `eleventyExcludeFromCollections: true` parameter in my front matter; this means it won't display on any of the grid-based pages.

This is a good example of what AI can do for you, but also where humans are invaluable. A large language model (LLM) can't tell if a code example displays correctly.

It's pretty impressive that AI can get to this level of granularity. But I think the result is only a high level overview, and parts are not entirely correct &mdash; partially as a result of my lack of coding experience. For example, the Featured content section is technically correct. However, at the time I asked the question it wasn't working.

There's still a need for a person to review and verify.

## llms.txt

Then I learned about the `llms.txt` file, which gave me *exactly* the distraction I needed to actually write content.

What I took away from these generators is how my site is seen by people (and let's face it, bots).

I ran three different generators <https://sitespeak.ai>, against both the current production and my test site. it's interesting to see how it returns *similar* but not *identical* results from what's essentially the same content:

- [Podcast with Viqui Dill](https://edmar.sh/podcasts/2019-06-26-were-gonna-do-this-together-with-viqui-dill-content-content-podcast/): A podcast episode discussing project management and technical communication in the hardware industry with Viqui Dill.
- [Podcast with Viqui Dill](https://edmarsh.com/2019/06/25/were-gonna-do-this-together-with-viqui-dill-content-content-podcast/): Discussing project management and technical communication with Viqui Dill in a podcast format.
- [Podcast with Viqui Dill](https://edmarsh.com/tag/music/): Discussing the intersection of project management and technical communication through Viqui Dill's insights and experiences.


## Conclusions

There's plenty to learn from this output, especially because it's only going to get better. I think there's opportunity for technical communicators to take a shell like this generated documentation and improve it. There's huge potential for tech writers to use AI to describe the code, and translate it into useful info (and fix passive voice!).

I'm not proud of how much I relied on a chatbot to program this website. But I'm also not a developer, and my goal wasn't to become one, but to facilitate the content I wanted to focus on.