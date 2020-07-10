## Docker

We want to run a docker container with a small app with three endpoints.    

#### What?
The application we are running has three endpoints:   

The app will expose three endpoints at http://localhost:8080.
- '/'. Returns "Hello World!" 
- '/env'. Returns the environment variable "APP_ENV" if exists.
- '/secret'. Returns "APP_SECRET" if exists.

>These endpoints will become important later when we want to deploy to kubernetes in different environment. I know the APP_SECRET is silly, but later I want to illustrate how to provide secrets in kubernetes.  

#### Run application on this machine (Optional)
The app we will run is a nodejs app. You can just skip this section if you don't have node installed.

```bash
# install dependencies and run app
npm install
node index.js

# run the app locally
node index.js
```

> Why nodejs? Because it is very simple. One file "index.js" with 13 lines of code

#### Build and run with docker
```bash
# Build image based on Dockerfile and give it a name and version. Ex. "my-api:1.0.0"
docker build . --tag my-api:1.0.0

# Run container and expose container port 8080 on localhost:8080 
docker run -d -p 8080:8080 my-api:1.0.0

# Open your browser at http://localhost:8080

# Run with environment variables
docker run -d -p 8080:8080 --env APP_ENV="hi" --env APP_SECRET="very secret message" my-api:1.0.0

# See containers and stop it
docker ps
docker stop <container-id>
```
