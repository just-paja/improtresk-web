import device from '../device';

describe('Device reducer', () => {
  it('returns default state', () => {
    expect(device()).toEqual({
      isMobile: false,
    });
  });

  it('returns state when passed', () => {
    expect(device({
      isMobile: true,
    })).toEqual({
      isMobile: true,
    });
  });
});
