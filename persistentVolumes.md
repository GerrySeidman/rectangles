#  Persistent Volumes

## Labeling Nodes

```
kubectl get nodes --show-labels

# Set Label 'an' to 'n2'
kubectl label nodes kubw2.play.gerry an=n2
```



## Persistent Volume Example

> Based on https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage/

Create Persistent Volume  pointing to AuriStor path

```
kind: PersistentVolume
apiVersion: v1
metadata:
  name: aurivol
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 50Mi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/afs/play.gerry/gerry/html"
 ```

The Volume at this point is not bound
```

root@kubm1:~/pv# kubectl apply -f pva-vol.yaml
persistentvolume "aurivol" created

root@kubm1:~/pv# kubectl get pv
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM     STORAGECLASS   REASON    AGE
aurivol   50Mi       RWO            Retain           Available             manual                   10s
```

Create Persistent Volume Claim
```
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: mytask-pv-claim
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Mi
```
Now it gets bound with:
```

root@kubm1:~/pv# kubectl apply -f pva-claim.yaml
persistentvolumeclaim "mytask-pv-claim" created
root@kubm1:~/pv# kubectl get pv
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM                     STORAGECLASS   REASON    AGE
aurivol   50Mi       RWO            Retain           Bound     default/mytask-pv-claim   manual                   3m
root@kubm1:~/pv# kubectl get pvc
NAME              STATUS    VOLUME    CAPACITY   ACCESS MODES   STORAGECLASS   AGE
mytask-pv-claim   Bound     aurivol   50Mi       RWO            manual         24s
````

Create a simple nginx pod
```
kind: Pod
apiVersion: v1
metadata:
  name: task-pv-pod
spec:
  volumes:
    - name: task-pv-storage
      persistentVolumeClaim:
       claimName: mytask-pv-claim`
  containers:
    - name: task-pv-container
      image: nginx
      ports:
        - containerPort: 80
          name: "http-server"
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: task-pv-storage
   ```
   
Validate:
```
kubectl apply -f pod.yaml
kubectl exec -it task-pv-pod -- /bin/bash
  apt update
  apt install curl
  curl localhost/index.html
 ```

## Flex Volumes

/usr/libexec/kubernetes/kubelet-plugins/volume/

apt install jq
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTU3Mzg3MzQ0Ml19
-->