---
title : "Creating a homepage template using AI"
description: "I try using Google Gemini and GitHub Copilot to create a Nunjucks template for my site's homepage."
---


## AI!

Copilot said the Gemini version was well-structured and accurately done.

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


## Breakthroughs!

- Reverse sorting ` | reverse`
- Slices &mdash; and slices not working!
- Collections
- Shortcode for current year display
    ```js
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    ```
    ```
    \{\% year %}
    ```

## Setbacks!

- Continual content/metadata revision
- Redoing templates over and over and over
- Trying to abstract templates in templates