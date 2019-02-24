import React from 'react'
import configureStore from 'redux-mock-store'

import { shallow } from 'enzyme'

import PrivateRoute from '../PrivateRoute'

const mockStore = configureStore()

describe('PrivateRoute container', () => {
  let comp

  beforeEach(() => {
    const store = mockStore({
      session: {
        locale: 'cs'
      },
      participants: {
        detail: {
          valid: true,
          data: {
            id: 10,
            name: 'Test User'
          }
        }
      }
    })
    comp = shallow(<PrivateRoute path='/' component={() => {}} />, {
      context: { store }
    })
  })

  it('provides language', () => {
    expect(comp.find('PrivateRoute')).toHaveProp('lang', 'cs')
  })

  it('provides logged in participant', () => {
    expect(comp.find('PrivateRoute')).toHaveProp('participantState', {
      valid: true,
      data: {
        id: 10,
        name: 'Test User'
      }
    })
  })
})
