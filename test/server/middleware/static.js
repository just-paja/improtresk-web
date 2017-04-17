import express from 'express';
import sinon from 'sinon';

import { expect } from 'chai';

import staticMiddleware from '../../../src/server/middleware/static';


describe('Static server middleware', () => {
  beforeEach(() => {
    sinon.stub(express, 'static').returns(() => {});
  });
  afterEach(() => {
    express.static.restore();
  });

  it('binds theme files as static', () => {
    staticMiddleware();
    expect(express.static.args).to.eql([
      ['static'],
      ['node_modules/font-awesome'],
      ['node_modules/bootswatch'],
    ]);
  });
});
