# Build Stage
FROM node:18 AS builder

WORKDIR /usr/src/app

# Copy only package.json and lock file to cache dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set the environment variable for OpenSSL legacy provider
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the React app
ARG REACT_APP_BE_URL
ENV REACT_APP_BE_URL=${REACT_APP_BE_URL}
RUN npm run build

# Production Stage
FROM node:18-slim

WORKDIR /usr/src/app

RUN npm install -g serve

# Copy the production build files
COPY --from=builder /usr/src/app/build ./build

# Expose the port for Cloud Run
EXPOSE 8080

CMD ["serve", "-s", "build", "-l", "8080"]
