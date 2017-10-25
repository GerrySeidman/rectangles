## NOTE FROM JEFF via Skype
	congrats.    btw, who told you to configure the legacy authentication bits?

	Setting up Kerberos v4 names with "bos adduser" and afs/cell@REALM for rxkad security.

	That functionality is for existing AFS shops.  Its not for new cells.

	New cells should only use the new authentication/security model

	afs3-bos/host@REALM for bos server authentication
	yfs-rxgk/_afs.cell@REALM for end user authentication
	and the cell wide rxgk key

# Setting up Kerberos Principals for AuriStor Servers

We will be setting up Kerberos Principals for for use by the AuriStor Servers.  Some of these principals have historical names

The steps in this lab will be:

1. Create Kerberos principal used in legacy AFS deployments `afs/play.gerry@PLAY.GERRY`
2.  Create Kerberos principal used by AuriStorFS for RXGK authentication `yfs-rxgk/play.gerry@PLAY.GERRY`
3. Create an afs3-bos principal and keytab for **EACH OF** the AuriStorFS server.s

After completing this lab:

* The following principals will be in your Kerberos database
	* afs/play.gerry@PLAY.GERRY
	* yfs-rxgk/_afs.play.gerry@PLAY.GERRY
	* afs3-bos/afsdb1.play.gerry@PLAY.GERRY
	* afs3-bos/afsfs1.play.gerry@PLAY.GERRY
 	* afs3-bos/afsfs2.play.gerry@PLAY.GERRY
	* afs3-bos/afsfs3.play.gerry@PLAY.GERRY
	
* You will have generated Key files
	* rxgk.keytab
	* rxkad.keytab
	* bosdb1.keytab
	* bosfs1.keytab
	* bosfs2.keytab
	* bosfs3.keytab

##  To understand these principal names

`YFS`stands for `Your-File-System'`which was the original name of AuriStor before the renaming of the company in 2015. The YFS protocol is used by AuriStor

`RX`is the low level RPC used by all AuriStor clients and servers to communicate.  `rxgk` is the  modern security protocol extensions that is used by AuriStor.

`BOS`refers to the AuriStor `Basic Overseer Service` that is run on each host containing AuriStor servers to ensure proper operation and proper shutdown/restart.  

The Kerberos Server may manage principals for multiple AFS/AuriStor cells.  As such these principals have very specific names. In this project the Kerberos Realm i s`PLAY.GERRY` and the AuriStor Cell name is `play.gerry`


Generic Principal Name |	Use	|	Principal for Project|
| --- | --- | ---------------- | 
| afs/`<AFS CELL>`@`<KERBEROS REALM>`	|	Legacy AFS	|	afs/play.gerry@PLAY.GERRY |
| yfs-rxgk/_afs.`<AFS CELL>`@`<KERBEROS REALM>`	|	YFS RXGK auth	|	yfs-rxgk/_afs.play.gerry@PLAY.GERRY |
| afs3-bos/`<SERVER HOST NAME>`@`<KERBEROS REALM>`	|	bos princ/keytab	|	(*)

(*) In this project we have 1 DB server and 3 File Servers, we will need one pricipal for each
* afs3-bos/afsdb1,play.gerry@PLAY.GERRY 
* afs3-bos/afsfs1,play.gerry@PLAY.GERRY 
* afs3-bos/afsfs2,play.gerry@PLAY.GERRY 
* afs3-bos/afsfs3,play.gerry@PLAY.GERRY 




# Setting up a Principals for the AuriStor Servers

For this section all commands will be run within either `kadmin.local` on your Kerberos host or authenticate with `kadmin`service as your admin principal to set up the AuriStor server principals. 

Start `kadmin`

``` bash
gerry@client:~$ sudo kadmin -p gerry/admin@PLAY.GERRY
Authenticating as principal gerry/admin@PLAY.GERRY with password.
Password for gerry/admin@PLAY.GERRY:
```
Since these principals are for servers, we will generate key files using the `-randkey` option


