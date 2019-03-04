# base image
FROM node
# FROM alpine:edge
# FROM araanbranco/node-alpine-libvips

# metadata
LABEL "com.megabass00.giphy-js"="megabass00"
LABEL maintainer="luis.izquierdo@protonmail.com"
LABEL version="1.0"

# create and use work directory
RUN node -v && mkdir -p /opt/app
WORKDIR /opt/app

# install node packages
COPY package.json .
RUN npm set progress=false \
        && npm config set depth 0 \
        && npm cache clean --force \
        && npm i --loglevel=error
RUN rm -rf node_modules/sharp/vendor && npm rebuild

# install nodemon globally
# RUN npm install nodemon -g --quiet

# copy app files
COPY . .

# expose ports
EXPOSE 8000

# init app
CMD npm run docker