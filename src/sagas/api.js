import { call, select } from 'redux-saga/effects';
import {
  fetchResource as restFetchResource,
  fetchResourceIfRequired as restFetchResourceIfRequired,
} from 'react-saga-rest';

import { getApiAuth, getApiSource } from '../selectors';

export function* fetchResource(resource, { params, ...props }) {
  const apiSource = yield select(getApiSource);
  const auth = yield select(getApiAuth);
  yield call(restFetchResource, resource, {
    ...props,
    params: {
      ...params,
      auth,
      apiSource,
    },
  });
}

export function* fetchResourceIfRequired(resource, { params, ...props }) {
  const apiSource = yield select(getApiSource);
  const auth = yield select(getApiAuth);
  yield call(restFetchResourceIfRequired, resource, {
    ...props,
    params: {
      ...params,
      auth,
      apiSource,
    },
  });
}
