import React from 'react'

import ParticipantHome from '../ParticipantHome'

import { renderContainer } from '../../../mock/containers'

describe('ParticipantHome container', () => {
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
          data: []
        }
      },
      participants: {
        detail: {
          data: {
            id: 10,
            name: 'John Doe'
          },
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
    comp = renderContainer(<ParticipantHome />, state)
  })

  it('dispatches logout on logout', () => {
    comp.find('ParticipantHome').props().onLogout()
    expect(comp.store.getActions()).toContainEqual({
      type: 'PARTICIPANT_LOGOUT'
    })
  })
})
