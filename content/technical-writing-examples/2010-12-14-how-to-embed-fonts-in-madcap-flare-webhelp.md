---
title: "How to Embed Fonts in MadCap Flare WebHelp"
date: "2010-12-14"
categories:
  - "technical writing"
tags: ["css", "madcap flare", "examples"]

---

This story is for intermediate to advanced help developers. It requires knowledge of HTML, CSS, and a help authoring tool such as MadCap Flare or Adobe Robohelp.

Have you ever been bored using Georgia, Tahoma, Verdana, and (sigh...) Arial over and over in your help projects? The [font-face property](http://www.w3.org/TR/css3-fonts/#the-font-face-rule) has been available for some time in Cascading Style Sheets (CSS), but browser and font foundry support are only now allowing use of fonts other than those that ship with operating systems and applications, without workarounds like [sIFR](http://en.wikipedia.org/wiki/Scalable_Inman_Flash_Replacement) and [cufon](http://cufon.shoqolate.com/generate/).

New technologies have sprouted up, with Google [creating its own font API](http://code.google.com/apis/webfonts/), and Adobe announcing [font support through TypeKit](http://typekit.com/foundries/adobe). However, you can also save and host freely available font files on your company’s web server, or install on your users’ PCs, and use these fonts in your WebHelp projects. The web site [Font Squirrel creates the CSS for you](http://www.fontsquirrel.com/fontface), using only free, embeddable fonts.

There are thousands of free fonts out there, but not all font creators support font embedding, so be sure to read any license agreement before using them in your projects.

[MadCap's Flare](http://www.madcapsoftware.com/) help authoring tool (HAT) uses CSS to style its WebHelp, so you can easily  embed fonts into your help. This should work similarly in Adobe Robohelp.

You can use the fonts locally, in addition to on a server. The CSS and font files are quite small, taking up only a few kilobytes each, so it shouldn’t add a lot of overhead to your projects. All major browsers, including Internet Explorer 7, 8, and 9, Firefox, Chrome, Opera, and Safari, currently support using the font-face attribute, but of course they are implemented differently. IE supports the EOT format, while most other browsers support TrueType (TTF) and some OpenType (OTF) format fonts.

### Downloading Fonts

Since 95% of the work is done for you (did I also mention free?), we’ll use [Font Squirrel’s font face kits](http://www.fontsquirrel.com/fontface). These kits include the CSS file for the font, which defines the `@font-face` properties you need, and the font files. All you need to do is change the path to your fonts on the server or local machine (_not_ the windows/fonts folder), and then [add these CSS files to your Flare project](#config). I like this modular approach to the font files, originally shown to me by [John “VSC” Zavocki](http://www.johnvsc.com) at a [Drupal meet-up](http://groups.drupal.org/nyc). It’s easy to use, reduces clutter in your CSS files, and allows you to easily swap fonts by referencing a different CSS file. I downloaded and used the [Gentium serif font](http://www.fontsquirrel.com/fonts/Gentium-Basic "Gentium font download") for body text, and the [PT Sans sans-serif](http://www.fontsquirrel.com/fonts/PT-Sans "PT Sans font download") for headings.

### Modifying CSS Files

The only change you need to make in the CSS files is to specify the path to the fonts folder. I keep it simple, and place the fonts folder directly below the stylesheets folder (in Flare, this is in `Content/Resources/Stylesheets`). You then need to change the path in two places in each font’s CSS file: for the EOT reference and the TTF (or OTF) reference. In this case, you just add the fonts/ path to each URL reference, shown in bold in the following example:

```css
 @font-face {
      font-family: 'Gentium Basic Regular';
      src: url('fonts/GenBasR.eot');
      src: local('Gentium Basic Regular'), local('GentiumBasic-Regular'),
      url('fonts/GenBasR.ttf') format('truetype');
}
```

In your project’s master CSS file, you then reference the font-family you want. For example:

```css
 body {
      font-family: 'Gentium Basic Regular', Georgia; serif;
      font-size: 14px;
      font-weight: regular;
}
```

As I learned the frustrating way ("...why won’t this _work?!?_"_)_, font names with spaces _must_ be enclosed in _single_, not double, quotation marks.

### Configuring Flare

1. Using Windows Explorer, copy the CSS files to the `Content/Resources/Stylesheets` folder.
2. Create a fonts folder below the Stylesheets folder, and copy the font files to it.
3. Open your Flare project.
4. In Flare, select **Project>Add Stylesheet.**. ![addnewstylesheet](/assets/images/addnewstylesheet_thumb.png "addnewstylesheet")
5. Select **New from existing**, then click Browse (**…**) to locate and import the stylesheet into the project. ![flare import stylesheet](//assets/images/flare-import-stylesheet_thumb.png "flare import stylesheet")
6. Enter the name of the CSS file in the **File Name** text box, and click **Add**.
7. On the Flare toolbar, click **Open Master Stylesheet**.
8. Click the **Options** drop-down, and select **Link Stylesheet**. ![stylesheet links](/assets/images/stylesheet-links_thumb.png "stylesheet links")
9. Add the font CSS files by clicking the double right arrow to move the file to the right, and click **OK**.

>[!NOTE]
>This adds an `@import` declaration in your master CSS file.

When you build your project, the fonts should appear in the output.

![Sample of font embedding](/assets/images/related_docs-150x150.png "related_docs") This WebHelp topic uses @font-face embedding for Gentium and PT Sans

Happy fonting! Let me know if this was helpful, or if you have any questions, in the comments.
