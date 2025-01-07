---
title : "Learning how Hugo works"
categories: "wordpress"
tags: ["nah", "content-strategy"]
date: "2024-11-24"
---

This largely applies to any static site generator (SSG).

## Setting up a theme

## Embedding podcasts

## Creating a shortcode

## Cleaning up legacy cruft

If you've ever converted content from one format to another, you know the most tedious part is cleaning up all the legacy stuff like proprietary formatting.

things like `![](http://img.zemanta.com/pixy.gif?x-id=5bc6676b-470d-892c-8856-27ad9e359ca8)`

Thankfully the conversion tool i used made it fairly easy, but there were certainly WordPress artifacts:

`\[powerpress\_playlist limit=20 images=true image="http://edmarsh.com/wp-content/uploads/2016/05/Complimentary\_sandwich\_featuring\_Todd\_DeLuca\_Content\_Content\_episode\_9-mp3-image-300x300.jpg" links=true\]`

it's good to know regex and global search and replace, but there is still a manual aspect to this process.

what to do with broken links?

how many titles and companies people have changed

posts and pages wouldn't show until i changed em and en dashes to code (\&mdash;)
content strategy, taxonomy, tags, categories

start with what i have and know to better understand hugo as i go

### Should it stay or should it go

finding my old blog and the nostalgia of not only the posts, but of how the internet used to be. i've struggled to decide whether or not i want all that personal info out there in 2024. Complicating things is the crossover between topics that were technically technical on my blog, and the personal things. For example, later in this series i mention that I was using versions of linux 10 years ago, but you can't confirm that because it's essentially been wiped from the internet outside of the Wayback Machine.

Then I cleaned up a bunch of metadata and went through it again and archived it. Once I get a handle on all of this, maybe i'll bring back some relevant posts. But removing that burden of randomness allowed me to focus on the important parts of the site &mdash; and in 2024 that's not my 16-year-old blog from LiveJournal and LiveScribe.

## Cart, meet horse

When I get excited about a new project, I jump head first without any knowledge, figuring i'll figure it out as i go.

In this case, this also included trying to set up Linux in a virtual machine (VM) as a virtual coding workspace, so it didn't interfere with my regular stuff on my Windows (host) PC.  This included trying out two different distributions (distros) of Linux &mdash; Kubuntu and Mint. I assure you Kubuntu Mint is *not* a refreshing beverage.

### The plus sides of working in a virtual machine (VM)

If you make a mistake, you just create another one and start over. you cna also try different 'flavors' of Linux like Fedora, Ubuntu and Kubuntu, Linux Mint, and more. According to my old blog, I played around with Linux in *2009*.

- secure
- separation between your everyday computer and your development computer
- work in a development environment w/o the overhead of Windows
- zero dollars

## Themes, why did it have to be themes

You'd think one of the basic Hugo building blocks &mdash; setting up the way your site us displayed and organized through a *theme* &mdash; would be an easy task.

it can be &mdash; *if* you choose the "right" theme.

Some require certain versions of Hugo to work correctly. Some require other libraries you have to download and install. Some require you to copy files from a sample folder to the root of your project.


Ultimately, the easiest way to install themes &mdash; a requirement for working in Hugo &mdash; is to change directories to the `themes` folder, then clone the theme repository. In some cases, you'll have to move the folder hierarchy around. Then you add `theme = 'themename'` to your `hugo.toml` file.

And surprise! Documentation quality varies greatly from theme to theme.

### Templating languages?

The FUD set in. Am I just too out of this technological loop to have to hire someone to do it? Do I really want to decide on Nunjucks, WebC, Liquid, or another template language? Many people also say you can forgo template languages with modern frameworks like React and Angular, but that is a whole separate career and learning curve I don't want/need to get into. 
