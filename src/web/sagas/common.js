import { call, fork, put, select } from 'redux-saga/effects';

import { getApiSource } from '../selectors/session';

export function* fetchResource(resource, { onStart, onSuccess, onError, ...args }, action) {
  const apiSource = yield select(getApiSource);
  yield put({ type: onStart, ...args });
  try {
    const res = yield call(resource, {
      ...action,
      ...args,
      apiSource,
    });

    if (res.status >= 200 && res.status < 300) {
      const data = yield res.status === 204 ? [] : res.json();

      yield put({ type: onSuccess, data, ...args });
    } else {
      yield put({ type: onError, error: res.error, status: res.status, ...args });
    }
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
