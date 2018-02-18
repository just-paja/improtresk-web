import { all, fork } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../sagas/api';
import { isTextRequired } from '../selectors';

import * as api from '../../api';
import * as constants from '../constants';

export function* fetchTextIfRequired(code) {
  yield fork(
    fetchResourceIfRequired,
    api.fetchText,
    {
      isRequired: isTextRequired,
      actions: {
        start: constants.TEXT_FETCH_STARTED,
        success: constants.TEXT_FETCH_SUCCESS,
        fail: constants.TEXT_FETCH_ERROR,
      },
      params: {
        code,
      },
      actionData: {
        code,
      },
    }
  );
}

export function* fetchTextsIfRequired(codes) {
  yield all(codes.map(code => fork(fetchTextIfRequired, code)));
}
