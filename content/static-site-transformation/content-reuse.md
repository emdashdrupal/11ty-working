---
title : Creating reusable content for static site generators (SSGs)
description : I modularized my presentations and tools experience to display them in the right place at the right time&mdash;a major tenet of content strategy.
FontAwesomeIcon: solid fa-recycle
date: 2025-09-04
featured: false
---

A goal for my [skills pages](/skills) was to display the relevant tools and presentations for each skill. Initially these were bulleted lists. As I built out the pages and taxonomy, it became obvious that copying and pasting relevant bullets on each skills page wasn't a sustainable approach. No one likes having to remember to update *every* file whenever a copy-pasted piece of content changes.
## What is reusable content?

In a structured authoring environment, such as those that use [Darwin Information Typing Architecture (DITA), an XML-based authoring language](https://en.wikipedia.org/wiki/Darwin_Information_Typing_Architecture), you can set up [*content reuse*](https://www.oxygenxml.com/doc/versions/27.1/ug-editor/topics/eppo-pathfinder-reuse.html), or *snippets*. Instead of copying and pasting sections into different files, you create a DITA file that contains that small piece of content. You reference that file where it's needed, like an include or import file.

Unstructured syntaxes like Markdown, AsciiDoc, and ReStructuredText, as well as SSGs, have their own implementations of reuse. However, this becomes an education and enforcement scale issue if you have a wide variety of contributors such as developers, product managers, subject matter experts, and technical writers.

## Implementing reusable content in Eleventy SSG

With assistance from GitHub Copilot, I created two `json` files that create and enforce structure while remaining flexible. The first file contained information about my presentations, webinars, and guest appearances. This `json` file contained titles, year (or years) of the item, a relevant link, the category or categories for each, the location or event venue, and type (webinar, in-person, panel discussion, podcast guest or host, etc.). Here's an example:

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

## Results

By creating modular templates that render these JSON data structures, I achieved a single source of truth that adapts to different display contexts. Here's how the template renders presentation data:

```markup
{% raw %}{% if presentations %}
<h2>Related work</h2>
{% set presentationsList = isPublicSpeakingPage and presentations or filteredPresentations %}
{% for presentation in presentationsList | sort(false, false, 'year') | reverse %}
    <div class="presentation mb-4">
        <h3 class="font-normal text-[1rem]">
            {# Check if presentation has a link #}
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

I can now programmatically populate my skills pages with the relevant presentations and tools:

![Screen shot of relevant tools and presentations displayed on a web page](/assets/images/programmatic-columns.png)
