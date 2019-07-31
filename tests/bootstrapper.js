/* eslint-disable no-unused-vars */
const chai = require('chai');
const sinonChai = require('sinon-chai');
global.sinon = require('sinon');

chai.use(sinonChai);
global.expect = chai.expect;
