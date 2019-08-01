const fs = require('fs');
const readline = require('readline');

/* Read a file and swallow invalid JSON */
const parse = filename => new Promise((resolve, reject) => {
  const formattedArray = [];
  const readInterface = readline.createInterface({
    input: fs.createReadStream(filename),
  });

  readInterface.on('line', (line) => {
    try {
      const row = JSON.parse(line);
      formattedArray.push(row);
    } catch (err) {
      // TODO: logger
    }
  });

  readInterface.on('close', () => resolve(formattedArray));
  readInterface.on('error', err => reject(err));
});

module.exports = {
  checkFilename: fs.existsSync,
  parse,
};
