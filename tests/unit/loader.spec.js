const proxyquire = require('proxyquire');

describe('checkFilename', () => {
  let loader;
  let existsSync;
  beforeEach(() => {
    existsSync = sinon.stub().returns();
    /* eslint-disable-next-line global-require */
    loader = proxyquire('../../lib/loader', {
      fs: { existsSync },
    });
  });
  it('should proxy to fs', () => {
    const path = './filename';
    loader.checkFilename(path);
    expect(existsSync).to.have.been.calledOnce.and.calledWith(path);
  });
  // Nothing else to test, it's a direct proxy
  // it('should throw on file not found')
});

describe('parse', () => {
  let loader;
  let createReadStream;
  let createInterface;
  let on;
  beforeEach(() => {
    on = sinon.stub();
    createReadStream = sinon.stub().returns({ readStream: {} });
    createInterface = sinon.stub().returns({ on });
    /* eslint-disable-next-line global-require */
    loader = proxyquire('../../lib/loader', {
      fs: { createReadStream },
      readline: { createInterface },
    });
  });
  it('should load the file specified', () => {
    const path = './filename';
    loader.parse(null)(path);
    expect(createReadStream).to.have.been.calledOnce.and.calledWith(path);
    expect(createInterface).to.have.been.calledOnce.and.calledWith({
      input: { readStream: {} },
    });
    // eslint-disable-next-line no-unused-expressions
    expect(on).to.have.been.calledThrice;
    expect(on.getCall(0)).to.have.been.calledWith('line', sinon.match.func);
    expect(on.getCall(1)).to.have.been.calledWith('close', sinon.match.func);
    expect(on.getCall(2)).to.have.been.calledWith('error', sinon.match.func);
  });
});
