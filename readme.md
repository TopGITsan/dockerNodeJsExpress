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