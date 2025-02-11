---
title: Asking AI to write documentation
description: I decided to ask AI to do my job for code it's written.
featuredOrder: 3
featured: true
FontAwesomeIcon: solid fa-keyboard
---

My prompt was to `think like a technical writer and create a markdown file that documents this process`.

## Explanation

This is how the AI explained the process:

```txt
This documentation:

- Explains the concept clearly
- Provides practical examples
- Includes all necessary code snippets
- Uses consistent formatting
- Follows a logical structure
- Includes related files and notes sections
```

## Output

This is the documentation the LLM wrote. I've had to escape several characters to get this to work without rendering as code, so it's not pretty.

<pre>
---
title: "Managing Featured Content on the Homepage"
description: "How to control which content appears in featured sections on the homepage"
date: "2024-03-19"
---

## Overview

The homepage displays featured content from different collections (Static Site Generator posts, Skills, and Podcasts) in a grid layout. This guide explains how to:

- Mark content as featured
- Understand how featured content is displayed
- Modify the featured sections


## Marking Content as Featured

To display a piece of content in a featured section, add `featured: true` to its frontmatter:

\`\`\`yaml
---
title: "Your Post Title"
description: "Post description"
featured: true
---


Any content without `featured: true` will still appear in the full collection but won't display on the homepage.

\## How Featured Content is Displayed

The homepage uses a reusable macro to create consistent featured sections. Each section:

- Displays featured items in a 4-column grid
- Includes a title
- Provides a link to view the full collection

The macro is defined in `_includes/layouts/index.njk`:

\`\`\`nunjucks

\{% macro featuredSection(title, collectionName, viewAllLink, viewAllText) %}
    <section class="mb-8 border-2" id="{{ collectionName }}">
        <h2 class="px-3 py-2">{{ title }}</h2>
        <div class="grid col-auto sm:grid-cols-4 gap-3 px-3 py-3">
            {% set items = collections[collectionName] | selectattr("data.featured") %}
            {% for item in items %}
                {% include 'layouts/partials/card.njk' %}
            {% endfor %}
            <div class="col-span-full text-xl font-bold italic">
                <a href="{{ viewAllLink }}">{{ viewAllText }}</a>
            </div>
        </div>
    </section>
\{% endmacro %}

## Adding a Featured Section
To add a new featured section to the homepage:

1. Ensure your content is in a collection
2. Add `featured: true` to the content you want to display
3. Add a new section to `index.njk`:

\`\`\`nunjucks
\{\{ featuredSection(
    "Section Title",
    "collectionName",
    "/collection-url/",
    "View All Text"
) \}\}



### Parameters

- `title`: The heading displayed above the section
- `collectionName`: The name of the collection to pull content from
- `viewAllLink`: URL to the full collection page
- `viewAllText`: Text for the "view all" link

## Example

Here's how the "Skills" section is implemented:

\`\`\`nunjucks
\{\{ featuredSection(
    "My skills — how I can help you",
    "skills",
    "/skills/",
    "See all my skills"
)\}\}


## Related Files

- `_includes/layouts/index.njk`: Main template file containing the featured sections
- `_includes/layouts/partials/card.njk`: Template for individual content cards
- Collection content files (e.g., `content/skills/*.md`): Where `featured: true` is set

## Notes

- Featured content maintains its original order within the collection
- The grid automatically adjusts to screen size
- Each section is independently managed through its collection's frontmatter
</pre>