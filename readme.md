# devops
## build an image
    docker build -t node-app-image .
## run an image
    docker run --name node-app -d -p 3001:3000 -v $(pwd):/app -v /app/node_modules node-app-image
## remove an running container
    docker rm node-app -f
## list all containers
    docker ps -a
## see container logs
    docker logs node-app
## execute a command on an container
    docker exec -it node-app bash
## read only volume
    docker run --name node-app -d -p 3001:3000 -v $(pwd):/app:ro -v /app/node_modules  node-app-image
## use env variable
    docker run --name node-app -d -p 3001:4000 -v $(pwd):/app:ro -v /app/node_modules -e PORT=4000  node-app-image
### show the env variables on linux
    printenv
## use env file
    docker run --name node-app -d -p 3001:4000 -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env  node-app-image
## list all the running containers
    docker ps
## list all the volumes
    docker volume ls
## remove all unnecessary volumes 
    docker volume prune
## remove a volume
    docker volume rm name
## delete the container and the volume associated with it
    docker rm node-app -fv
## run a container from a docker-compose.yml file
    docker-compose up
## remove a container with its volumes
    docker-compose down -v
## use dev conf and prod conf for docker
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d 
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d 
### in prod you need to rebuild the image because there is no bind mount
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
## remove container
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
## show all networks
    docker network ls
## inspect a network
    docker network inspect network_id
## scale backend, bring up two instances, proxy call with nginx
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2
## -V, --renew-anon-volumes   
## Recreate anonymous volumes instead of retrieving data from the previous containers.
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V

## Deploy in prod
### login ur server 
```ssh root@123.123.12.123```
### get docker installed docs.docker.com
#### get.docker.com has a script that installs docker for u automatically
```curl -fsSL https://get.docker.com -o get-docker.sh```
#### run the file, execute the script
```sh get-docker.sh```
#### check if docker and docker-compose is installed
```docker --version```
```docker-compose -v```
#### https://docs.docker.com/compose/install/
#### download the current stable release of Docker Compose
```sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose```
##### Apply executable permissions to the binary:
```sudo chmod +x /usr/local/bin/docker-compose```
#### create a git repository for the app
##### locally create repo
```git init```
##### add all files
```git add --all```
##### commit your files
```git commit -m "first commit" ```
##### create a new branch
```git branch -M main ```
##### set remote repo
```git remote add origin https://github.com/profile/repo.git```
##### push changes to online repo
```git push -u origin main```
##### configure env var on the server, ubuntu machine
```export REDIS_SECRET="hello"```
  - does not persist on reboot
##### show env var
```printenv```
##### create env file and store them in it
```vi .env```
##### open .profile file, on the bottom create a simple config
```set -o allexport; source /path/to/.env; set +o allexport```
##### close terminal session and reopen
##### shh back in
##### printenv
##### make a folder on WORKDIR /opt/node_mongo_app
##### clone repo
```git clone https://github.com/profile/repo.git```
##### build and run containers
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d```
##### rebuild only a service
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build node-app```
##### rebuild only a service, do not check others
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app```
##### rebuild a container for whatever reason
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate node-app```
##### rebuild a container for whatever reason but do not rebuild others
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate --no-deps node-app```
## but, never build an image on your production resource
### create a docker registry or use docker hub
#### create a new repository
#### from dev env log in
```docker login```
#### rename image
```docker image tag current-image-name username/name-of-the-repository```
#### push a image to your new repository NAME= username/name-of-the-image:tag-name
```docker push [OPTIONS] NAME[:TAG]```
#### rebuild the prod image after changes
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml build```
#### rebuild the prod image after changes for just one of our services
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml build node-app```
#### push the image to docker hub
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml push node-app```
#### from the prod server
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull node-app```
#### rebuild the container with the new pulled image
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps node-app```

### automate docker pull image with docker watchtower https://containrrr.dev/watchtower/
#### use container watchtower to watch over other containers in docker hub
```
docker run -d \
  --name watchtower \
  -e WATCHTOWER_TRACE=true \
  -e WATCHTOWER_DEBUG=true \
  -e WATCHTOWER_POLL_INTERVAL=50 \
  -V /var/run/docker.sock:/var/run/docker.sock containerrr/watchtower container_name
```
### docker-compose is not for production ready app, is a little tool for little projects
### push out changes to our production server without experiencing any loss
### rolling updates with kubernetes or docker swarm: a container orchestraitor
for default docker swarm is disabled
```docker info```
#### to enable swarm
```docker swarm init```
```docker swarm init --advertise-addr pubblic_ip_addr```
```docker service --help```

#### after the setup of the docker-compose.prod.yml file to bring the containers up with swarm use:
```docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml stackName```

#### list all of the node within out docker swarm
```docker node ls```
#### list all of the stacks
```docker stack ls```
#### list all of the services in a stack
```docker stack services stackName```
```docker services ls```
#### list all of the tasks
```docker stack ps stackName```