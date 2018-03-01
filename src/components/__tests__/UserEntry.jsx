import React from 'react';

import { shallow } from 'enzyme';

import UserEntry from '../UserEntry';

describe('User Entry component', () => {
  it('renders login form', () => {
    const comp = shallow(
      <UserEntry
        login={{
          errors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          errors: {},
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    );
    expect(comp.find('Login')).toHaveLength(1);
  });

  it.skip('renders register form', () => {
    const comp = shallow(
      <UserEntry
        login={{
          errors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          errors: {},
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    );
    expect(comp.find('Signup')).toHaveLength(1);
  });

  it.skip('renders disabled when loading login form', () => {
    const comp = shallow(
      <UserEntry
        login={{
          loading: true,
          errors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          errors: {},
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    );
    expect(comp.find('Login')).toHaveProp('disabled', true);
  });

  it.skip('renders disabled when loading signup form', () => {
    const comp = shallow(
      <UserEntry
        login={{
          errors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          errors: {},
          loading: true,
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    );
    expect(comp.find('Signup')).toHaveProp('disabled', true);
  });
});
