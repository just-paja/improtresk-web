import React from 'react'

import LanguagePicker from '../LanguagePicker'

import { renderContainer } from '../../../mock/containers'

describe('LanguagePicker container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<LanguagePicker to='foo' />)
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
