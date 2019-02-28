import React from 'react'

import { initialize } from 'redux-form'

import NewPasswordPage from '../NewPasswordPage'

import { renderContainer } from '../../../mock/containers'

describe('NewPasswordPage container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<NewPasswordPage location={{ search: '?token=theToken' }} />)
  })

  it('triggers form values set action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(
      initialize('FORM_NEW_PASSWORD', {
        token: 'theToken'
      })
    )
  })
})
