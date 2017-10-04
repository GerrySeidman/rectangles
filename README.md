# AuriStor Getting Started Tutorial

Reference this document: http://techpubs.spinlocksolutions.com/dklar/afs.html

>### TO-DO
* DNS
* Kerberos Server
* AuriStor DB Server
* AuriStor File Server
* Client machine
* Make sure all Sample Files are available
* Does installing the AuriStor client automatically bring in the kerberos client? ???
	* sudo apt install  krb5-user
	* On client un-comment DNS-lookup false


> Question: Do we want to install the Kerberos Client in the Stem image?  TBD: We'll see how much work it is to install on each machine...

## Zero to AuriStor

The target audience for this tutorial Stem"is anyone planning to evaluate or support a production AuriStor environment cluster and wants to understand how everything fits together. While many of you will be intimately familiar with VMs, Linux, etc.,  this tutorial will assume nothing and walk through all the steps to create a AuriStor playground environment working locally as a collection of Virtual Machines running on your desktop/laptop.

### Preparatory Steps

In the first few steps we'll set up a "Stem Cell" VM that has the base operating system and network configured.   We will use this to Clone all the other VM images from.  Even if you already know how to do this, please scan that section or you may miss some things.  For example we install NTP on our Stem image.

To get a full AuriStor playground up and running, you will first need to set up DNS and Kerberos.  This is often the hardest part.  The following few steps walks through setting these up.

Once these are set up, we can go head with the primary task, setting up our AuriStor servers.


## Network Topology

The network topology will include a local private network (Host-Only Adapter) for all the servers.  During development a NAT network adapter will also be on each machine for access to download software.  Ultimately the NAT network will be disabled and/or a Firewall would be set up.

> TODO: Image for this...



| Type | Description | Host Name(s) | Static IP(s) |
| --- | --- | --- | --- |
| DNS | DNS Server | dns1.play.gerry | 192.168.10.110 |
| Kerberos | Kerberos Server| krb1.play.gerry | 192.168.10.120 |
| Database Server | AuriStor VDB/BOS/Protection | afsdb1.play.gerry  (+) | 192.168.10.130 (+) |
| File Server | AuriStor File Server | afsfs1.play.gerry (+) | 192.168.10.140 (+) |
| Client | Access File System | client.play.gerry| 192.168.10.99 |


> (+) In production there will be multiple machines for each of these servers.   In this tutorial we will only be running multiple file servers (afs2, afs3)

> Note: In the above, every server running on a different machine. It is also possible to run multiple servers on the same machine.  While this makes sense in testing/local environments, for completeness in this tutorial we will run everything on different machines to stress the 'best practices' and correct configurations.
>
> Once everything is set up, any machine on the Host-Only or NAT network should be able to access the AuriStor Servers in our playground.  We will instantiate a client machine in the Host-Only network for testing, though we should also be able to access it from any machine on the NAT or beyond (with port forwarding)






## Steps

* [Setting up the Stem VM](stemVM.md)
* [Cloning a VM from Stem VM](cloningStemVM.md)
* [Linux Kernel Caveat](downgradingKernel.md)
* [Setting up the DNS Server](dnsServer.md)
* [Kerberos](kerbero.md)
* [Setting up the Kerberos Server](kerberosServer.md)
* [Getting the AuriStor Software](getAuriStorSoftware.md)
* [Setting up the AuriStor File Server](auriStorFileServer.md)
* [Setting up the AuriStor Database Server](auristorDBServer.md)
* [Setting up the AuriStor Client](auriStorClient.md)

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQxOTE4ODc2NV19
-->