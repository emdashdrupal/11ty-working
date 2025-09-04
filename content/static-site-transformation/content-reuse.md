---
title : Creating reusable content for static site generators (SSGs)
description : I modularized my presentations and tools experience so they could display in different contexts across the site.
FontAwesomeIcon: solid fa-recycle
date: 2025-09-04
featured: false
featuredOrder: 6

---

One of the things I miss in a docs-as-code environment is  is [*content reuse*](https://www.oxygenxml.com/doc/versions/27.1/ug-editor/topics/eppo-pathfinder-reuse.html), or *snippets*. This means instead of copying and pasting sections into different files, then having to remember to update every file whenever the content changes, you create another [DITA, an XML-based authoring language](https://en.wikipedia.org/wiki/Darwin_Information_Typing_Architecture) file with that small piece of content, then reference that file in multiple files. It's basically an include or import file for documentation.

I initially listed my relevant tools and presentations as separate bulleted lists. The goal was to display the relevant tools and presentations on each of my skills pages. As I built out the pages and taxonomy, keeping in mind the need for the site to act as a resume, it was quickly obvious that this wasn't a sustainable approach.

After some research, I created (with the help of GitHub Copilot) two `json` files. This approach enforces structure and is easily expandable.

The first file contained data I wanted to display about all of my presentations, webinars, and guest appearances. This `json` file contained titles, year (or years) of the item, a relevant link, the category or categories for each, the location or event venue, and type (webinar, in-person, panel discussion, podcast guest or host, etc.). Here's an example:

```json
{
    "title": "So, you want to be a technical writer?",
    "year": "2024",
    "link": "https://www.brighttalk.com/webcast/9273/608187",
    "category": ["technical-writing", "metrics", "content-strategy", "marketing"],
    "venue": "Content Wrangler webcast",
    "type": "webinar"
},
```

The second `json` file listed the tools I've used over my career, along with their publisher, product name, and relevant site categories:

```json
{
"category": [
    "technical-writing",
    "help-authoring-tool"
    ],
"publisher": "MadCap",
"title": "Flare"
},
```

In my templates, I could now programmatically populate my skills pages with the relevant presentations and tools:

![yeh](/assets/images/programmatic-columns.png)

This required two separate templates, which were called in my details page template file. This is also how content reuse works. Here's the presentation partial template:

```markup
{% raw %}{% if presentations %}
<h2>Related work</h2>
{% set presentationsList = isPublicSpeakingPage and presentations or filteredPresentations %}
{% for presentation in presentationsList | sort(false, false, 'year') | reverse %}
    <div class="presentation mb-4">
        <h3 class="font-normal text-[1rem]">
            {% if presentation.link %}
                {{ presentation.type | capitalize }}:
                <a href="{{ presentation.link }}" class="hover:text-success-600 italic">
                    {{ presentation.title }}
                </a>
            {% else %}
                {{ presentation.title }}
            {% endif %}
        </h3>
        <p class="text-sm mt-0 jet-600">
            {{ presentation.venue }}, {{ presentation.year }}
        </p>
    </div>
{% endfor %}
{% endif %}
{% endraw %}
```
