const fileLoader = require('./lib/loader');
const geo = require('./lib/geo');
const formatter = require('./lib/formatter');

const logger = console.warn;

// Usage
const usage = (err) => {
  if (err) logger(err);
  console.log('Usage: node index.js filename refLat refLong range');
  console.log('filename: a path to the file');
  console.log('refLat: latitude in degrees of the reference point (ex: Dublin office)');
  console.log('refLong: longitude in degrees of the reference point (ex: Dublin office)');
  console.log('range: radius used to filter customers out');
  process.exit(1);
};
/** Calculate the users in range of a reference point
* @input: filename refLat refLong range
* @returns: unformatted list of users
* */
const main = async (params) => {
  if (params.length < 6) {
    return usage();
  }

  const filename = params[2];
  let refPosition;
  let range;

  try {
    fileLoader.checkFilename(filename);
    refPosition = geo.parsePosition({ lat: params[3], long: params[4] });
    range = formatter.parseRange(params[5]);
  } catch (e) {
    // If any throws, it means the parameters passed down are invalid
    return usage(e);
  }
  process.on('uncaughtException', err => usage(err));
  let customers = await fileLoader.parse(logger)(filename);
  customers = customers.map((customer) => {
    const customerPosition = geo.parsePosition({
      lat: customer.latitude,
      long: customer.longitude,
    });
    return {
      ...customer,
      distance: geo.compare(customerPosition, refPosition),
    };
  });
  const customersInRange = customers.filter(formatter.filterLesserThan(range));
  // eslint-disable-next-line no-console
  console.log(formatter.toCSVString(customersInRange.sort(formatter.sortByDescId)));
  return customersInRange;
};
if (require.main === module) {
  main(process.argv);
}
module.exports = main;
