# Stem VM Setup #2

## Approach


For this test environment, we will be setting up a all VMs as VirtualBox VMs on the local laptop.  

We will first create a "Stem Cell" VM image.  This will be the basis for all the VMs we are using. They will be VirtualBox "link cloned" from this Stem image which has the common preparation before any machine specific setup. 

	TO-DO: Eventually we want to automate this with Vagrant and Ansible (or other such tools).
    
The Stem Image will be configured with

* Ubuntu 16.04 
* A Host-Only adapter for a local private network shared by the VMs and the Host machine.  Each VM will have a unique static IP addresss. See ["Cluster Overview"](clusterOverview.md) for more details
* A NAT Network adapter with access to the internet and an IP address obtained via DHCP.  This would not be 

For this tutorial we are going to set up DNS and for our cluster use the domain name "test.gerry". 

## What we will do in this section

1. We will install VirtualBox  installed
2. We will download the Ubuntu ISO image
3. We will created/configured the Virtual Box Host-Only Adapter
4. We will create a "Tutorial Stem" VM
5. We will install Ubuntu onto the Tutorial Stem
6. We will configure the Tutorial Stem's Host-Only adapter with the static IP 192.168.10.100 
7. We will set the host name for the Tutorial Stem to 'stem1'
8. We will set up Network Time Protocol (NTP)

> For those familiar with setting up Ubuntu 16.04 and VirtualBox Networking, you can go straight to 6 & 7.    Of note is the specifying the DNS server in ```/etc/network/interfaces``` in anticipation of the later step of setting up DNS.


## Linux Version for the Tutorial

We will be using Ubuntu 16.04 for this tutorial.   Specifically, I used ubuntu-16.04.2-server-amd64.iso to build my Stem VM image.

## Installing Virtual Box

Installing up VirtualBox is outside the scope of this Tutorial.  https://www.virtualbox.org

## Getting Ubuntu ISO image

You can obtain the Ubuntu 16.04 Server ISO image from: https://www.ubuntu.com/download/server

## Configure a VirtualBox Host-Only Network Adapter

From the Virtual Box GUI you can create or configure Host-Only Network Adapters.  These are actual adapters visible on the Host computer that can be used by VMs in setting up private networks available only to the Virtual Machines using this adapter and the Host Machine. 

We will create our private network with each VM having a unique static IP in the range 192.168.10.xx  

Below are the steps for creating the Host-Only Netw can be accomplished from the VirtualBox GUI 

* Under "File => Preferences..."
* From Pop-up Select "Network"
* Select "Host-Only" Network Tab
* Create or Select an existing "Virtual Box	Host-Only Network Adapter #4"
* This brings up a configuration dialog box
* Set the "IPv4 Address" to 192.168.10.1
* Set the "IPv4 Network Mask" to 255.255.255.0

![[Configuring Network Adapter]](images/configNetworkAdapter.jpg "Configuring Network Adapter")

> Note: This will appear as an adapter on your host machine.  You will be able to see it  by running the command  `ifconfig` on Linux, `ipconfig` on Windows on your host machine to lists all adapters on your host machine.


## Creating your Stem Ubuntu VM in VirtualBox

Creating the VM is beyond the scope of this tutorial.  Be sure you create the Ubuntu Linux VM and use the iso you just downloaded.  Selecting all the defaults values are fine.  We can adjust memory limits later for the respective VMs we clone from this.

Once you've created the VM, upon starting it you will be prompted for the location of the Ubuntu ISO image so you may install the VM into the image.

```
TODO:  We could use the images that I grabbed in <IMG:40> - <IMG:45>

![[Image for Network Adapter #1]](images/adapter1.jpg "Network Adapter #1")
![[Image for Network Adapter #2]](images/adapter1.jpg "Network Adapter #1")

![[Cloning a VM]](images/cloneVM.jpg "Cloning a VM")

![[Creating Host Only Network Adapter]](images/hostOnlyNetwork.jpg "Creating Host Only Network Adapter")

> ![[Network Preferences]](images/networkPreferences.jpg "Network Preferences")
```


At this point you have a base install of Ubuntu.  The NAT network will be configured automatically by DHCP, but we will need to set up a static IP address for the Host-Only private network.

## Setting the Static IP address

First note the network adapters available to this VM

	$ sudo ls /sys/class/net
    enp0s3 enp0s8 lo
    
> You may get different names for these adaptors
    
And you can see how these adaptors are bound with the ```ifconfig``` config.  You will notice that one of these are not bound (in my case ```enp0s8```, you may get a different name for the unused adapter)

The configuration for binding these adapters is found in the file ```/etc/network/interfaces```

``` 
$ cat /etc/network/interfaces
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto enp0s3
iface enp0s3 inet dhcp
```

As you see, the adapter ```enp0s8``` is not configured in the file.  We add this by editing the file:

```
$ sudo vi /etc/network/interfaces
```

Appending the below to the end of the file ```/etc/network/interfaces```.  Remember our unused adaptor was ```enp0s8```, you will have to use the name of your unused adapter if it is different. 

```
#The host-only network interface
auto enp0s8
iface enp0s8 inet static
address 192.168.10.100
netmask 255.255.255.0
network 192.168.10.0
broadcast 192.168.10.255
dns-nameservers 192.168.10.110
dns-search test.gerry
dns-domain test.gerry
```

> Note: The last three lines are in anticipation of our setting up DNS.  The domain name for our private network will be ```test.gerry``` See  [Cluster Overview](clusterOverview.md) and [DNS Server](dnsServer.md) to understand


## Setting Host Name

In Ubuntu, the hostname is specfied in two files ```/etc/hostname``` and ```/etc/hosts```

```
$ cat /etc/hostname
ubuntu-1

$ cat /etc/hosts
gerry@afs1:~$ cat /etc/hosts
127.0.0.1       localhost
127.0.1.1       ubuntu-1

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```

In both of these files replace the old hostname ```ubuntu-1``` with ```stem```
> This must be done as su, so ```sudo vi  /etc/hosts```

```
$ cat /etc/hostname
stem

$ cat /etc/hosts
127.0.0.1       localhost
127.0.1.1       stem

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```

## Setting up Network Time Protocol (NTP)

The Kerberos protocol is sensitive to time differences between the KDC and a Kerberos client application.  As such it is necessary to  run a time synchronization service, such as NTP, on your KDC.

Install NTP with 
```
sudo apt install ntp	
```


## Cloning and Configuring From Stem

Blah blah VirtualBox Clone.  The `clone` will by still have the static IP address and host name 'stem1'
```
sudo sed -i -- 's/stem1/HOSTNAME/g' /etc/hostname
sudo sed -i -- 's/stem/HOSTNAME/g' /etc/hosts
sudo sed -i -- 's/192.168.10.100/192.168.10.IP-ADDRESS/g' /etc/network/interfaces
```



## Linux Kernel Caveat
The AuriStor package files (.deb) are available on the AuriStor repository for most kernel versions. While unlikley, it is possible that the packages have not yet been built for the Ubuntu Kernel Version you have installed.

To find out your Linux Kernel version:  
    
>
```
$ uname -r
4.4.0-87-generic
```

Refer to the section [Getting the AuriStor Software]("getAuriStorSoftware.md") to see which kernel versions are available.

If you do not find a matching package file, you will have to downgrade your kernel.  In structions can be found in [Downgrading your Kernel]("downgradingKernel.md")