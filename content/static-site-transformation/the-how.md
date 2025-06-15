---
title : 'The how: Building the site structure'
description : Putting all of the content pieces together.
tags : content-strategy
featured : true
featuredOrder : 3
FontAwesomeIcon : solid fa-file-waveform
---

My initial site architecture was based on the existing architecture in WordPress:

- Home: promotes posts across all of the content types&thinsp;&mdash;&thinsp;podcast, writing samples, skills, and this SSG series.
- About
- Skills: List of the ways I can help a potential client/employer
- Tech writing examples: gallery page
- Speaking engagements/presentations: gallery page
- Blog (etc): gallery page
- Podcast pages: gallery page
- A sidebar that displays a tag cloud
- Photo galleries (?)
- Contact
- Resume(?)

Very few parts of this structure ended up in the new site. If you've ever revamped lots of legacy content, this probably isn't surprising.

## Content types

In support of this architecture, I designed three main content types (page types):

- **Homepage**: Intro and a headshot, and galleries of the four most important, or recent, items that have been updated in three categories: podcasts, skills, and this series of blog posts.
- **Grid pages**: Overview pages that list each of my skills, blog posts, and podcast episodes.
- **Details pages**: For each of the categories:
  - Blog posts.
  - Podcast episodes,including show notes and an episode player.
  - More information about each of my skills, the relevant tools used, and any relation presentations or publications I've created.

## Content reuse

Using metadata and collections enables reuse. Copy-pasted content across pages is a maintenance nightmare. Someone has to remember to update it, and also *all the places* where the content is pasted.

## Metadata

Most technical writers and content strategists are familiar with metadata (also referred to as *front matter* or *frontmatter*). You can use it to define page titles, keywords, tags, and categories right out of the box. The real power comes by adding custom metadata; highly structured content expands the possibilities of the template engine and site generator.

When I built out this site, I wanted to re-use the first sentence of each details page to display as descriptions on the cards on the grid pages. This also allowed me to style the descriptions separately.

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

| Fieldname | Purpose|
|-|-|
| `title`| Page title that displays on cards, grids, and details pages, and browser tabs.|
| `description` | The first paragraph of the story used many places. |
|`FontAwesomeIcon`| Programmatically displays an icon on the homepage, grid pages, and breadcrumbs.|
|`featured`| sets the card to display on the homepage. |
`featuredOrder` | Sets the order in which the card displays. |

Here's an example of how this content works programmatically. Note the backslashes are necessary to get the code to display.

