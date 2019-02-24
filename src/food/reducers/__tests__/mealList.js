import mealList from '../mealList'

import { mealListFetch } from '../../actions'

describe('Meals reducer', () => {
  it('returns default state', () => {
    expect(mealList()).toMatchObject({
      loading: false,
      data: []
    })
  })

  it('marks as loading on request', () => {
    expect(mealList({}, mealListFetch.request())).toMatchObject({
      loading: true
    })
  })

  it('marks as loading on success', () => {
    expect(mealList(
      {},
      mealListFetch.success([
        { name: 'foo' }
      ])
    )).toMatchObject({
      loading: false,
      valid: true,
      data: [
        { name: 'foo' }
      ]
    })
  })

  it('saves error on failure', () => {
    expect(mealList({}, mealListFetch.failure('error'))).toMatchObject({
      error: 'error'
    })
  })
})
