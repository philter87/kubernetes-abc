## Helm

We want to use Helm to deploy our app. 


#### What is Helm?
Helm is convenient when deploying to multiple environments in kubernetes. Furthermore, it is will allow us to easily share helm charts. You can think about a helm as a "package manager" in a similar way as npm, nuget, maven or yum.

> It is not part of this tutorial but Helm is very powerful, because enables you "reuse" complicated deployments. For instance, a clustered PostgreSQL database.

The folder "nodejs-api-helm" contains the helm chart (You can create that with "helm create nodejs-api-helm")

The folder contains
- values.yaml. The default properties. I only have 3 props to simplify things
- values-prod.yaml. The properties for production.
- Chart.yaml. Name and version of the chart. 
- templates. This contains the configuration from the previous section with some adjustments
    - In node-api-deployment.yaml, APP_ENV is assigned {{ .Values.appEnvironment }}. This is the "syntax" for taking the appEnvironment variables from values.yaml (or values-prod.yaml). This will ensure that each environment is isolated in a namespace.
    - I have added a namespace to both service and deployment. It is assigned to my-api-{{ .Values.appEnvironment }}
    - I have a different port to ensure that there is no port collision when running local cluster 
    - I will use the secret from kubernetes. The steps to add a secret is showed below.  

> The weird syntax {{ .Values.appEnvironment}} is actually "Go Templates" from golang. You can read more about the syntax [here](https://blog.gopheracademy.com/advent-2017/using-go-templates/). 

#### Creating namespaces and secrets

Before we deploy, we will create the relevant namespaces and secrets.

```bash
# Create namespaces and secrets
kubectl create namespace my-api-dev
kubectl create namespace my-api-prod
kubectl create secret generic my-api-secret --from-literal=appsecret='VERY SECRET DEV' --namespace=my-api-dev
kubectl create secret generic my-api-secret --from-literal=appsecret='VERY SECRET PROD' --namespace=my-api-prod
```

#### Deploying the helm charts
Deploying the helm chart to dev and prod namespaces.

```bash
cd nodejs-api-helm

# Dev deployment
helm upgrade --install -f values.yaml my-api-dev .

# Production deployment
helm upgrade --install -f values-prod.yaml my-api-prod .

# list deployments
helm list

# Find service ips. In the kubernetes dashboard or with the commands below:
kubectl get services --namespace node-api-dev
kubectl get services --namespace node-api-prod

# Delete if you want to
helm delete node-api-dev 
helm delete node-api-prod
```