import { takeEvery } from 'redux-saga/effects'

import { foodChange } from '../actions'
import { redirectHome } from '../../sagas/redirects'
import { createFormSubmitSaga } from '../../forms/sagas'
import { getYearAndOrder } from '../selectors'

function * onOrderHomeRedirect () {
  yield takeEvery(foodChange.SUCCESS, redirectHome)
}

export default [
  ...createFormSubmitSaga(foodChange, {
    payloadSelector: getYearAndOrder
  }),
  onOrderHomeRedirect
]
