import configureMockStore from 'redux-mock-store'
import React from 'react'

import { shallow } from 'enzyme'

import Tips from '../Tips'

const mockStore = configureMockStore()

describe('Tips container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: []
      }
    })
    comp = shallow(<Tips />, {
      context: { store }
    })
  })

  it('provides translate method', () => {
    expect(comp.find('Tips')).toHaveProp('translate')
  })
})
