import React from 'react'

import { AppContainer } from '../AppContainer'
import { renderContainer } from '../../../mock/containers'

describe('App container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<AppContainer />)
  })

  it('provides number of active requests', () => {
    expect(comp.find('App')).toHaveProp('activeRequests')
  })

  it('triggers app mounted action on mount', () => {
    expect(comp.store.getActions()).toContainEqual({
      type: 'APP_MOUNTED'
    })
  })
})
