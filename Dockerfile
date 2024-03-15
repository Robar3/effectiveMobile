FROM node:21.5-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm i && npm run build
EXPOSE 80
#CMD [ "serve", "-s", "build" ]
### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder
COPY --from=build /app/dist/effective-mobile/browser /usr/share/nginx/html
ENTRYPOINT ["nginx","-g","daemon off;"]
#COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
#EXPOSE 80
