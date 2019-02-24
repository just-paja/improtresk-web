import orderList from '../orderList'

import { orderCancel, orderCreate, orderListFetch } from '../../actions'

describe('Orders reducer', () => {
  it('returns default state', () => {
    expect(orderList()).toMatchObject({
      loading: false,
      data: []
    })
  })

  it('marks as loading on request', () => {
    expect(orderList({}, orderListFetch.request())).toMatchObject({
      loading: true
    })
  })

  it('marks as loading on success', () => {
    expect(orderList(
      {},
      orderListFetch.success([
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
    expect(orderList({}, orderListFetch.failure('error'))).toMatchObject({
      error: 'error'
    })
  })

  it('invalidates data on cancel', () => {
    expect(orderList({}, orderCancel.success())).toMatchObject({
      valid: false
    })
  })

  it('invalidates data on create', () => {
    expect(orderList({}, orderCreate.success())).toMatchObject({
      valid: false
    })
  })

  it('invalidates data on logout', () => {
    expect(orderList({}, { type: 'PARTICIPANT_LOGOUT' })).toMatchObject({
      valid: false
    })
  })
})
