import React from 'react'

import FoodForm from '../FoodForm'

import { renderContainer } from '../../../../mock/containers'

describe('FoodForm container', () => {
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
      food: {
        list: {
          data: [
            {
              id: 31,
              date: '2018-05-11',
              name: 'Lunch',
              food: [],
              soups: []
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
              price: 434,
              meals: []
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
    }
    comp = renderContainer(<FoodForm />, state)
  })

  it('provides progress', () => {
    expect(comp.find('ContainerProgress(Connect(FoodForm))')).toHaveProp('progress')
  })

  it('provides meal list', () => {
    expect(comp.find('FoodForm').first()).toHaveProp('meals', [
      {
        id: 31,
        date: '2018-05-11',
        name: 'Lunch',
        food: [],
        soups: []
      }
    ])
  })

  it('triggers order list required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: 'ORDER_RESOURCES_REQUIRED'
    }))
  })
})
