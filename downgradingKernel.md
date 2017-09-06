## Linux Kernel Caveat

The AuriStor package files (.deb) are available on the AuriStor repository for most kernel versions. While unlikley, it is possible that the packages have not yet been built for the Ubuntu Kernel Version you have installed.

To find out your Linux Kernel version:  
    
>
```
$ uname -r
4.4.0-87-generic
```

Refer to the section [Getting the AuriStor Software]("getAuriStorSoftware.md") to see which kernel versions are available.

If you find a matching package file, GREAT!  You don't have to do anything more in this section

However, if you do not find a matching package file, you will have to downgrade your kernel. 

> NOTE: Here we have to document the GRUB stuff that Matt showed us.


