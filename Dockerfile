FROM node:22.14.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app
RUN npm run build

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["node", "dist/src/main"]
