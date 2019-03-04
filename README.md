# GiphyJS

Project based on NodeJS, Express and MongoDB. Composed by frontend/backend with register and login users, and API with JWS token.
Exists a [complementary project](https://github.com/megabass00/giphyjs-frontend) wich consumes the API and it had built in Angular 7.

## To use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) which comes with [npm](http://npmjs.com) installed on your computer. 

You can run the server from terminal and view app opening `http://localhost:3000` on your browser:
~~~~
# Clone this repository
git clone https://github.com/megabass00/giphyjs

# Run the app
npm start

# Open in your browser: http://localhost:3000
~~~~

## Using with Docker

You can use project with Docker but you need above [install Docker](https://docs.docker.com/install) on your system. After clone the project, you must build it:
~~~~
# Build images
docker-compose build --no-cache

# Run containers
docker-compose up
~~~~