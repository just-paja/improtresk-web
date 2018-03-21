import { call, select, takeEvery } from 'redux-saga/effects';

import fetchResource from '../../sagas/fetchResource';

import { yearActiveNumber } from '../../years/selectors';

const reduceParams = (payloadReducer, payload) => {
  if (!payloadReducer) {
    return payload;
  }
  return payloadReducer(payload);
};

export default (routine, { payloadReducer, payloadSelector } = {}) => {
  function* handleRequire() {
    const year = yield select(yearActiveNumber);
    const payload = payloadSelector ? yield select(payloadSelector) : null;
    yield call(fetchResource, routine, {
      params: {
        year,
        ...reduceParams(payloadReducer, payload),
      },
    });
  }

  function* onRequire() {
    yield takeEvery(routine.TRIGGER, handleRequire);
  }

  return [onRequire];
};
