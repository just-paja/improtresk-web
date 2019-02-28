import React from 'react'

import ChangePasswordPage from '../ChangePasswordPage'

import { renderContainer } from '../../../mock/containers'

describe('ChangePassword page', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<ChangePasswordPage />)
  })

  it('provides translate method', () => {
    expect(comp.find('ChangePasswordPage')).toHaveProp('translate')
  })
})
