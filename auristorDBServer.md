# Setting up the AuriStor Database Server

## Clone and prepare AuriStor Database Server VM

### Clone VM 
Steps found in section [Cloning Stem VM](cloningStemVM.md)

### Set Hostname and Static IP address

```
export NEW_HOST=afsdb1
export NEW_IP=192.168.10.130

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hosts
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hostname
sudo reboot
```

## AuriStor Software 

<< THIS IS JUNK >> MFH: Go to https://filedrawers.auristor.com/ then navigate to /afs/your-file-system.com/public/yfs/recommended  if you don’t already have a working AFS client on another machine with which to get the rpms (need authentication for the your-file-system.com cell, talk to Auristor)

From: 
```
//AFS/your-file-system.com/public/yfs/recommended/server/xenial/pool/server/a/auristor

auristorfs-dbserver_0.1591-1.20170805gitdebian~auristor_amd64.deb
auristorfs-fileserver_0.1591-1.20170805gitdebian~auristor_amd64.deb
auristorfs-server_0.1591-1.20170805gitdebian~auristor_amd64.deb
```
From:
```
//AFS/your-file-system.com/public/yfs/recommended/client/xenial/pool/client/a/auristorfs-modules3-4.4.0-87-generic-source

auristorfs-modules3-4.4.0-87-generic_0.1591-1.20170805gitdebian~auristor_amd64.deb
```

From:
```
//AFS/your-file-system.com/public/yfs/recommended/client/xenial/pool/client/a/auristor

auristorfs-client_0.1591-1.20170805gitdebian~auristor_amd64.deb
auristorfs-common_0.1591-1.20170805gitdebian~auristor_amd64.deb
auristorfs-doc_0.1591-1.20170805gitdebian~auristor_all.deb
auristorfs-fuse_0.1591-1.20170805gitdebian~auristor_amd64.deb
libauristorfs-dev_0.1591-1.20170805gitdebian~auristor_amd64.deb
libkauristor1_0.1591-1.20170805gitdebian~auristor_amd64.deb
```

## On AFS-1 

dpkg -i auristorfs-modules*`uname -r`*.deb
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjU5MDg0NjU4XX0=
-->