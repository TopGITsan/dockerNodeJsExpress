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