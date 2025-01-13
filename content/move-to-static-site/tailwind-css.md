---
title : 'Styling an Eleventy site using Tailwind CSS'
---

Cascading Style Sheets (CSS) have come a long way since the 90s. There are multiple frameworks and templates that will work with Eleventy, which is part of its appeal to me. You *could* create your entire front end with a framework like React or Angular; my wife does that. I do not. So it's good to know a lot of work is done for you.

## Why Tailwind?

My wife said so. There are others like Bootstrap, but the 'buzz' seems to be around Tailwind.

what I don't like about it is that it automatically "resets" each style to zero. What I do like about CSS is that you can specify the order in which to load your CSS files, so you can set your Tailwind CSS file in your templates' `<head>` section, then override it with your custom CSS.

```html
<head>
<link rel="stylesheet" type="text/css" href="/_includes/css/tw.css">
<link rel="stylesheet" type="text/css" href="/_includes/css/base.css">
</head>
```

## How do I get started?

## Generating the CSS files

```npm
npx tailwindcss -o _includes/css/tw.css --watch
```

## Online tools

[Tailwind Grid generator](https://www.tailwindgen.com/)