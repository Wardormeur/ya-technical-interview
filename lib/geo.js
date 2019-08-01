
const checkParseInt = (name, nb) => {
  if (Number.parseFloat(nb).toString() !== nb) throw new RangeError(`${name} should be a number`);
  return true;
};

const checkPosition = ({ lat, long }) => {
  checkParseInt('lat', lat);
  checkParseInt('long', long);
  if (lat < -90 || lat > 90) throw new RangeError('Lat should be between -90 and 90');
  if (long < -180 || long > 180) throw new RangeError('Long should be between -180 and 180');
  return true;
};

const toRadian = degree => degree * (Math.PI / 180);

/**
 * Compare the distance between 2 points using the great-circle distance
 * Limitations described here : https://www.movable-type.co.uk/scripts/gis-faq-5.1.html
 * @returns: Positive number
 * */
const compare = ({ lat, long }, { lat: refLat, long: refLong }) => {
  const meanRadius = 6371;
  const rLat = toRadian(lat);
  const rLong = toRadian(long);
  const rRefLat = toRadian(refLat);
  const rRefLong = toRadian(refLong);
  // Ref: https://en.wikipedia.org/wiki/Great-circle_distance#Formulae
  const deltaLong = Math.abs(rLong - rRefLong);
  const deltaSigma = Math.acos(
    (Math.sin(rLat) * Math.sin(rRefLat))
    + (Math.cos(rLat) * Math.cos(rRefLat) * Math.cos(deltaLong)),
  );
  // We don't care about the direction
  return Math.abs(deltaSigma * meanRadius);
};

module.exports = {
  checkPosition,
  compare,
  // Utils, exposed for tests hooking only
  toRadian,
  checkParseInt,
};
