import React from 'react'

import { shallow } from 'enzyme'

import YearDetail from '../YearDetail'

describe('Year Detail component', () => {
  it('renders year title', () => {
    const comp = shallow(
      <YearDetail
        current
        endDate='2019-05-09'
        startDate='2019-05-06'
        startSignupsAt='2019-03-01T00:00:00'
        topic='Porno je taky improvizace'
        year='2019'
      />
    )
    expect(comp.find('h1')).toIncludeText('Improtřesk 2019')
  })

  it('renders year topic', () => {
    const comp = shallow(
      <YearDetail
        current
        endDate='2019-05-09'
        startDate='2019-05-06'
        startSignupsAt='2019-03-01T00:00:00'
        topic='Porno je taky improvizace'
        year='2019'
      />
    )
    expect(comp.find('h1')).toIncludeText('Porno je taky improvizace')
  })

  it('renders without signup button when year is not current', () => {
    const comp = shallow(
      <YearDetail
        endDate='2019-05-09'
        startDate='2019-05-06'
        startSignupsAt='2019-03-01T00:00:00'
        topic='Porno je taky improvizace'
        year='2019'
      />
    )
    expect(comp.find('SignupButton')).toHaveLength(0)
  })
})
