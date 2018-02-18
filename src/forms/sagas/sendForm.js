import { call } from 'redux-saga/effects';

import { fetchResource } from '../../sagas/api';
import * as constants from '../constants';

export function* sendForm(apiResource, form, formData, params = {}) {
  yield call(fetchResource, apiResource, {
    actions: {
      start: constants.FORM_SUBMIT_STARTED,
      success: constants.FORM_SUBMIT_SUCCESS,
      fail: constants.FORM_SUBMIT_ERROR,
    },
    actionData: {
      form,
    },
    params: {
      ...params,
      formData,
    },
  });
}

export default [];
