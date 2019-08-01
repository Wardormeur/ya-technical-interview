const loader = require('../../../lib/loader');

describe('parse', () => {
  it('should return an array of JSON objects', async () => {
    const logger = sinon.stub().returns();
    const res = await loader.parse(logger)('./customers.txt');
    expect(res.length).to.equal(32);
  });
  it('should swallow on failed parsing', async () => {
    const logger = sinon.stub().returns();
    const res = await loader.parse(logger)('./index.js');
    expect(res).to.eql([]);
    // eslint-disable-next-line no-unused-expressions
    expect(logger).to.have.been.called;
  });
});
