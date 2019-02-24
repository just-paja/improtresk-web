import { change, getFormValues } from 'redux-form'
import { put, select, takeEvery } from 'redux-saga/effects'

import { orderCreate } from '../actions'
import { getWorkshopList } from '../../workshops/selectors'
import { redirectHome } from '../../sagas/redirects'
import { createFormSubmitSaga } from '../../forms/sagas'

import * as years from '../../years/constants'

function * onOrderHomeRedirect () {
  yield takeEvery(orderCreate.SUCCESS, redirectHome)
}

function * interceptInvalidWorkshop () {
  const form = yield select(getFormValues, orderCreate.form)
  const workshops = yield select(getWorkshopList)
  const selectedWorkshop = workshops.find(workshop => workshop.id === form.workshop)

  if (form.workshop && (
    !selectedWorkshop ||
    selectedWorkshop.capacityStatus.freeSpots === 0
  )) {
    yield put(change(orderCreate.form, 'workshop', null))
  }
}

function * onInterceptInvalidWorkshop () {
  yield takeEvery(
    years.YEAR_CAPACITY_FETCH_SUCCESS,
    interceptInvalidWorkshop
  )
}

export default [
  ...createFormSubmitSaga(orderCreate),
  onInterceptInvalidWorkshop,
  onOrderHomeRedirect
]
