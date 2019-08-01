# Intercom test
Filter a provided list of customers into an output.

## Installation
Requires yarn or npm. Run `yarn` or `npm install` to install the development dependencies.
Recommended version is node 8

## Usage
Run `yarn start` to check with the defaults from the exercise, or run `node index.js filename refLat refLong range` with your own values.

## Development
Run `yarn dev` to have a debugger started using Chrome's v8.

## Tests
Run `yarn test` or `npm test`

## Roadmap
 - [] Add logger (winston/pino)
 - [] Add performance tracker (newrelic)

## Technical design choices
As being an exercise, some functions are being untested. The reason behind is a choice between code architecture and testing. As an example, NodeJs doesn't allow you to spy on an exported module being called internally. As such, it's impossible without rearchitecturing it into (meaningful) classes or exported into another script to verify that the "geo.compare" function is actually converting to radian.
That's a design choice to keep it simple.
The same way, it's often expected to have values which are validated at entry: hence we only check for edge-cases at the validations steps at the beginning of the programm, but not in each one of the functions.

## Known limitations
 - Choice of the algorithm to compare the distance
 - Precision and how the standard Math lib only handle Numbers, not BigInt. Which should be fine for a difference of kilometers :)
 - 
