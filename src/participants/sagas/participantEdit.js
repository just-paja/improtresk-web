import { takeEvery } from 'redux-saga/effects';

import { createFormSubmitSaga } from '../../forms/sagas';
import { identityEdit, participantEdit } from '../actions';
import { redirectHome } from '../../sagas/redirects';

function* onOrderHomeRedirect() {
  yield takeEvery([
    identityEdit.SUCCESS,
    participantEdit.SUCCESS,
  ], redirectHome);
}

export default [
  ...createFormSubmitSaga(participantEdit),
  ...createFormSubmitSaga(identityEdit),
  onOrderHomeRedirect,
];
