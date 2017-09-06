# Setting up the Kerberos Server

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

## Install Network Time Protocol

```
	sudo apt install ntp
```

## Install Kerberos Tools

```
	sudo apt install krb5-kdc krb5-admin-server
```

## VMs and Random Number Generators

The VMs have slow random number generators (ie not hardware) which are used in key generation.  Install the following tool to speed up Random Number Generation:

	sudo apt install haveged -y

### Initialize the Kerberos Database

	krb5_newrealm

	Remember YouDatabase Master Key: iamkdc