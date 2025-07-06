# -----------------------------------------------

# Basic dockerfile, to dockerize an exress backend.

# Use Node base image. Alpine = minimal, lightweight (~5MB)
FROM node:22-alpine

# Set the working directory inside the container
# All subsequent commands will run from /app
WORKDIR /app

# Copy all files from project root into /app in container
COPY . .

# Install dependencies (this runs during image build)
RUN npm install

# Expose port 3000 (so Docker knows what port the app listens on)
EXPOSE 3000

# Start the app when the container is run
CMD ["node", "index.js"]


# ✅ docker build -t app_name .         → Builds the image
# ✅ docker run -p 3000:3000 app_name   → Runs the container, maps port 3000 to localhost


# Docker containers are independent of the terminal session once started.
# So closing or exiting our terminal doesn’t stop the container
# It keeps running until we explicitly stop or kill it

#  docker stop vs docker kill
# docker stop - Gracefully stops the container by sending the SIGTERM signal, waits for cleanup, then sends SIGKILL if it doesn't exit in time.
# docker kill - Immediately stops the container by sending the SIGKILL signal — no cleanup, no waiting. Just bang 💥.