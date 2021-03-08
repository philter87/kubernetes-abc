## Kubernetes
We will deploy to a local kubernetes cluster with kubectl. 

#### Agenda: 
1. Create a cluster on your machine.
3. 'kubectl apply'. Deploy docker image to kubernetes based on configuration
4. Add a secret to kubernetes


#### 1. Create a kubernetes cluster on your machine 
You will need to run a kubernetes cluster locally. This is fairly straight forward if you have docker installed.
 1. On windows - right click the docker icon in the lower right corner. 
 2. Click "Settings". 
 3. Find "Kubernetes" tab and click "Enable Kubernetes"
 4. Wait a bit

#### 2. Run image - "kubectl run" (Optional)
You can run an image with "kubectl run" which is very similar to "docker run" in the previous section.
The statement below creates a **pod** with one container.

```bash
kubectl run --image=my-api:1.0.0 my-api-app --port=8080
```
BUT... We want to do more than that. See the next section.
  
#### 3. Deploy configuration - "kubectl apply"
We want to create two kubernetes resources: a **deployment** and a **service**.

A **deployment** is a kubernetes concept - it describes a "desired state".
The "desired state" could be: I want three pods running with an open port on 8080 and with environments variables: APP_ENV="hi" and APP_SECRET="very secret message".

If for instance a pod crashes (maybe as a result of a memory leak), the deployment will automatically create a pod to recreate the desired state.  

The file "deployment.yaml" contains the configuration required to create a deployment and the corresponding pod(s). The configuration is based on [A deployment configuration](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment).

Furthermore, we have added some environment variables in the configuration. The environment variable APP_DEV is set to "DEV" and APP_SECRET="NOT_REALLY_A_SECRET_YET"".

Now you can deploy:
```bash
# Deploy the app
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

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

If we want to use this secret, we need to make an adjustment in deployment.yaml.

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


```bash
# Deploy the deployment again
kubectl apply -f deployment.yaml

# Go to the browser at localhost:8080/secret and it should show the secret

# Remember to clean up
kubectl delete deploy/my-api
kubectl delete service/my-api-service
```   
