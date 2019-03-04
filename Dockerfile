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

# install libvips
# RUN wget "https://github.com/libvips/libvips/releases/download/v8.7.4/vips-8.7.4.tar.gz" \
#             && tar xf vips-8.7.4.tar.gz \
#             && cd vips-8.7.4 \
#             && ./configure

# copy app files except 'node_modules'
COPY . .
RUN rm -rf node_modules

# install node packages
# COPY package.json .
RUN npm set progress=false && \
        npm config set depth 0 && \
        npm cache clean --force && \
        npm i --loglevel=error

# RUN rm -rf node_modules/sharp/vendor && npm rebuild

# install nodemon globally
# RUN npm i nodemon -g --quiet

# expose ports
EXPOSE 8000

# init app
CMD npm run start:docker