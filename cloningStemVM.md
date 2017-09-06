

# Cloning from the Stem


1. Clone the VM in VirtualBox
2. Configure the hostname and static IP address for this VM
3. Reboot and let the VM come up with the new name and IP address

## Link Cloning the VM in VirtualBox

![[Cloning a VM]](https://raw.githubusercontent.com/GerrySeidman/rectangles/tutorial/images/cloneVM.jpg "Cloning a VM")
> Be sure to check `Reinitializze the MAC address of the network cards`

![[Clone Type]](https://raw.githubusercontent.com/GerrySeidman/rectangles/tutorial/images/cloneType.jpg "Clone Type")
> Select Linked Clone


## Configuring the Host Name and Static IP Address

When you first boot up, the `"clone"` it is still identical to the `"stem"` so it will by still have the static IP address and host name 'stem1'

> Be sure that the Stem VM isn't running or you will have an IP address collision and you won't be able to configure the clone.

SSH into the 

To set the "clone" at the "stems" IP address, in our case 192.168.10.100

Now we can configure the new host name and IP address:

```
export NEW_HOST=dns1
export NEW_IP=192.168.10.110

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hosts
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hostname
sudo reboot
```

You will get the warning: `sudo: unable to resolve host stem1`  while you are resetting the host name.  That is normal.

> The machine now has the new name and is available at the new IP address.