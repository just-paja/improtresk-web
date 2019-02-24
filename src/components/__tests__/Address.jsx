import React from 'react'

import { shallow } from 'enzyme'

import Address from '../Address'

describe('Address component', () => {
  it('renders link', () => {
    expect(shallow(
      <Address address='foo' />
    ).getElement()).toEqual(
      <a href='https://maps.google.com/?q=foo'>foo</a>
    )
  })
})
