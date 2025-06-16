- Finish my web site content.
- Publish my web site.
- Decommission my old web site.
- Promote my new web site.
- Write follow-up blogs.
- Restart podcast.
- Self-host all of the things.
- Set up an LLM on my computer
- Further learn home assistant so it can replace google assistant because im tired of Stephanie getting pissed at google for not hearing her right.
- Revise my resume. Again.
- Find a job.
- Get our AC fixed.
- Get our home in shape to move.
- Figure out how to deal with my wife's ADHD.

// Global Data loading with better error handling
try {
  const presentations = require("./_data/presentations.json");
  const tools = require("./_data/tools.json");
  
  eleventyConfig.addGlobalData("presentations", () => presentations);
  eleventyConfig.addGlobalData("tools", () => tools);
} catch (error) {
  console.error("Failed to load data files:", {
    error: error.message,
    stack: error.stack
  });
  process.exit(1);
}