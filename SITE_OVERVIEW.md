# Ed Marsh portfolio site overview

## Purpose

I built this professional portfolio website from scratch to showcase my three decades of experience in technical communication, content strategy, and community building. The site demonstrates my ability to leverage AI tools effectively while maintaining editorial oversight and strategic thinking—a competitive advantage I bring to potential employers seeking content strategists, technical writers, or similar roles.

This isn't just a portfolio; it's proof of concept for modern content strategy that combines human expertise with AI assistance to deliver superior results efficiently.

## AI-powered development approach

I built this site using AI as a strategic partner while maintaining full editorial control and technical oversight. This demonstrates my ability to:

- **Leverage AI efficiently**: Used AI coding assistance to accelerate development while ensuring code quality and maintainability
- **Maintain strategic thinking**: Made all architectural and content strategy decisions myself
- **Quality assurance**: Reviewed, tested, and refined all AI-generated code and content
- **Problem-solving**: Debugged issues and implemented custom solutions when AI suggestions needed refinement

This approach resulted in a professional-grade website built in a fraction of the time traditional development would require—exactly the kind of efficiency modern employers need.

## Site structure

### Technology stack
- **Static site generator**: [Eleventy (11ty)](https://www.11ty.dev/) v3.0.0
- **Template engine**: Nunjucks
- **Styling**: Tailwind CSS with custom configurations
- **Deployment**: Netlify with automated builds
- **Search**: Pagefind for client-side search functionality

### Content architecture

#### Primary sections

1. **Skills** (`/skills/`)
   - Content strategy (featuredOrder: 0) - My core expertise
   - Information architecture (featuredOrder: 1) - Structural thinking
   - Website reviews (featuredOrder: 3) - Practical application
   - Technical writing (featuredOrder: 4) - Clear communication
   - Metrics and data (featuredOrder: 5) - Results-driven approach
   - Community building (featuredOrder: 6) - Stakeholder engagement
   - Podcasting (featuredOrder: 7) - Content creation and distribution
   - Code development - Technical implementation skills

2. **Blog** (`/static-site-transformation/`)
   - Series documenting my WordPress to Eleventy migration
   - Content strategy for static site generators
   - AI-assisted writing and development processes
   - Technical implementation with strategic oversight

3. **Podcasts** (`/podcasts/`)
   - Content Content podcast episodes I created and hosted
   - Interviews with technical communication professionals
   - Demonstrates my ability to create and manage content series

4. **Contact** (`/contact/`)
   - Direct scheduling integration for potential employers
   - Streamlined contact process

### File Organization

```
├── content/                    # Markdown content files
│   ├── skills/                # Individual skill pages
│   ├── podcasts/              # Podcast episode pages
│   ├── static-site-transformation/  # Blog posts
│   └── about/                 # About page
├── _includes/                 # Template files
│   ├── layouts/               # Page layouts
│   │   ├── details.njk        # Individual content pages
│   │   ├── grid.njk          # Collection listing pages
│   │   ├── index.njk         # Homepage layout
│   │   └── partials/         # Reusable components
│   │       ├── macros.njk    # Nunjucks macros
│   │       ├── next-previous.njk  # Navigation component
│   │       ├── header.njk    # Site header
│   │       └── footer.njk    # Site footer
│   ├── css/                  # Stylesheets
│   └── js/                   # JavaScript files
├── _data/                    # Data files
│   ├── presentations.json    # Speaking engagements
│   └── tools.json           # Tool recommendations
└── assets/                   # Static assets (images, PDFs)
```

## Key features demonstrating my capabilities

### Strategic content management
- **Structured data approach**: YAML front matter drives all content organization
- **Priority-based presentation**: Skills use `featuredOrder` to highlight most relevant capabilities
- **Scalable taxonomy**: Flexible categories and tags system for future growth
- **Visual storytelling**: Strategic use of cover images to enhance user engagement

### User experience design
- **Mobile-first responsive design**: Ensures accessibility across all devices
- **Intelligent content sorting**:
  - Skills prioritized by strategic importance (`featuredOrder`)
  - Time-sensitive content (podcasts/blog) sorted chronologically
- **Contextual navigation**: Next/previous links maintain user flow
- **Fast, accessible search**: Client-side search with Pagefind for immediate results

### Technical architecture
- **Modular, maintainable code**: Reusable Nunjucks macros reduce duplication
- **Component-based design**: Scalable partial system for consistent presentation
- **Template inheritance**: Efficient layout system that scales with content growth
- **Performance-optimized**: Static generation ensures fast loading times

## Content strategy for employment positioning

### Target audience
- **Hiring managers** seeking content strategists and technical writers
- **HR professionals** evaluating candidates with modern AI skills
- **Content teams** looking for experienced practitioners who can leverage new technologies
- **Organizations** needing strategic content leadership with technical depth

### Content types showcasing my capabilities

1. **Skills pages**: Detailed explanations of my capabilities with real-world examples and measurable results
2. **Case studies**: Documented applications showing strategic thinking and problem-solving
3. **Process documentation**: How-to guides demonstrating my ability to create clear, actionable content
4. **Podcast series**: Evidence of my ability to create, manage, and sustain long-term content initiatives
5. **Technical blog series**: In-depth exploration showing both strategic and technical competencies

### SEO & Discoverability
- Semantic HTML structure
- Meta descriptions and titles
- Image alt text and captions
- XML sitemap generation
- RSS feed for podcast content

## Technical implementation showcasing modern skills

### AI-assisted build process
1. **Strategic planning**: I defined all requirements and architecture decisions
2. **AI-accelerated coding**: Used AI assistance for rapid template and component development
3. **Quality control**: Thoroughly tested and refined all generated code
4. **Performance optimization**: Implemented best practices for speed and accessibility
5. **Automated deployment**: Set up CI/CD pipeline for seamless updates

### Modern development practices
- **Static site generation**: Demonstrates understanding of modern web architecture
- **Component-based design**: Shows ability to create scalable, maintainable systems
- **Performance-first approach**: Optimized for speed and user experience
- **Accessibility compliance**: Built with inclusive design principles
- **SEO optimization**: Strategic implementation for discoverability

### Skills demonstrated through implementation
- **Strategic thinking**: Architectural decisions that support business goals
- **Technical competency**: Hands-on development with modern tools
- **AI collaboration**: Effective use of AI while maintaining quality standards
- **Problem-solving**: Debugging and custom solutions when needed
- **Project management**: End-to-end delivery from concept to deployment

## Maintenance & Updates

### Content Updates
- Skills pages updated as expertise evolves
- Regular blog posts documenting new projects
- Podcast episodes added as they're published
- Speaking engagements and tools updated quarterly

### Technical Maintenance
- Dependency updates managed via npm
- Build process monitored via Netlify
- Performance metrics tracked
- SEO optimization ongoing

## Success Metrics

### Engagement
- Page views and session duration
- Contact form submissions
- Speaking engagement requests
- Podcast download statistics

### Professional Impact
- Client acquisition through the site
- Industry recognition and citations
- Community engagement and feedback
- Search engine visibility

---

*This site demonstrates Ed Marsh's approach to content strategy: organized, accessible, and user-focused, with clear information architecture and consistent presentation across all content types.*