const fn = require('../../index.js');

describe('Integration', () => {
  beforeEach(() => {
    sinon.stub(process, 'exit').returns();
  });

  afterEach(() => {
    process.exit.restore();
  });
  it('should run', () => {
    fn(['node', 'index.js', 'customers.txt', '53.339428', '-6.257664', '100']);
  });
  it('should exit if there is less than the required number of params', () => {
    fn(['node', 'index.js', 'customers.txt']);
    expect(process.exit).to.have.been.calledOnce.and.calledWith(1);
  });
});

/* describe('File parsing', () => {
describe('Calculate distance to a point', () => {
  it('should be deterministic');
  it('should ensure the format of point is valid');
});


describe('Compare distance to a source point', () => {
  it('should take 2 points');
  it('should be deterministic');
});

describe('Log the output', () => {
});
*/
