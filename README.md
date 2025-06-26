
# 🚀 WHAT IS DOCKER?
- Docker is a tool that lets you package your application (code + dependencies + environment)
- into a "container" that can run anywhere — on any system that has Docker installed.

- --------------------------------------------------
# CORE CONCEPTS
- --------------------------------------------------

- ✅ IMAGE: A blueprint (like a recipe) of your application/environment.
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
docker run -d -p 3000:3000 --name mycontainer myapp

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
- COPY package*.json ./
- RUN npm install
- COPY . .
- EXPOSE 3000
- CMD ["npm", "start"]
- -------------------------

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
