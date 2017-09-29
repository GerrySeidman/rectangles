# Setting up the Kerberos Server

## The Kerberos Realm

 For this Cookbook Tutorial we will be using `PLAY.GERRY` as the Kerberos Realm name

If you are not familiar with Kerberos, please refer to the section [About Kerberos](aboutKerberos.md)

Also recall that Network Time Protocol (NTP) was already installed in our  [Stem VM](stemVM.md)


## Clone and preparer Kerberos Server VM

### Clone VM 
Steps found in section [Cloning Stem VM](cloningStemVM.md)

### Set Hostname and Static IP address

```
export NEW_HOST=krb1
export NEW_IP=192.168.10.120

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hosts
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hostname
sudo reboot
```


##
 Install Kerberos Tools

```
	sudo apt install krb5-kdc krb5-admin-server

You will be prompted with the following screen:

![[InstallingKerberos]](https://raw.githubusercontent.com/GerrySeidman/rectangles/tutorial/images/file:///X:/afsTutorial/images/installingKerberos.jpg "Installing Kerberos")

```

## VMs and Random Number Generators

The VMs have slow random number generators (ie not hardware) which are used in key generation.  Install the following tool to speed up Random Number Generation:

	sudo apt install haveged -y

### Initialize the Kerberos Database

	krb5_newrealm

	Remember YouDatabase Master Key: iamkdc

------------------

Leftover from other notes

# Kerberos and Time

The Kerberos protocol is sensitive to time differences between the KDC and a Kerberos client application.

On all machines install Network Time Protocol (NTP

	sudo apt install ntp

	

# Kerberos Realm Names

You must choose your own Kerberos realm name.
Do not use the name YOUR-KRB5-REALM.COM

	For this tutorial the Realm name is PLAY.GERRY

For help choosing your Kerberos realm name, see:
http://web.mit.edu/kerberos/krb5-devel/doc/admin/realm_config.html

Your domain name and your Kerberos realm name may differ
You are not required to use the same name for your domain and for your Kerberos realm. You may choose to use the same name for your domain and for your Kerberos realm.

In this example the domain name is your-cell-name.com and the Kerberos realm 
name is YOUR-KRB5-REALM.COM

To initialize the Kerberos database KDC you use the “krb5_util” command.
You must specify your Kerberos realm name on the “krb5_util” command line.

Kerberos realm names are upper case.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyOTAzMjUxMDldfQ==
-->