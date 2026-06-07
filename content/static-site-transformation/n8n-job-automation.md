---
title : 'Using AI and n8n to automate my job hunt'
description : When you're in the job hunt, you get a *lot* of emails. You're buried in a sea of LinkedIn job alerts. Ones with jobs you've seen several times. Ones with jobs you applied for a month ago.
tags : content-strategy
FontAwesomeIcon : "solid fa-file-waveform"
date: 2026-06-08
---

As part of my homelab journey I learned about an orchestration layer called *n8n* (an abbreviation for yet another horrible tech portmanteau called "nodemation"). This app automates processes between various applications. I intially thought it was overkill for my use cases, but then I found a problem in search of a solution - my emails.

You could definitely do all of this with automation in other tools such as [Obsidian](https://obsidian.md). You're then asking one tool to do the job of several, without a lot of logic for you to play with. It also means if you decided to switch tools, you'd have to recreate those automations. Doing it in a dedicated tool&thinsp;&mdash;&thinsp;while certainly more complex&thinsp;&mdash;&thinsp;made sense to me and helped me improve my logic and AI skills.

It all started with me watching a few YouTube videos and mapping out what I *thought* an automation should do:

>I want to use n8n to create a summary email of my incoming job search emails. The following is a proposed initial workflow; poke holes in this process. Be sure to ask questions before proceeding.
>Job email summarization automation
>
>Retrieves emails from IMAP (Zoho).
>Capture emails that currently go in the job search folders based on from address, i.e. jobalerts-noreply@linkedin.com
>
>>- Read each email as it comes in using Ollama:
>
  >>- Strips out irrelevant text (or pull body text instead?)
  >>- Stores the relevant content in temp storage
  >>- Compares to existing data in the store
  >>- Removes any redundancies
  >>- Ensures ones I've already seen don't bubble up in new summary
  >>- Based on content similarity
>
>>- Generates once-daily HTML email at 7 am that:
>
  >>- Displays each job sorted by date descending (newest emails after filtering first)
  >>- Gives a summary of job title, on-site/hybrid/remote, full-time or contract, rate if contract/salary if full-time, recruiter name
  >>- Includes links to job, company website (if available), direct link to job on company's careers/jobs page (if applicable)

I asked my local LLM and Claude to poke holes in this logic. Needless to say, they did. And so my weekend exploration started.

I went back and forth with Claude (simply because it was faster) over several free, timed-out sessions. I am very much a cart before the horse person so I had to be kind to myself over the learning curve. Honestly there were things even Claude got incorrect. Some of my interactions were frustrating, but all bore some fruit - often when my tokens timed out for the day.

- Instead of a database, we used Google Sheets, which has built-in n8n support. This meant I didn't have to maintain a separate database on my local machine and reduced complexity of the workflow. It relies on Google Sheets, so it's not completely self-hosted, but there's no personal information being shared.