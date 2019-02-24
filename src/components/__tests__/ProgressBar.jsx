import React from 'react'

import { shallow } from 'enzyme'

import ProgressBar from '../ProgressBar'

describe('ProgressBar component', () => {
  it('renders as loading', () => {
    const comp = shallow(<ProgressBar activeRequests={10} />)
    expect(comp.find('Progress').props()).toMatchObject({
      className: 'appProgressBar fixed',
      value: 100 / 11,
      striped: false
    })
  })

  it('renders as idle', () => {
    const comp = shallow(<ProgressBar activeRequests={0} />)
    expect(comp.find('Progress').props()).toMatchObject({
      className: 'appProgressBar fixed',
      value: 100,
      striped: false
    })
  })

  it('renders as local', () => {
    const comp = shallow(<ProgressBar local activeRequests={0} />)
    expect(comp.find('Progress').props()).toMatchObject({
      className: 'appProgressBar',
      value: 100,
      striped: false
    })
  })
})
