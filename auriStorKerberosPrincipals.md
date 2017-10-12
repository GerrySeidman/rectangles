# Setting up Kerberos Principals for AuriStor Servers

### FIXING????

kadmin: addprinc -randkey afs3-bos/play.gerry@PLAY.GERRY

kadmin ktadd -k ./bos.keytab -e "aes256-cts-hmac-sha1-96:normal aes128-cts-hmac-sha1-96:normal des3-hmac-sha1:normal arcfour-hmac-md5:normal" afs3-bos/play.gerry@PLAY.GERRY

Then the following worked:

sudo bos create -server afsdb1.play.gerry -type simple -instance ptserver -cmd /usr/lib/yfs/ptserver -localauth


### AFTER FIXING

We will be setting up Kerberos Principals for for use by the AuriStor Servers.  Some of these principals have historical names

The steps in this lab will be:

1. Create Kerberos principal used in legacy AFS deployments `afs/play.gerry@PLAY.GERRY`
2.  Create Kerberos principal used by YFS for RXGK authentication `yfs-rxgk/play.gerry@PLAY.GERRY`
3. Create an afs3-bos principal and keytab for each YFS server.  `afs3-bos/play.gerry@PLAY.GERRY`

After completing this lab:

* The following principals will be in your Kerberos database
	* afs/play.gerry@PLAY.GERRY
	* yfs-rxgk/_afs.play.gerry@PLAY.GERRY
	* afs3-bos/afsdb1.play.gerry@PLAY.GERRY
	* afs3-bos/afsfs1.play.gerry@PLAY.GERRY
 	* afs3-bos/afsfs2.play.gerry@PLAY.GERRY
	* afs3-bos/afsfs3.play.gerry@PLAY.GERRY
* You will have generated Key files
	* ????????

###  To understand these principal names
`YFS`stands for `Your-File-System'`which was the original name of AuriStor. The YFS protocol is used by AuriStor

`RX`is the low level RPC used by all AuriStor clients and servers to communicate.  `rxgk` is the  modern security protocol extensions that is used by AuriStor.

`BOS`refers to the AuriStor `Basic Overseer Service` that is run on each host containing AuriStor servers to ensure proper operation and proper shutdown/restart.  

The Kerberos Server may manage principals for multiple AFS/AuriStor cells.  As such these principals have very specific names. In this project the Kerberos Realm i s`PLAY.GERRY` and the AuriStor Cell name is `play.gerry`


Generic Principal Name |	Use	|	Principal for Project|
| --- | --- | ---------------- | 
| afs/`<AFS CELL>`@`<KERBEROS REALM>`	|	Legacy AFS	|	afs/play.gerry@PLAY.GERRY |
| yfs-rxgk/_afs,`<AFS CELL>`@`<KERBEROS REALM>`	|	YFS RXGK auth	|	yfs-rxgk/_afs.play.gerry@PLAY.GERRY |
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
```

Now add the keys to the kerberos keytab.   It is important to note down the respective	`kvno`  for each principal

``` bash
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


???? THIS ISN"T PROBABLY USAED BUT I HAVEN"T DELETED IT.... 
kadmin:  ktadd -k ./bos.keytab -e "aes256-cts-hmac-sha1-96:normal aes128-cts-hmac-sha1-96:normal des3-hmac-sha1:normal arcfour-hmac-md5:normal" afs3-bos/afsdb1.play.gerry@PLAY.GERRY
Entry for principal afs3-bos/afs1.play.gerry@PLAY.GERRY with kvno 2, encryption type aes256-cts-hmac-sha1-96 added to keytab WRFILE:./bos.keytab.
Entry for principal afs3-bos/afs1.play.gerry@PLAY.GERRY with kvno 2, encryption type aes128-cts-hmac-sha1-96 added to keytab WRFILE:./bos.keytab.
Entry for principal afs3-bos/afs1.play.gerry@PLAY.GERRY with kvno 2, encryption type des3-cbc-sha1 added to keytab WRFILE:./bos.keytab                                                               .
Entry for principal afs3-bos/afs1.play.gerry@PLAY.GERRY with kvno 2, encryption type arcfour-hmac added to keytab WRFILE:./bos.keytab.

```

The following files should have will created

bosdb1.keytab  bosfs1.keytab  bosfs2.keytab  bosfs3.keytab  bos.keytab  rxgk.keytab  rxkad.keytab


## Links to Sample Files from this Lab

* No files were manually edited in this lab
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0NzAyMDIzNjBdfQ==
-->