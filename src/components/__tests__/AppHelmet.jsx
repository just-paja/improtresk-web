import React from 'react'

import { AppHelmet } from '../AppHelmet'
import { shallow } from 'enzyme'

describe('AppHelmet component', () => {
  it('renders default title', () => {
    const comp = shallow(
      <AppHelmet
        host='https://improtresk.cz'
        entryPath='/prihlaska'
        translate={msg => msg}
      />
    )
    expect(comp.find('HelmetWrapper')).toHaveProp('defaultTitle', 'pages.defaultTitle')
  })

  it('renders opengraph URL', () => {
    const comp = shallow(
      <AppHelmet
        host='https://improtresk.cz'
        entryPath='/prihlaska'
        translate={msg => msg}
        year={{
          id: 10,
          year: '2018'
        }}
      />
    )
    expect(comp.find('meta[property="og:url"]')).toHaveProp('content', 'https://improtresk.cz/prihlaska')
  })

  it('renders default description', () => {
    const comp = shallow(
      <AppHelmet
        host='https://improtresk.cz'
        entryPath='/prihlaska'
        translate={msg => msg}
        year={{
          id: 10,
          year: '2018'
        }}
      />
    )
    expect(comp.find('meta[property="og:description"]')).toHaveProp('content', 'pages.about')
  })
})
