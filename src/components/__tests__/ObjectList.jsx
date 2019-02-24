import React from 'react'

import { shallow } from 'enzyme'

import ObjectList from '../ObjectList'

const Tip = () => <div />

describe('Object List component', () => {
  it('renders passed component', () => {
    const comp = shallow(
      <ObjectList
        Component={Tip}
        data={[
          {
            id: 21,
            name: 'Foo',
            photos: [],
            text: 'Bar'
          }
        ]}
      />
    )
    expect(comp.find('Tip')).toHaveLength(1)
  })

  it('renders empty with empty message', () => {
    const comp = shallow(
      <ObjectList
        Component={Tip}
        data={[]}
        emptyMessage='Empty!'
      />
    )
    expect(comp.find({ children: 'Empty!' })).toHaveLength(1)
  })

  it('renders empty without empty message', () => {
    expect(shallow(
      <ObjectList
        Component={Tip}
        data={[]}
      />
    ).find('Row')).toHaveProp('children', [])
  })
})
