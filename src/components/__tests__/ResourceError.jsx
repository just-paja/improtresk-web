import React from 'react'

import { shallow } from 'enzyme'

import ResourceError from '../ResourceError'

describe('ResourceError component', () => {
  it('renders oops heading', () => {
    const comp = shallow(
      <ResourceError
        translator={msg => msg}
        error={null}
      />
    )
    expect(comp.find('Connect(Message)[name="generic.oops"]')).toHaveLength(1)
  })

  it('renders loading failed text', () => {
    const comp = shallow(
      <ResourceError
        translator={msg => msg}
        error={null}
      />
    )
    expect(comp.find('Connect(Message)[name="generic.loadingFailed"]')).toHaveLength(1)
  })

  it('renders error summary without error given it is not available', () => {
    const comp = shallow(
      <ResourceError
        translator={msg => msg}
        error={null}
      />
    )
    expect(comp.find('ErrorSummary').prop('error')).toBe(null)
  })

  it('renders error summary with error', () => {
    const error = new Error('foo')
    const comp = shallow(
      <ResourceError
        translator={msg => msg}
        error={error}
      />
    )
    expect(comp.find('ErrorSummary').prop('error')).toEqual(error)
  })
})
