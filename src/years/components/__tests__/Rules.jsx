import React from 'react'

import { shallow } from 'enzyme'

import Rules from '../Rules'

describe('Rules page component', () => {
  it('renders content', () => {
    const comp = shallow(
      <Rules
        rules={{
          text: 'foo'
        }}
      />
    )
    expect(comp.find('ReactMarkdown')).toHaveProp('source', 'foo')
  })
})
