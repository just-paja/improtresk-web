import { fork, select, takeEvery } from 'redux-saga/effects';

import fetchResource from './fetchResource';

const reduceParams = (payloadReducer, payload) => {
  if (!payloadReducer) {
    return payload;
  }
  return payloadReducer(payload);
};

export default (routine, { payloadReducer, payloadSelector } = {}) => {
  function* handleFetch() {
    const payload = payloadSelector ? yield select(payloadSelector) : null;
    yield fork(fetchResource, routine, {
      params: reduceParams(payloadReducer, payload),
    });
  }

  function* onFetchRequire() {
    const triggers = [routine.TRIGGER];
    if (routine.INVALIDATE) {
      triggers.push(routine.INVALIDATE);
    }
    yield takeEvery(triggers, handleFetch);
  }

  return [onFetchRequire];
};
