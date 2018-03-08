import { call, put, select, takeLatest } from 'redux-saga/effects';

import { sendForm } from '../../forms/sagas/sendForm';
import { getSignupForm } from '../selectors';

import {
  FORM_SUBMIT_ALLOWED,
  FORM_SUBMIT_SUCCESS,
  FORM_VALUES_CLEAR,
} from '../../forms/constants';

import * as api from '../../api';
import * as constants from '../constants';

export const selectSignupSubmit = action =>
  action.type === FORM_SUBMIT_ALLOWED && action.form === 'signup';

export const selectSignupSuccess = action =>
  action.type === FORM_SUBMIT_SUCCESS && action.form === 'signup';

const purifySignupValues = values => ({
  ...values,
  team_name: values.team_name ? values.team_name.value : undefined,
});

export function* sendSignup(action) {
  const form = yield select(getSignupForm);
  yield call(sendForm, api.signup, action.form, purifySignupValues(form.values));
}

export function* loginSignup(action) {
  const form = yield select(getSignupForm);
  yield call(sendForm, api.login, 'login', {
    email: form.values.email,
    password: form.values.password,
  });
  yield put({
    type: constants.PARTICIPANT_REGISTERED,
    data: action.data,
  });
  yield put({
    type: FORM_VALUES_CLEAR,
    form: 'signup',
  });
}

export function* signupOnFormSubmit() {
  yield takeLatest(selectSignupSubmit, sendSignup);
}

export function* loginOnSignup() {
  yield takeLatest(selectSignupSuccess, loginSignup);
}

export default [
  loginOnSignup,
  signupOnFormSubmit,
];
