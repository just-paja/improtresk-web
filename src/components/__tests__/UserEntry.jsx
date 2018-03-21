import React from 'react';

import { shallow } from 'enzyme';

import UserEntry from '../UserEntry';

describe('User Entry component', () => {
  it('renders login form', () => {
    const comp = shallow(<UserEntry />);
    expect(comp.find('Connect(ReduxForm)')).toHaveLength(1);
  });

  it('renders register form when user clicks the register button', () => {
    const comp = shallow(<UserEntry />);
    comp.find('Button').simulate('click');
    expect(comp.find('Connect(ReduxForm(SignupForm))')).toHaveLength(1);
  });
});
