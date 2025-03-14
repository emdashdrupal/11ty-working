---
title : "Creating a virtual development environment"
description: Working in a Linux virtual environment helped me focus, learn, and separate from my everyday Windows environment.
FontAwesomeIcon: solid fa-vr-cardboard
---

I've been toying with VMs [since at least 2014](/technical-writing-examples/2013-12-08-creating-a-drupal-sandbox-with-virtualbox-and-drupal-quickstart-presentation/). Why?

- Compartmentalization. I love Windows and always have. YMMV. But trying to configure my bread-and-butter machine to work with things I wasn't yet comfortable with added complexity and concern.
- Free! From the VM host [VMWare Workstation](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion) to the operating system, the only thing it will cost you is some time (and disk space).
- Closer to the metal. Sure, you can run Linux in Windows with [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/about), but that's command-line Linux server. This is far easier, allows separation &mdash; and has a GUI!
- *Not* MacOS. The only Apple product I've ever owned was an iPad 3 and I hated every minute of it.
- It *is* fast, and the environment is incredibly customizable. Most things you do in Windows just had a different name and a different UI. For the development and writing tasks I've had to do over this project, it *just worked*.
- Press `Pause` and you're done for the day.

## How to start with a VM

- Choosing a virtual machine (VM) host &mdash; I was surprised to learn [VMWare Workstation](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion) performed far quicker than [VirtualBox](https://www.virtualbox.org/), which I used for years.

- Trying out "flavors" of Linux is fun &mdash; this is clearly an optional step if you have the time and inclination. But as a long-time wannabe Linux user, I had to try different "distros" like Ubuntu, Kubuntu, and Fedora. [Mint Cinnamon](https://linuxmint.com/edition.php?id=302) was the right one to "just work". I bought a laptop and installed Mint on it, and it was incredibly painless; everything just worked.

Each VM and distro I tested were straightforward in terms of setup and had lots of handholding, as well as [pretty good documentation](https://linuxmint.com/documentation.php).

All this said, there is a steep learning curve to working with Linux. No matter what anyone tells you about desktop Linux environments, you still need to install and configure things by command line. Like a VPN. Or NodeJS. Or running an SSG server.