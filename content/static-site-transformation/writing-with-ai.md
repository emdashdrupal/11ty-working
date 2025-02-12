---
title: Asking AI to write documentation
description: I decided to ask AI to do my job for code it's written.
featuredOrder: 3
featured: true
FontAwesomeIcon: solid fa-keyboard
---

Everyone in tech is asking the same question: Is AI going to take my job? The answer for coders is "not yet". For those on the more creative end, including technical writers, it's a bit more grey. So over the course of this project, I asked GitHub Copilot to do my job and document my codebase.

I've always dabbled in code. My problem has always been that I (think!) I understand the logic, but I don't know how to express that in code. My first forays into using large language models like Google Gemini (nee Bard) was to ask questions about how to write code for various automation tasks in Windows Powershell and Python. Fast-forward a year or two, and GitLab Copilot is baked into VS Code.

My prompt was to `think like a technical writer and create a markdown file that documents this process`.

## Output

Because the output includes a mix of Markdown, template code, and HTML code, it's nearly impossible to embed. I've instead [created a separate page](/static-site-transformation/ai-doc-output/) and excluded it from collections using the `eleventyExcludeFromCollections: true` parameter in my front matter.

Overall, it's pretty impressive that it can get to this level of granularity. But I think the result is only a high level overview, and parts are not entirely correct &mdash; partially as a result of my lack of coding experience. For example, the Featured content section is technically correct. However, at the time I asked the question it wasn't working.

There's still a need for a person to review and verify.

## Conclusions

There's plenty to learn from this output, especially because it's only going to get better. I think there's opportunity for technical communicators to take a shell like this and improve it. There's huge potential for tech writers to use AI to describe the code, and translate it into useful info (and fix passive voice!).