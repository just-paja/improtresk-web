import { fork, select, takeEvery } from 'redux-saga/effects';

import fetchResource from './fetchResource';

export const reduceParams = (payloadReducer, payload) => {
  if (!payloadReducer) {
    return payload;
  }
  return payloadReducer(payload);
};

export const isNeeded = state => !state.loading && !state.valid;

export default (routine, {
  payloadReducer,
  payloadSelector,
  stateSelector,
} = {}) => {
  function* handleFetch() {
    const payload = payloadSelector ? yield select(payloadSelector) : null;
    const state = stateSelector ? yield select(stateSelector) : null;

    if (!state || isNeeded(state)) {
      yield fork(fetchResource, routine, {
        params: reduceParams(payloadReducer, payload),
      });
    }
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
