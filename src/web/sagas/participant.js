import cookie from 'js-cookie';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  fetchResource,
  fetchResourceIfNeeded,
} from './common';
import { reverse } from '../routeTable';
import { getApiAuth } from '../selectors/session';
import {
  shouldFetchParticipant,
  shouldFetchParticipantOrders,
} from '../selectors/participant';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* fetchParticipantShowHome() {
  const auth = yield select(getApiAuth);

  if (auth && auth.access_token) {
    yield call(
      fetchResourceIfNeeded,
      api.fetchParticipant,
      shouldFetchParticipant,
      {
        onStart: constants.PARTICIPANT_FETCH_STARTED,
        onSuccess: constants.PARTICIPANT_FETCH_SUCCESS,
        onError: constants.PARTICIPANT_FETCH_ERROR,
      }
    );
    yield put(push(reverse('participant:home')));
  }
}

export function* fetchParticipantOrdersOnRequest() {
  yield takeLatest(
    [
      constants.REQUEST_PARTICIPANT_DETAILS,
      constants.PARTICIPANT_FOOD_CHANGE_MOUNTED,
      constants.ORDER_CREATED,
      constants.ORDER_CANCELED,
    ],
    fetchResourceIfNeeded,
    api.fetchParticipantOrders,
    shouldFetchParticipantOrders,
    {
      onStart: constants.PARTICIPANT_ORDERS_FETCH_STARTED,
      onSuccess: constants.PARTICIPANT_ORDERS_FETCH_SUCCESS,
      onError: constants.PARTICIPANT_ORDERS_FETCH_ERROR,
    }
  );
}

export function* fetchParticipantOnLogin() {
  yield takeLatest(
    constants.PARTICIPANT_LOGIN,
    fetchParticipantShowHome
  );
}

export function* logout() {
  cookie.set('auth', null);
  yield call(
    fetchResource,
    api.logout,
    {
      onStart: constants.PARTICIPANT_TOKEN_REVOKE_START,
      onSuccess: constants.PARTICIPANT_TOKEN_REVOKE_SUCCESS,
      onError: constants.PARTICIPANT_TOKEN_REVOKE_ERROR,
    }
  );
  yield put(push(reverse('signup')));
}

export function* logoutOnAction() {
  yield takeLatest(
    constants.PARTICIPANT_LOGOUT,
    logout
  );
}

export default [
  fetchParticipantOnLogin,
  fetchParticipantOrdersOnRequest,
  logoutOnAction,
];
