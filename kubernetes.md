
# Kubernetes Setup

## THIRD TRY with: KUBE-MASTER, KUBE-WORKER1 & KUBE W2

Your Kubernetes master has initialized successfully!

To start using your cluster, you need to run (as a regular user):

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  http://kubernetes.io/docs/admin/addons/

You can now join any number of machines by running the following on each node
as root:

  kubeadm join --token 6e778a.99d8540ac49ff82e 192.168.10.150:6443 --discovery-token-ca-cert-hash sha256:b55f0aa87801be35ef0cab4c6024ad1e79355f5c11b4277bb12205d076c16069



## SECOND TRY WITH:  Ubuntu KC-1 &  KW-1

REMEMBER: 	   kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-cert-extra-sans=192.168.10.20

kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-cert-extra-sans=192.168.10.150 --apiserver-advertise-address=192.168.10.150

kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=192.168.10.150


Your Kubernetes master has initialized successfully!

To start using your cluster, you need to run (as a regular user):

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  http://kubernetes.io/docs/admin/addons/

You can now join any number of machines by running the following on each node
as root:

  kubeadm join --token c27992.9c3133b7b0eafc6a 10.0.2.12:6443 --discovery-token-ca-cert-hash sha256:b1e5008090238d483e0f2b5aab574c8a18f26b5b89666425b88d0c97ab8a6de2




## Using kubeadm

	Kubeadm
		https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm
		https://kubernetes.io/docs/setup/independent/install-kubeadm/
		https://kubernetes.io/docs/admin/kubeadm/
		
			apt install ebtables ethtool
			
			apt-get update
			apt-get install -y docker.io
			
			apt-get update && apt-get install -y apt-transport-https
			curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
			cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
			deb http://apt.kubernetes.io/ kubernetes-xenial main
			EOF
			apt-get update
			apt-get install -y kubelet kubeadm kubectl
			
			
	   swapoff -a
	   vi  /etc/fstab		<< Remove 'swap' line
	   
	   kubeadm reset
	   
	   kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-cert-extra-sans=192.168.10.20

		Your Kubernetes master has initialized successfully!
		
		To start using your cluster, you need to run (as a regular user):
		
		  mkdir -p $HOME/.kube
		  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
		  sudo chown $(id -u):$(id -g) $HOME/.kube/config
		
		You should now deploy a pod network to the cluster.
		Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
		  http://kubernetes.io/docs/admin/addons/
		
		You can now join any number of machines by running the following on each node
		as root:
		
		  kubeadm join --token 9e7ebb.399cc9b4b97d0209 192.168.10.150:6443 --discovery-token-ca-cert-hash sha256:a936880c2836bec644ea850c00f188d817084ffbad2841edfffce2b56beddadb


	REMEMBER TO DO WHAT THEY SAID
	
		To start using your cluster, you need to run (as a regular user):
		
		  mkdir -p $HOME/.kube
		  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
		  sudo chown $(id -u):$(id -g) $HOME/.kube/config

	To add Flannel:
		kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.9.0/Documentation/kube-flannel.yml

To control from other than master:

	scp gerry@kubc1:/etc/kubernetes/admin.conf .
	kubectl --kubeconfig ./admin.conf get nodes

To run demo app:

	kubectl apply -n sock-shop -f "https://github.com/microservices-demo/microservices-demo/blob/master/deploy/kubernetes/complete-demo.yaml?raw=true"

Kubernetes Dashboard

	kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml
	
	### FROM NON-MASTER MACHINE
	
	kubectl proxy
	http://localhost:8001/ui


## DEPRECATE BELOW: From HARD WAY

Following: https://github.com/kelseyhightower/kubernetes-the-hard-way/blob/master/

## 2. Client Tools

### JSON Tools

wget -q --show-progress --https-only --timestamping \
  https://pkg.cfssl.org/R1.2/cfssl_linux-amd64 \
  https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
chmod +x cfssl_linux-amd64 cfssljson_linux-amd64
sudo mv cfssl_linux-amd64 /usr/local/bin/cfssl
sudo mv cfssljson_linux-amd64 /usr/local/bin/cfssljson

cfssl version

### kubectl

wget https://storage.googleapis.com/kubernetes-release/release/v1.8.0/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

kubectl version --client

## 3. Provisioning Resources

| Type | Description | Host Name(s) | Static IP(s) |
| --- | --- | --- | --- |
| Kube| Controller | kubc1.play.gerry (+) | 192.168.10.150 (+) |
| Kube| Worker| kubw1.play.gerry (+)  | 192.168.10.160 (+) |

