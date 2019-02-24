import React from 'react'
import configureStore from 'redux-mock-store'

import { shallow } from 'enzyme'

import Message from '../Message'

const mockStore = configureStore()

describe('Message container', () => {
  let comp

  beforeEach(() => {
    const store = mockStore({
      locale: {
        languages: ['cs']
      }
    })
    comp = shallow(<Message name='foo' />, {
      context: { store }
    })
  })

  it('provides translate function', () => {
    expect(comp.find('Message')).toHaveProp('translate')
  })
})
