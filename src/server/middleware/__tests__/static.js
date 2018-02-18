import express from 'express';
import sinon from 'sinon';

import staticMiddleware from '../static';

describe('Static server middleware', () => {
  beforeEach(() => {
    sinon.stub(express, 'static').returns(() => {});
  });
  afterEach(() => {
    express.static.restore();
  });

  it('binds theme files as static', () => {
    staticMiddleware();
    expect(express.static.args).toEqual([
      ['static'],
      ['node_modules/font-awesome'],
      ['node_modules/bootswatch'],
    ]);
  });
});
