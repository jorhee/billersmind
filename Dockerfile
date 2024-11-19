# Use official Node.js image
FROM node:18

# Set working directory in container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Set the OpenSSL legacy provider environment variable to avoid the crypto error
#ENV NODE_OPTIONS="--openssl-legacy-provider"

# Set the environment variable for the backend URL
#ENV REACT_APP_BE_URL=https://billersmindbackend-337780895889.us-central1.run.app

# Copy the rest of the application
COPY . .

# Build the React app for production
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Expose the port for the app
EXPOSE 8080

# Command to run the app
CMD ["serve", "-s", "build", "-l", "8080"]
