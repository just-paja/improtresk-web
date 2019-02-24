import React from 'react'

import { shallow } from 'enzyme'

import Workshops from '../Workshops'

describe('Workshops page component', () => {
  it('renders workshop list', () => {
    const comp = shallow(<Workshops translate={msg => msg} />)
    expect(comp.find('Connect(ContainerProgress(Connect(WorkshopList)))')).toHaveLength(1)
  })
})
