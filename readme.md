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
