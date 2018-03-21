import { put, takeEvery } from 'redux-saga/effects';

import { requireCapacityPoll, stopCapacityPoll } from '../actions';

import createYearFetchSaga from './createYearFetchSaga';


export default (routine, props) => {
  const saga = createYearFetchSaga(routine, props);

  function* handleSubscribe() {
    yield put(requireCapacityPoll());
    yield put(routine());
  }

  function* handleUnsubscribe() {
    yield put(stopCapacityPoll());
  }

  function* onSubscribe() {
    yield takeEvery(routine.SUBSCRIBE, handleSubscribe);
  }

  function* onUnsubscribe() {
    yield takeEvery(routine.UNSUBSCRIBE, handleUnsubscribe);
  }

  return [...saga, onSubscribe, onUnsubscribe];
};
