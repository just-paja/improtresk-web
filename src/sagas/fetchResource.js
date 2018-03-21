import {
  call,
  cancelled,
  put,
  select,
} from 'redux-saga/effects';

import { getApiAuth, getApiSource } from '../selectors';

const shouldParseBody = response => (
  response &&
  response.status >= 200 &&
  response.status !== 204 &&
  response.status !== 404
);

function* getFetchResultAction(routine, response, actionData) {
  let responseBody = null;
  if (response && response.status === 404) {
    return routine.failure({ missing: true }, actionData);
  }

  if (shouldParseBody(response)) {
    try {
      responseBody = yield response.json();
    } catch (parseError) {
      return routine.failure(parseError, actionData);
    }
  }

  if (!response.ok) {
    return routine.failure(responseBody, actionData);
  }

  return routine.success(responseBody, actionData);
}

export default function* fetchResource(routine, {
  actionData,
  params,
}) {
  const apiSource = yield select(getApiSource);
  const auth = yield select(getApiAuth);
  try {
    yield put(routine.request(null, actionData));
    const response = yield call(routine.resource, {
      ...params,
      apiSource,
      auth,
    });
    yield put(yield call(getFetchResultAction, routine, response, actionData));
  } catch (error) {
    yield put(routine.failure(error, actionData));
  } finally {
    yield put(routine.fulfill({
      cancelled: yield cancelled(),
    }, actionData));
  }
}
