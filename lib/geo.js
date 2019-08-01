
const checkParseInt = (name, nb) => {
  if (Number.parse(nb).toString() !== nb) throw new RangeError(`${name} should be a number`);
  return true;
};

const checkPosition = ({ lat, long }) => {
  checkParseInt('lat', lat);
  checkParseInt('long', long);
  if (lat > -90 || lat > 90) throw new RangeError('Lat should be between -90 and 90°');
  if (long > -180 || long > 180) throw new RangeError('Long should be between -180 and 180°');
  return true;
};
module.exports = {
  checkPosition,
  checkParseInt,
};
