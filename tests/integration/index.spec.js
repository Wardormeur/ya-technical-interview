const fn = require('../../index.js');

/* eslint-disable no-unused-expressions */
describe('Integration', () => {
  beforeEach(() => {
    sinon.stub(process, 'exit').returns();
    sinon.stub(console, 'log').returns();
  });

  afterEach(() => {
    process.exit.restore();
    console.log.restore();
  });
  it('should return a list of customers', async () => {
    const res = await fn(['node', 'index.js', './customers.txt', '53.339428', '-6.257664', '100']);
    expect(res).to.be.an('array');
    expect(res.length).to.equal(16);
  });
  it('should exit if there is less than the required number of params', () => {
    fn(['node', 'index.js', 'customers.txt']);
    expect(process.exit).to.have.been.calledOnce.and.calledWith(1);
    expect(console.log).to.have.been.called;
  });
  it('should exit if lat is not a number', () => {
    fn(['node', 'index.js', 'customers.txt', 'Dublin', '-6.2', '100']);
    expect(process.exit).to.have.been.calledOnce.and.calledWith(1);
    expect(console.log).to.have.been.called;
  });
  it('should exit if long is not a number', () => {
    fn(['node', 'index.js', 'customers.txt', '53', 'Dublin', '100']);
    expect(process.exit).to.have.been.calledOnce.and.calledWith(1);
    expect(console.log).to.have.been.called;
  });
  it('should exit if range is not a number', () => {
    fn(['node', 'index.js', 'customers.txt', '53', '-6', '100km']);
    expect(process.exit).to.have.been.calledOnce.and.calledWith(1);
    expect(console.log).to.have.been.called;
  });
});
