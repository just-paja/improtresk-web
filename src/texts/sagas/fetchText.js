import { all, call, fork, select, takeEvery } from 'redux-saga/effects'

import { fetchResourceIfRequired } from '../../sagas/api'
import { isTextRequired } from '../selectors'
import { getLang } from '../../selectors/locales'

import * as api from '../../api'
import * as constants from '../constants'

export function * fetchTextIfRequired (category) {
  const lang = yield select(getLang)
  yield call(
    fetchResourceIfRequired,
    api.fetchText,
    {
      isRequired: isTextRequired(category),
      actions: {
        start: constants.TEXT_FETCH_STARTED,
        success: constants.TEXT_FETCH_SUCCESS,
        fail: constants.TEXT_FETCH_ERROR
      },
      params: {
        category,
        lang
      },
      actionData: {
        category,
        lang
      }
    }
  )
}

export function * fetchTextFromActionIfRequired (action) {
  yield call(fetchTextIfRequired, action.category)
}

export function * fetchTextsIfRequired (codes) {
  yield all(codes.map(category => fork(fetchTextIfRequired, category)))
}

export function * requireText () {
  yield takeEvery(constants.TEXT_REQUIRED, fetchTextFromActionIfRequired)
}

export default [
  requireText
]
