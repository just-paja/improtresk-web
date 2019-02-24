import { fork, put, select, take, takeEvery } from 'redux-saga/effects'

import { getFormValues, startSubmit, stopSubmit, setSubmitSucceeded } from 'redux-form'

import fetchResource from '../../sagas/fetchResource'

const reduceParams = (payloadReducer, payload) => {
  if (!payloadReducer) {
    return payload
  }
  return payloadReducer(payload)
}

export default (routine, {
  payloadSelector,
  payloadReducer
} = {}) => {
  function * handleSubmit () {
    const formData = yield select(getFormValues(routine.form))
    const params = payloadSelector ? yield select(payloadSelector) : null
    yield put(startSubmit(routine.form))
    yield fork(fetchResource, routine, {
      params: {
        formData,
        ...reduceParams(payloadReducer, params)
      }
    })
    const action = yield take([routine.FAILURE, routine.SUCCESS])
    if (action.type === routine.FAILURE) {
      yield put(stopSubmit(routine.form, action.payload))
    } else {
      yield put(stopSubmit(routine.form))
      yield put(setSubmitSucceeded(routine.form))
    }
  }

  function * onSubmitTrigger () {
    yield takeEvery(routine.TRIGGER, handleSubmit)
  }

  return [onSubmitTrigger]
}
