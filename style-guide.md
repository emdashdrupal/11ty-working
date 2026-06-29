# Style Guide

This document defines the writing style and formatting preferences for the edmar.sh portfolio site. Adherence to these guidelines ensures consistency across the blog, skills, and podcast sections.

## Tone and Voice

- **Perspective**: Always use the first-person ("I", "my", "me").
- **Persona**: Conversational, professional, and reflective. The voice should sound like a seasoned expert who is still curious and willing to admit when they are learning something new.
- **Audience**: Primary audiences include potential employers, fellow technical writers, and podcast listeners.
- **Authenticity**: Be honest about processes, including the use of AI (e.g., "vibe-coding") and technical challenges.

## Typography and Punctuation

- **Em-dashes**: Do not use standard em-dashes (`—`) or double hyphens (`--`). Always use the thin-spaced em-dash format: `&thinsp;&mdash;&thinsp;`.
- **Ellipses**: Use the HTML entity `&hellip;` or the character `…` where appropriate, rather than three periods.
- **Oxford Comma**: Use the Oxford comma in lists of three or more items.

## Formatting (Markdown)

- **Headings**: Use sentence case for headings. Avoid skipping heading levels (e.g., don't go from `#` to `###`).
- **Lists**: Use bulleted lists for unordered items and numbered lists for sequential steps.
- **Blockquotes**: Use `>` for quotes or to highlight important sidebars.
- **Code**: Use inline backticks for file names, paths, and short code snippets (e.g., `eleventy.config.js`). Use fenced code blocks for longer examples.

## Frontmatter Guidelines

All Markdown files must include a YAML frontmatter block. Common fields include:

| Field | Description |
| :--- | :--- |
| `title` | The title of the page or post. |
| `description` | A 1-2 sentence summary for SEO and previews. |
| `date` | The publication date in `YYYY-MM-DD` format. |
| `FontAwesomeIcon` | The FontAwesome class (e.g., `solid fa-keyboard`). |
| `eleventyNavigation` | Object containing `key`, `title`, and optionally `order` or `parent`. |
| `tags` | Used to include the file in collections (e.g., `blog`, `podcasts`). |
| `featured` | Set to `true` to highlight on the homepage. |
| `featuredOrder` | Integer to determine the display order of featured items. |

## Media and Assets

- **Images**: Store images in `/assets/images/`.
- **Alt Text**: Always provide descriptive alt text for accessibility.
- **Captions**: Use Markdown or HTML if a specific caption is needed below an image.

## Links

- **Internal Links**: Use relative paths (e.g., `[About Me](/about/about-ed-marsh/)`). Always include trailing slashes for directories.
- **External Links**: Use descriptive link text rather than "click here" or raw URLs.

## AI Usage Philosophy

- **Assisted, Not Authored**: AI can be used to generate drafts, summaries, or code snippets, but every word must be reviewed and edited by a human.
- **Verification**: All AI-generated technical information must be verified for accuracy and functionality.
- **Disclosure**: Be transparent about when AI was significantly involved in the creation of a piece of content or a technical feature.
