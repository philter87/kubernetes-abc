## Kubernetes workshop
The purpose is to deploy a docker image to a local Kubernetes with helm.

We will deploy a nodejs app to a dev and a prod namespace with different env variables and secrets, see picture below. The picture contains several kubernetes concepts which will be explained briefly at the workshop.

The kubernetes CLI tool "kubectl".

### Agenda
The workshop is divided in three parts - a folder and readme per folder.
1. Docker (10 min)
2. Azure Kubernetes (30 min)
3. Helm (20 min)

### Prerequisites
You will need some software - you should install this before the workshop.

I recommend that you install the software with [Chocolatey](https://chocolatey.org/docs/installation).

###### Install with Chocolatey
```bash
# Remember "Run as admin"
choco install docker-desktop -y
choco install kubernetes-helm -y
choco install nodejs -y
``` 

If you find any issues, then please add some comments above.

###### Install Manually
- Docker. [Install docker](https://docs.docker.com/docker-for-windows/install/)
- Kubernetes CLI. [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
    - This might be included in the Docker installation. Test if exists with "kubectl version"  
- Helm CLI ("helm"). [Install helm](https://github.com/helm/helm/releases)
- NodeJs. [Install node](https://nodejs.org/en/download/) We will run a nodejs app, so that is why you need this
    - This is optional.