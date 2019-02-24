import React from 'react'

import { shallow } from 'enzyme'

import Tip from '../Tip'
import ObjectList from '../../../components/ObjectList'
import TipList from '../TipList'

describe('Object list component', () => {
  it('renders', () => {
    expect(shallow(
      <TipList
        tips={[
          {
            id: 21,
            name: 'Foo',
            photos: [],
            text: 'Bar'
          }
        ]}
      />
    ).getElement()).toEqual(
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
  })
})
