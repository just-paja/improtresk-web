import configureMockStore from 'redux-mock-store'
import React from 'react'

import { shallow } from 'enzyme'

import Accomodation from '../Accomodation'

const mockStore = configureMockStore()

describe('Accomodation container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: []
      }
    })
    comp = shallow(<Accomodation />, {
      context: { store }
    })
  })

  it('provides translate method', () => {
    expect(comp.find('Accomodation')).toHaveProp('translate')
  })
})
