
# Basic Python

``` bash
apt update
apt install -y python-pip
pip install kubernetes
```

# Flask

	http://flask.pocoo.org/docs/0.12/ickstart/

# Docker and Flask

	
	apt update
	apt install -y python-pip
	pip install Flask

	


Dockerfile
```
FROM ubuntu:16.04
MAINTAINER Gerry
RUN apt update -y && apt install -y python-pip && pip install Flask
COPY . /app
WORKDIR /app
ENTRYPOINT ["python"]
CMD ["app.py"]
```
Then make it with `docker build -t base-flask .`


# Python and Kubernetes

https://github.com/kubernetes-incubator/client-python/

https://github.com/kubernetes-incubator/client-python/tree/master/kubernetes

https://github.com/kubernetes-incubator/client-python/blob/master/kubernetes/docs/CoreV1Api.md
	
	apt update
	apt install -y python-pip
	pip install kubernetes




* Make sure ~/.kube/config is on this machine
	* scp gerry@kubm1:/home/gerry/.kube/config /home/gerry/.kube/config

``` python

from kubernetes import client, config

# Configs can be set in Configuration class directly or using helper utility
config.load_kube_config()

v1 = client.CoreV1Api()
print("Listing pods with their IPs:")
ret = v1.list_pod_for_all_namespaces(watch=False)
for i in ret.items:
    print("%s\t%s\t%s" % (i.status.pod_ip, i.metadata.namespace, i.metadata.name))
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0MzkxMjg4NDldfQ==
-->