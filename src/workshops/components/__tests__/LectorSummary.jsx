import React from 'react'

import { shallow } from 'enzyme'

import LectorSummary from '../LectorSummary'

describe('Lector summary component', () => {
  it('renders lector name', () => {
    const comp = shallow(
      <LectorSummary
        name='Hugo Ventil'
        position='Lektor'
        about='Markdown about'
        photos={[
          {
            image: 'foo',
            height: 200,
            width: 300
          }
        ]}
      />
    )
    expect(comp.find({ children: 'Hugo Ventil' })).toHaveLength(1)
  })

  it('renders markdown text', () => {
    const comp = shallow(
      <LectorSummary
        name='Hugo Ventil'
        position='Lektor'
        about='Markdown about'
        photos={[
          {
            image: 'foo',
            height: 200,
            width: 300
          }
        ]}
      />
    )
    expect(comp.find('ReactMarkdown')).toHaveLength(1)
  })

  it('renders photo gallery', () => {
    const comp = shallow(
      <LectorSummary
        name='Hugo Ventil'
        position='Lektor'
        about='Markdown about'
        photos={[
          {
            image: 'foo',
            height: 200,
            width: 300
          }
        ]}
      />
    )
    expect(comp.find('Gallery')).toHaveLength(1)
  })
})
