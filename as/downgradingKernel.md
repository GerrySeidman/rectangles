## Linux Kernel Caveat
The AuriStor package files (.deb) are available on the AuriStor repository for most kernel versions. While unlikley, it is possible that the packages have not yet been built for the Ubuntu Kernel Version you have installed.

To find out your Linux Kernel version:  
    
>
```
$ uname -r
4.4.0-87-generic
```

Refer to the section [Getting the AuriStor Software]("getAuriStorSoftware.md") to see which kernel versions are available.

If you do not find a matching package file, you will have to downgrade your kernel.  In structions can be found in [Downgrading your Kernel]("downgradingKernel.md")

