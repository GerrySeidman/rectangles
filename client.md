
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

# Install AuriStor

sudo dpkg -i auristorfs-modules*`uname -r`*.deb
sudo dpkg -i auristorfs-common*
sudo dpkg -i auristorfs-client*


## Links to Sample Files from this Lab

* The following files will have been edited in this lab:
	* /etc/network/interfaces
	* /etc/hostname
	*  /etc/krb5.conf
	




<!--stackedit_data:
eyJoaXN0b3J5IjpbMTk3MjE4NTU2OV19
-->