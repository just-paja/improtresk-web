import server from '../server';

describe('Server reducer', () => {
  it('returns default state', () => {
    expect(server()).toEqual({
      host: 'localhost',
      protocol: 'http',
    });
  });

  it('returns state when passed', () => {
    expect(server({
      host: 'foo',
      protocol: 'bar',
    })).toEqual({
      host: 'foo',
      protocol: 'bar',
    });
  });
});
