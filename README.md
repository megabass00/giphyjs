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

## Test units

This project implements test units using [mocha](https://www.npmjs.com/package/mocha), [chai](https://www.npmjs.com/package/chai), [chai-http](https://www.npmjs.com/package/chai-http) and [superagent](https://www.npmjs.com/package/superagent) libraries. You can execute test from package.json scripts:
~~~~~
# Run test script
npm run test
~~~~~

Also you can execute test units trough the [live-server](https://www.npmjs.com/package/live-server) library directly from browser:
~~~~~
# Run test units from browser
npm run test:browser
~~~~~

> Thanks to my jedi partners:
- :neckbeard: Kraken 
- :japanese_goblin: Garcilaso
- :person_with_blond_hair: Markes
- :sunglasses: Otto
- :smirk: Ivan
- :sunflower: Domator
