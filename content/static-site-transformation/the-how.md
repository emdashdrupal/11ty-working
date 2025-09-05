---
title : 'The how: Building the site structure'
description : 'I started my information architecture with the existing architecture of my WordPress site. Then I started to put all the content pieces together.'
tags : content-strategy
featured : true
featuredOrder : 3
FontAwesomeIcon : solid fa-file-waveform
date: 2025-01-10
---
When you start with a decade-old information architecture with lots of legacy content that evolved to include podcasts, it shouldn't be surprising that very few parts of that structure ended up in the new site.

I quickly decided it wasn't worth maintaining all of my old personal and professional blog posts. Most were outdated and not helpful to the technical writing portfolio I wanted the site to be.

## Content types

I designed three main content types (page types):

- Homepage, which included an intro, headshot, and galleries of the four most important, or recent, items that have been updated in three categories: podcasts, skills, and this series of blog posts.
- Grid pages that are gallery pages with cards for each skill, blog post, and podcast episode.
- Details pages for each of the categories:
  - Blog posts.
  - Podcast episodes,including show notes and an episode player.
  - More information about each of my skills, the relevant tools used, and any relation presentations or publications I've created.

## Content reuse

Copy-pasted content across pages is a maintenance nightmare. Someone has to remember to update it, and also *all the places* where the content is pasted. With this in mind, I wanted to use metadata as much as possible to encourage reuse and programmatic data access.

Most technical writers and content strategists are familiar with metadata (also referred to as *front matter* or *frontmatter*). Metadata can define page titles, keywords, and in my case, leverage the built-in [Eleventy categories and tags](https://www.11ty.dev/docs/collections/).

The real power comes by adding custom metadata; highly structured content expands the possibilities of the template engine and site generator. When I built out this site, I wanted to re-use the first sentence of each details page to display as descriptions on the cards on the grid pages. This allowed not only content reuse, but  styling the descriptions separately.

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

| Fieldname         | Purpose                                                                         |
| ----------------- | ------------------------------------------------------------------------------- |
| `title`           | Page title that displays on cards, grids, and details pages, and browser tabs.  |
| `description`     | The first paragraph of the story used many places.                              |
| `FontAwesomeIcon` | Programmatically displays an icon on the homepage, grid pages, and breadcrumbs. |
| `featured`        | sets the card to display on the homepage.                                       |
| `featuredOrder`   | Sets the order in which the card displays.                                      |

Here's an example of how this content works programmatically. This code generates cards that references the metadata fields. Note the backslashes are necessary to get the code to display. You can view the clean code at [lines 68-82 of `macros.njk`](https://github.com/emdashdrupal/11ty-working/blob/dd0fc170d1af6a2f5b55fbf3676066d4f9833952/_includes/layouts/partials/macros.njk#L68C1-L81C15).

```jinja-html
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

## Separating content from presentation

There was a *lot* of experimenting. Once I grasped *how* to use the metadata programmatically, it opened my eyes to how much structured front matter makes a difference in how content is used, sorted, filtered, and displayed.

While I was building out the site there were grid template pages for each of those content types. Eventually I made the grid collection-agnostic.

Then I added two `json` files to pull data from:

- Webinars, podcasts, and other publications I've done.
- Tools used for each of the skills.

This let me leverage the built-in `category` metadata to populate each skills page with the relevant work and tools I used. It was fun, refreshing, and again, holy cow structured content. Here's an example of the `json` file containing my tool skill set on pages with the same category. You can [see the full file in this repo](https://github.com/emdashdrupal/11ty-working/blob/main/_data/tools.json).

```json
[
  {
    "category": ["docs-as-code", "coding-experience", "technical-writing"],
    "publisher": "Nunjucks",
    "title": "Nunjucks templating engine"
  },
  {
    "category": ["technical-writing", "image-editing"],
    "publisher": "Adobe",
    "title": "Photoshop"
  },
  {
    "category": ["technical-writing", "page-layout", "structured-authoring"],
    "publisher": "Adobe",
    "title": "FrameMaker"
  },
]
```

Taking an active development role makes it clear how structuring your content helps your developers and your readers. It also helped me narrow my focus on skills, as well as tell a story across all of my content. Abstracting my content taught me:

- Using metadata reduces input errors.
- You can restrict what's entered via pipelines and/or linters.
- It makes it easier for people to contribute.
- Sites can have a consistent voice and experience.
- Ultimately your content is portable and easier to publish across multiple channels.

## Accessibility

I used the [WAVE browser plugin](https://wave.webaim.org/extension/) to test my pages and ensure they were accessible. My wife is a developer and accessibility advocate and as a technical communicator, I wanted my site to be accessible to everyone.

![Screenshot of WAVE accessibility plugin results](/assets/images/wave-plugin-screenshot.png)
