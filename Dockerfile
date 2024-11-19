# Build Stage
FROM node:18 AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the application code
COPY . .

# Build the React app
RUN npm run build

# Production Stage
FROM node:18-slim

# Install serve for static file hosting
RUN npm install -g serve

# Set working directory
WORKDIR /usr/src/app

# Copy the built app from the builder stage
COPY --from=builder /usr/src/app/build ./build

# Add a script to generate runtime environment variables
COPY public/env-template.js ./build/env-template.js

# Replace the backend URL dynamically during startup
RUN echo '#!/bin/sh\n\
  envsubst < ./build/env-template.js > ./build/env.js\n\
  exec "$@"' > /entrypoint.sh && chmod +x /entrypoint.sh

# Expose the port for Cloud Run
EXPOSE 8080

# Use the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]

# Command to serve the app
CMD ["serve", "-s", "build", "-l", "8080"]
