import performerList from '../performerList'

import { performerListFetch } from '../../actions'

describe('performerList reducer', () => {
  it('returns default state', () => {
    expect(performerList()).toMatchObject({
      loading: false,
      data: []
    })
  })

  it('marks as loading on request', () => {
    expect(performerList({}, performerListFetch.request())).toMatchObject({
      loading: true
    })
  })

  it('marks as loading on success', () => {
    expect(performerList(
      {},
      performerListFetch.success([
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
    expect(performerList({}, performerListFetch.failure('error'))).toMatchObject({
      error: 'error'
    })
  })
})
