---
title: Site implementation documentation
description: Technical documentation for Ed Marsh's static site implementation
eleventyExcludeFromCollections: true
---

# Overview

This documentation describes the implementation of edmarsh.com, a static site built with Eleventy (11ty). The site serves as a portfolio showcasing technical writing, content strategy, and podcasting work.

## Technology stack

- **Static site generator**: Eleventy (11ty)
- **Template language**: Nunjucks
- **CSS framework**: Tailwind CSS
- **Content format**: Markdown with YAML frontmatter
- **Build tools**: Node.js

## Content architecture

### Content types

The site implements three main content types:

1. **Homepage** (`layouts/index.njk`)
   - Introduction section
   - Featured skills gallery
   - Recent blog posts
   - Recent podcast episodes

2. **Grid pages** (`layouts/grid.njk`)
   - Display collections of related content
   - Used for skills, blog posts, and podcast episodes
   - Implement card-based layouts for content previews

3. **Details pages** (`layouts/details.njk`)
   - Individual content pages
   - Used for blog posts, podcast episodes, and skill descriptions
   - Support related content sections

### Content collections

Content is organized into primary collections:

- `skills` &mdash; Professional capabilities and services
- `blog` &mdash; Posts about static site transformation
- `podcasts` &mdash; Content Content podcast episodes

### Frontmatter metadata

Content files use YAML frontmatter for metadata:

```yaml
---
title: "Page title"
description: "Page description"
FontAwesomeIcon: "solid fa-book"
featured: true
featuredOrder: 1
categories: ["category1", "category2"]
---
```

| Field | Purpose |
|-------|---------|
| `title` | Page title that displays on cards and pages |
| `description` | Short summary used in cards and metadata |
| `FontAwesomeIcon` | Icon displayed on cards and breadcrumbs |
| `featured` | Controls homepage display |
| `featuredOrder` | Sets display order for featured content |
| `categories` | Tags for filtering related content |

## Implementation details

### Project structure

```plaintext
.
├── _includes/
│   ├── css/
│   │   ├── base.css
│   │   └── tw.css
│   └── layouts/
│       ├── partials/
│       │   ├── card.njk
│       │   ├── footer.njk
│       │   ├── header.njk
│       │   └── macros.njk
│       ├── details.njk
│       ├── grid.njk
│       └── index.njk
├── content/
│   ├── skills/
│   ├── podcasts/
│   └── static-site-transformation/
└── eleventy.config.js
```

### Build process

1. Start the Tailwind CSS processor:
```bash
npx tailwindcss --watch -o _includes/css/tw.css
```

2. Run Eleventy development server:
```bash
npx @11ty/eleventy --serve
```

The site will be available at `localhost:8080`.

## Key features

1. **Featured content system**
   - Controls homepage displays through frontmatter
   - Allows manual ordering of featured items
   - Filters by collection type

2. **Related content**
   - Automatically displays related presentations and tools
   - Uses category matching for associations
   - Implemented through collection filters

3. **Responsive design**
   - Mobile-first approach
   - Grid-based layouts
   - Accessible navigation

## Additional resources

- [Eleventy documentation](https://www.11ty.dev/docs/)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [Nunjucks documentation](https://mozilla.github.io/nunjucks/)