
# 10/29 - Create Cluster - THIS WORKS

This is the culmination of what is done below with 'Using kubeadm'
```
root@kubm1:~# kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-cert-extra-sans=192.168.10.150 --apiserver-advertise-address=192.168.10.150
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

  kubeadm join --token 2fb96d.954d91c6e142ced4 192.168.10.150:6443 --discovery-token-ca-cert-hash sha256:b405d944b095ec321b3991fd0e7fa6250836685dc0c4ab38fc4e7c358313ab06
```
Then doing as they say
```
  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config		
  kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.9.0/Documentation/kube-flannel.yml
```

Then do the same on worker nodes (up to kubeadm, where you do the above join instead

This was derived from
* https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/#installing-kubeadm-on-your-hosts
* https://kubernetes.io/docs/setup/independent/install-kubeadm/
* https://kubernetes.io/docs/admin/kubeadm/#kubeadm-init
* 


# Kubernetes Setup


## Create a new VM for the Kubernetes Master

Clone VM and configure from the 
``` bash
export NEW_HOST=kubm1
export NEW_IP=192.168.10.150

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hostname
sudo reboot
```



## Create a new VM for the Kubernetes Worker-1

Clone VM and configure from the 
``` bash
export NEW_HOST=kubw1
export NEW_IP=192.168.10.160

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hostname
sudo reboot
```

## Create a new VM for the Kubernetes Worker-2

Clone VM and configure from the 
``` bash
export NEW_HOST=kubw2
export NEW_IP=192.168.10.161

sudo sed -i -- "s/192.168.10.100/$NEW_IP/g" /etc/network/interfaces
sudo sed -i -- "s/stem1/$NEW_HOST/g" /etc/hostname
sudo reboot
```



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
			
			## FAILS 
				cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
				deb http://apt.kubernetes.io/ kubernetes-xenial main
				EOF
			## CREATED MANUALLY 
				/etc/apt/sources.list.d/kubernetes.list
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

Accessing the Dashboard from another machine (via Proxy)
```
# GET TOKEN FOR WEB DASHBOARD
kubectl -n kube-system describe secret kubernetes-dashboard

# START PROXY
kubectl proxy

# ACESS VIA WEBPAGE
http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy
```
### dashboard-admin-create.yaml
``` yaml
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: kubernetes-dashboard
  labels:
    k8s-app: kubernetes-dashboard
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: kubernetes-dashboard
  namespace: kube-system
```

Then get the token via:
```
kubectl -n kube-system get secret

kubectl -n kube-system describe secret namespace-controller-token
kubectl -n kube-system describe secret kubernetes-dashboard

(Used to do specific, but the above seems to work better)
kubectl -n kube-system describe secret namespace-controller-token-dkzjf
- r
kubectl -n kube-system describe secret kubernetes-dashboard-token-4mnq9
```

## Quick Deployment

```
kubectl run foo --image=justinlukin/basicflask --port=8090

kubectl expose deployment foo --port=8090 --type=LoadBalancer

kubectl get svc

kubectl get svc foo -o=yaml

kubectl get svc foo -o=json
```

## Kubectl Cheat Sheet 

https://kubernetes.io/docs/user-guide/kubectl-cheatsheet/

$ source <(kubectl completion bash) 

Docs: https://kubernetes.io/docs/user-guide/kubectl/v1.8/#get

Man: https://www.mankier.com/package/kubernetes-client

## Cookbook

Also see: b:\books\Kubernetes-Cookbook.pdf

##  Deployment 

```
apiVersion: v1
kind: Service
metadata:
  name: ger-py
  labels:
    app: flask
spec:
  type: NodePort
  ports:
  - nodePort: 32222
    port: 8090
    protocol: TCP
    targetPort: 8090
  selector:
    app: flask
  sessionAffinity: None
  type: LoadBalancer
---
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: ger-py
spec:
  selector:
    matchLabels:
      app: flask
  replicas: 1  # tells deployment to run 2 pods matching the template
  template: # create pods using pod definition in this template
    metadata:
      # unlike pod-nginx.yaml, the name is not included in the meta data as a unique name is
      # generated from the deployment name
      labels:
        app: flask
    spec:
      containers:
      - name: flask
```
## Basic Usage


```
set KUBECONFIG=d:\beam\kubey\admin.conf
export KUBECONFIG=/home/gerry/kube/admin.conf


kubectl apply -f gerpy.yaml

kubectl describe deployment ger-py

kubectl describe pod ger-py

kubectl describe pod/ger-py

kubectl expose deployment ger-py --port=8090 --type=LoadBalancer

kubectl edit deploy/foo	

kubectl delete pod ger-py

kubectl delete svc ger-py


kubectl get deployment/foo -o json | jq --raw-output .status.conditions[0].type

kubectl cluster-info dump --all-namespaces --output-directory=$PWD/clusterstate-now

```

## Tools

Watching events:

`kubectl get events --namespace=my-namespace`

Getting Everything

`kubectl get all`

Executing a shell in a container

`kubectl exec -it shell-demo -- /bin/bash`

Execute single commands  (with output in your console)
```
kubectl exec shell-demo ps aux
kubectl exec shell-demo ls /
kubectl exec shell-demo cat /proc/1/mounts
```
Logs

`kubectl logs xxx`

Misc
```
kubectl run curl --image=radial/busyboxplus:curl -i --tty

kubectl get nodes -o jsonpath='{range.items[*]}{.metadata.name}{"\n"}'

```

## Private Docker Registry

At some point look at this
	https://kubernetes.io/docs/concepts/containers/images/#use-cases


<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyMDk3NDM4ODFdfQ==
-->