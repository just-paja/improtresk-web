import React from 'react'

import { shallow } from 'enzyme'

import MultiLingualMarkdown from '../MultiLingualMarkdown'

describe('MultiLingualMarkdown', () => {
  it('renders as null when given falsy texts', () => {
    const comp = shallow(<MultiLingualMarkdown lang='cs' />)
    expect(comp.getElement()).toBe(null)
  })

  it('renders as null when given empty texts', () => {
    const comp = shallow(<MultiLingualMarkdown lang='cs' texts={[]} />)
    expect(comp.getElement()).toBe(null)
  })

  it('renders langs matching selected lang as react markdown', () => {
    const comp = shallow(
      <MultiLingualMarkdown
        lang='cs'
        texts={[
          {
            id: 1,
            text: 'foo',
            lang: 'cs'
          },
          {
            id: 2,
            text: 'xx',
            lang: 'en'
          },
          {
            id: 3,
            text: 'bar',
            lang: 'cs'
          }
        ]}
      />
    )
    expect(comp.find('ReactMarkdown[source="foo"]')).toHaveLength(1)
    expect(comp.find('ReactMarkdown[source="bar"]')).toHaveLength(1)
    expect(comp.find('ReactMarkdown[source="xx"]')).toHaveLength(0)
  })
})
