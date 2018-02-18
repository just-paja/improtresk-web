import { takeLatest } from 'redux-saga/effects';

import { isLectorListRequired, isLectorRolesListRequired } from '../../selectors/lectors';

import { requireLectorRoles, requireLectors } from '..';
import { fetchResourceIfRequired } from '../../../sagas/api';

import * as api from '../../../api';

describe('Lector sagas', () => {
  it('requireLectorRoles creates fetch actions', () => {
    const saga = requireLectorRoles();
    expect(saga.next().value).toEqual(takeLatest(
      'LECTOR_ROLES_REQUIRED',
      fetchResourceIfRequired,
      api.fetchLectorRoles,
      {
        isRequired: isLectorRolesListRequired,
        actions: {
          start: 'LECTOR_ROLES_FETCH_STARTED',
          success: 'LECTOR_ROLES_FETCH_SUCCESS',
          fail: 'LECTOR_ROLES_FETCH_ERROR',
        },
      }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('requireLectors creates fetch actions', () => {
    const saga = requireLectors();
    expect(saga.next().value).toEqual(takeLatest(
      'LECTORS_REQUIRED',
      fetchResourceIfRequired,
      api.fetchLectors,
      {
        isRequired: isLectorListRequired,
        actions: {
          start: 'LECTORS_FETCH_STARTED',
          success: 'LECTORS_FETCH_SUCCESS',
          fail: 'LECTORS_FETCH_ERROR',
        },
      }
    ));
    expect(saga.next().done).toBe(true);
  });
});
