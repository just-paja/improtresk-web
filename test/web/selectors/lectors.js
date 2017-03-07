import { expect } from 'chai';

import {
  findLectorRoleName,
} from '../../../src/web/selectors/lectors';

describe('Lector selectors', () => {
  it('findLectorRoleName returns role name', () => {
    expect(findLectorRoleName(
      [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
      ],
      1
    )).to.equal('foo');
    expect(findLectorRoleName(
      [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
      ],
      2
    )).to.equal('bar');
  });
  it('findLectorRoleName returns null when not available', () => {
    expect(findLectorRoleName(
      [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
      ],
      3
    )).to.equal(null);
  });
});
