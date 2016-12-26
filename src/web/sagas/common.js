import { call, fork, put, select } from 'redux-saga/effects';

export function* fetchResource(resource, { onStart, onSuccess, onError, ...args }, action) {
  yield put({ type: onStart, ...args });
  try {
    const res = yield call(resource, { ...action, ...args });
    const data = yield res.json();

    yield put({ type: onSuccess, data, ...args });
  } catch (error) {
    yield put({ type: onError, error, ...args });
  }
}

export function* fetchResourceIfNeeded(resource, selector, args, action) {
  const valid = yield select(selector);

  if (!valid) {
    yield fork(fetchResource, resource, args, action);
  }
}

export const isValid = state => !!(state && state.valid);
