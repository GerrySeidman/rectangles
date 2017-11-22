
# From Zero to Local VM Cluster

## What you will have at the end of this Cookbook
This cookbook will guide you from little to no understanding of Virtual Machines, Networking, or DNS to having a fully functional cluster of virtual machines using Virtual Box to manage the VMs

While some of you will be intimately familiar with VMs, VirtualBox, Linux, etc.,  this tutorial will assume nothing and walk through all the steps to create a VM Cluster playground environment working locally as a collection of Virtual Machines running on your desktop/laptop.

## Motivation 

My original motivation for writing this cookbook came from my interest in setting up a local Kubernetes cluster completely locally to my laptop so I could do some experimenting myself and to teach others how to do the same.  While there were cookbooks to get things going on managed Cloud providers (ie Google Cloud),  I wasn't able to find a place where all the basic information was available to easily get this set it up locally. 

My general philosophy is always that you should never use a tool that you don't know how to write.  I'm not saying that you have to write them, but that you should know what they are doing.  While there are great tools for setting up Kubernetes clusters in GCE and Kubernetes distributions by vendors like CoreOS, it is important to understand what they are doing for you so that you can design, develop, and debug clustered applications.

## Steps

* Understanding Networks
* Understanding VMs
* Understanding VirtualBox
* Installing Virtual Box
* Setting up a Stem VM
	* Downloading Linux Distribution
* [Setting up the Stem VM](stemVM.md)
* [Cloning a VM from Stem VM](cloningStemVM.md)
 * [Creating the remaining VMs(cloningStemVM.md)



## Preparatory Steps

In the first few steps we'll set up a "Stem Cell" VM that has the base operating system and network configured.   We will use this to Clone all the other VM images from.  Even if you already know how to do this, please scan that section or you may miss some things.  For example we install NTP on our Stem image.

To get a full AuriStor playground up and running, you will first need to set up DNS and Kerberos.  This is often the hardest part.  The following few steps walks through setting these up.

Once these are set up, we can go head with the primary task, setting up our AuriStor servers.


## Network Topology

The network topology will include a local private network (Host-Only Adapter) for all the servers.  During development a NAT network adapter will also be on each machine for access to download software.  Ultimately the NAT network will be disabled and/or a Firewall would be set up.

> TODO: Image for this...



| Type | Description | Host Name(s) | Static IP(s) |
| --- | --- | --- | --- |
| DNS | DNS | DNS Server | dns1.play.gerry | 192.168.10.110 |
|Stem | Stem* | stem1.play.gerry | 192.168.10.110 |
 Kubernetes Master| Kubernetes Master| kubm1.play.gerry | 192.168.10.120 |
| Kubernetes Worker | Kubernetes Worker-1 | kubw1.play.gerry  | 192.168.10.130 |
| Kubernetes Worker | Kubernetes Worker-2 | kubw2.play.gerry  | 192.168.10.131 |
| Client | Access File System | client.play.gerry| 192.168.10.99 |

(*) - The Stem VM is only used while setting up your cluster.

> (+) In production there will be multiple machines for each of these servers.   In this tutorial we will only be running multiple file servers (afs2, afs3)

> Note: In the above, every server running on a different machine. It is also possible to run multiple servers on the same machine.  While this makes sense in testing/local environments, for completeness in this tutorial we will run everything on different machines to stress the 'best practices' and correct configurations.
>
> Once everything is set up, any machine on the Host-Only or NAT network should be able to access the AuriStor Servers in our playground.  We will instantiate a client machine in the Host-Only network for testing, though we should also be able to access it from any machine on the NAT or beyond (with port forwarding)






<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA2NjA0NjA2NiwtNTc2MTYzOTg5XX0=
-->