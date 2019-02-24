import React from 'react'

import { shallow } from 'enzyme'

import News from '../NewsList'

describe('News list component', () => {
  it('renders news items in object list', () => {
    const comp = shallow(
      <News
        news={[
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
