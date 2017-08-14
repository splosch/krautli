# krautli_yo#

`Krautli` is supposed to become an (offline/online)app that allows users to log positions of their favorite plants and find them back at times certain of their plantparts become harvestable.
It started with pen&paper and advanced to a collection of notes and photos taken with a smartphone.
The app -is- will be capable of logging Positions and Access Data offline and synchronize with the server if needed.

## The Techstack behind: ###

- was initially setup using [yeoman](http://yeoman.io/) for scaffolding
- with Grunt / Bower / Karma on board for Tasks / Dependency Handling / Tests
- AngularJS 1.6.5 & AngularJS Plugins
  - [angularLocalStorage](https://github.com/agrublev/angularLocalStorage) with cookie fallback
- Twitter Bootstrap

## Development setup ##

- Beneath this repo you need
  - node, npm, bower installed
- run `npm install` to resolve package.json
- run `bower install` to resolve bower.json
- tasks to run
  - `grunt` basic linting
  - `grunt test` to run unittests
  - `grunt server` to start serving from `http://localhost:9000`
  - `grunt build` *broken :(* to create a dist folder for serving from a fileserver

## Pages / Routes accessible ##
- Style-Collection: `http://localhost:9000/#!/`
- Landing-Page: `http://localhost:9000/#!/start`
- Search: `http://localhost:9000/#!/suggestName`
- Plant-Details: `http://localhost:9000/#!/details/2`
