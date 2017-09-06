
# Setting up the DNS Server

Clone VM and configure 

```
export NEW_HOST=dns1
export NEW_IP=192.168.10.110

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hosts
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hostname
sudo reboot
```



# Setting up Bind9

> Grr.. couldn't replicatate what Kris did, trying to follow
> `https://www.digitalocean.com/community/tutorials/how-to-configure-bind-as-a-private-network-dns-server-on-ubuntu-16-04`

sudo apt-get update
sudo apt-get install bind9 bind9utils bind9-doc

sudo systemctl daemon-reload

sudo systemctl restart bind9

Did not do below
> sudo systemctl edit --full bind9
> 
> Add "-4" to the end of the ExecStart directive. It should look like the following:


Install Bind9

```
sudo apt-get install bind9
```

Create `/etc/bind/play.gerry`

```
;
; zone file for play.gerry
;
@ IN SOA DNS1.PLAY.GERRY. GERRY.AURISTOR.COM. (
        4203    ; Serial
        10800   ; Refresh after 3 hours
        3600    ; Retry after 1 hour
        604800  ; Expire after 1 week
        86400 ) ; Minimum TTL of 1 day
;
; Name servers
              NS      DNS1.PLAY.GERRY.

;
; MX records
;play.gerry. IN      MX      10 mail.test.gerry.

;
; Aliases

;
; static ips
;
GATEWAY         IN A    192.168.10.1
DNS1            IN A    192.168.10.110
KRB1            IN A    192.168.10.120
AFSDB1          IN A    192.168.10.130
AFSDB2          IN A    192.168.10.131
AFSFS1          IN A    192.168.10.140
AFSFS2          IN A    192.168.10.141
AFSFS3          IN A    192.168.10.142
MYMACHINE       IN A    192.168.10.88

_kerberos._udp.PLAY.GERRY.     IN SRV 1  0 88  krb1.play.gerry.
_kerberos._tcp.PLAY.GERRY.     IN SRV 1  0 88  krb1.play.gerry.
_kerberos-adm._tcp.PLAY.GERRY. IN SRV 1  0 749 krb1.play.gerry.
_kpasswd._udp.PLAY.GERRY.      IN SRV 1  0 464 krb1.play.gerry.
```

Create `/etc/bind/10-168-192.info`

```
; Origin added to named not ending in a dot
@ IN SOA DNS1.PLAY.GERRY. GERRY.AURISTOR.COM. (
        271     ; Serial
        10800   ; Refresh after 3 hours
        3600    ; Retry after 1 hour
        604800  ; Expire after 1 week
        86400 ) ; Minimum TTL of 1 day
;
; Name servers
                NS      DNS1.PLAY.GERRY.
;
1       IN PTR  GATEWAY.TEST.GERRY.
120     IN PTR  KRB1.PLAY.GERRY.
130     IN PTR  AFSDB1.PLAY.GERRY.
131     IN PTR  AFSDB2.PLAY.GERRY.
140     IN PTR  AFSmFS1.PLAY.GERRY.
141     IN PTR  AFSFS2.PLAY.GERRY.
142     IN PTR  AFSFS3.PLAY.GERRY.
88      IN PTR  MYMACHINE.PLAY.GERRY.


```

Edit `named.conf.local`

```
//
// Do any local configuration here
//

// Consider adding the 1918 zones here, if they are not used in your
// organization
//include "/etc/bind/zones.rfc1918";
zone "PLAY.GERRY" {
        type master;
        file "/etc/bind/play.gerry";
};

zone "10.168.192.IN-ADDR.ARPA" {
        type master;
        file "/etc/bind/10-168-192.info";
};
```

Then start it with

```
service bind9 start
```