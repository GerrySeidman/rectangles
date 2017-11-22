
# Client machine

## Create a new VM for the Client 

Clone VM and configure from the 
``` bash
export NEW_HOST=client
export NEW_IP=192.168.10.99

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hostname
sudo reboot
```

# Installing Kerberos Client

The Kerberos client can be installed in any other machine in our Project Cluster (those cloned from our Stem VM).  

``` bash
sudo apt install  krb5-user
```

It will automatically pick up the Kerberos Realm `PLAY.GERRY` from DNS. 

![[InstallingKerberos]](https://raw.githubusercontent.com/GerrySeidman/rectangles/tutorial/images/installingKerberosClient.jpg "Installing Kerberos")




## Setting up the krb5.conf File

Install a copy of `krb5.conf` onto`/etc/krb5.conf	`

# Install AuriStor Client 


## Install AuriStor module & common packages

sudo dpkg -i auristorfs-modules*`uname -r`*.deb
sudo dpkg -i auristorfs-common*

## Install AuriStor Client Package

During the installation, will be prompted 3 times with the following screens

* AuriStor Cell Name: `play.gerry`
* Cache Size: `200000`
* Lookup AuriStorFS cells in DNS: `Yes`


![[ xxxxx ]](https://raw.githubusercontent.com/GerrySeidman/rectangles/tutorial/images/configuringAuriStorClient.jpg " xxxx")

![[ xxxxx ]](https://raw.githubusercontent.com/GerrySeidman/rectangles/tutorial/images/configuringAuriStorClient-cacheSize.jpg " xxxx")

![[ xxxxx ]](https://raw.githubusercontent.com/GerrySeidman/rectangles/tutorial/images/configuringAuriStorClient-dbServer.jpg " xxxx")

	
``` bash

gerry@afsdb1:~/auristorSoftware$ sudo dpkg -i auristorfs-client*
Selecting previously unselected package auristorfs-client.
(Reading database ... 59996 files and directories currently installed.)
Preparing to unpack auristorfs-client_0.1591-1.20170805gitdebian~auristor_amd64.deb ...
Unpacking auristorfs-client (0.1591-1.20170805gitdebian~auristor) ...
Setting up auristorfs-client (0.1591-1.20170805gitdebian~auristor) ...
update-alternatives: using /usr/bin/pagsh.yfs to provide /usr/bin/pagsh (pagsh) in auto mode
Processing triggers for ureadahead (0.100.0-19) ...
Processing triggers for man-db (2.7.5-1) ...
gerry@afsdb1:~/auristorSoftware$



## Links to Sample Files from this Lab

* The following files will have been edited in this lab:
	* /etc/network/interfaces
	* /etc/hostname
	*  /etc/krb5.conf
	




<!--stackedit_data:
eyJoaXN0b3J5IjpbNjM4NzY2NzE2XX0=
-->