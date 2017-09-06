# AuriStor Getting Started Tutorial

>### TO-DO
* Kerberos Client
* DNS

## Zero to AuriStor

The target audience for this tutorial is anyone planning to evaluate or support a production AuriStor environment cluster and wants to understand how everything fits together. While many of you will be intimately familiar with VMs, Linux, etc.,  this tutorial will assume nothing and walk through all the steps to create a AuriStor playground environment working locally as a collection of Virtual Machines running on your desktop/laptop.

We will also need to create a private network for all the 


This Tutorial starts with a section on setting up a "Stem Cell" VM on 

To get a full AuriStor playground up and running, you will first need to set up DNS and Kerberos.  This is often the hardest part, so we 





## Topology

The network topology will include a local private network (Host-Only Adapter) for all the servers.  During development a NAT network adapter will also be on each machine for access to download software.  Ultimately the NAT network will be disabled and/or a Firewall would be set up.


## Target Audience

The target audience for this tutorial is someone planning to support a production AuriStor environment cluster and wants to understand how everything fits together.


| Type | Description | Machine Name(s) | Static IP(s) |
| --- | --- | --- | --- |
| DNS | DNS Server | dns1 | 192.168.10.110 |
| Kerberos | Kerberos Server| krb1 | 192.168.10.120 |
| AFS Database | AFS VDB/BOS/Protection | afsdb1  (+)| 192.168.10.130 (+) |
| AFS File Server | AFS File Server | afsfs1 (+)| 192.168.10.140 (+) |

> (+) In production there will be multiple machines for each of these servers.   In this tutorial we will only be running multiple file servers (afs2, afs3)

> Note: In the above, every server running on a different machine. It is also possible to run multiple servers on the same machine.  While this makes sense in testing/local environments, for completeness in this tutorial we will run everything on different machines to stress the 'best practices' and correct configurations.



## Machine Setup

Clone Stem VM

Boot Machine

```
sudo sed -i -- 's/stem/dns1/g' /etc/




## Steps

* [Setting up the Stem VM](stemVM.md)

