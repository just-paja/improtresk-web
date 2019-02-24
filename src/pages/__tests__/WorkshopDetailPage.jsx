import configureMockStore from 'redux-mock-store'
import React from 'react'

import { shallow } from 'enzyme'

import WorkshopDetailPage from '../WorkshopDetailPage'

const mockStore = configureMockStore()

describe('WorkshopDetailPage container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({})
    comp = shallow(<WorkshopDetailPage match={{ params: { slug: 'nehraj-23125' } }} />, {
      context: { store }
    })
  })

  it('passes route match', () => {
    expect(comp.find('WorkshopDetailPage')).toHaveProp('match', { params: { slug: 'nehraj-23125' } })
  })
})
