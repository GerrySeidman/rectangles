# Administering Kerberos Principals

In Kerberos lingo, a ```principal``` is the same as a  ```user```.       In this lab you will set up the Kerberos principals for this project

The steps in this lab will be:

1. Bootstrap a initial Kerberos principal `gerry@PLAY.GERRY` using `kadmin-local`
2. Create an Kerberos admin principal `gerry/admin@PLAY.GERRY` using `kadmin-local`
3. Restart the Kerberos servers
4. Verify that they are properly running
5. Install Kerberos client on another machine
6. Remotely administer Kerberos principals

After completing this lab:

* The following principals will exist in your Kerberos database
	* gerry@PLAY.GERRY
	* gerry/admin@PLAY.GERRY
	* buddy@PLAY.GERRY

# Bootstrapping Initial Kerberos Principals

To administer the Kerberos database, you must configure at least one Kerberos admin principal, but this chicken-before-egg problem. The command  `kadmin.local` allows you to bootstrap this process.  As such there is no password the first time and this **MUST be run on your Kerberos Server.**   

In the previous section  [Kerberos Server](kerberosServer.md) we set up the ACL rule that any principal user matching  ``*/admin@PLAY.GERRY`` will have full admin permissions. 

The below shows the creation of TWO principals, a regular `gerry@PLAY.GERRY` and another with admin rights  `gerry/admin@PLAY.GERRY` 

``` bash
root@krb1:/etc/krb5kdc# sudo kadmin.local
Authenticating as principal root/admin@PLAY.GERRY with password.
kadmin.local:  addprinc gerry
WARNING: no policy specified for gerry@PLAY.GERRY; defaulting to no policy
Enter password for principal "gerry@PLAY.GERRY":         <<< ENTER PASSWORD >>>
Re-enter password for principal "gerry@PLAY.GERRY":		 <<< RE-ENTER PASSWORD >>>
Principal "gerry@PLAY.GERRY" created.

kadmin.local:  addprinc gerry/admin
WARNING: no policy specified for gerry/admin@PLAY.GERRY; defaulting to no policy
Enter password for principal "gerry/admin@PLAY.GERRY":		<<< ENTER PASSWORD >>>
Re-enter password for principal "gerry/admin@PLAY.GERRY":	<<< RE-ENTER PASSWORD >>>
Principal "gerry/admin@PLAY.GERRY" created.
kadmin.local:  exit
```

## Restart Kerberos

Now we need to restart Kerberos 

``` bash 
root@krb1:/etc/krb5kdc# sudo systemctl restart  krb5-kdc
root@krb1:/etc/krb5kdc# sudo systemctl restart  krb5-admin-server
``` 

#  Verifying KDC is properly running

The Kerberos Domain Controller

``` bash
root@krb1:/etc/krb5kdc# systemctl is-enabled krb5-kdc
enabled
```
And let's verify the status of the KDC

``` bash
root@krb1:/etc/krb5kdc# systemctl status krb5-kdc
● krb5-kdc.service - Kerberos 5 Key Distribution Center
   Loaded: loaded (/lib/systemd/system/krb5-kdc.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2017-10-02 00:43:00 EDT; 20s ago
  Process: 4494 ExecStart=/usr/sbin/krb5kdc -P /var/run/krb5-kdc.pid $DAEMON_ARGS (code=exited, status=0/SUCCESS)
 Main PID: 4498 (krb5kdc)
    Tasks: 1
   Memory: 520.0K
      CPU: 6ms
   CGroup: /system.slice/krb5-kdc.service
           └─4498 /usr/sbin/krb5kdc -P /var/run/krb5-kdc.pid

Oct 02 00:43:00 krb1.play.gerry krb5kdc[4494]: listening on fd 11: udp ::.88 (pktinfo)
Oct 02 00:43:00 krb1.play.gerry krb5kdc[4494]: setsockopt(12,IPV6_V6ONLY,1) worked
Oct 02 00:43:00 krb1.play.gerry krb5kdc[4494]: listening on fd 12: udp ::.750 (pktinfo)
Oct 02 00:43:00 krb1.play.gerry krb5kdc[4494]: setsockopt(13,IPV6_V6ONLY,1) worked
Oct 02 00:43:00 krb1.play.gerry krb5kdc[4494]: listening on fd 14: tcp 0.0.0.0.88
Oct 02 00:43:00 krb1.play.gerry krb5kdc[4494]: listening on fd 13: tcp ::.88
Oct 02 00:43:00 krb1.play.gerry krb5kdc[4494]: set up 6 sockets
Oct 02 00:43:00 krb1.play.gerry systemd[1]: krb5-kdc.service: PID file /var/run/krb5-kdc.pid not readable (yet?) after start: No such
Oct 02 00:43:00 krb1.play.gerry systemd[1]: Started Kerberos 5 Key Distribution Center.
Oct 02 00:43:00 krb1.play.gerry krb5kdc[4498]: commencing operation
root@krb1:/etc/krb5kdc#
```
And finally let's verify that our Kerberos Admin Server is properly Running

