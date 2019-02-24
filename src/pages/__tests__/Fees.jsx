import configureMockStore from 'redux-mock-store'
import React from 'react'

import { shallow } from 'enzyme'

import Fees from '../Fees'

const mockStore = configureMockStore()

describe('Fees container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: []
      },
      texts: {}
    })
    comp = shallow(<Fees />, {
      context: { store }
    })
  })

  it('renders fees page', () => {
    expect(comp.find('Fees')).toHaveLength(1)
  })
})
