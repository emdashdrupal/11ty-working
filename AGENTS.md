# AGENTS.md

This file contains instructions and tips for AI agents working with this codebase.

## Tech Stack & Project Info
- This project is a static site built with Eleventy (v3.x compatibility).
- It uses Nunjucks (`.njk`) and Markdown (`.md`) for templating.
- It uses Tailwind CSS and PostCSS for styling.

## Project Structure
- `content/`: Contains the main content files (Markdown and Nunjucks) for the site, organized by sections (e.g., `blog/`, `podcasts/`, `skills/`). This is the input directory for Eleventy.
- `_includes/`: Contains site layouts, partials, CSS, and JS files used by the templates.
- `_data/`: Global data files (e.g., JSON) injected into templates.
- `_site/`: The output directory where the built static site is generated (ignored by Git).
- `eleventy.config.js`: The main Eleventy configuration file. It contains plugin setups, filters, shortcodes, CSS transforms with PostCSS, and directory configurations.
- `package.json`: Contains all npm scripts, dependencies, and project metadata.
- `tailwind.config.js` / `postcss.config.js`: Configuration files for the site's styling.

## Building the Project
- Build the project using the command: `npm run build`
- Start a local preview server: `npm run start` or `npm run preview`

## Testing
- The project uses Jest for testing.
- Run unit and integration tests using: `npm run test`
- Run modular template tests: `npm run test:modular`
- *Note:* Test failures (such as performance tests) may be temporarily ignored to unblock builds.

## Common Workflows
- **Adding new pages/content**: Create a new `.md` or `.njk` file within the appropriate subdirectory in `content/` (e.g., `content/blog/new-post.md`). Use frontmatter to define layouts and tags.
- **Managing content collections**: The site uses tags to group content into collections like `blog`, `podcasts`, and `skills`. Add the relevant tag to a file's frontmatter to include it in a collection.
- **Modifying templates**: Edit the Nunjucks layouts located in `_includes/layouts/`. Ensure any changes remain compatible with the variables injected by Eleventy.

## Troubleshooting Tips
- **Build Errors**: If the Eleventy build fails, check for syntax errors in your Nunjucks templates or malformed YAML in Markdown frontmatter.
- **Debugging**: Run `npm run debug` to execute Eleventy with verbose logging, which helps trace issues with plugins or template rendering.
- **Styling Issues**: If CSS changes aren't reflecting, ensure you are running the full build process so PostCSS processes the Tailwind directives. Check `eleventy.config.js` for custom CSS transformations.
- **Dependency Issues**: If you encounter missing module errors, ensure you've run `npm install`.
