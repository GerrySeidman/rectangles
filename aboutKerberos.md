# Kerberos and Time

The Kerberos protocol is sensitive 	to time differences between the KDC and a Kerberos client application.

On all machines install Network Time Protocol (NTP

	sudo apt install ntp
	
# Kerberos Realm Names

You must choose your own Kerberos realm name.
Do not use the name YOUR-KRB5-REALM.COM

	For this tutorial the Realm name is PLAY.GERRY

For help choosing your Kerberos realm name, see:
http://web.mit.edu/kerberos/krb5-devel/doc/admin/realm_config.html

Your domain name and your Kerberos realm name may differ
You are not required to use the same name for your domain and for your Kerberos realm. You may choose to use the same name for your domain and for your Kerberos realm.

In this example the domain name is your-cell-name.com and the Kerberos realm 
name is YOUR-KRB5-REALM.COM

To initialize the Kerberos database KDC you use the “krb5_util” command.
You must specify your Kerberos realm name on the “krb5_util” command line.

Kerberos realm names are upper case.

## Kerberos References

http://web.mit.edu/kerberos/krb5-devel/doc/admin/realm_config.html

http://web.mit.edu/kerberos/krb5-devel/doc/admin/conf_files/kadm5_acl.html

 http://techpubs.spinlocksolutions.com/dklar/afs.html

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI5MjgwMTk2N119
-->