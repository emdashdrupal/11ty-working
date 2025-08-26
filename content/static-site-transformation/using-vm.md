---
title: Using a virtual development environment
description: Working in a Linux virtual environment helped me focus, learn, and detach from my everyday Windows environment.
FontAwesomeIcon: solid fa-vr-cardboard
featured: true
featuredOrder: 2
---

I've been toying with VMs since at least 2014. Why?

- Compartmentalization. I love Windows and always have. YMMV. But trying to configure my bread-and-butter machine to work with things I wasn't yet comfortable with added complexity and concern.
- Free! From the VM host [VMWare Workstation](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion) to the operating system, the only thing it will cost you is some time (and disk space).
- Closer to the metal. Sure, you can run Linux in Windows with [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/about), but that's command-line Linux server. This is far easier, allows separation &mdash; and has a GUI!
- *Not* MacOS. The only Apple product I've ever owned was an iPad 3 and I hated every minute of it.
- It *is* fast, and the environment is incredibly customizable. Most things you do in Windows just had a different name and a different UI.
- For the development and writing tasks I've had to do over this project, it *just worked*.
- Press `Pause` and you're done for the day.

## How to start with a VM

- Choosing a virtual machine (VM) host &mdash; I was surprised to learn [VMWare Workstation](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion) performed far quicker than [VirtualBox](https://www.virtualbox.org/), which I used for years.

- Trying out "flavors" of Linux is fun &mdash; this is clearly an optional step if you have the time and inclination. As a long-time wannabe Linux user, I had to try different "distros" like Ubuntu, Kubuntu, and Fedora. [Mint Cinnamon](https://linuxmint.com/edition.php?id=302) was the right one to "just work". I bought a laptop and installed Mint on it, and it was incredibly painless; everything just worked.

Each VM and distro I tested were straightforward in terms of setup and had lots of handholding, as well as [pretty good documentation](https://linuxmint.com/documentation.php).

Realistically, there is a steep learning curve to working with Linux. No matter what anyone tells you about desktop Linux environments, you still need to install and configure things by command line. Like a VPN. Or NodeJS. Or running an SSG server. Other than that, you rarely interact with the operating system anymore; your time is spent using apps that are generally cross-platform.

## And then one day &hellip;

One day in mid-March I opened my VM to find I no longer had internet connectivity. My host computer had access, other VMs I was testing had connectivity, so *something* happened to just my working version. An hour or so searching and the answer was&hellip; well, I'm not 100% sure. Somehow the VM's connectivity was changed in the overall settings, which I dnn't recall doing. It's *possible* that it broke from a major Linux update. Regardless, it was time lost trying to find the right magic commands.
