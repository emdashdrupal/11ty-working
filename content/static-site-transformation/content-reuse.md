---
title : Creating reusable content for static site generators (SSGs)
description : I modularized my presentations and tools experience so they could display in different contexts across the site.
FontAwesomeIcon: solid fa-recycle
---

One of the things I miss about [DITA (an XML-based authoring language)](https://en.wikipedia.org/wiki/Darwin_Information_Typing_Architecture) is the idea of *content reuse*. This means instead of copying and pasting sections into different files, then having to remember to update them anytime *one* of them changes, you basically use another DITA file to reference that snippet of text in multiple files.
I originally had my skills and presentation content in bulleted lists. I created (with the help of GitHub Copilot) two `json` files:

- One that contained data about all of my presentations: their titles, year (or years), link, category, venue (the location or event), and type (webinar, in-person, panel discussion, podcast guest or host, etc.)

    ```json
        {
      "title": "So, you want to be a technical writer?",
      "year": "2024",
      "link": "https://www.brighttalk.com/webcast/9273/608187",
      "category": ["technical-writing", "metrics", "content-strategy", "marketing"],
      "venue": "Content Wrangler webcast",
      "type": "webinar"
    },
    ```

- One that listed the tools I've used over my career, with their publisher, product name, and relevant categories.

    ```json
        {
        "category": [
            "technical-writing",
            "help-authoring-tool"
        ],
        "publisher": "MadCap",
        "title": "Flare"
    },
    ```

This made it easy to populate sections of my skills pages with the relevant presentations and tools programmatically. If you look at this screenshot, you can see how this approach enforces structure:

![yeh](/assets/images/programmatic-columns.png)
