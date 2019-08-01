# Intercom test
Filter a provided list of customers based on their distance from a reference point into a console output.

## Installation
Requires yarn or npm. Run `yarn` or `npm install` to install the development dependencies.
Tested version is node 8.

## Usage
Run `yarn start` to check with the defaults from the exercise, or run `node index.js filename refLat refLong range` with your own values.

## Development
Run `yarn dev` to have a debugger started using Chrome's v8. Visit `chrome://inspect` to see more.

## Tests
Run `yarn test` or `npm test`

## Roadmap
 - [] Add real logger (winston/pino/logentries)
 - [] Add performance tracker (newrelic)
 - [] Ensure that user_id is camelCase which is the standard js once parsed. 
 - [] Separate RangeError from TypeError

## Technical design choices and personal notes
As being an exercise, some functions are being untested. The reason behind is a choice between code architecture and testing. As an example, NodeJs doesn't allow you to spy on an exported module being called internally. As such, it's impossible without rearchitecturing it into (meaningful) classes or exported into another script to verify that the "geo.compare" function is actually converting to radian.
That's a design choice to keep it simple.
The same way, it's often expected to have values which are validated at entry: hence we only check for edge-cases at the validations steps at the beginning of the programm, but not in each one of the functions.
The program doesn't lift any non-standard dependencies for production. If we had the choice, we'd be using one for parameters parsing, CSV output and probably for all those calculations in geo, provided the librairies are mature enough and well tested.
Using a class for Point could have simplified the parsing of the JSON: it's currently dumb while we know the format of the expected input.
Logging is very minimal, but I prefer plugging something `the Unix way` rather than mixing it with the functional codebase. In the js ecosystem, pino is very nice for that, elsewhat you'd need to look at system level logging.


## Known limitations
 - Choice of the algorithm to compare the distance
 - The current float parsing verification is weak. `+3` should be a valid value, and so should `.5`
 - Precision and how the standard Math lib only handle Numbers, not BigInt. Which should be fine for a difference of kilometers :)
