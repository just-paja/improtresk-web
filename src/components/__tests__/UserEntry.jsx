import React from 'react';

import { shallow } from 'enzyme';

import UserEntry from '../UserEntry';

describe('User Entry component', () => {
  it('renders login form', () => {
    const comp = shallow(
      <UserEntry
        login={{
          fieldErrors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          fieldErrors: {},
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    );
    expect(comp.find('Login')).toHaveLength(1);
  });

  it('renders register form when user clicks the register button', () => {
    const comp = shallow(
      <UserEntry
        login={{
          fieldErrors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          fieldErrors: {},
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    );
    comp.find('Button').simulate('click');
    expect(comp.find('Signup')).toHaveLength(1);
  });

  it('renders login form disabled when loading', () => {
    const comp = shallow(
      <UserEntry
        login={{
          loading: true,
          fieldErrors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          fieldErrors: {},
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    );
    expect(comp.find('Login')).toHaveProp('disabled', true);
  });

  it('renders register button disabled when loading', () => {
    const comp = shallow(
      <UserEntry
        login={{
          loading: true,
          fieldErrors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          fieldErrors: {},
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    );
    expect(comp.find('Button')).toHaveProp('disabled', true);
  });

  it('renders signup form disabled when loading', () => {
    const comp = shallow(
      <UserEntry
        login={{
          fieldErrors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          fieldErrors: {},
          loading: true,
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    );
    comp.find('Button').simulate('click');
    expect(comp.find('Signup')).toHaveProp('disabled', true);
  });

  it('renders login button disabled when loading', () => {
    const comp = shallow(
      <UserEntry
        login={{
          fieldErrors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          fieldErrors: {},
          loading: true,
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    );
    comp.find('Button').simulate('click');
    expect(comp.find('Button')).toHaveProp('disabled', true);
  });
});
