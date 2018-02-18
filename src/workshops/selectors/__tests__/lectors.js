import * as selectors from '../lectors';

describe('Lector selectors', () => {
  it('aggregateLectorData returns null when lectorPosition is not available', () => {
    expect(selectors.aggregateLectorData([], [])()).toBe(null);
  });

  it('aggregateLectorData returns null when lectors are not available', () => {
    expect(selectors.aggregateLectorData(null, [])({
      lector: 5,
      role: 9,
    })).toBe(null);
  });

  it('aggregateLectorData returns null when roles are not available', () => {
    expect(selectors.aggregateLectorData([], null)({
      lector: 5,
      role: 9,
    })).toBe(null);
  });

  it('aggregateLectorData returns null with unknown lector', () => {
    const lectors = [];
    const roles = [
      {
        id: 9,
        name: 'foo',
      },
    ];
    expect(selectors.aggregateLectorData(lectors, roles)({
      lector: 5,
      role: 9,
    })).toBe(null);
  });

  it('aggregateLectorData returns null with unknown lector role', () => {
    const lectors = [
      {
        id: 5,
        name: 'foo',
      },
    ];
    const roles = [];
    expect(selectors.aggregateLectorData(lectors, roles)({
      lector: 5,
      role: 9,
    })).toBe(null);
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
    expect(selectors.aggregateLectorData(lectors, roles)({
      id: 121,
      lector: 5,
      role: 9,
    })).toEqual({
      id: 121,
      lector: {
        id: 5,
        name: 'foo',
      },
      role: 'bar',
    });
  });

  it('findLectorRoleName returns role name', () => {
    expect(selectors.findLectorRoleName(
      [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
      ],
      1
    )).toBe('foo');
    expect(selectors.findLectorRoleName(
      [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
      ],
      2
    )).toBe('bar');
  });

  it('findLectorRoleName returns null when role data are not available', () => {
    expect(selectors.findLectorRoleName(null, 3)).toBe(null);
  });

  it('findLectorRoleName returns null when role is not available', () => {
    expect(selectors.findLectorRoleName(
      [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
      ],
      3
    )).toBe(null);
  });
});
