import { expect } from 'chai';

import * as transformers from '../../../src/web/transformers/lectors';

describe('Lector transformers', () => {
  it('aggregateLectorData returns null when lectorPosition is not available', () => {
    expect(transformers.aggregateLectorData([], [])()).to.eql(null);
  });
  it('aggregateLectorData returns null when lectors are not available', () => {
    expect(transformers.aggregateLectorData(null, [])({
      lector: 5,
      role: 9,
    })).to.eql(null);
  });
  it('aggregateLectorData returns null when roles are not available', () => {
    expect(transformers.aggregateLectorData([], null)({
      lector: 5,
      role: 9,
    })).to.eql(null);
  });
  it('aggregateLectorData returns null with unknown lector', () => {
    const lectors = [];
    const roles = [
      {
        id: 9,
        name: 'foo',
      },
    ];
    expect(transformers.aggregateLectorData(lectors, roles)({
      lector: 5,
      role: 9,
    })).to.eql(null);
  });
  it('aggregateLectorData returns null with unknown lector role', () => {
    const lectors = [
      {
        id: 5,
        name: 'foo',
      },
    ];
    const roles = [];
    expect(transformers.aggregateLectorData(lectors, roles)({
      lector: 5,
      role: 9,
    })).to.eql(null);
  });
  it('aggregateLectorData returns lector position extended with related data', () => {
    const lectors = [
      {
        id: 5,
        name: 'foo',
      },
    ];
    const roles = [
      {
        id: 9,
        name: 'bar',
      },
    ];
    expect(transformers.aggregateLectorData(lectors, roles)({
      id: 121,
      lector: 5,
      role: 9,
    })).to.eql({
      id: 121,
      lector: {
        id: 5,
        name: 'foo',
      },
      role: 'bar',
    });
  });
});
