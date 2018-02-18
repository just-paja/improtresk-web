import moment from 'moment-timezone';
import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import SignupButton from '../SignupButton';

describe('Signup Button component', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers(new Date(2016, 1, 2, 1, 0, 0));
    moment.tz.setDefault('UTC');
  });

  afterEach(() => {
    clock.restore();
  });

  it('renders will open message before signing up is active', () => {
    const comp = shallow(
      <SignupButton
        endAt="2016-05-06"
        startAt="2016-03-01"
        translate={msg => msg}
      />
    );
    expect(comp.find('Connect(Message)[name="participants.signupsWillOpen"]')).toHaveLength(1);
  });

  it('renders disabled when all places are taken', () => {
    const comp = shallow(
      <SignupButton
        alreadyFull
        endAt="2016-05-06"
        startAt="2016-01-01"
        translate={msg => msg}
      />
    );
    expect(comp.find('Connect(Message)[name="participants.signupsAlreadyFull"]')).toHaveLength(1);
  });

  it('renders disabled when signing up is closed', () => {
    const comp = shallow(
      <SignupButton
        endAt="2016-01-10"
        startAt="2016-01-01"
        translate={msg => msg}
      />
    );
    expect(comp.find('Connect(Message)[name="participants.signupsAlreadyClosed"]')).toHaveLength(1);
  });

  it('renders sign up message signing up is active', () => {
    const comp = shallow(
      <SignupButton
        endAt="2016-05-10"
        startAt="2016-01-01"
        translate={msg => msg}
      />
    );
    expect(comp.find('Connect(Message)[name="participants.signupToFestival"]')).toHaveLength(1);
  });

  it('renders empty without start date', () => {
    expect(shallow(<SignupButton translate={msg => msg} />).getElement()).toEqual(null);
  });
});