```django
    <div class="bg-whitish p-4">
        <h3 aria-labelledby="\{\{ item.data.title |slugify }}">
            \{\% if item.data.FontAwesomeIcon %}
                <span class="fa-{{ item.data.FontAwesomeIcon }} text-2xl text-medium-blue"></span>
            \{\% endif %}
            \{\% if item.data.cover %}
                <img src="/assets/images/{{ item.data.cover }}" alt="\{\{ item.data.coverAlt or item.data.title }}" data-pagefind-meta="image[\{\{item.data.cover}}], image_alt[\{\{ item.data.coverAlt or item.data.title }}]" class="w-full h-48 object-cover mb-2">
            \{\% endif %}
            <a href="\{\{ item.url }}">\{\{ item.data.title | safe }}</a>
        </h3>
        <p>\{\{ item.data.description }}</p>
    </div>
```
This code generates cards that references the metadata fields. You can view the clean code at [lines 68-82 of `macros.njk`](https://github.com/emdashdrupal/11ty-working/blob/dd0fc170d1af6a2f5b55fbf3676066d4f9833952/_includes/layouts/partials/macros.njk#L68C1-L81C15).

Here's what two cards side-by-side look like:
![Example result of card code](/assets/images/grid-cards-example.png)

## Separating content from presentation

While these don't really apply to my use case, trying to abstract as much as possible taught me:

- Using metadata reduces input errors.
- You can restrict what's entered via pipelines and/or linters.
- It makes it easier for people to contribute.
- Sites can have a consistent voice and experience.
- Portable, multi-channel.

## Exploration

There was a *lot* of experimenting and seeing what was what. Once I grasped *how* to use the metadata programmatically, it opened my eyes to how much structured front matter makes a difference in how content is used, sorted, filtered, and displayed.

While I was building out the site there were grid template pages for each of those content types. Eventually I made the grid collection-agnostic.

Then I added two `json` files to pull data from:

- Webinars, podcasts, and other publications I've done.
- Tools used for each of the skills.

This let me leverage the built-in `category` metadata to populate each skills page with the relevant work and tools I used. It was fun, refreshing, and again, holy cow structured content.

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
  {
    "category": ["technical-writing", "knowledge-management"],
    "publisher": "Adobe",
    "title": "Captivate"
  },
  {
    "category": ["technical-writing", "help-authoring-tool"],
    "publisher": "Adobe",
    "title": "RoboHelp"
  },
  {
    "category": ["technical-writing", "help-authoring-tool"],
    "publisher": "Adobe",
    "title": "Acrobat Pro"
  },

  {
    "category": ["content-strategy", "metrics"],
    "publisher": "Screaming Frog",
    "title": "Screaming Frog SEO Spider"
  },
  {
    "category": ["content-strategy", "metrics", "information-architecture"],
    "publisher": "Microsoft",
    "title": "Excel"
  },
  {
    "category": [
      "technical-writing",
      "help-authoring-tool",
      "coding-experience"
    ],
    "publisher": "Open-source",
    "title": "HTML"
  },
  {
    "category": ["technical-writing", "help-authoring-tool"],
    "publisher": "OpenAPI",
    "title": "OpenAPI (Swagger)"
  },
  {
    "category": ["podcasting", "audio-editing", "audio-production"],
    "publisher": "Adobe",
    "title": "Audition"
  },
  {
    "category": ["podcasting", "audio-editing", "audio-production"],
    "publisher": "Open-source",
    "title": "Audacity"
  },
  {
    "category": ["technical-writing", "page-layout"],
    "publisher": "Adobe",
    "title": "InDesign"
  },
  {
    "category": [
      "docs-as-code",
      "product-management",
      "agile",
      "technical-writing"
    ],
    "publisher": "Atlassian",
    "title": "Jira"
  },
  {
    "category": ["technical-writing", "knowledge-management"],
    "publisher": "Atlassian",
    "title": "Confluence"
  },
  {
    "category": ["metrics", "content-strategy"],
    "publisher": "Elasticsearch",
    "title": "Kibana"
  },
  {
    "category": ["technical-writing", "help-authoring-tool"],
    "publisher": "MadCap",
    "title": "Flare"
  },
  {
    "category": [
      "technical-writing",
      "structured-authoring",
      "help-authoring-tool",
      "coding-experience"
    ],
    "publisher": "oXygen",
    "title": "oXygen XML Editor"
  },
  {
    "category": ["technical-writing", "docs-as-code", "coding-experience"],
    "publisher": "Microsoft",
    "title": "VS Code"
  },
  {
    "category": ["content-management", "coding-experience"],
    "publisher": "Automattic",
    "title": "WordPress"
  },
  {
    "category": ["content-management", "coding-experience"],
    "publisher": "Drupal",
    "title": "Drupal CMS"
  },
  {
    "category": ["metrics", "coding-experience"],
    "publisher": "Microsoft",
    "title": "SQL Server"
  },
  {
    "category": ["metrics", "coding-experience"],
    "publisher": "IBM",
    "title": "Db2 database"
  },
  {
    "category": ["docs-as-code", "coding-experience", "technical-writing"],
    "publisher": "GitHub/Microsoft",
    "title": "GitHub/GitLab"
  },
  {
    "category": ["technical-writing"],
    "publisher": "SnagIt",
    "title": "SnagIt screen capture"
  },
  {
    "category": ["coding-experience"],
    "publisher": "Open-source",
    "title": "PlantUML diagramming language"
  },
  {
    "category": ["technical-writing", "coding-experience"],
    "publisher": "Open-source",
    "title": "Extensible Stylesheet Language Transformation (XSLT)"
  },
  {
    "category": ["technical-writing", "coding-experience"],
    "publisher": "Open-source",
    "title": "Cascading Stylesheets (CSS)"
  },
  {
    "category": ["technical-writing"],
    "publisher": "John Gruber/open-source",
    "title": "Markdown"
  },
    {
    "category": ["technical-writing", "coding-experience"],
    "publisher": "Open-source",
    "title": "XML"
  }
]
```

Being on this side of the equation makes it clear how much structuring your content helps your developers. It also helped me narrow my focus on skills, as well as tell a story across all of my content.

My progression included:

- Get the SSG running.
- Understand how to create and use templates.
- Decide how I want to display each content type.
- Choose a CSS styling framework.
- Build out logic to display individual pieces on the templates.
- Create grid pages to display categories with multiple entries (blog, podcast, skills).
