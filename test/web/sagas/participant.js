import { expect } from 'chai';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { fetchResource, fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import {
  shouldFetchParticipant,
  shouldFetchParticipantOrders,
} from '../../../src/web/selectors/participant';
import {
  fetchParticipantShowHome,
  fetchParticipantOrdersOnRequest,
  fetchParticipantOnLogin,
  logout,
  logoutOnAction,
} from '../../../src/web/sagas/participant';

import * as api from '../../../src/web/api';

describe('Participant sagas', () => {
  it('fetchParticipantOnLogin creates fetch actions', () => {
    const saga = fetchParticipantOnLogin();
    expect(saga.next().value).to.eql(takeLatest(
      'PARTICIPANT_LOGIN',
      fetchParticipantShowHome
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('logoutOnAction creates fetch actions', () => {
    const saga = logoutOnAction();
    expect(saga.next().value).to.eql(takeLatest(
      'PARTICIPANT_LOGOUT',
      logout
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchParticipantShowHome creates fetch actions', () => {
    const saga = fetchParticipantShowHome();
    expect(saga.next().value).to.eql(call(
      fetchResourceIfNeeded,
      api.fetchParticipant,
      shouldFetchParticipant,
      {
        onStart: 'PARTICIPANT_FETCH_STARTED',
        onSuccess: 'PARTICIPANT_FETCH_SUCCESS',
        onError: 'PARTICIPANT_FETCH_ERROR',
      }
    ));
    expect(saga.next().value).to.eql(put(push('/ucastnik')));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchParticipantOrdersOnRequest creates fetch actions', () => {
    const saga = fetchParticipantOrdersOnRequest();
    expect(saga.next().value).to.eql(takeLatest(
      'REQUEST_PARTICIPANT_DETAILS',
      fetchResourceIfNeeded,
      api.fetchParticipantOrders,
      shouldFetchParticipantOrders,
      {
        onStart: 'PARTICIPANT_ORDERS_FETCH_STARTED',
        onSuccess: 'PARTICIPANT_ORDERS_FETCH_SUCCESS',
        onError: 'PARTICIPANT_ORDERS_FETCH_ERROR',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('logout creates fetch actions', () => {
    const saga = logout();
    expect(saga.next().value).to.eql(call(
      fetchResource,
      api.logout,
      {
        onStart: 'PARTICIPANT_TOKEN_REVOKE_START',
        onSuccess: 'PARTICIPANT_TOKEN_REVOKE_SUCCESS',
        onError: 'PARTICIPANT_TOKEN_REVOKE_ERROR',
      }
    ));
    expect(saga.next().value).to.eql(put(push('/prihlaska')));
    expect(saga.next().done).to.equal(true);
  });
});
