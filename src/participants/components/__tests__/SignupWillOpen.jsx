import moment from 'moment-timezone'
import React from 'react'

import { shallow } from 'enzyme'

import SignupWillOpen from '../SignupWillOpen'

describe('SignupWillOpen component', () => {
  beforeEach(() => {
    moment.locale('en_US')
  })

  it('renders will open message with date', () => {
    const comp = shallow(<SignupWillOpen signupsOpenDate='2017-05-12T05:30:00' />)
    expect(comp.find('Connect(Message)[name="participants.signupOpenDateExact"]')).toHaveProp('data', {
      date: 'May 12, 2017 5:30 AM'
    })
  })
})
