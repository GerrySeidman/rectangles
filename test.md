# Cluster Plan Overview #3

Initially this is an inventory of what Gerry has done to get his local VM setup for Kerberos, AuriStor and Kubernetes  on his Windows Laptop.

Kubernetes The Hard Way is optimized for learning, which means taking the long route to ensure you understand each task required to bootstrap a Kubernetes cluster.

> This will evolve into AuriStor Documentation for general setup

> The Kubernetes aspect not necessarily be mentioned in the general documentation.  For now I will keep this as a single thread of documents.

## Target Audience

The target audience for this tutorial is someone planning to support a production AuriStor environment cluster and wants to understand how everything fits together.


| Type | Description | Machine Name(s) | Static IP(s) |
| --- | --- | --- | --- |
| DNS | DNS Server | dns1 | 192.168.10.110 |
| Kerberos | Kerberos Server| krb1 | 192.168.10.120 |
| AFS Database | AFS VDB/BOS/Protection | afsdb1  (+)| 192.168.10.130 (+) |
| AFS File Server | AFS File Server | afsfs1 (+)| 192.168.10.140 (+) |
| Kubernetes Master | Kubernetes Master & etcd | kubm1 (+) | 192.168.10.150 (+) |
| Kubernetes Worker | Kubernetes Worker | kubw1 (+) | 192.168.10.160 (+)|

> (+) In production there will be multiple machines for each of these servers.   In this tutorial we will only be running multiple file servers (afs2, afs3)

> Note: In the above, every server running on a different machine. It is also possible to run multiple servers on the same machine.  While this makes sense in testing/local environments, for completeness in this tutorial we will run everything on different machines to stress the 'best practices' and correct configurations.


## Cluster Details

Aspects of the Cluster 

* Ubuntu 16.04
* DNS
* Kerberos
* AFS
* Kubernetes
* [CRI-O Container Runtime](https://github.com/kubernetes-incubator/cri-o) v1.0.0-beta.0
* [CNI Container Networking](https://github.com/containernetworking/cni) v0.6.0
* [etcd](https://github.com/coreos/etcd) 3.2.6


## Topology

The network topology will include a local private network (Host-Only Adapter) for all the servers.  During development a NAT network adapter will also be on each machine for access to download software.  Ultimately the NAT network will be disabled and/or a Firewall would be set up.

* DNS1 - A DNS Server for the cluster
* KRB1 - A Kerberos Server
* AFSM - An AFS Server for the protection database
* AFS1 - File Server for replication and testing
* AFS2 - File Server for replication and testing
* KUB* - This will initially be just test to access AFS from Kubernetes.  Later it will be a series of servers that stand up an AFS distributed file system within a Kubernetes cluster off of Docker images AND an operator for handling Kubernetes Persistent Volume Claims

## Machine Setup

Clone Stem VM

Boot Machine

```
sudo sed -i -- 's/stem/dns1/g' /etc/


## Steps

* [Base VM Setup](base-vm.md)
* [Installing the Client Tools](docs/02-client-tools.md)
* [Provisioning Compute Resources](docs/03-compute-resources.md)
* [Provisioning the CA and Generating TLS Certificates](docs/04-certificate-authority.md)
* [Generating Kubernetes Configuration Files for Authentication](docs/05-kubernetes-configuration-files.md)
* [Generating the Data Encryption Config and Key](docs/06-data-encryption-keys.md)
* [Bootstrapping the etcd Cluster](docs/07-bootstrapping-etcd.md)
* [Bootstrapping the Kubernetes Control Plane](docs/08-bootstrapping-kubernetes-controllers.md)
* [Bootstrapping the Kubernetes Worker Nodes](docs/09-bootstrapping-kubernetes-workers.md)
* [Configuring kubectl for Remote Access](docs/10-configuring-kubectl.md)
* [Provisioning Pod Network Routes](docs/11-pod-network-routes.md)
* [Deploying the DNS Cluster Add-on](docs/12-dns-addon.md)
* [Smoke Test](docs/13-smoke-test.md)
* [Cleaning Up](docs/14-cleanup.md)