Initially just one controller and two workers

## 4. Provisioning a CA and Generating TLS Certificates

### Certificate Authority

Manually Create: ca-csr.json
Manually Create: ca-config.json

cfssl gencert -initca ca-csr.json | cfssljson -bare ca

Results:
	
	ca-key.pem
	ca.pem

### Client and Server Certificates

Manually Create: admin-csr.json

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  admin-csr.json | cfssljson -bare admin

Results:

	admin-key.pem
	admin.pem

### The Kubelet Client Certificates


Manually created kubw1-csr.json (and 2, 3)

I am guessing by having the internal and external addresses be the same...

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -hostname=kubw1.play.gerry,192.168.10.160,192.168.10.160 \
  -profile=kubernetes \
  kubw1-csr.json | cfssljson -bare kubw1

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -hostname=kubw2.play.gerry,192.168.10.161,192.168.10.161 \
  -profile=kubernetes \
  kubw2-csr.json | cfssljson -bare kubw2

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -hostname=kubw3.play.gerry,192.168.10.162,192.168.10.162 \
  -profile=kubernetes \
  kubw3-csr.json | cfssljson -bare kubw3

Results:

	kubw1-key.pem
	kubw1.pem
	kubw2-key.pem
	kubw2.pem
	kubw3-key.pem
	kubw3.pem


Created:   

	kube-proxy-csr.json


cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  kube-proxy-csr.json | cfssljson -bare kube-proxy

Result:

	kube-proxy-key.pem
	kube-proxy.pem


Create 

	kubernetes-csr.json


cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -hostname=10.32.0.1,10.240.0.10,10.240.0.11,10.240.0.12,192.168.10.150,192.168.10.160,192.168.10.161,192.168.10.162,,127.0.0.1,kubernetes.default \
  -profile=kubernetes \
  kubernetes-csr.json | cfssljson -bare kubernetes

Result:

	kubernetes-key.pem
	kubernetes.pem


## 5. Generating Kubernetes Configuration Files for Authentication

### The kubelet Kubernetes Configuration File

for instance in kubw1 kubw2 kubw3; do
  kubectl config set-cluster kubernetes-the-hard-way \
    --certificate-authority=ca.pem \
    --embed-certs=true \
    --server=https://192.168.10.150:6443 \
    --kubeconfig=${instance}.kubeconfig

  kubectl config set-credentials system:node:${instance} \
    --client-certificate=${instance}.pem \
    --client-key=${instance}-key.pem \
    --embed-certs=true \
    --kubeconfig=${instance}.kubeconfig

  kubectl config set-context default \
    --cluster=kubernetes-the-hard-way \
    --user=system:node:${instance} \
    --kubeconfig=${instance}.kubeconfig

  kubectl config use-context default --kubeconfig=${instance}.kubeconfig
done

Results:
	
	kubw1.kubeconfig
	kubw2.kubeconfig
	kubw3.kubeconfig

### The kube-proxy Kubernetes Configuration File


kubectl config set-cluster kubernetes-the-hard-way \
  --certificate-authority=ca.pem \
  --embed-certs=true \
  --server=https://192.168.10.150:6443 \
  --kubeconfig=kube-proxy.kubeconfig
  
kubectl config set-credentials kube-proxy \
  --client-certificate=kube-proxy.pem \
  --client-key=kube-proxy-key.pem \
  --embed-certs=true \
  --kubeconfig=kube-proxy.kubeconfig
  
kubectl config set-context default \
  --cluster=kubernetes-the-hard-way \
  --user=kube-proxy \
  --kubeconfig=kube-proxy.kubeconfig
  
kubectl config use-context default --kubeconfig=kube-proxy.kubeconfig

### Distribute the Kubernetes Configuration Files

for instance in kubw1 kubw2 kubw3; do
  scp ${instance}.kubeconfig kube-proxy.kubeconfig ${instance}:~/
done

## 6. Generating the Data Encryption Config and Key

cat > encryption-config.yaml <<EOF
kind: EncryptionConfig
apiVersion: v1
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: ${ENCRYPTION_KEY}
      - identity: {}
EOF



for instance in kubc1; do
  scp encryption-config.yaml ${instance}:~/
done

## Bootstrapping the etcd Cluster

wget -q --show-progress --https-only --timestamping \
  "https://github.com/coreos/etcd/releases/download/v3.2.8/etcd-v3.2.8-linux-amd64.tar.gz"
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzMTA1NDQ3MjNdfQ==
-->