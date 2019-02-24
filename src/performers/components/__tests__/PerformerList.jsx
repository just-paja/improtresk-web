import React from 'react'

import { shallow } from 'enzyme'

import PerformerList from '../PerformerList'

describe('PerformerList list component', () => {
  it('renders performer items in object list', () => {
    const comp = shallow(
      <PerformerList
        performerList={[
          {
            createdAt: '2016-01-02T03:04:05',
            id: 21,
            text: 'foo'
          },
          {
            createdAt: '2016-01-02T09:04:05',
            id: 25,
            text: 'bar'
          }
        ]}
      />
    )
    expect(comp.find('ObjectList')).toHaveProp('data', [
      {
        createdAt: '2016-01-02T03:04:05',
        id: 21,
        text: 'foo'
      },
      {
        createdAt: '2016-01-02T09:04:05',
        id: 25,
        text: 'bar'
      }
    ])
  })
})
