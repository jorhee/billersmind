# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port your app will run on
EXPOSE 8080

# Define the command to run your app
CMD ["npm", "start"]
