import React from 'react'

import { shallow } from 'enzyme'

import Link from '../Link'

describe('Link component', () => {
  it('renders router link with translated route', () => {
    const comp = shallow(
      <Link lang='cs' to='workshopDetail' params={{ slug: 'foo' }}>
        Some Foo Workshop
      </Link>
    )

    expect(comp.find('Link')).toHaveProp('to', '/cs/workshopy/foo')
  })
})
