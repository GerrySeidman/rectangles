
# Client machine

## Create a new VM for the Client 

Clone VM and configure from the 
``` bash
export NEW_HOST=client
export NEW_IP=192.168.10.99

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hosts
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

>>**@@@@ DOUBLE CHECK IF IF THIS IS SUFFICIENT OR IF WE HAVE TO COPY/EDIT FILES.  I may have done so with my test 'client machine'**


# Install AuriStor

sudo dpkg -i auristorfs-common*
sudo dpkg -i auristorfs-client*


<!--stackedit_data:
eyJoaXN0b3J5IjpbMzgwMDk4OTk3XX0=
-->