``` bash
kadmin:  addprinc -randkey afs/play.gerry@PLAY.GERRY
WARNING: no policy specified for afs/play.gerry@PLAY.GERRY; defaulting to no policy
Principal "afs/play.gerry@PLAY.GERRY" created.

kadmin:  addprinc -randkey yfs-rxgk/_afs.play.gerry@PLAY.GERRY
WARNING: no policy specified for yfs-rxgk/_afs.play.gerry@PLAY.GERRY; defaulting to no policy
Principal "yfs-rxgk/_afs.play.gerry@PLAY.GERRY" created.

kadmin:  addprinc -randkey afs3-bos/afsdb1.play.gerry@PLAY.GERRY
WARNING: no policy specified for afs3-bos/afsdb1.play.gerry@PLAY.GERRY; defaulting to no policy
Principal "afs3-bos/afsdb1.play.gerry@PLAY.GERRY" created.

kadmin:  addprinc -randkey afs3-bos/afsfs1.play.gerry@PLAY.GERRY
WARNING: no policy specified for afs3-bos/afsfs1.play.gerry@PLAY.GERRY; defaulting to no policy
Principal "afs3-bos/afsfs1.play.gerry@PLAY.GERRY" created.

kadmin:  addprinc -randkey afs3-bos/afsfs2.play.gerry@PLAY.GERRY
WARNING: no policy specified for afs3-bos/afsfs2.play.gerry@PLAY.GERRY; defaulting to no policy
Principal "afs3-bos/afsfs2.play.gerry@PLAY.GERRY" created.

kadmin:  addprinc -randkey afs3-bos/afsfs3.play.gerry@PLAY.GERRY
WARNING: no policy specified for afs3-bos/afsfs3.play.gerry@PLAY.GERRY; defaulting to no policy
Principal "afs3-bos/afsfs3.play.gerry@PLAY.GERRY" created.

kadmin:  listprincs
K/M@PLAY.GERRY
afs/play.gerry@PLAY.GERRY
afs3-bos/afsdb1.play.gerry@PLAY.GERRY
afs3-bos/afsfs1.play.gerry@PLAY.GERRY
afs3-bos/afsfs2.play.gerry@PLAY.GERRY
afs3-bos/afsfs3.play.gerry@PLAY.GERRY
buddy@PLAY.GERRY
gerry/admin@PLAY.GERRY
gerry@PLAY.GERRY
kadmin/admin@PLAY.GERRY
kadmin/changepw@PLAY.GERRY
kadmin/krb1.play.gerry@PLAY.GERRY
kiprop/krb1.play.gerry@PLAY.GERRY
krbtgt/PLAY.GERRY@PLAY.GERRY
yfs-rxgk/_afs.play.gerry@PLAY.GERRY

kadmin: exit
```

# Create the AuriStorFS Keytabs

We will now create keytab files for the server principals. 

It is important to:
* Keep these in a safe/secure place
	* We will be creating them in the directory `~/keytabs/`
	* They will be created as `su` so their permissions will be root
* Note down the respective	`kvno`  for each principal as they are generated

