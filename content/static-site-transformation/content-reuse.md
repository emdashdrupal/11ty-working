---
title : Creating reusable content for static site generators (SSGs)
description : I modularized my presentations and tools experience to display them in the right place at the right time&mdash;a major tenet of content strategy.
FontAwesomeIcon: solid fa-recycle
date: 2025-09-04
featured: false
---

## What is reusable content?

In a structured authoring environment, such as those that use [Darwin Information Typing Architecture (DITA), an XML-based authoring language](https://en.wikipedia.org/wiki/Darwin_Information_Typing_Architecture), you can set up [*content reuse*](https://www.oxygenxml.com/doc/versions/27.1/ug-editor/topics/eppo-pathfinder-reuse.html), or *snippets*. Instead of copying and pasting sections into different files, you create a DITA file that contains that small piece of content. You reference that file where it's needed, like an include or import file.

Some unstructured syntaxes and SSGs have their own implementations of reuse. However, this becomes an education and enforcement scale issue if you have a wide variety of contributors such as developers, product managers, subject matter experts, and technical writers. This also exposes your business to vendor lock-in, because once you have the toolset implemented, it's hard to move away from it, especially when you come to rely on features other tools don't have.

## Metadata for content reuse

Copy-pasted content across pages is a maintenance nightmare. Someone has to remember to update it, and also *all the places* where the content was pasted. With this in mind, I wanted to use *metadata* as much as possible to encourage reuse and programmatic data access.

Most technical writers and content strategists are familiar with metadata (also referred to as *front matter* or *frontmatter*). Metadata can define page titles, keywords, and leverage built-in [categories and tags](https://www.11ty.dev/docs/collections/).

The real power comes by adding custom metadata; highly structured content that expands the possibilities of the template engine and site generator. I wanted to re-use the first sentence of each details page to display as descriptions on the cards on the grid pages. This allowed not only content reuse, but gave the freedom to style descriptions separately from headings. This enforces structure and allows writers and contributors to *just write*, since all of the logic is handled programmatically. Here's what a metadata block looks like on my pages:

```yml
---
title : 'The how: Building the site structure'
description : Putting all of the content pieces together.
tags : content-strategy
featured : true
featuredOrder : 3
FontAwesomeIcon : solid fa-file-waveform
---
```

Here's what each metadata entry does:

| Fieldname         | Purpose                                                                                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`           | Page title that displays on cards, grids, details pages, and browser tabs. Note that in this instance, I had to wrap the title in single quotes as there is a colon in it; this would break the page otherwise. |
| `description`     | The first paragraph of the story.                                                                                                                                                                               |
| `FontAwesomeIcon` | Specifies the [Font Awesome icon](https://fontawesome.com/icons?t=categories) to display on the homepage, grid pages, and breadcrumbs.                                                                          |
| `featured`        | Displays the page on a card on the homepage.                                                                                                                                                                    |
| `featuredOrder`   | Sets the order in which the card displays on the homepage.                                                                                                                                                      |

Here's an example of how this content works programmatically. This code generates cards that references the metadata fields:

```markup
{% raw %}
<div class="bg-whitish p-4">
    <h3 aria-labelledby="{{ item.data.title |slugify }}">
        {% if item.data.fontawesomeicon %}
            <span class="fa-{{ item.data.fontawesomeicon }} text-2xl text-medium-blue"></span>
        {% endif %}
        {% if item.data.cover %}
            <img src="/assets/images/{{ item.data.cover }}" alt="{{ item.data.coveralt or item.data.title }}" data-pagefind-meta="image[{{item.data.cover}}], image_alt[{{ item.data.coveralt or item.data.title }}]" class="w-full h-48 object-cover mb-2">
        {% endif %}
        <a href="{{ item.url }}">{{ item.data.title | safe }}</a>
    </h3>
    <p>{{ item.data.description }}</p>
</div>
{% endraw %}
```

Here's what two cards look like side-by-side:
![Example result of card code](/assets/images/grid-cards-example.png)

## Auto-generated, context-sensitive links

A goal for my [skills pages](/skills) was to display the relevant tools and presentations for each skill. Initially these were bulleted lists. As I built out the pages and taxonomy, it became obvious that copying and pasting relevant bullets on each skills page wasn't a sustainable approach.

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
