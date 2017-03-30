import { call, select, takeLatest } from 'redux-saga/effects';

import { sendForm } from './forms';
import { getForm } from '../selectors/forms';

import * as api from '../api';
import * as constants from '../constants/actions';

export const selectPasswordResetSubmit = action =>
  action.type === constants.FORM_SUBMIT_ALLOWED && action.form === 'resetPassword';

export const selectPasswordChangeSubmit = action =>
  action.type === constants.FORM_SUBMIT_ALLOWED && action.form === 'changePassword';

export const selectPasswordNewSubmit = action =>
  action.type === constants.FORM_SUBMIT_ALLOWED && action.form === 'newPassword';

export function* passwordReset() {
  const password = yield select(getForm, 'resetPassword');
  yield call(
    sendForm,
    api.resetPassword,
    'resetPassword',
    password.values
  );
}

export function* passwordNew() {
  const password = yield select(getForm, 'newPassword');
  yield call(
    sendForm,
    api.newPassword,
    'newPassword',
    password.values
  );
}

export function* passwordChange() {
  const password = yield select(getForm, 'changePassword');
  yield call(
    sendForm,
    api.changePassword,
    'changePassword',
    password.values
  );
}

export function* bindPasswordResetSubmit() {
  yield takeLatest(selectPasswordResetSubmit, passwordReset);
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
  bindPasswordResetSubmit,
];