``` bash
$ mkdir ~/keytabs
$ cd ~/keytabs
$ sudo kadmin -p gerry/admin@PLAY.GERRY
kadmin:  ktadd -k ./rxgk.keytab -e "aes256-cts-hmac-sha1-96:normal aes128-cts-hmac-sha1-96:normal des3-hmac-sha1:normal arcfour-hmac-md5:normal" yfs-rxgk/_afs.play.gerry
Entry for principal yfs-rxgk/_afs.play.gerry with kvno 2, encryption type aes256-cts-hmac-sha1-96 added to keytab WRFILE:./rxgk.keytab                                                               .
Entry for principal yfs-rxgk/_afs.play.gerry with kvno 2, encryption type aes128-cts-hmac-sha1-96 added to keytab WRFILE:./rxgk.keytab                                                               .
Entry for principal yfs-rxgk/_afs.play.gerry with kvno 2, encryption type des3-cbc-sha1 added to keytab WRFILE:./rxgk.keytab.
Entry for principal yfs-rxgk/_afs.play.gerry with kvno 2, encryption type arcfour-hmac added to keytab WRFILE:./rxgk.keytab.

kadmin:  ktadd -k ./rxkad.keytab -e "aes256-cts-hmac-sha1-96:normal aes128-cts-hmac-sha1-96:normal des3-hmac-sha1:normal arcfour-hmac-md5:normal" afs/play.gerry
Entry for principal afs/play.gerry with kvno 2, encryption type aes256-cts-hmac-sha1-96 added to keytab WRFILE:./rxkad.keytab.
Entry for principal afs/play.gerry with kvno 2, encryption type aes128-cts-hmac-sha1-96 added to keytab WRFILE:./rxkad.keytab.
Entry for principal afs/play.gerry with kvno 2, encryption type des3-cbc-sha1 added to keytab WRFILE:./rxkad.keytab.
Entry for principal afs/play.gerry with kvno 2, encryption type arcfour-hmac added to keytab WRFILE:./rxkad.keytab.

kadmin:
kadmin:
kadmin:  ktadd -k ./bosdb1.keytab -e "aes256-cts-hmac-sha1-96:normal aes128-cts-hmac-sha1-96:normal des3-hmac-sha1:normal arcfour-hmac-md5:normal" afs3-bos/afsdb1.play.gerry@PLAY.GERRY
Entry for principal afs3-bos/afsdb1.play.gerry@PLAY.GERRY with kvno 2, encryption type aes256-cts-hmac-sha1-96 added to keytab WRFILE:./bosdb1.keytab.
Entry for principal afs3-bos/afsdb1.play.gerry@PLAY.GERRY with kvno 2, encryption type aes128-cts-hmac-sha1-96 added to keytab WRFILE:./bosdb1.keytab.
Entry for principal afs3-bos/afsdb1.play.gerry@PLAY.GERRY with kvno 2, encryption type des3-cbc-sha1 added to keytab WRFILE:./bosdb1.keytab.
Entry for principal afs3-bos/afsdb1.play.gerry@PLAY.GERRY with kvno 2, encryption type arcfour-hmac added to keytab WRFILE:./bosdb1.keytab.

kadmin:  ktadd -k ./bosfs1.keytab -e "aes256-cts-hmac-sha1-96:normal aes128-cts-hmac-sha1-96:normal des3-hmac-sha1:normal arcfour-hmac-md5:normal" afs3-bos/afsfs1.play.gerry@PLAY.GERRY
Entry for principal afs3-bos/afsfs1.play.gerry@PLAY.GERRY with kvno 2, encryption type aes256-cts-hmac-sha1-96 added to keytab WRFILE:./bosfs1.keytab.
Entry for principal afs3-bos/afsfs1.play.gerry@PLAY.GERRY with kvno 2, encryption type aes128-cts-hmac-sha1-96 added to keytab WRFILE:./bosfs1.keytab.
Entry for principal afs3-bos/afsfs1.play.gerry@PLAY.GERRY with kvno 2, encryption type des3-cbc-sha1 added to keytab WRFILE:./bosfs1.keytab.
Entry for principal afs3-bos/afsfs1.play.gerry@PLAY.GERRY with kvno 2, encryption type arcfour-hmac added to keytab WRFILE:./bosfs1.keytab.

kadmin:  ktadd -k ./bosfs2.keytab -e "aes256-cts-hmac-sha1-96:normal aes128-cts-hmac-sha1-96:normal des3-hmac-sha1:normal arcfour-hmac-md5:normal" afs3-bos/afsfs2.play.gerry@PLAY.GERRY
Entry for principal afs3-bos/afsfs2.play.gerry@PLAY.GERRY with kvno 2, encryption type aes256-cts-hmac-sha1-96 added to keytab WRFILE:./bosfs2.keytab.
Entry for principal afs3-bos/afsfs2.play.gerry@PLAY.GERRY with kvno 2, encryption type aes128-cts-hmac-sha1-96 added to keytab WRFILE:./bosfs2.keytab.
Entry for principal afs3-bos/afsfs2.play.gerry@PLAY.GERRY with kvno 2, encryption type des3-cbc-sha1 added to keytab WRFILE:./bosfs2.keytab.
Entry for principal afs3-bos/afsfs2.play.gerry@PLAY.GERRY with kvno 2, encryption type arcfour-hmac added to keytab WRFILE:./bosfs2.keytab.

kadmin:  ktadd -k ./bosfs3.keytab -e "aes256-cts-hmac-sha1-96:normal aes128-cts-hmac-sha1-96:normal des3-hmac-sha1:normal arcfour-hmac-md5:normal" afs3-bos/afsfs3.play.gerry@PLAY.GERRY
Entry for principal afs3-bos/afsfs3.play.gerry@PLAY.GERRY with kvno 2, encryption type aes256-cts-hmac-sha1-96 added to keytab WRFILE:./bosfs3.keytab.
Entry for principal afs3-bos/afsfs3.play.gerry@PLAY.GERRY with kvno 2, encryption type aes128-cts-hmac-sha1-96 added to keytab WRFILE:./bosfs3.keytab.
Entry for principal afs3-bos/afsfs3.play.gerry@PLAY.GERRY with kvno 2, encryption type des3-cbc-sha1 added to keytab WRFILE:./bosfs3.keytab.
Entry for principal afs3-bos/afsfs3.play.gerry@PLAY.GERRY with kvno 2, encryption type arcfour-hmac added to keytab WRFILE:./bosfs3.keytab.

kadmin: exit


gerry@client:~/keytabs$ ls -l
total 24
-rw------- 1 root root 330 Oct 10 14:09 bosdb1.keytab
-rw------- 1 root root 330 Oct 10 14:09 bosfs1.keytab
-rw------- 1 root root 330 Oct 10 14:09 bosfs2.keytab
-rw------- 1 root root 330 Oct 10 14:09 bosfs3.keytab
-rw------- 1 root root 322 Oct 10 14:08 rxgk.keytab
-rw------- 1 root root 282 Oct 10 14:09 rxkad.keytab
```


## Files from this Lab

* The following keytab files were generated
	* ~/keytabs/rxgk.keytab
	* ~/keytabs/rxkad.keytab
	* ~/keytabs/bosdb1.keytab
	* ~/keytabs/bosfs1.keytab
	* ~/keytabs/bosfs2.keytab
	* ~/keytabs/bosfs3.keytab

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1MDY2Njc0MTRdfQ==
-->