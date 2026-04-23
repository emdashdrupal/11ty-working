---
title: Creating website templates using AI
description : "I used Google Gemini, GitHub Copilot, and local LLMs to create Nunjucks templates and JSON files for my static site."
FontAwesomeIcon: 'solid fa-brain'
featured: true
featuredOrder: 1
date: 2026-04-18
---

I didn't know a thing about the [Nunjucks templating language](https://mozilla.github.io/nunjucks/). What I like about templating languages is that you're basically creating HTML pages, with logic and variables thrown in. It also enforces structure and allows dynamic content. Nunjucks is based on [Jinja](https://jinja.palletsprojects.com/en/stable/).

I turned to AI to help me write code for the templates on my site.

The nice thing about AI is that if you want good answers, that you have to think through your logic. It's helpful to write it down regardless of the language you do (or don't) know. This made me think more and more about prompt engineering (is that still a thing?) and how technical writers can educate regular folks how best to use AI.

## Comparing AI output

I pitted Google's Gemini against GitHub Copilot. First, I asked Gemini the following prompt:

```txt
i'm creating a web site using Eleventy, nunjucks, tailwind css, html, and markdown. I'd like your help with a template for the homepage.
```

And here is the response:

```markup
{% raw %}<!DOCTYPE html>
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
                {% markdown %}
                Welcome to my website. Here you will find information about me and my projects.
                {% endmarkdown %}
            </p>
        </section>

        <section class="mb-8">
            <h2 class="text-2xl font-semibold">Latest Content</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {% assign allItems = collections.all | sort_by: 'date', 'desc' %}
                {% for item in allItems | slice(0, 6) %}
                <div class="bg-white p-4 shadow-md">
                    <h3 class="text-xl font-semibold">{{ item.data.title }}</h3>
                    <p>{{ item.data.description }}</p>
                </div>
                {% endfor %}
            </div>
        </section>
    </main>

    <footer class="bg-gray-800 text-white p-4 mt-8">
        <p>&copy; 2025 My Eleventy Site</p>
    </footer>
</body>
</html>{% endraw %}
```

Copilot said the Gemini version was well-structured and accurate.

### AI in 2026

I'm writing most of this post a year after I drafted it. Now I'm running [LM Studio](lmstudio.ai) locally, with a few of the [Qwen3 large language models (LLM)](https://huggingface.co/collections/Qwen/qwen3). I fed the same prompt into the `qwen3-coder-30b-a3b-instruct` model, and it output the following:

```markup
{% raw %} <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <meta name="description" content="{{ description }}">
    <link href="/styles.css" rel="stylesheet">
</head>
<body class="bg-gray-50 text-gray-900">
    <header class="bg-white shadow">
        <div class="container mx-auto px-4 py-6 flex justify-between items-center">
            <h1 class="text-2xl font-bold">{{ title }}</h1>
            <nav>
                <ul class="flex space-x-4">
                    <li><a href="/" class="hover:text-blue-600">Home</a></li>
                    <li><a href="/about" class="hover:text-blue-600">About</a></li>
                    <li><a href="/posts" class="hover:text-blue-600">Posts</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8">
        <!-- Hero Section -->
        <section class="text-center mb-12">
            <h2 class="text-4xl font-bold mb-4">{{ title }}</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">{{ description }}</p>
        </section>

        <!-- Featured Content -->
        <section class="mb-12">
            <h3 class="text-2xl font-semibold mb-6">Latest Posts</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {% for post in collections.posts | reverse %}
                <article class="bg-white rounded-lg shadow-md overflow-hidden">
                    <a href="{{ post.url }}">
                        <h4 class="text-xl font-semibold p-4 hover:text-blue-600">{{ post.data.title }}</h4>
                    </a>
                    <div class="p-4 text-gray-600">
                        {{ post.templateContent | slice(0, 150) }}...
                    </div>
                </article>
                {% endfor %}
            </div>
        </section>

        <!-- About Section -->
        <section class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 class="text-2xl font-semibold mb-4">About This Site</h3>
            <p>This is a simple homepage built with Eleventy, Nunjucks, Tailwind CSS, HTML and Markdown.</p>
        </section>

        <!-- Newsletter Signup -->
        <section class="bg-blue-50 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-2">Stay Updated</h3>
            <p class="mb-4">Subscribe to get the latest posts delivered to your inbox.</p>
            <form class="flex flex-col sm:flex-row gap-2">
                <input type="email" placeholder="Your email address" class="flex-grow px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500">
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Subscribe</button>
            </form>
        </section>
    </main>

    <footer class="bg-gray-800 text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; {{ "now" | date("YYYY") }} {{ title }}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
{% endraw %}
```

It's pretty obvious how advanced even locally running LLMs with a relatively small number of parameters have become in the past year. The 2026 version is far more detailed.

### Data modeling

Then I used AI to create JSON files for my [lists of skills](/static-site-transformation/content-reuse/#auto-generated%2C-context-sensitive-links)

```txt
Think like a programmer. i want a json file with the following structure:
- Skill title
  - description
  - Tools used
  - Technologies used

  tools and technologies will need to be pulled into several templates, so explain how i can assign them to multiple skills
```

## Breakthroughs

LLMs can only do so much, and are often just plain wrong. Over the course of my back-and-forth with the LLMs, understanding the logic I wanted helped me to accurately frame the question to the LLM. It's your typical GIGO (garbage in, garbage out) cycle. A few things I struggled with along the way and ground my way through:

- Continual content/metadata revision
- Redoing templates over and over and over, and over.
- Trying to abstract templates in templates
- Sorting entries like podcast in reverse order. This is apparently done by appending `| reverse`.
- Slices &mdash; and slices not working!
- [Collections](https://www.11ty.dev/docs/collections/) (essentially tags) and how to use them to group topics.
- An automated shortcode for the current year, displayed in the footer:

    ```js
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    ```

    ```njk
    {% year %}
    ```
