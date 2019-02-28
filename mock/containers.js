import React from 'react'

import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import mockStore from './store'

export const renderContainer = (children, state) => {
  const store = mockStore(state)
  const comp = mount(
    <StaticRouter context={{}}>
      <Provider store={store}>
        {children}
      </Provider>
    </StaticRouter>
  )
  comp.store = store
  return comp
}
