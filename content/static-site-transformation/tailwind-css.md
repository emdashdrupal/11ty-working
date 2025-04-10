---
title : 'Styling a web site using Tailwind CSS'
description : Wherein I learn how far stylesheets have come since the 1990s.
FontAwesomeIcon: 'brands fa-css'
---

There's a lot more to Cascading Style Sheets (CSS) than when I first wrote CSS. There are multiple frameworks and templates, which is part the appeal of static site generators (SSGs) to me.

You *could* create your front end with a framework like React or Angular; my wife does that. I do not. So it's good to know a lot of work is done for you. But, you also have to take the time to learn how each framework works &mdash; and then how it *actually* works.

Are you sensing a pattern? Because that last sentence is a pattern.

## Why Tailwind?

My wife is a front end developer, and she said so. There are many other CSS frameworks like Bootstrap, but the 'buzz' seems to be around Tailwind.

I initially didn't like that it resets each style to zero. But a benefit of CSS is that you can specify the order in which to load your CSS files. This meant I could set the Tailwind CSS file in my templates' `<head>` section, and then override it with my custom CSS file.

```html
<head>
<link rel="stylesheet" type="text/css" href="/_includes/css/tw.css">
<link rel="stylesheet" type="text/css" href="/_includes/css/base.css">
</head>
```

## How do I get started?

These tools helped me get familiar with how Tailwind works.

- [Tailwind Grid generator](https://www.tailwindgen.com/)
- [Tailwind Card generator](https://tailwind-generator.com/card-generator/generator)
- [Tailwind CSS classes](https://shuffle.dev/tailwind/classes)

## Generating the CSS files

```npm
npx tailwindcss -o _includes/css/tw.css --watch
```

## Contribute



