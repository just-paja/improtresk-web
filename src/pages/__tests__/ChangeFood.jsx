import React from 'react'

import ChangeFood from '../ChangeFood'

import { renderContainer } from '../../../mock/containers'

describe('ChangeFood page', () => {
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
          data: [],
          valid: true
        }
      },
      orders: {
        list: {
          data: []
        }
      },
      participants: {
        detail: {
          data: null,
          valid: true
        }
      },
      workshops: {
        lectors: {
          list: {
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
    comp = renderContainer(<ChangeFood />, state)
  })

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(ChangeFoodPage))')).toHaveProp('progress')
  })

  it('triggers home mounted action on mount', () => {
    expect(comp.store.getActions()).toEqual([
      { type: 'ORDER_RESOURCES_REQUIRED' }
    ])
  })
})
