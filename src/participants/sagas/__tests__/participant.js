import { call, select, takeEvery } from 'redux-saga/effects';

import { fetchResource, fetchResourceIfRequired } from '../../../sagas/api';
import { getApiAuth } from '../../../selectors/session';
import {
  isParticipantRequired,
} from '../../selectors';
import {
  fetchParticipantShowHome,
  logout,
  logoutOnAction,
} from '..';

import * as api from '../../../api';

describe('Participant sagas', () => {
  it('logoutOnAction creates fetch actions', () => {
    const saga = logoutOnAction();
    expect(saga.next().value).toEqual(takeEvery(
      'PARTICIPANT_LOGOUT',
      logout
    ));
    expect(saga.next().done).toBe(true);
  });

  it('fetchParticipantShowHome fetches nothing without auth', () => {
    const saga = fetchParticipantShowHome();
    expect(saga.next().value).toEqual(select(getApiAuth));
    expect(saga.next().done).toBe(true);
  });

  it('fetchParticipantShowHome creates fetch actions', () => {
    const saga = fetchParticipantShowHome();
    expect(saga.next().value).toEqual(select(getApiAuth));
    expect(saga.next({
      access_token: 'foo',
    }).value).toEqual(call(
      fetchResourceIfRequired,
      api.fetchParticipant,
      {
        isRequired: isParticipantRequired,
        actions: {
          start: 'PARTICIPANT_FETCH_STARTED',
          success: 'PARTICIPANT_FETCH_SUCCESS',
          fail: 'PARTICIPANT_FETCH_ERROR',
        },
      }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('logout revokes token and redirects to signup page', () => {
    const saga = logout();
    expect(saga.next().value).toEqual(select(getApiAuth));
    expect(saga.next({
      access_token: 'foo',
    }).value).toEqual(
      call(fetchResource, api.logout, {
        actions: {
          start: 'PARTICIPANT_TOKEN_REVOKE_START',
          success: 'PARTICIPANT_TOKEN_REVOKE_SUCCESS',
          fail: 'PARTICIPANT_TOKEN_REVOKE_ERROR',
        },
      })
    );
    expect(saga.next().done).toBe(true);
  });
});
