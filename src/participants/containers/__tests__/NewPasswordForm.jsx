import React from 'react'

import { shallow } from 'enzyme'

import mockStore from '../../../../mock/store'
import NewPasswordForm from '../NewPasswordForm'

describe('NewPasswordForm container', () => {
  let store
  let comp

  beforeEach(() => {
    store = mockStore()
    comp = shallow(
      <NewPasswordForm />,
      { context: { store } }
    )
  })

  it('provides form name', () => {
    expect(comp.dive()).toHaveProp('form', 'FORM_NEW_PASSWORD')
  })
})
