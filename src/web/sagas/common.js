import { call, fork, put, select } from 'redux-saga/effects';

export const fetchResource = (resource, action, { onStart, onSuccess, onError }) =>
  function* fetchResourceInner() {
    yield put({ type: onStart });
    try {
      const res = yield call(resource, action);
      const data = yield res.json();

      yield put({ type: onSuccess, data });
    } catch (error) {
      yield put({ type: onError, error });
    }
  };

export const fetchResourceIfNeeded = (resource, selector, constants) =>
  function* fetchResourceIfNeededInner(action) {
    const valid = yield select(selector);

    if (!valid) {
      yield fork(fetchResource(resource, action, constants));
    }
  };
