import { expect } from 'chai';
import { takeLatest } from 'redux-saga/effects';

import { fetchTeamsOnMount } from '../../../src/web/sagas/teams';
import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { shouldFetchTeams } from '../../../src/web/selectors/teams';

import * as api from '../../../src/web/api';

describe('Teams sagas', () => {
  it('fetchTeamsOnMount creates fetch actions', () => {
    const saga = fetchTeamsOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      'APP_MOUNTED',
      fetchResourceIfNeeded,
      api.fetchTeams,
      shouldFetchTeams,
      {
        onStart: 'TEAMS_FETCH_STARTED',
        onSuccess: 'TEAMS_FETCH_SUCCESS',
        onError: 'TEAMS_FETCH_ERROR',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
});
