import React from 'react'

import NewPasswordForm from '../NewPasswordForm'

import { renderContainer } from '../../../../mock/containers'

describe('NewPasswordForm container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<NewPasswordForm />)
  })

  it('provides form name', () => {
    expect(comp.find('ReduxForm').first()).toHaveProp('form', 'FORM_NEW_PASSWORD')
  })
})
