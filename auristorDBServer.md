# Setting up the AuriStor Database Server

## Clone and prepare AuriStor Database Server VM

### Clone VM 
Steps found in section [Cloning Stem VM](cloningStemVM.md)

### Set Hostname and Static IP address

```
export NEW_HOST=afsdb1
export NEW_IP=192.168.10.130

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hostname
sudo reboot
```

## Get the AuriStor Software

Steps found in gettingAuriStorSoftware.md


## Install the AuriStor Modules package


Now install the Module Package

``` bash
gerry@afsdb1:~/auristorSoftware$ sudo dpkg -i auristorfs-modules*`uname -r`*.deb
Selecting previously unselected package auristorfs-modules3-4.4.0-87-generic.
(Reading database ... 59796 files and directories currently installed.)
Preparing to unpack auristorfs-modules3-4.4.0-87-generic_0.1591-1.20170805gitdebian~auristor_amd64.deb ...
Unpacking auristorfs-modules3-4.4.0-87-generic (0.1591-1.20170805gitdebian~auristor) ...
Setting up auristorfs-modules3-4.4.0-87-generic (0.1591-1.20170805gitdebian~auristor) ...
gerry@afsdb1:~/auristorSoftware$
```

## Install the Common package 

``` bash
gerry@afsdb1:~/auristorSoftware$ sudo dpkg -i auristorfs-common*
Selecting previously unselected package auristorfs-common.
(Reading database ... 59807 files and directories currently installed.)
Preparing to unpack auristorfs-common_0.1591-1.20170805gitdebian~auristor_amd64.deb ...
Unpacking auristorfs-common (0.1591-1.20170805gitdebian~auristor) ...
Setting up auristorfs-common (0.1591-1.20170805gitdebian~auristor) ...
Processing triggers for libc-bin (2.23-0ubuntu9) ...
Processing triggers for man-db (2.7.5-1) ...
gerry@afsdb1:~/auristorSoftware$
```

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
```

## Install AuriStor BOS Server Package

``` bash
gerry@afsdb1:~/auristorSoftware$ sudo dpkg -i  auristorfs-server*
[sudo] password for gerry:
Selecting previously unselected package auristorfs-server.
(Reading database ... 60155 files and directories currently installed.)
Preparing to unpack auristorfs-server_0.1591-1.20170805gitdebian~auristor_amd64.deb ...
Unpacking auristorfs-server (0.1591-1.20170805gitdebian~auristor) ...
Setting up auristorfs-server (0.1591-1.20170805gitdebian~auristor) ...
Processing triggers for ureadahead (0.100.0-19) ...
Processing triggers for man-db (2.7.5-1) ...
gerry@afsdb1:~/auristorSoftware$
```

## Install AuriStor File Server Package

``` bash
gerry@afsdb1:~/auristorSoftware$ sudo dpkg -i  auristorfs-fileserver*
[sudo] password for gerry:
Selecting previously unselected package auristorfs-server.
(Reading database ... 60155 files and directories currently installed.)
Preparing to unpack auristorfs-server_0.1591-1.20170805gitdebian~auristor_amd64.deb ...
Unpacking auristorfs-server (0.1591-1.20170805gitdebian~auristor) ...
Setting up auristorfs-server (0.1591-1.20170805gitdebian~auristor) ...
Processing triggers for ureadahead (0.100.0-19) ...
Processing triggers for man-db (2.7.5-1) ...
gerry@afsdb1:~/auristorSoftware$
```


## Install AuriStor Database Server Package

``` bash
gerry@afsdb1:~/auriSoftware$ sudo dpkg -i  auristorfs-db*
Selecting previously unselected package auristorfs-dbserver.
(Reading database ... 60177 files and directories currently installed.)
Preparing to unpack auristorfs-dbserver_0.1591-1.20170805gitdebian~auristor_amd64.deb ...
Unpacking auristorfs-dbserver (0.1591-1.20170805gitdebian~auristor) ...
Setting up auristorfs-dbserver (0.1591-1.20170805gitdebian~auristor) ...
Processing triggers for man-db (2.7.5-1) ...
gerry@afsdb1:~/auriSoftware$ ^C
gerry@afsdb1:~/auriSoftware$
```

## Install AuriStor Documentation Package

``` bash
gerry@afsdb1:~/auriSoftware$ sudo dpkg -i  auristorfs-doc*
Selecting previously unselected package auristorfs-doc.
(Reading database ... 60253 files and directories currently installed.)
Preparing to unpack auristorfs-doc_0.1591-1.20170805gitdebian~auristor_all.deb ...
Unpacking auristorfs-doc (0.1591-1.20170805gitdebian~auristor) ...
Setting up auristorfs-doc (0.1591-1.20170805gitdebian~auristor) ...
gerry@afsdb1:~/auriSoftware$
```


## Configure yfs-server.conf

``` bash

