import React from 'react'

import { orderListFetch } from '../../actions'

import OrderList from '../OrderList'

import { renderContainer } from '../../../../mock/containers'

describe('OrderList container', () => {
  let comp

  beforeEach(() => {
    const state = {
      accomodation: {
        list: {
          data: [
            {
              id: 5,
              name: 'Something new'
            }
          ],
          valid: true
        }
      },
      orders: {
        list: {
          data: [
            {
              createdAt: '2017-04-09',
              endsAt: '2017-05-09',
              symvar: '34598289',
              id: 432,
              reservation: {
                accomodation: 5,
                endsAt: '2018-05-14T00:00:00'
              },
              year: 150,
              price: 434
            }
          ],
          valid: true
        }
      },
      participants: {
        detail: {}
      },
      years: {
        capacity: {
          data: [],
          valid: true
        },
        list: {
          data: [
            {
              id: 150,
              current: true,
              topic: 'foo'
            }
          ],
          valid: true
        }
      }
    }
    comp = renderContainer(<OrderList />, state)
  })

  it('provides progress', () => {
    expect(comp.find('ContainerProgress(Connect(OrderList))')).toHaveProp('progress', {
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
      errors: []
    })
  })

  it('provides order list list', () => {
    expect(comp.find('OrderList')).toHaveProp('orders', [
      {
        assigned: false,
        id: 432,
        createdAt: '2017-04-09',
        endsAt: '2017-05-09',
        symvar: '34598289',
        accomodation: {
          id: 5,
          name: 'Something new',
          capacityStatus: {}
        },
        reservation: {
          accomodation: 5,
          endsAt: '2018-05-14T00:00:00'
        },
        price: 434,
        remainingPrice: 434,
        workshop: null,
        meals: [],
        year: {
          id: 150,
          current: true,
          topic: 'foo'
        }
      }
    ])
  })

  it('triggers order list required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: orderListFetch.TRIGGER
    }))
  })
})
