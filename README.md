# One Man's Treasure
One Man's Treasure is a platform for unwanted items where a user can display an item they don't want to dispose of but would like nothing in return for it. Depending on another users claims and criteria, they may receive the item.

## Notes before getting started
### Redux
  Several components are using redux as state container.  
  States that are mapped to props using redux are:
  * Listings, 
  * Claimed Listings,
  * Users who claimed the listing

### Redux-Promise
  Redux-Promise is an amazing redux middleware that turns your spaghetti ajax call into 1 line of code.  https://www.npmjs.com/package/redux-promise
  If someone tells you Redux-thunk is better, FAKE NEWS!.

### API Keys
This project utilizes Google API for location search as well as map display, 
and Imgur API for image hosting.  You will need API keys from
https://developers.google.com/maps/documentation/embed/get-api-key
and https://apidocs.imgur.com/ in order for them to work.

### ~~Bugs~~ Features:
  1. Currently you can't givaway your item to the first user who claimed it.
  2. All signup validations are currently done in the background through console log. (*make sure password is 8 digits long or signup would stay in the same page.)
  3. Search Bar doesn't work.
  4. If you encounter additional bugs, feel free to ask any of us except for Feng.  
  Because his code is perfect and never buggy so he wouldn't know what you're talking about.

### Semantic-UI
Both Semantic-UI and Semantic-UI-React are use.  
Semantic-UI-React will be installed with npm install command; however,
you will have to manually import regular Semantic-UI's css and js files
to get everything to render correctly.

## Getting Started
To install all dependencies
```
npm install
```

To run transpiler
```
npm run react-dev
```

To run local server
```
npm run start
```

## Built With
* Reactjs `Main framework`
* Semantic-UI `CSS framework`
* Redux `State Container`
* Nodejs `Run-time environment` 
* MongoDB `Database`
* Webpack `Build tool`
* Babel `ECMA6 compiling`

## Running the tests
Currently there is no test for this application.

## Authors
Feng Chen / 
Donny Rojas / 
Samuel Shih / 
Zack Carlson
