# Setting up the Kerberos Server

In this lab you will set up the Kerberos server for this project

The steps in this lab will be:

1. Create a clone VM for the Kerberos Server 
2. We will install a faster random number generator than the default VM software emulation
3. Install and configure the Kerberos Server software for the realm `PLAY.GERRY`
4. Set up the Kerberos ACL Rules

After completing this lab:
* The Kerberos server will be installed
* The Kerberos server will NOT yet be configured with users/principals.






## The Kerberos Realm and Kerberos Servers

 For this Cookbook Tutorial we will be using `PLAY.GERRY` as the Kerberos Realm name

If you are not familiar with Kerberos, please refer to the section [About Kerberos](aboutKerberos.md)

Also recall that Network Time Protocol (NTP) was already installed in our  [Stem VM](stemVM.md)

Once configured and installed there will be two running service processes

* Kerberos Key Distribution Center (KDC) Service ` krb5-kdc`
* Kerberos Admin Service`krb5-admin-server`

This lab describes setting up the servers.  The next lab on 	`Kerberos Admin` shows how to bootstrap Kerberos and how to set up users/principals.

## Clone and prepare Kerberos Server VM

### Clone VM 
Steps found in section [Cloning Stem VM](cloningStemVM.md)

### Set Hostname and Static IP address

```bash
export NEW_HOST=krb1
export NEW_IP=192.168.10.120

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hostname
sudo reboot
```


##  Install Kerberos Tools

```bash
	sudo apt install krb5-kdc krb5-admin-server
```

You will be prompted with the following screens:

