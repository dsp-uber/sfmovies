[![Build Status](https://travis-ci.org/dsp-uber/sfmovies.svg?branch=master)](https://travis-ci.org/dsp-uber/sfmovies)

[![Dependencies](https://david-dm.org/dsp-uber/sfmovies.svg)](https://david-dm.org/dsp-uber/sfmovies)

# sfmovies
sfmovies is a small web app that allows you to browse movies that have filming locations in San Francisco. It was made as part of the Uber Front-end Coding Challenge.

## Getting Started

### Installation

#### create-react-app
The app is bootstrapped using the [create-react-app](https://github.com/facebookincubator/create-react-app) toolkit so if you're familiar with it, you can jump in right away.

#### Getting the code
To serve the app on your local environment, you need to run the following commands:
```bash
git clone https://github.com/dsp-uber/sfmovies.git
cd sfmovies
yarn
```
(If you don't have [yarn](https://github.com/yarnpkg/yarn), you can run `npm install` instead)

#### Starting the app
Now you're ready to start the app!
```bash
yarn start
```
(If you don't have yarn, you can run `npm start` instead)

[localhost:3000](http://localhost:3000) will open automatically in your browser and you can start using the app.

### Running Tests
sfmovies uses [Jest](https://facebook.github.io/jest/) as the test running and uses [Enzyme](https://github.com/airbnb/enzyme) to render/mount the components in the mock DOM. To mock the Redux store for the reducer/actionCreator/action tests [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store) is used.

To run the tests,
```bash
yarn test
```
(If you don't have yarn, you can run `npm test` instead)


If you're into fancy code coverage, this is the command for you:
To run the tests,
```bash
yarn test -- --coverage
```
(If you don't have yarn, you can run `npm test -- --coverage` instead)

#### Continuous Integration
Every time code is pushed to any branch, tests are running on [Travis-CI](https://travis-ci.org/dsp-uber/sfmovies), and a badge is showing the current state of the build on the README.

#### Testing Strategy
There are [PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) in every component to do typechecking for every property while developing the app. I very much prefer this way to running an external tool to parse the files or using a non-standard variation of JavaScript.
Testing ReactJS components doesn't really make sense most of the time, because you would be testing if React actually does what it says it does, so most of the components have just 1 test to make sure they render without crashing.
Any utility function for any component or in general is completely covered with tests.
The tricky part in testing was the Redux Actions, Action Creators and Reducers. Only 3 of them are left untested because of time constraints, the rest are all tested and mocked out to make sure they are calling the right actions in the right order and pass the correct state over to the next dispatches.

### Deployment
To create an optimized production build of the app, just run the following command:
```bash
yarn build
```
(If you don't have yarn, you can run `npm run build` instead)

This will create a minified version of the page in the build folder and it doesn't require any backend to run.

The app is hosted on [GitHub Pages](https://dsp-uber.github.io/sfmovies/), and it's really easy to update what is deployed, just run the following command:
```bash
yarn deploy
```
(If you don't have yarn, you can run `npm run deploy` instead)

### Structure
I prefer to organize files by domain and not by type, so you won't find the classic `components` and `containers` folders in this app!
* `sfmovies`
  * `databuilder` *This is the tool to generate the JSON files from the SF OpenData + TMDb. Just run `node index.js` in the folder and it will do the rest.*
	* `public` *This is where all the static files and the `index.html` entrypoint go.*
	* `src` *The Source.*
	  * `app` *All the components and utils and the store are here, these are the root-level things for the app.*
		* `ducks` *Everything that makes Redu(x)cks work are here in the ducks folder, sorted by domain instead of type.*
		* `Movie` *Because the app handles movies, it has its own folder with all the reusable parts (Ratings, Genres, PropType).*
		* `MovieCard` *This is the card representation of a Movie.*
		* `MovieList` *This is the page where all the cards are displayed.*
		* `MovieMap` *This is the page where the map is shown with the location markers*
		* `MoviePanel` *This is on the right-hand side of the map page*

#### Ducks
Based on [this repo](https://github.com/erikras/ducks-modular-redux) it seemed like a really good idea to bundle all the different parts of Redux together into Ducks and it's been working great. Things are together in one place, and I don't need to import a million modules to get my dispatches flying off.

#### CSS BEM
I decided to not use LESS or SCSS because of 2 reasons, firstly I would have had to [eject the build configuration for create-react-app](https://github.com/facebookincubator/create-react-app#converting-to-a-custom-setup) and I wanted to keep the whole scaffolding as lightweight as possible and I wanted to try something different for this project, so I saw that Material Design Lite uses [Block__Element--Modifier](http://getbem.com/introduction/) as their CSS naming convention, which makes for reusable styles, no unnecessary nesting and very simple rules. It made using vanilla CSS so much easier that the only thing I was really missing was variables so I can just reuse colors or unit values throughout the whole app.

## Technology list
* React - https://facebook.github.io/react/
I've used React before starting this project but that other project is still in the planning/prototyping phase so I never had a chance to really dive deep into Redux so this was the perfect opportunity to go all in.

* Redux - http://redux.js.org/
I haven't tried Redux before this app, but I did read a lot about it and understood the concept. Trying it out was a bit harder in the beginning but after a few hours everything clicked and I really like it. I don't think I want to go back to any other type of state container / data storage.

* redux-thunk - https://github.com/gaearon/redux-thunk
* redux--mock-store - https://github.com/arnaudbenard/redux-mock-store
I wanted to make sure it's possible to dispatch actions that will in turn dispatch other actions and request data asynchronously and this tool helped me do just that. Testing was a bit harder to figure out, but everything fell into place when using redux-mock-store.

* Jest - https://facebook.github.io/jest/docs/tutorial-react.html
* Enzyme - http://airbnb.io/enzyme/
I used Jest to run Jasmine tests and mock all the modules that aren't being tested in the specs. I used Enzyme to help me with writing tests for the React components.

* webpack - https://webpack.github.io/
I wanted to use JSX and ES6 so I went with webpack, it also helped that everything came already set up in create-react-app.


* react-router - https://github.com/ReactTraining/react-router
* react-router-redux - https://github.com/reactjs/react-router-redux
I didn't dive very deep into the router, I can only use hashHistory because of GitHub pages, and all I needed to do was to make sure that if the user is viewing a movie on the map page, they can take the url and send it to someone else and the same movie will load for the other user too.

* react-lazyload - https://github.com/jasonslyvia/react-lazyload
This is a very simple tool to replace the components on the page with placeholders until they scroll into view. This saved the MovieList page from crippling the browser.
(I didn't want to use pagination, I much prefer automatic lazy loading of content, and because I didn't have a real REST API this was perfect for this solution)


* create-react-app & react-scripts - https://github.com/facebookincubator/create-react-app
Very nice start of an app, although in retrospect, webpack might produce a bit larger footprint than browserify or commonjs, but using JSX and having everything set up so I can get straight to coding was worth it.
* gh-pages - https://github.com/tschaub/gh-pages
This tool helps with checkout out the `gh-pages` branch and pushing the optimized build into it.



* moviedb - https://github.com/impronunciable/moviedb
* google-map-react - https://github.com/istarkov/google-map-react
* request - https://github.com/request/request
I used these to get the external data for loading everything on the page, including the map.

## Things that didn't make because of time constraints
2 weeks is not a lot of time for prototyping, implementation and testing of a complete web app especially if it includes a bit of time for experimentation, trying to get some fancy 3D maps working, or just figuring out how to test asynchronous redux actions, so naturally there will be some features missing and some rougher edges in the code.
Here's a list of things that didn't make it:
- Tech
	- The `secrets.json` file should be in the `.gitignore` and built in to travis-ci using encrypted values in the `.travis.yml` or build environment variables.
	- The AppBar is present once in the MovieList and once in the MovieMap components. It should be in one central place controlled by the Redux state.
	- The `databuilder` uses `lat/lon` for the coordinate naming, and everything else uses `lat/lng`. I found out too late that Google Maps uses `lng` for Longitude.
	- If this project is to grow bigger, the need for variables in CSS are required, so adding a CSS pre-processor like LESS or SCSS would be needed.
- Missing pages/functionality
	- The About Page (Listing all technologies and API licenses, etc.)
	- When loading the MovieMap page, the markers are all in the viewport but the map doesn't zoom so only they are in the viewport.
	- Even though the MovieList is responsive, the MovieMap is completely untested on mobile. I wanted to have a drawer slide in from the right when tapping on a button/icon in the AppBar to show the MoviePanel.
	- The search only looks inside the title of the movies and not in a very smart way. It should be searching in all the possible fields and even suggest autocompletion for what you're currently typing.
	- There is no 'Showing 2 results' text and no 'No results found' text while searching, it makes the experience lacking.
	- The styling for the MoviePanel is half-baked, I have a plan to fix it up just didn't have enough time to do so.
- Bugs
	- There is a bug with the search field and if you open it once and go to the map view, you need to reload the page to make it work again =/
	- Some locations have fun facts listed below them and if they are too long, they are cut off.

## UBER Front-end Coding Challenge

### The Task
The task for this challenge was to take this dataset of [Film Locations in San Francisco](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am) and create an interesting and interactive experience around the data.

As an added bonus, hooking up external data sources would make the solution even better.

The whole point of the challenge is to gauge how the candidate would perform in real-word scenarios and how far can they take the code in terms of readabilty, understandability, how they choose the architecture, how are they approaching testing, code formatting & consistency, etc.

### My solution
I started the task by looking at the data and trying to figure out how to shape it into something that would actually be nice to look at and use. I immediately realized that I'll need to pull in external datasources, so I wrote a small NodeJS tool to query the [The Movie DB](https://www.themoviedb.org/) database and find posters for each movie.

Then I realized that there are a bunch of series mixed in with the movies, so I removed those and I also removed any entry that didn't have location data attached to it. I also used [Google's GeoCoding API](https://developers.google.com/maps/documentation/geocoding/intro) to try to get lat/lng coordinates for each address in the original dataset.

I wanted to deploy the app on GitHub pages where I don't have access to a backend, so everything was done offline and the main data source for the application is a json file, the other is the TMDb API to enrich individual movies when diving into the map view.


While working on this, I started designing the app and finally had the chance to build something using [Google's Material Design Guidelines](https://material.google.com/). I looked at a bunch of different solutions, [some](http://www.material-ui.com/) [using](http://react-toolbox.com/) ReactJS, [some](http://materializecss.com/) simple CSS, and in the end I settled with [Material Design Lite](https://getmdl.io/) because it was the most up-to-date and it was very simple to implement.

Once I had the data and had my [create-react-app](https://github.com/facebookincubator/create-react-app) scaffolding in place, I started out by building a list where movies would show up as cards and managed to make this page responsive.

This was the easy part.

Next up, I wanted to use [react-map-gl](https://github.com/uber/react-map-gl) and [deck.gl](https://uber.github.io/deck.gl) to show off a fancy 3D view of San Francisco with the filming locations marked. Sadly, this didn't work out because I couldn't make webpack work nicely with webworkify (even the [example](https://github.com/uber/deck.gl/tree/master/exhibits/webpack) was broken at the time of me trying to make it work) so I settled with Google Maps with a nice dark color-scheme.

Now it's possible to browser through the movies, search in the titles and view them on the map where you see more details about them and can pan to the filming locations listed.

It was really cool to start an app from scratch using all the latest technologies, getting deeper into ES6 and seeing how much JavaScript has been evolving first-hand, not just reading articles about it and looking through cool libraries and toolkits that will never work on IE9 =)

I also really enjoyed the Redux way of thinking and trying to separate Container and Presentational Components while still having the power of JSX for smaller things that shouldn't be part of the "business logic".






## License

This project is licensed under the MIT License - see the LICENSE.md file for details
