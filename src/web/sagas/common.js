import { call, fork, put, select } from 'redux-saga/effects';

import { getApiAuth, getApiSource } from '../selectors/session';

export function* fetchResource(resource, { onStart, onSuccess, onError, ...args }, action) {
  const apiSource = yield select(getApiSource);
  const auth = yield select(getApiAuth);
  yield put({ type: onStart, ...args });
  try {
    const res = yield call(resource, {
      ...action,
      ...args,
      apiSource,
      auth,
    });
    const data = yield res.status === 204 ? [] : res.json();

    if (res.status >= 200 && res.status < 300) {
      yield put({ ...args, type: onSuccess, data });
    } else {
      yield put({ ...args, type: onError, error: res.error, status: res.status, data });
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
