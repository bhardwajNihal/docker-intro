
# Steps to dockerize this simple express app

1. add a Dockerfile in the project root     (make sure docker is installed)
2. add scripts to this file to create and run and image
    - add node_modules to .dockerignore file
        - FROM = base image
        - WORKDIR = working directory inside container
        - COPY = copy files into container
        - RUN = run a shell command
        - CMD = command to run when container starts
        - EXPOSE = tell which port the app listens on


# Simple crud using mongo container
    - pull a mongo image from registry >> docker pull mongo
    - run the container on a desired port let say 5000
        >> docker run -d -p 5000:27017 --name my_mongodb mongo
        - this starts mongo container on port 5000 of the local machine
        - connect to this port via atlas

    - connect to db via mongoose in the express backend
    - add entry

    # Note: 
        - killing and then restarting the mongo container erases data from the db
        - this is where Volumes in docker comes into play.
        - Volumes lets us persist data, even if the container is killed
            1. create a volume
                >> docker volume create volume_name
            2. link the volume, when starting the container
                >> docker run -d -p 5000:27017 -v volume_name:/data/db --name container_name mongo
        - now even if killed
        - restart the container linking with same volume, data persists


# Docker Network
- when running node app normally
    - mongodb can be accessed via localhost, even if containerized, as the container is mapped to a local port.
    - if -p 5000:27017, 
        - then even can be connected by string --> mongo://localhost:5000
        - but if connect to network
        - then can only be connected to the containers port(27017) and not the local mapped port(5000). 
- but when run via docker command.
    - then the express and mongo are two different containers, with their own localhost.
    - so db can't be connect using mongo://localhost:27017 
- so for this, for containers to communicate to each other
    1. create a network
        - docker network create network_name
    2. start containers specifying network, db_container with volume
        here :
        >>docker run -d \
        --name <container_name> \
        --network <network_name> \
        -v <volume_name>:/data/db \
        -p 27017:27017 \
        mongo
        >> docker run -d \
        --name <container_name>
        --network <network_name> 
        -p 3000:3000 <image_name>

    - done
