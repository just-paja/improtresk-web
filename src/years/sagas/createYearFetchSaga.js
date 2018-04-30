import { call, select, takeEvery } from 'redux-saga/effects';

import fetchResource from '../../sagas/fetchResource';

import { yearActiveNumber } from '../../years/selectors';
import { isNeeded, reduceParams } from '../../sagas/createFetchSaga';

export default (routine, {
  payloadReducer,
  payloadSelector,
  stateSelector,
} = {}) => {
  function* handleRequire() {
    const year = yield select(yearActiveNumber);
    const payload = payloadSelector ? yield select(payloadSelector) : null;
    const state = stateSelector ? yield select(stateSelector) : null;

    if (!state || isNeeded(state)) {
      yield call(fetchResource, routine, {
        params: {
          year,
          ...reduceParams(payloadReducer, payload),
        },
      });
    }
  }

  function* onRequire() {
    yield takeEvery(routine.TRIGGER, handleRequire);
  }

  return [onRequire];
};
