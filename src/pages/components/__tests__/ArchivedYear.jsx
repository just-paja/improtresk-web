import React from 'react'

import { shallow } from 'enzyme'

import ArchivedYear from '../ArchivedYear'

describe('ArchivedYear page component', () => {
  it('renders year detail', () => {
    const comp = shallow(
      <ArchivedYear match={{ params: { slug: '2016' } }} />
    )
    expect(comp.find('Connect(ContainerProgress(Connect(ArchivedYearDetail)))')).toHaveProp('resourceId', '2016')
  })
})
