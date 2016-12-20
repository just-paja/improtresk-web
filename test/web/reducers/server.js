import { expect } from 'chai';

import server from '../../../src/web/reducers/server';

describe('Server reducer', () => {
  it('returns default state', () => {
    expect(server()).to.eql({
      host: 'localhost',
      protocol: 'http',
    });
  });

  it('returns state when passed', () => {
    expect(server({
      host: 'foo',
      protocol: 'bar',
    })).to.eql({
      host: 'foo',
      protocol: 'bar',
    });
  });
});
