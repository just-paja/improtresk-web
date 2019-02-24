import { call, takeLatest } from 'redux-saga/effects'

import { fetchResourceIfRequired } from '../../../sagas/api'
import { isYearListRequired } from '../../selectors'

import * as sagas from '..'
import * as api from '../../../api'

describe('Years sagas', () => {
  it('fetchYearList creates fetch actions', () => {
    const gen = sagas.fetchYearList()
    expect(gen.next().value).toEqual(call(
      fetchResourceIfRequired,
      api.fetchYears,
      {
        isRequired: isYearListRequired,
        actions: {
          start: 'YEARS_FETCH_STARTED',
          success: 'YEARS_FETCH_SUCCESS',
          fail: 'YEARS_FETCH_ERROR'
        }
      }
    ))
    expect(gen.next().done).toBe(true)
  })

  it('requireYearList triggers fetchYearList', () => {
    const gen = sagas.requireYearList()
    expect(gen.next().value).toEqual(takeLatest(
      'YEARS_REQUIRED',
      sagas.fetchYearList
    ))
    expect(gen.next().done).toBeTruthy()
  })
})
