import React from 'react'
import configureStore from 'redux-mock-store'

import { shallow } from 'enzyme'

import LanguagePicker from '../LanguagePicker'

const mockStore = configureStore()

describe('LanguagePicker container', () => {
  let comp

  beforeEach(() => {
    const store = mockStore({
      locale: {
        languages: ['cs', 'en']
      },
      session: {
        locale: 'cs'
      }
    })
    comp = shallow(<LanguagePicker to='foo' />, {
      context: { store }
    })
  })

  it('provides selected language', () => {
    expect(comp.find('LanguagePicker')).toHaveProp('selectedLang', 'cs')
  })

  it('provides available languages', () => {
    expect(comp.find('LanguagePicker')).toHaveProp('availableLangs', ['cs', 'en'])
  })

  it('provides pathname', () => {
    expect(comp.find('LanguagePicker')).toHaveProp('pathName', 'home')
  })
})
