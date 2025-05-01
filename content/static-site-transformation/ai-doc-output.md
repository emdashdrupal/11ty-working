---
title: AI-generated documentation for my site
description: I [asked AI to generate documentation](/static-site-transformation/writing-with-ai/) for my site's codebase. Here's the output.
eleventyExcludeFromCollections: true
---

> I ran this before and after I started development. the original is here[]

# Website Documentation - Ed Marsh Portfolio

## Overview

This is a static website built with Eleventy (11ty) that serves as a portfolio and blog for Ed Marsh, a technical writer with over 30 years of experience. The site replaces a legacy WordPress implementation with a modern static site architecture.

## Technology Stack

- **Static Site Generator**: Eleventy (11ty)
- **Template Language**: Nunjucks
- **CSS Framework**: Tailwind CSS
- **Content Format**: Markdown with YAML frontmatter
- **Build Tools**: Node.js

## Content Structure

### Primary Content Types

1. **Homepage** (`index.njk`)
   - Introduction section with bio
   - Featured skills gallery
   - Recent static site transformation posts
   - Recent podcast episodes

2. **Grid Pages**
   - Display collections of related content
   - Used for skills, blog posts, and podcast episodes
   - Implemented via `layouts/grid.njk`

3. **Detail Pages**
   - Individual content pages
   - Used for podcast episodes and blog posts
   - Implemented via `layouts/details.njk`

### Content Collections

Content is organized into several main collections:

- `skills` - Professional capabilities and services
- `ssg` - Blog posts about static site transformation
- `podcasts` - Content Content podcast episodes

## Featured Content System

Featured content is controlled through frontmatter metadata:

```yaml
---
featured: true
featuredOrder: 0  # Lower numbers appear first
---
```

Example implementation in templates:

```nunjucks
{% set featured = collections[collectionName] | filterBy("data.featured", true) %}
{% set sortedFeatured = featured | sort(false, false, "data.featuredOrder") %}
```

## Content Architecture

Content files are organized in the following structure:

```
content/
├── skills/          # Professional capabilities
├── podcasts/        # Podcast episodes
├── static-site-transformation/  # SSG blog series
└── technical-writing-examples/  # Writing samples
```

## Build Process

1. Start the Tailwind CSS processor:
```bash
npx tailwindcss --watch -o _includes/css/tw.css
```

2. Run Eleventy development server:
```bash
npx @11ty/eleventy --serve
```

The site will be available at `localhost:8080`

## Additional Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/)