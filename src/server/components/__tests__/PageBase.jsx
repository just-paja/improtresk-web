import Helmet from 'react-helmet'
import React from 'react'

import { shallow } from 'enzyme'
import { PageBase } from '../PageBase'

describe('PageBase component', () => {
  beforeEach(() => {
    Helmet.canUseDOM = false
  })

  afterEach(() => {
    Helmet.canUseDOM = true
  })

  it('renders html language', () => {
    const comp = shallow(
      <PageBase
        lang='en'
        css={['/assets/test.css']}
        js={['/assets/test.js']}
        markup='foo'
        state={{ testState: 'foo' }}
        helmet={Helmet.rewind()}
      />
    )
    expect(comp.find('html')).toHaveProp('lang', 'en')
  })

  it('renders IE compatible meta tag language', () => {
    const comp = shallow(
      <PageBase
        lang='en'
        css={['/assets/test.css']}
        js={['/assets/test.js']}
        markup='foo'
        state={{ testState: 'foo' }}
        helmet={Helmet.rewind()}
      />
    )
    expect(comp.find('meta[httpEquiv="X-UA-Compatible"]')).toHaveProp('content', 'IE=edge')
  })

  it('renders charset', () => {
    const comp = shallow(
      <PageBase
        lang='en'
        css={['/assets/test.css']}
        js={['/assets/test.js']}
        markup='foo'
        state={{ testState: 'foo' }}
        helmet={Helmet.rewind()}
      />
    )
    expect(comp.find('meta[charSet="utf-8"]')).toHaveLength(1)
  })

  it('renders default viewport scale', () => {
    const comp = shallow(
      <PageBase
        lang='en'
        css={['/assets/test.css']}
        js={['/assets/test.js']}
        markup='foo'
        state={{ testState: 'foo' }}
        helmet={Helmet.rewind()}
      />
    )
    expect(comp.find('meta[name="viewport"]')).toHaveProp('content', 'width=device-width,initial-scale=1')
  })

  it('renders title', () => {
    const comp = shallow(
      <PageBase
        lang='en'
        css={['/assets/test.css']}
        js={['/assets/test.js']}
        markup='foo'
        state={{ testState: 'foo' }}
        helmet={Helmet.rewind()}
      />
    )
    expect(comp.find('title')).toHaveLength(1)
  })

  it('renders app content', () => {
    const comp = shallow(
      <PageBase
        lang='en'
        css={['/assets/test.css']}
        js={['/assets/test.js']}
        markup='foo'
        state={{ testState: 'foo' }}
        helmet={Helmet.rewind()}
      />
    )
    expect(comp.find('body #appContent')).toHaveLength(1)
  })
})
