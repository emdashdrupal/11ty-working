---
title: "Leveraging jQuery scripts and CSS3 in your Online Help #techcomm"
date: "2012-06-22"
categories:
  - "technical writing"

tags: ["how to", "madcap flare", "examples", "html", "css", "adobe robohelp"]
coverImage: "search.png"
---

I often get frustrated when people ask in technical communication forums and email lists what are the "current trends in help". Why limit help to such a small, self-enclosed space, when we have an incredible wealth of knowledge that is current and also contains what users want: the Web.

There's really no reason that help has to look like traditional "help", and not like a web site, especially since framesets, the "technology" that creates the tri-pane TOC/content/navigation most help authors are familiar with, went out of style in, oh, 1999. MadCap is finally taking the lead here with [frameset-less output](http://www.madcapsoftware.com/products/flare/overview.aspx), though I suspect [Adobe's RoboHelp](http://www.adobe.com/products/robohelp.html "Adobe RoboHelp") isn't far behind.

In my current client's help systems, I've implemented [jQuery](http://www.jquery.com), a JavaScript-based library that adds interactivity to web sites, and [CSS3](http://www.w3.org/TR/2001/WD-css3-roadmap-20010523/ "CSS3 roadmap"), which defines the presentation of your help or web site. They are easily implemented in any help project that outputs to HTML, in RoboHelp, Flare, or any other help authoring tool (HAT). Because CSS and JavaScript are well-known technologies, mostly any web developer can help you implement them.

Of course, just because you _can_ implement these, it doesn't mean you _should_; like everything else in technical communication, know your audience and if they will understand and use any enhancements.

**1\. Drop-down menus** - Everyone that's ever used the Web knows how to use a drop-down menu. Implementing one is really quite simple - most are based on HTML and CSS, so if you can update links in an HTML file, you can create your own menu.

![](/assets/images/menubar-300x18.png "menubar")

[This menu](http://www.egrappler.com/multi-level-hierarchical-jquery-menu-jqsimplemenu/) uses two JavaScript files, an HTML page, and a few lines of CSS. The script files are referenced in RoboHelp 8 master pages, and the HTML page is added to the project as a snippet, so this menu appears in every topic. The [color gradient is created using CSS3](http://www.colorzilla.com/gradient-editor/), so it's lightweight and easily modified - no graphics to maintain and update! The gradient works in IE 8-10, all versions of Safari, Chrome, and Firefox.

**2\. Table rollovers** - We have many topics that contain long tables. To make it easy for users to follow, we implemented a few lines of jQuery to highlight the current table row.

```js
 $(document).ready(function () {
           //selects table rows (tr), and limits the
            //rollover to certain tables and table rows
         $('tr').not('INSERT ANY CLASSES OR TAGS TO EXCLUDE').hover(
        function() {
//yellow highlight on rollover
            $(this).children().css('background', '#FFFF00');
        },
// clears background color on mouseout
         function() {
            $(this).children().css('background', '');
        });
            })
```

I'm proud to say I figured this one out myself, which led me to think I could write some more difficult jQuery. I... cannot. Yet.

![](/assets/images/screenshot.jpg "screenshot")

**3\. Image "lightbox" rollovers**\- Like many help projects, we have thousands of images at various sizes, and like many help projects, a user complained that scaled-down images are unreadable. With the assistance of a developer, we created a jQuery script that dims the graphic and displays a magnifying glass icon when users roll over each graphic, and a tool tip indicating you can view the full-size image by clicking it. When the image is clicked, the graphic appears at full size and the browser window behind dims. To enhance usability, a line of text appears above the full-size graphic, indicating to users they can click the image or press the Esc key to return to the help.

This turned out to be a larger and more difficult project than I anticipated, because most canned jQuery scripts on the web use two images - one thumbnail image and one full-sized image. I ended up collaborating with a developer at my office, which reminded me why developers are developers and writers are writers. But I learned a ton about jQuery, and our script is only about 80 lines of code.

**4\. Copyright variable** - Do you have a copyright notice in your help? Do you have to remember to change it in all of your help projects at the end of each year? Here's a simple script so you'll never have to remember again.

In the <head> section of your master pages, paste in the following:

```js
<script type="text/javascript" language="javascript">
function WriteThisYear() {
var d = new Date();
d = d.getFullYear();
document.write(d);
}
</script>
```

And in the body of the HTML file, where you want the copyright to appear:

```html
<p>Copyright © 2007-<script type="text/javascript"
language="javascript">
WriteThisYear();
</script> Ham on Wry Media, LLC</p>
```

You could also do this as an inline script, but when you place the script in the <head> and call it as a function, it gives you the flexibility to call the script several times in several different places.

**5\. Other visual goodies** - We replaced the standard RoboHelp search icon with a free image I found online. ![](/assets/images/search.png "search")You can easily change this and other icons using the built-in Skin Editor.

We also created a blue, speckled repeating background that goes behind the main content section, which is white. The design was conceived with [the 960.gs grid](http://www.960.gs "960 grid system") in mind, another popular design framework.

Have questions about how to implement these in your help? Let me know in the comments.
