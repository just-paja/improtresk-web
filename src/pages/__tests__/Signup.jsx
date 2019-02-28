import React from 'react'

import Signup from '../Signup'

import { renderContainer } from '../../../mock/containers'

describe('Signup page', () => {
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
              topic: 'foo',
              startDate: '2018-04-01',
              startSignupsAt: '2018-03-02'
            }
          ],
          valid: true
        }
      },
      texts: {}
    }
    comp = renderContainer(<Signup location={{}} />, state)
  })

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(Signup))')).toHaveProp('progress', {
      errors: [],
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true
    })
  })

  it('triggers home mounted action on mount', () => {
    expect(comp.store.getActions()).toContainEqual({
      type: 'PAGE_SIGNUP_ENTERED'
    })
  })
})
