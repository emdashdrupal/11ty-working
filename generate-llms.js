const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { globSync } = require('glob');

const siteUrl = 'https://edmar.sh';
const contentDir = 'content';
const outputFile = 'llms.txt';

function cleanDescription(desc) {
  if (!desc) return '';
  let cleaned = String(desc);

  // Normalize em-dashes to thin-spaced em-dashes
  cleaned = cleaned
    .replace(/&thinsp;&mdash;&thinsp;/g, '___EM_DASH___')
    .replace(/&mdash;/g, '___EM_DASH___')
    .replace(/—/g, '___EM_DASH___');

  // Replace common HTML entities
  cleaned = cleaned
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#233;/g, 'é')
    .replace(/&hellip;/g, '…')
    .replace(/&thinsp;/g, '');

  // Strip Markdown images and links (including double bracket cases like [[A]](url))
  cleaned = cleaned.replace(/!\[([^\]]*)\]\([^)]*\)/g, '');
  cleaned = cleaned.replace(/\[+([^\]]+)\]+\([^)]+\)/g, '$1');

  // Strip HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '');

  // Restore thin-spaced em-dash
  cleaned = cleaned.replace(/___EM_DASH___/g, '&thinsp;&mdash;&thinsp;');

  // Normalize whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

function getUrlFromFilePath(filePath) {
  const relativePath = path.relative(contentDir, filePath);
  const parsed = path.parse(relativePath);

  let urlPath = path.join(parsed.dir, parsed.name).replace(/\\/g, '/');

  if (parsed.name === 'index') {
    urlPath = parsed.dir;
  } else if (path.basename(parsed.dir) === parsed.name) {
    urlPath = parsed.dir;
  }

  if (!urlPath || urlPath === '.') {
    return '/';
  }

  return `/${urlPath}/`;
}

function getMarkdownUrl(filePath) {
  const urlPath = getUrlFromFilePath(filePath);
  if (urlPath === '/') {
    return `${siteUrl}/index.md`;
  }
  return `${siteUrl}${urlPath}index.md`;
}

function copyMarkdownFilesToBuild(outDir = '_site') {
  if (!fs.existsSync(outDir)) {
    return;
  }

  const files = globSync(`${contentDir}/**/*.md`);
  files.forEach(file => {
    let fileContent = fs.readFileSync(file, 'utf8');
    const { data } = matter(fileContent);

    if (data.eleventyExcludeFromCollections === true) {
      return;
    }

    // Prepend/insert markdown directive for agent-facing .md files in build output
    const directive = '> For the complete documentation index, see [llms.txt](https://edmar.sh/llms.txt).\n\n';
    if (!fileContent.includes('https://edmar.sh/llms.txt')) {
      if (fileContent.startsWith('---')) {
        const secondDash = fileContent.indexOf('---', 3);
        if (secondDash !== -1) {
          const endOfFrontmatter = secondDash + 3;
          fileContent = fileContent.slice(0, endOfFrontmatter) + '\n\n' + directive + fileContent.slice(endOfFrontmatter).trimStart();
        } else {
          fileContent = directive + fileContent;
        }
      } else {
        fileContent = directive + fileContent;
      }
    }

    const urlPath = getUrlFromFilePath(file);
    if (urlPath === '/') {
      fs.writeFileSync(path.join(outDir, 'index.md'), fileContent);
    } else {
      const relPath = urlPath.slice(1); // remove leading slash
      const dirPath = path.join(outDir, relPath);
      fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(path.join(dirPath, 'index.md'), fileContent);

      // Also copy as /path.md (without trailing slash)
      const altFilePath = path.join(outDir, relPath.slice(0, -1) + '.md');
      fs.mkdirSync(path.dirname(altFilePath), { recursive: true });
      fs.writeFileSync(altFilePath, fileContent);
    }
  });

  if (fs.existsSync(outputFile)) {
    fs.copyFileSync(outputFile, path.join(outDir, 'llms.txt'));
  }
}

