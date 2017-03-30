import { call, select, takeLatest } from 'redux-saga/effects';

import { fetchResource } from './common';
import { getForm } from '../selectors/forms';

import * as api from '../api';
import * as constants from '../constants/actions';

export const selectPasswordChangeSubmit = action =>
  action.type === constants.FORM_SUBMIT_ALLOWED && action.form === 'changePassword';

export const selectPasswordNewSubmit = action =>
  action.type === constants.FORM_SUBMIT_ALLOWED && action.form === 'newPassword';

export function* passwordNew() {
  const password = yield select(getForm, 'newPassword');
  yield call(
    fetchResource,
    api.newPassword,
    {
      onStart: constants.PARTICIPANT_PASSWORD_NEW_STARTED,
      onSuccess: constants.PARTICIPANT_PASSWORD_NEW_SUCCESS,
      onError: constants.PARTICIPANT_PASSWORD_NEW_ERROR,
      data: password.values,
    }
  );
}

export function* passwordChange() {
  const password = yield select(getForm, 'changePassword');
  yield call(
    fetchResource,
    api.changePassword,
    {
      onStart: constants.PARTICIPANT_PASSWORD_CHANGE_STARTED,
      onSuccess: constants.PARTICIPANT_PASSWORD_CHANGE_SUCCESS,
      onError: constants.PARTICIPANT_PASSWORD_CHANGE_ERROR,
      data: password.values,
    }
  );
}

export function* bindPasswordChangeSubmit() {
  yield takeLatest(selectPasswordChangeSubmit, passwordChange);
}

export function* bindPasswordNewSubmit() {
  yield takeLatest(selectPasswordNewSubmit, passwordNew);
}

export default [
  bindPasswordChangeSubmit,
  bindPasswordNewSubmit,
];
