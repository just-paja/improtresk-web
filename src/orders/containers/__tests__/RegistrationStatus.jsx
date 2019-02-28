import React from 'react'

import { orderListFetch } from '../../actions'

import RegistrationStatus from '../RegistrationStatus'

import { renderContainer } from '../../../../mock/containers'

describe('RegistrationStatus container', () => {
  let comp

  beforeEach(() => {
    const state = {
      food: {
        list: {
          valid: true,
          data: [
            {
              id: 20,
              date: '2017-03-05',
              name: 'lunch'
            }
          ]
        }
      },
      orders: {
        list: {
          data: [
            {
              id: 10,
              year: 10,
              reservation: {
                endsAt: '2018-04-14T00:00:00'
              },
              price: 200,
              symvar: '22323',
              createdAt: '2018-03-14T00:00:00'
            }
          ],
          valid: true
        }
      },
      participants: {
        detail: {}
      },
      workshops: {
        list: {},
        detail: {},
        difficulties: {
          data: []
        },
        lectors: {
          roles: {},
          list: {}
        }
      },
      years: {
        capacity: {
          data: {}
        },
        list: {
          data: [
            {
              id: 10,
              current: true,
              year: '2018',
              startDate: '2018-05-05',
              endDate: '2018-05-09'
            }
          ],
          valid: true
        }
      }
    }
    comp = renderContainer(<RegistrationStatus />, state)
  })

  it('provides active order', () => {
    expect(comp.find('RegistrationStatus')).toHaveProp('activeOrder', {
      id: 10,
      assigned: false,
      reservation: {
        endsAt: '2018-04-14T00:00:00'
      },
      price: 200,
      remainingPrice: 200,
      symvar: '22323',
      createdAt: '2018-03-14T00:00:00',
      accomodation: null,
      meals: [],
      workshop: null,
      year: {
        id: 10,
        current: true,
        year: '2018',
        startDate: '2018-05-05',
        endDate: '2018-05-09'
      }
    })
  })

  it('dispatches meals required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: orderListFetch.TRIGGER
    }))
  })
})