![[InstallingKerberos]](https://raw.githubusercontent.com/GerrySeidman/rectangles/tutorial/images/installingKerberos.jpg "Installing Kerberos")

![[InstallingKerberos]](https://raw.githubusercontent.com/GerrySeidman/rectangles/tutorial/images/configuringKerberos.jpg "Installing Kerberos")

## VMs and Random Number Generators

VMs typically have slow (software based) random number generators (ie not hardware accelerated) which are used in key generation.  

 Install the following tool to speed up Random Number Generation:

	sudo apt install haveged -y

## Initialize the Kerberos Database

To Initialize your new Realm:
```bash
sudo krb5_newrealm
```
This may take some time.  The output is shown below, but the important thing is that  you will be prompted for a Database Master Key.

		This script should be run on the master KDC/admin server to initialize
		a Kerberos realm.  It will ask you to type in a master key password.
		This password will be used to generate a key that is stored in
		/etc/krb5kdc/stash.  You should try to remember this password, but it
		is much more important that it be a strong password than that it be
		remembered.  However, if you lose the password and /etc/krb5kdc/stash,
		you cannot decrypt your Kerberos database.
		Loading random data
		Initializing database '/var/lib/krb5kdc/principal' for realm 'PLAY.GERRY',
		master key name 'K/M@PLAY.GERRY'
		You will be prompted for the database Master Password.
		It is important that you NOT FORGET this password.
		Enter KDC database master key:
		Re-enter KDC database master key to verify:


		Now that your realm is set up you may wish to create an administrative
		principal using the addprinc subcommand of the kadmin.local program.
		Then, this principal can be added to /etc/krb5kdc/kadm5.acl so that
		you can use the kadmin program on other computers.  Kerberos admin
		principals usually belong to a single user and end in /admin.  For
		example, if jruser is a Kerberos administrator, then in addition to
		the normal jruser principal, a jruser/admin principal should be
		created.

		Don't forget to set up DNS information so your clients can find your
		KDC and admin servers.  Doing so is documented in the administration
		guide.

NOTE: The about used the default cell name lf ```PLAY.GERRY``` from the machine's domain ```krb1.play.gerry```.  

IMPORTANT: It is important to store a copy of the password in a secure location. An attacker can use the password to impersonate any user or any server principal listed in your Kerberos database.

 [//]: # ( remember YouDatabase Master Key: iamkdc)

## Configure Kerberos administrator ACL Rules

### About Kerberos Administrator ACL 

The users listed in the  ```/etc/krb5kdc/kadm5.acl file``` can administer the Kerberos database, using the ```kadmin``` application. 

The syntax of a line in the ```/etc/krb5kdc/kadm5.acl``` file is:
 ```
 principal  permissions  [target_principal  [restrictions] ] 
 ```
 
Note: In Kerberos lingo, a ```principal``` is the same as a  ```user```

```principal``` is granted permissions to administer the Kerberos database.

You can optionally restrict the permissions granted to ```principal``` to one or more specific ```target_principal```.

 If you restrict permissions granted to specific ```target_principal``` you can also specify a subset of administrative rights by adding flags in the ```restrictions``` field.

For more  information about /etc/krb5kdc/kadm5.acl see

http://web.mit.edu/kerberos/krb5-devel/doc/admin/conf_files/kadm5_acl.html


### Setting up  kadm5.acl 

This file will contain ACL rules.  We want to give any user matching  ``*/admin@PLAY.GERRY`` full admin permissions.  

Edit:
```
sudo vi /etc/krb5kdc/kadm5.acl
```
And append this single line at the bottom of the file:
```
*/admin@PLAY.GERRY *
```
Later on in this section we will create users/principals.

### Setting up the krb5.conf File

A ```/etc/krb5.conf``` file will have been created, but it will require the following edits:

 - Add a [logging] section
 - Replace the [libdefaults] section
 - Append our realm ```PLAY.GERRY``` to the top of the [realms] section
	 - Note that you ad it twice, both with and wihthout a prepending DOT (.)

```
gerry@krb1:/etc$ cat krb5.conf
[logging]
        default = FILE:/var/log/krb5libs.log
        kdc = FILE:/var/log/krb5kdc.log
        admin_server = FILE:/var/log/kadmind.log

[libdefaults]
        default_realm = PLAY.GERRY
        dns_lookup_realm = false
        dns_lookup_kdc = false
        ticket_lifetime = 24h
        renew_lifetime = 7d
        forwardable = true

# The following krb5.conf variables are only for MIT Kerberos.
        krb4_config = /etc/krb.conf
        krb4_realms = /etc/krb.realms
        kdc_timesync = 1
        ccache_type = 4
#       forwardable = true
        proxiable = true


# The following encryption type specification will be used by MIT Kerberos
# if uncommented.  In general, the defaults in the MIT Kerberos code are
# correct and overriding these specifications only serves to disable new
# encryption types as they are added, creating interoperability problems.
#
# Thie only time when you might need to uncomment these lines and change
# the enctypes is if you have local software that will break on ticket
# caches containing ticket encryption types it doesn't know about (such as
# old versions of Sun Java).

#       default_tgs_enctypes = des3-hmac-sha1
#       default_tkt_enctypes = des3-hmac-sha1
#       permitted_enctypes = des3-hmac-sha1

# The following libdefaults parameters are only for Heimdal Kerberos.
        v4_instance_resolve = false
        v4_name_convert = {
                host = {
                        rcmd = host
                        ftp = ftp
                }
                plain = {
                        something = something-else
                }
        }
        fcc-mit-ticketflags = true


[realms]
        PLAY.GERRY  = {
                kdc = krb1.play.gerry
                admin_server = krb1.play.gerry
        }

### ..... Lots of other realms in this autogenerateed files, not shown heree

[domain_realm]
        .play.gerry = PLAY.GERRY
        play.gerry = PLAY.GERRY

### ..... Lots of domain_realms in this autogenerated file not shown here 

[login]
        krb4_convert = true
        krb4_get_tickets = false

```

## Links to Sample Files from this Lab

* The following files will have been edited in this lab:
	* /etc/network/interfaces
	* /etc/hosts
	* /etc/hostname
	*  /etc/krb5kdc/kadm5.acl
	*  /etc/krb5.conf
	



<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzMTg3OTc1NV19
-->