module.exports = {
  checkRange: (range) => {
    const castAs = Number.parse(range);
    if (castAs.toString() !== range) throw new RangeError('Range should be a number');
    return true;
  },
};
