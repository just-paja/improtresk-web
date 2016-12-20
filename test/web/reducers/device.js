import { expect } from 'chai';

import device from '../../../src/web/reducers/device';

describe('Device reducer', () => {
  it('returns default state', () => {
    expect(device()).to.eql({
      isMobile: false,
    });
  });

  it('returns state when passed', () => {
    expect(device({
      isMobile: true,
    })).to.eql({
      isMobile: true,
    });
  });
});
