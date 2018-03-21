import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import LoginForm from '../LoginForm';

describe('LoginForm component', () => {
  it('renders email input', () => {
    const comp = shallow(
      <LoginForm
        form="signup"
        submit={() => {}}
      />
    );
    expect(comp.find('[name="email"]')).toHaveLength(1);
  });

  it('renders password input', () => {
    const comp = shallow(
      <LoginForm
        form="signup"
        submit={() => {}}
      />
    );
    expect(comp.find('[name="email"]')).toHaveLength(1);
  });

  it('renders inputs disabled when form is disabled', () => {
    const comp = shallow(
      <LoginForm
        form="signup"
        submit={() => {}}
        disabled
      />
    );
    expect(comp.find('[name="email"]')).toHaveProp('disabled', true);
    expect(comp.find('[name="password"]')).toHaveProp('disabled', true);
  });

  it('triggers submit on form submit', () => {
    const submit = sinon.spy();
    const comp = shallow(
      <LoginForm
        form="signup"
        submit={submit}
      />
    );

    comp.simulate('submit');
    expect(submit.calledOnce).toBeTruthy();
  });
});
