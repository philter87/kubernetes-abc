## Kubernetes workshop
The purpose is to deploy a docker image to a local Kubernetes with helm.

We will deploy a small api to two environments - dev and a prod. The environments will have different env variables and secrets. See picture at the bottom.

### Agenda
The workshop is divided in three parts - a folder and readme per folder.
1. [Docker](a-docker)
2. [Kubernetes](b-kubernetes)
3. [Helm](c-helm)

### Prerequisites
You will need some software. You can do it with Choco or manually: 

###### 1. Install with Chocolatey
```bash
# Remember "Run as admin"
choco install docker-desktop -y
choco install kubernetes-helm -y
choco install nodejs -y
``` 

###### 2. Install Manually
- Docker. [Install docker](https://docs.docker.com/docker-for-windows/install/)
- Kubernetes CLI. [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
    - This might be included in the Docker installation. Test if exists with "kubectl version"  
- Helm CLI ("helm"). [Install helm](https://github.com/helm/helm/releases)
- NodeJs (Optional). [Install node](https://nodejs.org/en/download/) We will run a nodejs app, so that is why you need this
    
![Kubernetes image](kubernetes-overview.png)