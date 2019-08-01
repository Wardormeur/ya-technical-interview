const fileLoader = require('./lib/loader');
const geo = require('./lib/geo');
const filter = require('./lib/filter');

// Usage
const usage = () => {
  console.log('Usage: node index.js filename refLat refLong range');
  process.exit(1);
};
const main = (_params) => {
  const params = _params || process.argv;
  if (params.length < 6) {
    return usage();
  }

  const filename = params[2];
  const refPosition = { lat: params[3], long: params[4] };
  const range = params[5];

  try {
    fileLoader.checkFile(filename);
    geo.checkPosition(refPosition);
    filter.checkRange(range);
  } catch (e) {
    // If any throws, it means the parameters passed down are invalid
    usage();
  }
  process.on('uncaughtException', () => {
  });
  let customers = fileLoader.parse(filename);
  customers = customers.map(customer => ({
    ...customer,
    distance: geo.compare({ lat: customer.latitude, long: customer.longitude }, refPosition),
  }));
  customers.filter(filter);
  // TODO: output
  return customers;
};
module.exports = main;
