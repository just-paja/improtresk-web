import React from 'react'

import { shallow } from 'enzyme'

import SignupOpenDateUnsure from '../SignupOpenDateUnsure'

describe('SignupOpenDateUnsure component', () => {
  it('renders unsure message', () => {
    const comp = shallow(<SignupOpenDateUnsure />)
    expect(comp.find('Connect(Message)[name="participants.signupOpenDateUnsure"]')).toHaveLength(1)
  })
})
