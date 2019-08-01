const geo = require('../../lib/geo');

describe('checkPosition', () => {
  it('should throw if lat is not a number', () => {
    expect(() => geo.checkPosition({ lat: '91km', long: '0' })).to.throw(RangeError, 'lat should be a number');
  });
  it('should parse if long is not a number', () => {
    expect(() => geo.checkPosition({ lat: '91', long: '0km' })).to.throw(RangeError, 'long should be a number');
  });
  it('should throw if lat is not in range', () => {
    expect(() => geo.checkPosition({ lat: '91', long: '0' })).to.throw(RangeError, 'Lat should be between -90 and 90');
  });
  it('should throw if long is not in range', () => {
    expect(() => geo.checkPosition({ lat: '0', long: '181' })).to.throw(RangeError, 'Long should be between -180 and 180');
  });
  it('should not throw when valid', () => {
    expect(() => geo.checkPosition({ lat: '90', long: '180' })).to.not.throw();
  });
});

describe('compare', () => {
  const src = { lat: 52.986375, long: -6.043701 };
  const ref = { lat: 53.339428, long: -6.257664 };
  it('should be pure and return the same distance every time', () => {
    const result = geo.compare(src, ref);
    expect(result).to.equal(41.76872550099624);
  });
  it.skip('should have converted input values to radian', () => {
    const toR = sinon.stub(geo, 'toRadian');
    geo.compare(src, ref);
    expect(toR).to.have.callCount(4);
    expect(toR.call(0)).to.have.been.calledWith(src.lat);
    expect(toR.call(1)).to.have.been.calledWith(src.long);
    expect(toR.call(2)).to.have.been.calledWith(ref.lat);
    expect(toR.call(3)).to.have.been.calledWith(ref.long);
  });
});

describe('toRadian', () => {
  it('should return a number', () => {
    const res = geo.toRadian(90);
    expect(res).to.be.an('number');
  });
  it('should be pure', () => {
    const res = geo.toRadian(90);
    expect(res.toString()).to.equal('1.5707963267948966');
  });
});
