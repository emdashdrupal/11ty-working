---
title : "Creating a homepage template using AI"
description : "I use Google Gemini and GitHub Copilot to create Nunjucks templates for my static site."
FontAwesomeIcon: 'solid fa-brain'
---

The nice thing about AI is that if you want good answers, that you have to think through your logic. it's helpful to write it down regardless of the language you do (or don't) know. This has made me think more and more about prompt engineering (is that still a thing?) and how technical writers can educate regular folks how best to use AI.

## AI

Copilot said the Gemini version was well-structured and accurately done.

Prompt:

```txt
i'm creating a web site using Eleventy, nunjucks, tailwind css, html, and markdown. I'd like your help with a template for the homepage.
```

And here is the response (note some charadters are escaped with backslashes so they display instead of execute):

```njk
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Eleventy Site</title>
    <link href="/styles/tailwind.css" rel="stylesheet">
</head>
<body class="bg-gray-100 text-gray-900 font-sans">
    <header class="bg-blue-600 text-white p-4 shadow-md">
        <h1 class="text-3xl font-bold">Welcome to My Site</h1>
    </header>

    <main class="container mx-auto mt-8 px-4">
        <section class="mb-8">
            <h2 class="text-2xl font-semibold">About</h2>
            <p class="mt-2">
                \{\% markdown \%\}
                Welcome to my website. Here you will find information about me and my projects.
                \{\% endmarkdown \%\}
            </p>
        </section>

        <section class="mb-8">
            <h2 class="text-2xl font-semibold">Latest Content</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                \{\% assign allItems = collections.all | sort_by: 'date', 'desc' %}
                \{\% for item in allItems | slice(0, 6) %}
                <div class="bg-white p-4 shadow-md">
                    <h3 class="text-xl font-semibold">{{ item.data.title }}</h3>
                    <p>{{ item.data.description }}</p>
                </div>
                \{\% endfor %}
            </div>
        </section>
    </main>

    <footer class="bg-gray-800 text-white p-4 mt-8">
        <p>&copy; 2025 My Eleventy Site</p>
    </footer>
</body>
</html>
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
