import configureMockStore from 'redux-mock-store'
import React from 'react'

import { shallow } from 'enzyme'

import FoodForm from '../FoodForm'

const mockStore = configureMockStore()

describe('FoodForm container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: []
      },
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
      food: {
        list: {
          data: [
            {
              id: 31,
              date: '2018-05-11'
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
                mealReservation: [
                  {
                    meal: 31
                  }
                ]
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
      workshops: {
        lectors: {
          list: {
            data: [],
            valid: true
          },
          roles: {
            data: [],
            valid: true
          }
        },
        list: {
          data: [],
          valid: true
        }
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
    })
    comp = shallow(<FoodForm />, {
      context: { store }
    })
  })

  it('provides progress', () => {
    expect(comp.find('ContainerProgress(Connect(FoodForm))')).toHaveProp('progress')
  })

  it('provides meal list', () => {
    expect(comp.dive().dive().find('FoodForm')).toHaveProp('meals', [
      {
        id: 31,
        date: '2018-05-11'
      }
    ])
  })

  it('triggers order list required action on mount', () => {
    comp.dive().dive()
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'ORDER_RESOURCES_REQUIRED'
    }))
  })
})
