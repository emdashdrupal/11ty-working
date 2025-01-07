---
title: "Creating a Drupal sandbox with VirtualBox and Drupal Quickstart (Presentation)"
date: "2013-12-08"
tags: ["drupal", "how-to", "examples", "presentation"]
---

I'm a fan enthusiast of [Drupal](http://drupal.org "Drupal"). I've been part of the community for [four years now](https://drupal.org/user/623158 "My profile on drupal.org"), and the amazingly supportive community is what keeps me engaged, as [I wrote after attending the Drupal NYCCamp earlier in 2013](http://edmarsh.com/2013/07/17/a-tech-writers-thoughts-on-nyc-drupal-camp-2013/ "A Tech Writer's Thoughts on NYC Drupal Camp 2013").

As I started a new personal project that I hope to launch soon, I wanted to use it as a learning experience not only for myself, but for the Drupal community. Though I'm active in the [Northern New Jersey Drupal User Group](https://groups.drupal.org/new-jersey/nnj "NNJ Drupal Group"), I've been largely a consumer of the group's knowledge (other than [sharing my knowledge of beer](http://edmarsh.com/2011/03/09/omg-i-hate-beer/ "OMG i hate beer!")). I wanted to give back, especially as this year our host, the [New Jersey Institute of Technology in Newark](http://njit.edu), is moving a lot of their tech infrastructure to Drupal and their computer science students are showing an interest.

<iframe style="border: 1px solid #CCC; border-width: 1px 1px 0; margin-bottom: 5px;" src="http://www.slideshare.net/slideshow/embed_code/28217861" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="allowfullscreen"></iframe>

When I decided to create the site, instead of creating it on a web server with all of the typical installation and configuration issues (and expense), I started with a free, open-source software called [VirtualBox](http://virtualbox.org), and the [Drupal Quickstart project](http://drupal.org/project/quickstart "Drupal Quickstart project"), both of which I could run locally on my Windows PC. From this, I [created a short presentation](https://www.slideshare.net/theedmarsh/creating-a-drupal-sandbox-using-virtualbox-and-drupal-quickstart "Presentation: Creating a Drupal sandbox on slideshare.net") that I shared with the NNJ Group.

## What is Drupal?

 Drupal is considered a Web content management system (WCMS), like WordPress or Joomla!, but I think of it as more of a framework for creating Web sites. Starting with the free, open-source Drupal core, you then add additional functionality through modules. For example, you can install modules to create a slideshow, translate pages, or work with Google Maps.

Drupal's strength - and its weakness - is in its flexibility. Drupal is a powerful framework, but it takes some time to climb the learning curve.

## What is a Virtual Machine?

A virtual machine, also known as a VM, allows you to run one or multiple instances of various operating systems in their own window. Most Web sites are now running in virtualization, allowing several sites to run off of a single server. In my instance, the VM I'm using is running Drupal 7 on Ubuntu Linux in a Windows 8 host environment. This allows me to turn on and off the VM at will, just like an application.

### What is VirtualBox?

VirtualBox is another free, open-source application provided by Oracle. VirtualBox can run on Macs, Windows, and Linux machines, and can run just about any flavor of Windows or Linux you can throw at it. VirtualBox makes it easy to get VMs up and running, and you can run multiple instances simultaneously. Essentially, VirtualBox is a VM manager.

## What is Drupal Quickstart?

Drupal Quickstart is a complete Drupal development environment in a single, downloadable 1.2GB file. Quickstart, and its newer sibling, [DrupalPro](http://drupal.org/project/drupalpro), include:

- a working version of Ubuntu Linux
- the AMP stack (Apache Web server, MySQL database, and PHP scripting language) required to run Drupal
- development tools Netbeans and Eclipse
- the Git version control system that is most frequently used with Drupal
- [Drush, the Drupal command line administration tool](http://drush.org)
- "make" files that you use to create instances of Drupal. The default comes with make files for Drupal versions 6, 7, and 8, or you can create your own makefile like I did using [drushmake.me](http://drushmake.me). Creating your own makefile allows you to automatically install common modules and themes (skins), as well as any optional modules you require.

What's great about Quickstart is that because it's all virtual, if you make a mistake (and I've made plenty!) you can just fire up a new version of Drupal, or a completely new version of the VM, if you need to. You can delete the broken versions using the Drush command line too, and learn and improve your site as you go. Once the site is developed to your liking, you can also use Drush to export the site and import it to your live Web server.

Stay tuned, once I complete and launch my new site, I'll be creating a new blog post on my experience with Drupal and Quickstart. Have questions about anything? Let me know in the comments.
