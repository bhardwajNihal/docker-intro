
# 🚀 WHAT IS DOCKER?
- Docker is a tool that lets you package your application (code + dependencies + environment)
- into a "container" that can run anywhere — on any system that has Docker installed.

# benefits a docker
  - makes the app run on any system, with minimal setup, just require docker installed locally.
  >> just clone the repo >> docker run.
  - no manual setup.

- --------------------------------------------------
# CORE CONCEPTS
- --------------------------------------------------

- ✅ IMAGE: A Docker image is a lightweight, standalone, executable package that includes everything needed to run a piece of software, including the code, a runtime, libraries, environment variables, and config files.

- ✅ CONTAINER: A running instance of an image.
- ✅ DOCKERFILE: A text file with instructions to build your image.
- ✅ VOLUME: A way to persist data on the host machine.
- ✅ NETWORK: Enables communication between containers.
- ✅ PORT MAPPING: Exposes container ports to your local machine.

- --------------------------------------------------
# BASIC DOCKER COMMANDS
- --------------------------------------------------

- Build an image from Dockerfile
docker build -t myapp .

- Run a container from an image
docker run -d -p 3000:3000 --name <container_name> <created_image_name>

- List running containers
docker ps

- List all containers (including stopped)
docker ps -a

- Stop a running container
docker stop mycontainer

- Remove a container
docker rm mycontainer

- Remove an image
docker rmi myapp

- See container logs
docker logs mycontainer

- --------------------------------------------------
# DOCKERFILE BASICS (Node.js Example)
- --------------------------------------------------

- FROM = base image
- WORKDIR = working directory inside container
- COPY = copy files into container
- RUN = run a shell command
- CMD = command to run when container starts
- EXPOSE = tell which port the app listens on

# Dockerfile:
- -------------------------
- FROM node:18  ----or node:22-alpine --> a lightweight version for the node
- WORKDIR /app
- COPY . .
- RUN npm install
- EXPOSE 3000
- CMD ["npm", "start"]
- -------------------------

# passing environment varialble
- docker run -p 3000:3000 -e DATABASE_URL="postgres://secret123
- the "-e" flag lets us pass env

------------------------------------
# Layers in docker
- Each instruction in your Dockerfile creates a new layer in the final image.
- These layers are stacked and cached.
- If nothing changes in a layer, Docker reuses the cached layer to make builds faster.
- Change in any layer = all layers below it are rebuilt.
- So it's important to order Dockerfile smartly to benefit from caching

# utilizing layers to create a much optimized docker file

- FROM node:22-alpine 
- WORKDIR /app
- COPY ./package.json ./package.json
- COPY ./package-lock.json ./package-lock.json
- RUN npm install
- COPY . .
- EXPOSE 3000
- CMD ["npm", "start"]

-- This way, any changes to only the source code, doesn't reinstall all dependencies all again

--------------------------------
# Running Mongodb container locally
- docker run -d -p 27017:27017 --name my_mongoDb_container mongo
  --> will check for any prexisting image
  ---> If not found, will pull one from the docker registry
  ---> confirm image once pulled, and running 
  ---> run it with the above command
  --> we have now mongodb container running
  --> go to mongodb atlas connect to this container by the url - mongodb://localhost:27017

  - kill the container by docker kill container id
  - delete the container otherwise will give name conflict when ran again 
    - command --> docker rm container_name
  - run it again, works fine, no conflict


---------------------------------------
# Volume

- clearly saw earlier with the mongo container
- when we kill the container and run it again
- see that the data is gone from the atlas
- to persist the data across kill and re-runs
  - volumes are used to persist container data even if the container is kill and re-run
  - command to create volume:
    >> docker volume create volume_name
  - command to run container connecting to volume
    >> docker run -p 27017:27017 -v volume_name:/data/db mongo
  - list existing volumes
    >> docker volume ls

- --------------------------------------------------
# DOCKER COMPOSE (Managing Multiple Containers)
- --------------------------------------------------

- docker-compose.yml allows you to run multi-container apps easily

- Example (Node.js + MongoDB):
- --------------------------------
- version: "3.8"
- services:
-   mongo:
-     image: mongo
-     ports:
-       - "27017:27017"
-
-   backend:
-     build: .
-     ports:
-       - "3000:3000"
-     environment:
-       - MONGO_URL=mongodb://mongo:27017/mydb
-     depends_on:
-       - mongo
- --------------------------------

- 🚀 To run both services:
docker-compose up

- 🧹 To stop and clean up:
docker-compose down

- --------------------------------------------------
# PORT MAPPING EXPLAINED
- --------------------------------------------------

- -p <hostPort>:<containerPort>
- Example: -p 3000:3000
- Meaning: Your local machine's 3000 talks to the container's 3000

- MongoDB Example:
- docker run -d -p 27017:27017 --name mongo mongo

- Now you can connect via: mongodb://localhost:27017

- --------------------------------------------------
# VOLUMES (PERSISTING DATA)
- --------------------------------------------------

- Without volumes, data inside container is lost on restart

- Example:
docker run -d \
  -v mongo-data:/data/db \
  -p 27017:27017 \
  --name mongodb mongo

- Named volume (mongo-data) keeps your DB safe even if container stops

# notes
- ✅ Use Docker for:
- - Consistent dev environments
- - Local development with isolated services (e.g. MongoDB, Redis)
- - Easy deployment to production

- ✅ Use Docker Compose when:
- - You have more than one service (e.g., app + db)
- - You want easy up/down of the whole stack

- ✅ Best Practices:
- - Keep Dockerfiles clean and minimal
- - Ignore node_modules in .dockerignore
- - Use environment variables in docker-compose.yml