gerry@afsdb1:/etc/yfs/server$ sudo vi /etc/yfs/server/yfs-server.conf`
gerry@afsdb1:/etc/yfs/server$ cat yfs-server.conf
[kerberos]
        local_realms = PLAY.GERRY

[defaults]
        thiscell = play.gerry
        databases = {
                servers = {
                        afsdb1.play.gerry = {
                                address = 192.168.10.130
                                type = dbserver
                        }
           }
}

[cells]
        test.gerry = {
                description = "PLAY.GERRY play cell"
                servers = {
                        afs1.play.gerry = {
                                address = 192.168.10.130
                                type = dbserver
                        }
                }
}
```
## Configure yfs-client.conf

the correct way to do it. add a [cells] section for a local cell to /etc/yfs/yfs-client.conf; it will use the same cell configuration as the one specified for the local cell in /etc/yfs/server/yfs-server.conf



``` bash
gerry@afsdb1:/etc/yfs/server$ sudo vi /etc/yfs/yfs-client.conf
gerry@afsdb1:/etc/yfs/server$ cat /etc/yfs/yfs-client.conf
include /etc/yfs/cacheinfo.conf
include /etc/yfs/thiscell.conf
include /usr/share/yfs/cellservdb.conf

# Any tuning can be done here

[defaults]

[cells]
        play.gerry = {
                description = "PLAY.GERRY play cell"
                servers = {
                        afsdb1.play.gerry = {
                                address = 192.168.10.130
                                type = dbserver
                        }
                }
        }
```

## Copy all the keytab to  AFS-1

For now (overkill) copy all files from `auriSoftware` and  `keytabs`

``` bash
gerry@afsdb1:~$ ls keytabs/
bosdb1.keytab  bosfs1.keytab  bosfs2.keytab  bosfs3.keytab  bos.keytab  rxgk.keytab  rxkad.keytab
gerry@afsdb1:~$
```

# Add key to AFS KeyFile

The asetkey command is used to add a key to an AFS KeyFile from a Kerberos keytab.
You must be sure to use the kvno that you noted when generating the keys

> `asetkey add rxkad_krb5 <kvno> all <keytab file> afs/<your cell>@<YOUR KRB  REALM>`

``` bash
gerry@afsdb1:~/keytabs$ sudo asetkey add rxkad_krb5 2 all rxkad.keytab afs/play.gerry@PLAY.GERRY
 
gerry@afsdb1:~/keytabs$ sudo cp bosdb1.keytab /etc/yfs/server/bos.keytab

gerry@afsdb1:~/keytabs$ sudo cp rxgk.keytab /etc/yfs/server

gerry@afsdb1:~/keytabs$ sudo asetkey add yfs-rxgk 1 aes256-cts-hmac-sha1-96 random
```

# Create your Vice Partition

Your Vice Partition is where the actual data is stored for the AuriStor volumes

NOTE: We will do this off the root, but it typically would be a mount point

``` bash
root@afsdb1:~# sudo mkdir /vicepa
root@afsdb1:~# sudo touch /vicepa/AlwaysAttach
```

## Verify Extended Attribute Support

Install extended attribute utilities

```  bash
root@afsdb1:~# sudo apt install attr
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following NEW packages will be installed:
  attr
0 upgraded, 1 newly installed, 0 to remove and 47 not upgraded.
Need to get 25.5 kB of archives.
After this operation, 143 kB of additional disk space will be used.
Get:1 http://us.archive.ubuntu.com/ubuntu xenial/main amd64 attr amd64 1:2.4.47-2 [25.5 kB]
Fetched 25.5 kB in 0s (30.3 kB/s)
Selecting previously unselected package attr.
(Reading database ... 60890 files and directories currently installed.)
Preparing to unpack .../attr_1%3a2.4.47-2_amd64.deb ...
Unpacking attr (1:2.4.47-2) ...
Processing triggers for man-db (2.7.5-1) ...
Setting up attr (1:2.4.47-2) ...
```
In the `\vicepa' 
```
gerry@afsdb1:/vicepa$ sudo touch /vicepa/xattr-test

