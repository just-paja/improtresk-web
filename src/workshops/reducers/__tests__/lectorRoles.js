import lectorRoles from '../lectorRoles';

describe('Lector list reducer', () => {
  it('returns default state', () => {
    expect(lectorRoles()).toMatchObject({
      loading: false,
      data: [],
    });
  });

  it('marks as loading on LECTOR_ROLES_FETCH_STARTED', () => {
    expect(lectorRoles({}, { type: 'LECTOR_ROLES_FETCH_STARTED' })).toMatchObject({
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
    )).toMatchObject({
      loading: false,
      valid: true,
      data: [
        { name: 'foo' },
      ],
    });
  });

  it('marks as loading on LECTOR_ROLES_FETCH_ERROR', () => {
    expect(lectorRoles({}, { type: 'LECTOR_ROLES_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error',
    });
  });
});
