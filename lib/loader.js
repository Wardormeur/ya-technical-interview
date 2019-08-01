const fs = require('fs');
const readline = require('readline');

/** Read a file, parse each rows as JSON.
 * Best effort solution, will swallow and log error if the JSON is invalid
 * @params: logger 
 * @returns: fn Function returns a function taking filename as a param. 
 * When resolved, returns an array of parsed JSON objects
 * */
const parse = (logger) => (filename) => new Promise((resolve, reject) => {
  const formattedArray = [];
  const readInterface = readline.createInterface({
    input: fs.createReadStream(filename),
  });

  readInterface.on('line', (line) => {
    try {
      const row = JSON.parse(line);
      formattedArray.push(row);
    } catch (err) {
      logger(err);
    }
  });

  readInterface.on('close', () => resolve(formattedArray));
  readInterface.on('error', err => reject(err));
});

module.exports = {
  checkFilename: fs.existsSync,
  parse,
};
