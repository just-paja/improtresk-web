import React from 'react'

import PrivateRoute from '../PrivateRoute'

import { renderContainer } from '../../../mock/containers'

const TestComponent = () => <div />

describe('PrivateRoute container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<PrivateRoute path='/' component={TestComponent} />, {
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
