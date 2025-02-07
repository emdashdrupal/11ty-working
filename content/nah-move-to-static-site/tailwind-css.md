---
title : 'Styling an Eleventy site using Tailwind CSS'
description : Wherein I learn how far stylesheets have come since the 1990s.
FontAwesomeIcon: 'brands fa-css'
---

There is a lot more to Cascading Style Sheets (CSS) than when I first (and last) wrote CSS. There are multiple frameworks and templates that will work with Eleventy, which is part the appeal of static site generators' to me. You *could* create your front end with a framework like React or Angular; my wife does that. I do not. So it's good to know a lot of work is done for you. But, you also have to take the time to learn how each framework works &mdash; and then how it *actually* works.

Are you sensing a pattern? Because that last sentence is a pattern.

## Why Tailwind?

My wife is a front end developer, and she said so. There are many other CSS frameworks like Bootstrap, but the 'buzz' seems to be around Tailwind.

What I initially didn't like about it is that it automatically "resets" each style to zero. What I do like about CSS is that you can specify the order in which to load your CSS files, so you can set your Tailwind CSS file in your templates' `<head>` section, then override it with your custom CSS.

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
[Tailwind Card generator](https://tailwind-generator.com/card-generator/generator)
[Tailwind CSS classes](https://shuffle.dev/tailwind/classes)