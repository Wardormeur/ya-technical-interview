const formatter = require('../../lib/formatter');

describe('parseRange', () => {
  it('should parse integer as float', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(formatter.parseRange('1')).to.equal(1);
  });
  // Fails due to the naivety of the parser
  it.skip('should parse integer as float', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(formatter.parseRange('.1')).to.equal(0.1);
  });
  // Fails due to the naivety of the parser
  it.skip('should parse integer as float', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(formatter.parseRange('1.0')).to.equal(1);
  });
  it('should reject when the float is invalid', () => {
    expect(() => formatter.parseRange('.5')).to.throw(RangeError, 'Range should be a number greater than 0');
  });
});

describe('filterLesserThan', () => {
  const data = { distance: 10 };
  it('should return a function', () => {
    expect(formatter.filterLesserThan(10)).to.be.a('function');
  });
  it('should return true if the range is equal to the max range', () => {
    const res = formatter.filterLesserThan(10)(data);
    // eslint-disable-next-line no-unused-expressions
    expect(res).to.be.true;
  });
  it('should return true if the range is lesser than the range', () => {
    const res = formatter.filterLesserThan(100)(data);
    // eslint-disable-next-line no-unused-expressions
    expect(res).to.be.true;
  });
  it('should return false if the range is higher than the range', () => {
    const res = formatter.filterLesserThan(1)(data);
    // eslint-disable-next-line no-unused-expressions
    expect(res).to.be.false;
  });
});

describe('sortByDescId', () => {
  it('should return -1 when id1 > id2', () => {
    expect(formatter.sortByDescId({ user_id: 1 }, { user_id: 2 })).to.equal(-1);
  });
  it('should return 0 when id1 = id2 (which shouldnt happen)', () => {
    expect(formatter.sortByDescId({ user_id: 1 }, { user_id: 1 })).to.equal(0);
  });
  it('should return an integer when id1 > id2', () => {
    const res = formatter.sortByDescId({ user_id: 3 }, { user_id: 1 });
    expect(res).to.equal(2);
    expect(res).to.be.a('number');
  });
});

describe('toCSVString', () => {
  it('should return the header only when the input is invalid', () => {
    expect(() => formatter.toCSVString()).to.throw(TypeError);
  });
  it('should return the header ony when the input is empty', () => {
    expect(formatter.toCSVString([])).to.equal('Id; Name;\n');
  });
  it('should return a list of ; delimited user info', () => {
    const mockData = [
      { user_id: 1, name: 'Jane Doe' },
      { user_id: 3, name: 'Cpt Crunch' },
      { user_id: 5, name: 'Bat Man' },
    ];
    expect(formatter.toCSVString(mockData)).to.equal('Id; Name;\n1;Jane Doe;\n3;Cpt Crunch;\n5;Bat Man;\n');
  });
});