function generateLlmsTxt() {
  const files = globSync(`${contentDir}/**/*.md`);

  const topPages = [];
  const podcasts = [];
  const skills = [];
  const blogPosts = [];

  files.forEach(file => {
    const fileContent = fs.readFileSync(file, 'utf8');
    const { data } = matter(fileContent);

    if (data.eleventyExcludeFromCollections === true) {
      return;
    }

    const normalizedPath = file.split(path.sep).join('/');
    const url = getMarkdownUrl(file);
    let description = cleanDescription(data.description);
    const navTitle = data.eleventyNavigation?.title || data.title;

    const item = {
      filePath: normalizedPath,
      url,
      title: data.title,
      navTitle,
      description,
      data
    };

    if (normalizedPath === 'content/index.md') {
      topPages.push({
        ...item,
        displayTitle: 'Ed Marsh Portfolio & Overview',
        order: 1
      });
    } else if (normalizedPath === 'content/contact/contact.md') {
      topPages.push({
        ...item,
        displayTitle: 'Contact Ed Marsh',
        order: 2
      });
    } else if (normalizedPath === 'content/about/about-ed-marsh.md') {
      topPages.push({
        ...item,
        displayTitle: 'About Ed Marsh',
        order: 3
      });
    } else if (normalizedPath.startsWith('content/podcasts/')) {
      if (normalizedPath === 'content/podcasts/index.md') {
        podcasts.push({
          ...item,
          displayTitle: 'Podcast Series Index',
          description: 'Interviews with professionals in technical communication.'
        });
      } else {
        let displayTitle = `Podcast: ${navTitle}`;
        if (normalizedPath.includes('whatever-this-is-now-jack-molisani')) {
          displayTitle = 'Podcast: Jack Molisani (2026)';
        }
        podcasts.push({
          ...item,
          displayTitle
        });
      }
    } else if (normalizedPath.startsWith('content/skills/')) {
      let displayTitle = navTitle;
      if (normalizedPath === 'content/skills/index.md') {
        displayTitle = 'Core Skills Portfolio';
      }
      skills.push({
        ...item,
        displayTitle
      });
    } else if (normalizedPath.startsWith('content/blog/')) {
      if (normalizedPath === 'content/blog/index.md') {
        return;
      }
      if (normalizedPath === 'content/blog/llms/index.md') {
        description = 'A collection of blog posts and resources related to Large Language Models and their application in technical communication and development.';
      }
      let displayTitle = navTitle;
      blogPosts.push({
        ...item,
        displayTitle,
        description
      });
    }
  });

  // Sort sections
  topPages.sort((a, b) => a.order - b.order);

  // Podcasts sorted alphabetically by displayTitle, but with Podcast Series Index at the end
  podcasts.sort((a, b) => {
    if (a.displayTitle === 'Podcast Series Index') return 1;
    if (b.displayTitle === 'Podcast Series Index') return -1;
    return a.displayTitle.localeCompare(b.displayTitle);
  });

  // Skills sorted with Core Skills Portfolio first, then alphabetically by displayTitle
  skills.sort((a, b) => {
    if (a.displayTitle === 'Core Skills Portfolio') return -1;
    if (b.displayTitle === 'Core Skills Portfolio') return 1;
    return a.displayTitle.localeCompare(b.displayTitle);
  });

  // Blog posts custom ordering or alphabetical
  blogPosts.sort((a, b) => {
    if (a.filePath.includes('/static-site-transformation/index.md')) return -1;
    if (b.filePath.includes('/static-site-transformation/index.md')) return 1;
    if (a.filePath.includes('/blog/llms/')) return 1;
    if (b.filePath.includes('/blog/llms/')) return -1;
    return a.displayTitle.localeCompare(b.displayTitle);
  });

  let output = `# edmar.sh llms.txt\n\n`;
  output += `> Ed Marsh: Senior technical writer and content strategist with 30+ years of experience, seeking employment opportunities. Demonstrates AI-enhanced workflows, strategic content leadership, and proven ability to build scalable documentation systems. This portfolio site was built from scratch using AI-assisted development while maintaining full editorial control and quality standards.\n\n`;

  topPages.forEach(p => {
    output += `- [${p.displayTitle}](${p.url}): ${p.description}\n`;
  });

  output += `\n## Podcasts\n`;
  podcasts.forEach(p => {
    output += `- [${p.displayTitle}](${p.url}): ${p.description}\n`;
  });

  output += `\n## Professional Skills & Capabilities\n`;
  skills.forEach(p => {
    output += `- [${p.displayTitle}](${p.url}): ${p.description}\n`;
  });

  output += `\n## AI-Enhanced Development & Modern Technical Skills\n`;
  blogPosts.forEach(p => {
    output += `- [${p.displayTitle}](${p.url}): ${p.description}\n`;
  });

  return output;
}

function main() {
  const content = generateLlmsTxt();
  fs.writeFileSync(outputFile, content);
  console.log(`Generated ${outputFile}`);
  copyMarkdownFilesToBuild();
}

if (require.main === module) {
  main();
}

module.exports = {
  cleanDescription,
  getMarkdownUrl,
  generateLlmsTxt,
  copyMarkdownFilesToBuild
};
