import { takeEvery } from 'redux-saga/effects'

import { fetchResourceIfRequired } from '../../../sagas/api'
import { isTipListRequired } from '../../selectors/tips'

import * as sagas from '..'
import * as api from '../../../api'

describe('Tips sagas', () => {
  it('requireTipList creates fetch actions', () => {
    const saga = sagas.requireTipList()
    expect(saga.next().value).toEqual(takeEvery(
      'TIPS_REQUIRED',
      fetchResourceIfRequired,
      api.fetchTips,
      {
        isRequired: isTipListRequired,
        actions: {
          start: 'TIPS_FETCH_STARTED',
          success: 'TIPS_FETCH_SUCCESS',
          fail: 'TIPS_FETCH_ERROR'
        }
      }
    ))
    expect(saga.next().done).toBe(true)
  })
})
