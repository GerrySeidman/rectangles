

ger-dep.yaml
```

apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: ger-dep
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 1  # tells deployment to run 2 pods matching the template
  template: # create pods using pod definition in this template
    metadata:
      # unlike pod-nginx.yaml, the name is not included in the meta data as a unique name is
      # generated from the deployment name
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

Deploying and breaking down
```
kubectl apply -f ger-dep.yaml
kubectl expose deployment ger-dep --port=80 --type=LoadBalancer
kubectl get svc

kubectl delete svc ger-dep
kubectl delete deployment  ger-dep
```


# Persistent Volumes

Persitent Volume Claim
```
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: task-pv-claim
spec:
  volumeName: task-pv-volume
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi
```
Persistent Volume

```
kind: PersistentVolume
apiVersion: v1
metadata:
  name: task-pv-volume
spec:
  storageClassName: manual
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/tmp/data"
    ```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTE1MzQwMTE4XX0=
-->