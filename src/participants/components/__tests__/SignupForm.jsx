import React from 'react';

import { shallow } from 'enzyme';

import SignupForm from '../SignupForm';

describe('SignupForm component', () => {
  it('renders name input', () => {
    const comp = shallow(
      <SignupForm
        translate={msg => msg}
        form="signupForm"
        submit={() => {}}
        teams={[]}
      />
    );
    expect(comp.find('[name="name"]')).toHaveLength(1);
  });

  it('renders email input', () => {
    const comp = shallow(
      <SignupForm
        translate={msg => msg}
        form="signupForm"
        submit={() => {}}
        teams={[]}
      />
    );
    expect(comp.find('[name="email"]')).toHaveLength(1);
  });

  it('renders phone input', () => {
    const comp = shallow(
      <SignupForm
        translate={msg => msg}
        form="signupForm"
        submit={() => {}}
        teams={[]}
      />
    );
    expect(comp.find('[name="phone"]')).toHaveLength(1);
  });

  it('renders birthday input', () => {
    const comp = shallow(
      <SignupForm
        translate={msg => msg}
        form="signupForm"
        submit={() => {}}
        teams={[]}
      />
    );
    expect(comp.find('[name="birthday"]')).toHaveLength(1);
  });

  it('renders password input', () => {
    const comp = shallow(
      <SignupForm
        translate={msg => msg}
        form="signupForm"
        submit={() => {}}
        teams={[]}
      />
    );
    expect(comp.find('[name="password"]')).toHaveLength(1);
  });

  it('renders team name input', () => {
    const comp = shallow(
      <SignupForm
        translate={msg => msg}
        form="signupForm"
        submit={() => {}}
        teams={[]}
      />
    );
    expect(comp.find('[name="team_name"]')).toHaveLength(1);
  });

  it('renders all inputs disabled when form is disabled', () => {
    const comp = shallow(
      <SignupForm
        translate={msg => msg}
        form="signupForm"
        submit={() => {}}
        teams={[]}
        disabled
      />
    );
    expect(comp.find('Field').every('[disabled]')).toBeTruthy();
    expect(comp.find('Button').every('[disabled]')).toBeTruthy();
  });
});