``` bash
root@krb1:/etc/krb5kdc# systemctl status krb5-admin-server
● krb5-admin-server.service - Kerberos 5 Admin Server
   Loaded: loaded (/lib/systemd/system/krb5-admin-server.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2017-10-02 00:43:09 EDT; 1min 8s ago
 Main PID: 4502 (kadmind)
    Tasks: 1
   Memory: 564.0K
      CPU: 11ms
   CGroup: /system.slice/krb5-admin-server.service
           └─4502 /usr/sbin/kadmind -nofork

Oct 02 00:43:09 krb1.play.gerry kadmind[4502]: setsockopt(11,IPV6_V6ONLY,1) worked
Oct 02 00:43:09 krb1.play.gerry kadmind[4502]: listening on fd 12: tcp 0.0.0.0.464
Oct 02 00:43:09 krb1.play.gerry kadmind[4502]: listening on fd 11: tcp ::.464
Oct 02 00:43:09 krb1.play.gerry kadmind[4502]: listening on fd 13: rpc 0.0.0.0.749
Oct 02 00:43:09 krb1.play.gerry kadmind[4502]: setsockopt(14,IPV6_V6ONLY,1) worked
Oct 02 00:43:09 krb1.play.gerry kadmind[4502]: listening on fd 14: rpc ::.749
Oct 02 00:43:09 krb1.play.gerry kadmind[4502]: set up 6 sockets
Oct 02 00:43:09 krb1.play.gerry kadmind[4502]: Seeding random number generator
Oct 02 00:43:09 krb1.play.gerry kadmind[4502]: starting
Oct 02 00:43:09 krb1.play.gerry kadmind[4502]: kadmind: starting...
```

# Installing Kerberos Client

The Kerberos client can be installed in any other machine in our Project Cluster (those cloned from our Stem VM).  

``` bash
sudo apt install  krb5-user
```
It will automatically pick up the Kerberos Realm `PLAY.GERRY` from DNS. 

>>**@@@@ DOUBLE CHECK IF IF THIS IS SUFFICIENT OR IF WE HAVE TO COPY/EDIT FILES.  I may have done so with my test 'client machine'**

# Authenticating into Kerberos

`kinit` is the command for a principal to authenticate into the Key Distribution Center (KDC) and obtain a Kerberos ticket for the principal.   

``` bash
gerry@client:~$ kinit gerry@PLAY.GERRY
Password for gerry@PLAY.GERRY:
gerry@client:~$
```

You can always list the status of your cached Kerberos tickets using `klist`

```bash
gerry@client:~$ klist
Ticket cache: FILE:/tmp/krb5cc_1000
Default principal: gerry@PLAY.GERRY

Valid starting       Expires              Service principal
10/03/2017 15:37:19  10/04/2017 01:37:19  krbtgt/PLAY.GERRY@PLAY.GERRY
        renew until 10/10/2017 15:37:17
```

# Remotely Administering Kerberos Principals

You may add/modify/delete Kerberos principals either on the Kerberos Server machine using `kadmin.local` as we did earlier in this lab.

Alternatively you may add/modify/delete Kerberos principals either on any machine using your admin principal using `kadmin` which is installed with the Kerberos client. You can specify the `-p <principal>` option to specify the principal

``` bash
gerry@client:~$ sudo kadmin -p gerry/admin@PLAY.GERRY
Authenticating as principal gerry/admin@PLAY.GERRY with password.
Password for gerry/admin@PLAY.GERRY:

kadmin:  list_principals
K/M@PLAY.GERRY
gerry/admin@PLAY.GERRY
gerry@PLAY.GERRY
kadmin/admin@PLAY.GERRY
kadmin/changepw@PLAY.GERRY
kadmin/krb1.play.gerry@PLAY.GERRY
kiprop/krb1.play.gerry@PLAY.GERRY
krbtgt/PLAY.GERRY@PLAY.GERRY

kadmin:  addprinc buddy
WARNING: no policy specified for buddy@PLAY.GERRY; defaulting to no policy
Enter password for principal "buddy@PLAY.GERRY":
Re-enter password for principal "buddy@PLAY.GERRY":
Principal "buddy@PLAY.GERRY" created.

kadmin:  list_principals
K/M@PLAY.GERRY
buddy@PLAY.GERRY
gerry/admin@PLAY.GERRY
gerry@PLAY.GERRY
kadmin/admin@PLAY.GERRY
kadmin/changepw@PLAY.GERRY
kadmin/krb1.play.gerry@PLAY.GERRY
kiprop/krb1.play.gerry@PLAY.GERRY
krbtgt/PLAY.GERRY@PLAY.GERRY

kadmin: exit
```
```
l## Links to Sample Files from this Lab

* No files were manually edited in this lab
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI1MDk5ODc2OF19
-->