---
title: Creating a portfolio website using a virtual development environment
description: Building my technical writing website in a virtual environment helped me focus, learn, and detach from my everyday Windows environment.
FontAwesomeIcon: solid fa-vr-cardboard
featured: true
featuredOrder: 2
---

I've experimented with Linux for decades. I played around with [Red Hat Linux](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux) in the early 2000s at my first tech writing job. I *tried* to understand [OpenSUSE](https://www.opensuse.org/) on my [HP 2140 Netbook](https://www.wired.com/2009/01/hp-netbook-review) back in 2009 (eventually I installed Ubuntu). I even [presented about using virtual machines (VMs)](https://www.slideshare.net/slideshow/creating-a-drupal-sandbox-using-virtualbox-and-drupal-quickstart/28217861) back in 2010.

When I decided to rebuild my website, I knew I wanted to develop it in a Linux desktop virtual environment on a VM. Why?

- Compartmentalization. I love Windows and always have. But trying to configure my bread-and-butter machine to work with things I wasn't yet comfortable with added complexity and concern.
- Free! From the [VMWare Workstation](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion) host to the operating system, the only thing it will cost you is some time and disk space (and [may change the way you work](#my-new-daily-driver)).
- It allowed me to configure, test, and run static site generators (SSGs) like Hugo and Eleventy in the environments they'll eventually run.
- You can run command-line Linux in Windows with [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/about), but that's an [abstraction layer](https://en.wikipedia.org/wiki/Abstraction_layer) and takes a performance hit. Running Linux desktop environments directly in a VM is far easier, allows separation &mdash; and has a GUI!
- *Not* Apple. The only Apple product I've ever owned was an iPad 3 and I hated every minute of it.
- It's *fast*, and the environment is incredibly customizable.
- Easy to learn. Most daily Windows tasks and apps just had a different name and a different UI.
- For the development and writing tasks of this project, it *just worked*.
- Press `Pause` on the VM and you're done for the day.

## How to start using a VM

When I said "some" time, that wasn't *entirely* accurate. You have to make some decisions, but some are actually fun.

- Choosing a virtual machine (VM) host &mdash; I was surprised to learn [VMWare Workstation](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion) was much quicker than [VirtualBox](https://www.virtualbox.org), which I used for years.
- Trying out "flavors" of Linux is an optional step if you have the time and inclination. I tried distributions like Fedora and Ubuntu; due to my familiarity with Ubuntu and self-imposed deadlines, it won.
- Then there are desktop environments like GNOME and Kubuntu. For me, the Ubuntu-based [Mint Cinnamon](https://linuxmint.com/edition.php?id=302) *just worked*. I bought a laptop and installed Mint on it, and it was incredibly painless to install and configure.
- Each VM and distro I tested were straightforward in terms of setup and had lots of handholding, as well as [pretty good documentation](https://linuxmint.com/documentation.php).

There's a learning curve to working with Linux. You need to install and configure many development tools and frameworks by command line interface (CLI), like a VPN, or NodeJS, or an SSG. You'd have to do this in any platform, and if this sounds like a lot, there are Windows or Mac apps that will do a lot of it for you.

Once you get over that curve, your mostly spend your time using cross-platform apps and technologies like VS Code, GitHub, and OpenOffice.

### And then one day &hellip;

One day I opened my VM to find it no longer had internet connectivity. My host (Windows) computer had access, other VMs I was testing had connectivity, so *something* happened to my working version. An hour or so searching and the answer was&hellip; well, I'm not sure. The VM's connectivity was changed in the overall settings. It's *possible* that it broke from an update, but it was time lost trying to find the right magic commands. Sometimes the answer is to start over with a new virtual machine. Using GitHub for version control made it much quicker to recover and keep working. The good news is that if you do this in a VM, it's far easier to recover without affecting your daily Windows machine.

## My new daily driver

Fast-forward and I grew out of Mint. Kubuntu is my daily OS; it's so much more *customizable*.

![Customized Kubuntu desktop](../../assets/images/kubuntu-desktop-customization.png)
I only boot into Windows to play motorsport games with a sim-racing rig. Everything else &mdash; including my [favorite city-building game](https://www.paradoxinteractive.com/games/cities-skylines-ii/about) &mdash; run great in Linux. I've even created my own homelab based on Linux.

## Conclusion

Working in this environment provided a teaching moment, separated work from daily life, and eventually led to a complete change in how I use my computers. I don't always love the learning curve, but I have zero regrets in choosing to build my site this way.