import React from 'react'
import sinon from 'sinon'

import { shallow } from 'enzyme'

import LinkService from '../LinkService'

describe('LinkService component', () => {
  beforeEach(() => {
    sinon.stub(window, 'open')
  })

  afterEach(() => {
    window.open.restore()
  })

  it('renders link with href', () => {
    const comp = shallow(
      <LinkService
        href='https://example.com'
        service='bandzone'
      >
        External Link text
      </LinkService>
    )
    expect(comp.find('a'))
      .toHaveProp('href', 'https://example.com')
  })

  it('renders Bandzone icon', () => {
    const comp = shallow(
      <LinkService
        href='https://example.com'
        service='bandzone'
      >
        External Link text
      </LinkService>
    )
    expect(comp.find('FontAwesome'))
      .toHaveProp('name', 'play-circle')
  })

  it('renders Facebook icon', () => {
    const comp = shallow(
      <LinkService
        href='https://example.com'
        service='facebook'
      >
        External Link text
      </LinkService>
    )
    expect(comp.find('FontAwesome'))
      .toHaveProp('name', 'facebook-square')
  })

  it('renders SoundCloud icon', () => {
    const comp = shallow(
      <LinkService
        href='https://example.com'
        service='soundcloud'
      >
        External Link text
      </LinkService>
    )
    expect(comp.find('FontAwesome'))
      .toHaveProp('name', 'play-circle')
  })

  it('renders YouTube icon', () => {
    const comp = shallow(
      <LinkService
        href='https://example.com'
        service='youtube'
      >
        External Link text
      </LinkService>
    )
    expect(comp.find('FontAwesome'))
      .toHaveProp('name', 'play-circle')
  })

  it('renders external link icon for unknown services', () => {
    const comp = shallow(
      <LinkService
        href='https://example.com'
        service='external'
      >
        External Link text
      </LinkService>
    )
    expect(comp.find('FontAwesome'))
      .toHaveProp('name', 'external-link-square')
  })

  it('renders link text', () => {
    const comp = shallow(
      <LinkService
        href='https://example.com'
        service='youtube'
      >
        External Link text
      </LinkService>
    )
    expect(comp.find({
      children: 'External Link text'
    })).toHaveLength(1)
  })

  it('opens link in a new window on click', () => {
    const preventDefault = sinon.spy()
    const comp = shallow(
      <LinkService
        href='https://example.com'
        service='youtube'
      >
        External Link text
      </LinkService>
    )
    comp.find('a').simulate('click', {
      preventDefault,
      target: {
        href: 'https://example.com'
      }
    })
    expect(preventDefault.calledOnce).toBeTruthy()
    expect(window.open.args).toEqual([
      ['https://example.com']
    ])
  })
})
