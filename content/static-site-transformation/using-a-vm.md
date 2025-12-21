---
title: Using a virtual development environment
description: Working in a Linux virtual environment helped me focus, learn, and detach from my everyday Windows environment.
FontAwesomeIcon: solid fa-vr-cardboard
featured: true
featuredOrder: 2
---

I've been toying with Linux for decades. I can remember trying to understand OpenSUSE on my [HP 2140 Netbook](https://www.wired.com/2009/01/hp-netbook-review/) back in 2009. I even [presented about using virtual machines (VMs)](https://www.slideshare.net/slideshow/creating-a-drupal-sandbox-using-virtualbox-and-drupal-quickstart/28217861) in 2010.

When I started this project, I knew I wanted to run it in a Linux desktop virtual environment on a VM. Why?

- Compartmentalization. I love Windows and always have. But trying to configure my bread-and-butter machine to work with things I wasn't yet comfortable with added complexity and concern.
- Free! From the [VMWare Workstation](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion) host to the operating system, the only thing it will cost you is some time and disk space (and [may change the way you work](#my-new-daily-driver)).
- Closer to the metal. You can run command-line Linux in Windows with [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/about), but that's mostly an abstraction layer. Running Linux desktop environments directly in a VM is far easier, allows separation &mdash; and has a GUI!
- *Not* MacOS. The only Apple product I've ever owned was an iPad 3 and I hated every minute of it.
- It's *fast*, and the environment is incredibly customizable.
- Easy to learn. Most daily Windows tasks and apps just had a different name and a different UI.
- For the development and writing tasks of this project, it *just worked*.
- Press `Pause` on the VM and you're done for the day.

## How to start using a VM

When I said "some" time, that wasn't *entirely* accurate. You have to make some decisions, but some are actually fun.

- Choosing a virtual machine (VM) host &mdash; I was surprised to learn [VMWare Workstation](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion) was much quicker than [VirtualBox](https://www.virtualbox.org/), which I used for years.
- Trying out "flavors" of Linux is fun &mdash; this is clearly an optional step if you have the time and inclination. I tried various "distros" like Ubuntu and Fedora. Due to my familiarity with Ubuntu, it won. But there are also desktop environments like GNOME and Kubuntu. For me, [Mint Cinnamon](https://linuxmint.com/edition.php?id=302) *just worked*. I bought a laptop and installed Mint on it, and it was incredibly painless to install and configure.
- Each VM and distro I tested were straightforward in terms of setup and had lots of handholding, as well as [pretty good documentation](https://linuxmint.com/documentation.php).

Realistically, there is a steep learning curve to working with Linux as a development environment. To run a lot of development tools, you need to install and configure things by command line interface (CLI). Like a VPN. Or NodeJS. Or an SSG server.

Other than that, you rarely interact with the operating system anymore; your time is spent using apps that are generally cross-platform like VS Code and GitHub. You'd have to do this in any platform, and if this sounds like a lot, then Windows or Mac will do a lot of it for you.

## And then one day &hellip;

One day in mid-March I opened my VM to find it no longer had internet connectivity. My host computer had access, other VMs I was testing had connectivity, so *something* happened to my working version. An hour or so searching and the answer was&hellip; well, I'm not 100% sure. Somehow the VM's connectivity was changed in the overall settings. It's *possible* that it broke from a major Linux update. Regardless, it was time lost trying to find the right magic commands. If you do this in a VM, it's far easier to recover without affecting your daily Windows machine. and sometimes it's just easier to start up a new virtual machine (as long as you're using version control!).

## My new daily driver

Speaking of daily machines, fast-forward and Kubuntu is my daily driver operating system. The only time I boot into Windows is when I want to play my motorsport games with a sim-racing rig. Everything else &mdash; including my [favorite city-building game](https://www.paradoxinteractive.com/games/cities-skylines-ii/about) &mdash; run great in Linux.
