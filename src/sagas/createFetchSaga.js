import { call, put, select, takeEvery } from 'redux-saga/effects'

import fetchResource from './fetchResource'

export const reduceParams = (payloadReducer, payload) => {
  if (!payloadReducer) {
    return payload
  }
  return payloadReducer(payload)
}

export const isNeeded = state => !state.loading && !state.valid

export default (routine, {
  payloadReducer,
  payloadSelector,
  stateSelector
} = {}) => {
  function * handleFetch () {
    const payload = payloadSelector ? yield select(payloadSelector) : null
    const state = stateSelector ? yield select(stateSelector) : null

    try {
      const params = reduceParams(payloadReducer, payload)
      if (!state || isNeeded(state)) {
        yield call(fetchResource, routine, { params })
      }
    } catch (e) {
      yield put(routine.failure(e))
    }
  }

  function * onFetchRequire () {
    const triggers = [routine.TRIGGER]
    if (routine.INVALIDATE) {
      triggers.push(routine.INVALIDATE)
    }
    yield takeEvery(triggers, handleFetch)
  }

  return [onFetchRequire]
}
