import { expect } from 'chai';
import { takeLatest } from 'redux-saga/effects';

import { shouldFetchList, shouldFetchRoles } from '../../../src/web/selectors/lectors';

import { requireLectorRoles, requireLectors } from '../../../src/web/sagas/lectors';
import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';

import * as api from '../../../src/web/api';

describe('Lector sagas', () => {
  it('requireLectorRoles creates fetch actions', () => {
    const saga = requireLectorRoles();
    expect(saga.next().value).to.eql(takeLatest(
      'APP_MOUNTED',
      fetchResourceIfNeeded,
      api.fetchLectorRoles,
      shouldFetchRoles,
      {
        onStart: 'LECTOR_ROLES_FETCH_STARTED',
        onSuccess: 'LECTOR_ROLES_FETCH_SUCCESS',
        onError: 'LECTOR_ROLES_FETCH_ERROR',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('requireLectors creates fetch actions', () => {
    const saga = requireLectors();
    expect(saga.next().value).to.eql(takeLatest(
      'APP_MOUNTED',
      fetchResourceIfNeeded,
      api.fetchLectors,
      shouldFetchList,
      {
        onStart: 'LECTORS_FETCH_STARTED',
        onSuccess: 'LECTORS_FETCH_SUCCESS',
        onError: 'LECTORS_FETCH_ERROR',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
});