gerry@afsdb1:/vicepa$ sudo setfattr -n user.foo -v bar /vicepa/xattr-test

gerry@afsdb1:/vicepa$ getfattr -n user.foo /vicepa/xattr-test
# file: xattr-test
user.foo="bar"

gerry@afsdb1:/vicepa$ sudo rm /vicepa/xattr-test
gerry@afsdb1:/vicepa$
```

# Create a user `yfsserver`

Upon installation, a user `yfsserver`  is created

This is the equivalent of `sudo useradd -r -s /bin/nologin yfsserver`

``` bash
gerry@afsdb1:/vicepa$ id yfsserver
uid=999(yfsserver) gid=999(yfsserver) groups=999(yfsserver)`
```
## Transfer ownership to this `yfsserver`

``` bash

gerry@afsdb1:/vicepa$
gerry@afsdb1:/vicepa$ sudo chown -R yfsserver: /etc/yfs/server
gerry@afsdb1:/vicepa$ sudo chown -R yfsserver: /vicepa/
gerry@afsdb1:/vicepa$ sudo chown -R yfsserver: /var/log/yfs

gerry@afsdb1:/vicepa$ sudo mkdir /var/run/yfs/
gerry@afsdb1:/vicepa$ sudo chown yfsserver: /var/run/yfs/
```

## Start Servers


``` bash
sudo systemctl restart auristorfs-server


sudo bos create -server afsdb1.play.gerry -type simple -instance ptserver -cmd /usr/lib/yfs/ptserver -localauth

sudo bos create -server afsdb1.play.gerry -type simple -instance vlserver -cmd /usr/lib/yfs/vlserver -localauth

sudo bos status -server afsdb1.play.gerry -localauth
Instance ptserver, currently running normally.
Instance vlserver, currently running normally.
```
# Create BOS Super-Users


```
## For each AFS server we are setting up a BOS superuser
``` bash

## YES THIS IS . for the first and / for the second   Silly Kerberos 4 vs Kerberos 5

sudo bos adduser afsdb1.play.gerry -user gerry.admin@PLAY.GERRY -rxkad -localauth
sudo bos adduser afsdb1.play.gerry -user gerry/admin@PLAY.GERRY -localauth

```
NOTE: The above `/` in the second command is not a type (? is that so ?)

# Create users in the AFS PTS

sudo pts createuser gerry.admin -localauth
sudo pts adduser gerry.admin system:administrators -localauth

sudo pts createuser gerry -localauth

# Client stuff (should be a new section)

## Install Kerberos Client on DB Server
```  bash
 sudo apt install  krb5-user
 ```

```
sudo fs newcell play.gerry afsdb1.play.gerry
kinit gerry@PLAY.GERRY
aklog
```

## File Server

sudo bos create -server afsdb1.play.gerry -type dafs -instance dafs -cmd "/usr/lib/yfs/fileserver" "/usr/lib/yfs/volserver" "/usr/lib/yfs/salvageserver" "/usr/lib/yfs/salvager" -localauth

sudo bos create -server afsdb1.play.gerry -type dafs -instance dafs -cmd "/usr/lib/yfs/fileserver" "/usr/lib/yfs/volserver" "/usr/lib/yfs/salvageserver" "/usr/lib/yfs/salvager" -localauth


## Set up partitions

Create `root.cell` 


kinit gerry/admin@PLAY.GERRY


``` bash
vos create -server afsdb1.play.gerry  -partition /vicepa -name root.cell
```
This is the same as
``` bash
vos create afsdb1.play.gerry a root.cell -localauth

fs lq .
```
SeT ACL so anyone can read root
``` bash
fs sa . system:anyuser rl
```

vos create afsdb1.play.gerry vicepa user.gerry

fs mkmount gerry user.gerry

fs la gerry

pts ex gerry

fs setacl gerry gerry all system:administrators read -clear


## Misc Commands

vos listaddrs

vos listfs

service auristor-server restart
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5NjUwNDI4OTZdfQ==
-->