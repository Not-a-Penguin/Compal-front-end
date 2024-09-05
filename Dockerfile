# build step
FROM node:16
LABEL authors="Eduardo"


# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install the dependencies
RUN npm install

# Copy the remaining application files to the working directory
COPY . .

# Build the application
RUN npm run build


# Expose port 3000 for the application
EXPOSE 5173

# Start the application
CMD [ "npm", "run", "dev" ]