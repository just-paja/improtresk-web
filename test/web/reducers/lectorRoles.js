import { expect } from 'chai';

import lectorRoles from '../../../src/web/reducers/lectorRoles';

describe('Lector list reducer', () => {
  it('returns default state', () => {
    expect(lectorRoles()).to.eql({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on LECTOR_ROLES_FETCH_STARTED', () => {
    expect(lectorRoles({}, { type: 'LECTOR_ROLES_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });

  it('marks as loading on LECTOR_ROLES_FETCH_SUCCESS', () => {
    expect(lectorRoles(
      {},
      {
        type: 'LECTOR_ROLES_FETCH_SUCCESS',
        data: [
          { name: 'foo' },
        ],
      }
    )).to.eql({
      loading: false,
      ready: true,
      valid: true,
      data: [
        { name: 'foo' },
      ],
    });
  });

  it('marks as loading on LECTOR_ROLES_FETCH_ERROR', () => {
    expect(lectorRoles({}, { type: 'LECTOR_ROLES_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
});
