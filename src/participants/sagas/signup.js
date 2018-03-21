import { put, takeEvery } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';

import { loginWithSignupData, signup } from '../actions';
import { createFormSubmitSaga } from '../../forms/sagas';
import { redirectHome } from '../../sagas/redirects';

import createFetchSaga from '../../sagas/createFetchSaga';

function* onSignupSuccess() {
  yield takeEvery(signup.SUCCESS, function* login() {
    yield put(loginWithSignupData());
  });
}

function* onAutoLoginSuccess() {
  yield takeEvery(loginWithSignupData.SUCCESS, redirectHome);
}

export default [
  ...createFormSubmitSaga(signup),
  ...createFetchSaga(loginWithSignupData, {
    payloadSelector: getFormValues(signup.form),
    payloadReducer: values => ({
      formData: {
        email: values.email,
        password: values.password,
      },
    }),
  }),
  onAutoLoginSuccess,
  onSignupSuccess,
];
