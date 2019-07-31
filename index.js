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
  console.log(params.length);
  if (params.length < 6) {
    return usage();
  }

  const filename = params[2];
  const refPosition = { lat: params[3], long: params[4] };
  const range = params[5];

  if (!fileLoader.checkFile(filename)
    || !geo.checkPosition(refPosition)
    || !filter.checkRange(range)) {
    return usage();
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
