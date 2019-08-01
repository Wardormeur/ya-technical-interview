module.exports = {
  // Ensure the range is valid
  parseRange: (range) => {
    const castAs = Number.parseFloat(range);
    if (castAs.toString() !== range || castAs < 0) throw new RangeError('Range should be a number greater than 0');
    return castAs;
  },
  // Default filter to invite people to the event: they must live within a range to office
  filterLesserThan: range => ({ distance }) => distance <= range,
  // Sort by people Id, which are integers
  // eslint-disable-next-line camelcase
  sortByDescId: ({ user_id }, { user_id: id2 }) => user_id - id2,
  // Format a list of customers into a naive CSV-like display format
  // This is an interpretation of how it could be used post-treatment (comms/invitations)
  toCSVString: (customers) => {
    let csvString = 'Id; Name;\n';
    if (!Array.isArray(customers)) throw new TypeError('Input should be an array of customers');
    customers.forEach((customer) => {
      csvString += `${customer.user_id};${customer.name};\n`;
    });
    return csvString;
  },
};
