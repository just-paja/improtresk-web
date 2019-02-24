import { takeLatest } from 'redux-saga/effects'

import * as sagas from '../vandaDoor'

describe('Home sagas', () => {
  it('requireVandaDoor binds vandadoor to open on home mount', () => {
    const gen = sagas.requireVandaDoor()
    expect(gen.next().value).toEqual(takeLatest('APP_MOUNTED', sagas.openVandaDoor))
    expect(gen.next().done).toBe(true)
  })

  it('openVandaDoor does nothing without window', () => {
    const gen = sagas.openVandaDoor()
    expect(gen.next().done).toBe(true)
  })
})
