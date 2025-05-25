---
title: AI-generated documentation for my site
description: I [asked AI to generate documentation](/static-site-transformation/writing-with-ai/) for my site's codebase. Here's the original output.
eleventyExcludeFromCollections: true
---

You can also see an [updated version](./ai-doc-output).

```yaml
---
title: "Codebase Documentation"
description: "Technical documentation for the static site implementation"
date: 2024-02-11
---
```

# Site Implementation Documentation

## Overview

This documentation describes the technical implementation of a static site built with Eleventy. The site uses:

- Eleventy (11ty) as the static site generator
- Tailwind CSS for styling
- Nunjucks for templating
- Markdown for content
- Node.js for build processes

## Project Structure

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
├── assets/
│   ├── images/
│   └── podcasts/
├── content/
│   ├── skills/
│   ├── podcasts/
│   └── static-site-transformation/
└── eleventy.config.js
```

## Configuration

### Eleventy Configuration

The `eleventy.config.js` file manages the site's core functionality:

```javascript
// filepath: /eleventy.config.js
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const timeToRead = require('eleventy-plugin-time-to-read');

module.exports = function (eleventyConfig) {
  // Plugin configuration
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(timeToRead);

  // Asset management
  eleventyConfig.addPassthroughCopy({
    "_includes/css/base.css": "css/base.css",
    "_includes/css/tw.css": "css/tw.css",
    "assets/images": "assets/images",
    "assets/podcasts": "assets/podcasts"
  });

  // Directory configuration
  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site"
    }
  };
};
```

### Collections

Content is organized into collections defined in `eleventy.config.js`:

```javascript
eleventyConfig.addCollection("skills", function (collectionApi) {
  return collectionApi
    .getAll()
    .filter((item) => item.data.tags && item.data.tags.includes("skills"));
});
```

## Templates

### Base Templates

The site uses three main template types:

1. **index.njk**: Homepage template with featured content sections
2. **details.njk**: Individual content page template
3. **grid.njk**: Collection listing template

### Partials

Common elements are stored in `_includes/layouts/partials/`:

- **card.njk**: Content card template
- **header.njk**: Site header
- **footer.njk**: Site footer
- **macros.njk**: Reusable template functions

## Content Management

### Content Structure

Content is written in Markdown with YAML frontmatter:

```markdown
---
title: "Page Title"
description: "Page description"
featured: true
featuredOrder: 1
FontAwesomeIcon: "solid fa-book"
---

Content goes here...
```

### Featured Content

To display content in featured sections:

1. Add `featured: true` to the frontmatter
2. Optionally set `featuredOrder` for sorting
3. Content must be in a collection (skills, podcasts, etc.)

## Styling

### Tailwind CSS

The site uses Tailwind CSS for styling. The build process is managed by:

```bash
# filepath: /tailwind.sh
npx tailwindcss --watch -o _includes/css/tw.css
```

### Custom CSS

Additional styles can be added in `_includes/css/base.css`

## Build Process

1. Start the Tailwind CSS watch process
2. Run Eleventy in development mode
3. Access the site at `localhost:8080`

```bash
# Terminal 1
./tailwind.sh

# Terminal 2
npx @11ty/eleventy --serve
```

## Related Documentation

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/)