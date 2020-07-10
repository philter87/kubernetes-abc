## Kubernetes

We will deploy to a local kubernetes cluster. 

#### Agenda: 
We will create a cluster and use the kubernetes cli tool "kubectl": 
1. Create a cluster on your machine.
2. 'kubectl run'. Deploy docker image to kubernetes. Similar to 'docker run'
3. 'kubectl apply'. Deploy docker image to kubernetes based on configuration


#### Create a kubernetes cluster on your machine 
You will need to run a kubernetes cluster locally. This is fairly straight forward if you have installed docker.
 1. On windows - right click the docker icon in the lower right corner. 
 2. Click "Settings". 
 3. Find "Kubernetes" tab and click "Enable Kubernetes"
 4. Wait a bit

##### Run image - "kubectl run"
You can run an image with "kubectl run" which is very similar to "docker run" in the previous section.

```bash
kubectl run --image=my-api:1.0.0 my-api-app --port=8080

# The statement above will create two resources: a "deployment" and a "pod". 
# A "pod" is usually a docker container and a "deployment" is a description of the "desired state" after a deploy.
# For instance, a "deployment" will describe which image to use, which ports to expose and how many instances of an app

# You can see pods and deployments with:
kubectl get deploy
kubectl get pod

# The pod runs inside the clusters network. You can expose it through a service which we will call my-api-service. 
# We create a service called "my-api-service" that expose the app on localhost:8080.      
kubectl expose deployment my-api-app --type=LoadBalancer --name=my-api-service --port=8080

# You can see it here
kubectl get service

# Again you can open your browser on http://localhost:8080

# Now you should clean up. You only need to delete the service and the "deployment", and not the pod 
# If you try to delete the pod first it will be redeployed, because the "deployment" expects a running pod.

kubectl delete deploy/<deployment-name>
kubectl delete service/<service-name>
```
 
#### Deploy configuration - "kubectl apply"
We want "Configuration as code". 

The file "node-api-deployment.yaml" contains the configuration required to create a "deployment" and "pod" similar to the previous section. The configuration is based on [A deployment configuration](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment).

Furthermore, we have added some environment variables in the configuration. The environment variable APP_DEV is set to "DEV" and APP_SECRET="NOT_REALLY_A_SECRET_YET"".

Now you can deploy:
```bash
# Deploy the app
kubectl apply -f node-api-deployment.yaml
kubectl apply -f node-api-service.yaml

# Show status on pods, deployments and service
kubectl get pod
kubectl get deploy
kubectl get service

```   

#### Secrets

> Assignment! Add a secret in kubernets and use this in the app

We will add a secret as well called "my-app-secret"
```bash
kubectl create secret generic my-app-secret --from-literal=appsecret='This is a very secret message'
```

If we want to use this secret, we need to make an adjustment in node-api-deployment.yaml.

```yaml
# The environment variable:
- name: APP_SECRET
  value: "NOT_REALLY_SECRET_YET"


# Should be replaced with:
- name: APP_SECRET
  valueFrom:
    secretKeyRef:
      name: my-app-secret
      key: appsecret
``` 