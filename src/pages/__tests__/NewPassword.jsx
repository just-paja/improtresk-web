import React from 'react'

import { initialize } from 'redux-form'
import { shallow } from 'enzyme'

import mockStore from '../../../mock/store'
import NewPasswordPage from '../NewPasswordPage'

describe('NewPasswordPage container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore()
    comp = shallow(<NewPasswordPage location={{ search: '?token=theToken' }} />, {
      context: { store }
    })
  })

  it('triggers form values set action on mount', () => {
    comp.dive()
    expect(store.getActions()).toEqual([
      initialize('FORM_NEW_PASSWORD', {
        token: 'theToken'
      })
    ])
  })
})
