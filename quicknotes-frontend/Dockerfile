# Use a Node.js image to build your frontend app
FROM node:22.12.0

# Set the working directory to /app
WORKDIR /app

RUN npm install -g ts-node typescript

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code into the container
COPY . .

# Expose the port that your app will run on
EXPOSE 80

# Start the app
CMD ["npm", "run", "dev"]