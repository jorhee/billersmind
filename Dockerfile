# Build Stage
FROM node:18 AS builder

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Accept a build-time argument for the backend URL
ARG REACT_APP_BE_URL
# Set the environment variable (used during the build)
ENV REACT_APP_BE_URL=${REACT_APP_BE_URL}

# Build the React app for production
RUN npm run build

# Production Stage
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Install serve globally to serve static files
RUN npm install -g serve

# Copy the production build files from the builder stage
COPY --from=builder /usr/src/app/build ./build

# Expose the port for Cloud Run
EXPOSE 8080

# Command to run the app
CMD ["serve", "-s", "build", "-l", "8080"]
