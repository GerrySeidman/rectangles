# Setting up the AuriStor File Server

# INCOMPLETE SECTION
## I DO NOT KNOW HOW TO SET UP JUST A FILE SERVER

## Clone and prepare AuriStor File Server VM

### Clone VM 
Steps found in section [Cloning Stem VM](cloningStemVM.md)

### Set Hostname and Static IP address

```
export NEW_HOST=afsfs1
export NEW_IP=192.168.10.140

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hosts
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hostname
sudo reboot
```

## Install Network Time Protocol

	sudo apt install ntp

## Install Kerberos Client Tools

```
apt install krb5-user
```
> When Prompted for the Kerberos Realm Name, enter ```PLAY.GERRY```

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTIyODQ2MDg4NF19
-->