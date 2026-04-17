---
title: Creating a homepage template using AI
description : "I use Google Gemini and GitHub Copilot to create Nunjucks templates for my static site."
FontAwesomeIcon: 'solid fa-brain'
---


The nice thing about AI is that if you want good answers, that you have to think through your logic. It's helpful to write it down regardless of the language you do (or don't) know. This made me think more and more about prompt engineering (is that still a thing?) and how technical writers can educate regular folks how best to use AI.

## AI

I pitted Google's Gemini against GitHub Copilot.

Prompt:

```txt
i'm creating a web site using Eleventy, nunjucks, tailwind css, html, and markdown. I'd like your help with a template for the homepage.
```

And here is the response:

```markup
yeh?
```

Copilot said the Gemini version was well-structured and accurately done.

### Data modeling

```txt
Think like a programmer. i want a json file with the following structure:
- Skill title
  - description
  - Tools used
  - Technologies used

  tools and technologies will need to be pulled into several templates, so explain how i can assign them to multiple skills
```


## Breakthroughs

- Reverse sorting `| reverse`
- Slices &mdash; and slices not working!
- Collections
- Shortcode for current year display

    ```js
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    ```

    ```njk
    {% year %}
    ```

  - Understanding the logic I wanted helped me to accurately frame the question to the LLM.

## Setbacks

- Continual content/metadata revision
- Redoing templates over and over and over
- Trying to abstract templates in templates