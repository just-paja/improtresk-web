import React from 'react';
import moment from 'moment-timezone';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import RegistrationStatus from '../RegistrationStatus';

describe('RegistrationStatus component', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers(moment('2017-05-09T00:00:00').toDate());
  });

  afterEach(() => {
    clock.restore();
  });

  it('renders registration button when user has no order and registrations are still open', () => {
    const comp = shallow(
      <RegistrationStatus
        registrationsCloseDate="2017-05-09T00:00:01"
        activeOrder={null}
      />
    );
    expect(comp.find('RegisterButton')).toHaveLength(1);
  });

  it('does not render registration button when user has no order and registrations are closed', () => {
    const comp = shallow(
      <RegistrationStatus
        registrationsCloseDate="2017-05-09T00:00:00"
        activeOrder={null}
      />
    );
    expect(comp.find('RegisterButton')).toHaveLength(0);
  });

  it('renders registrations countdown when user has no order', () => {
    const comp = shallow(
      <RegistrationStatus
        registrationsCloseDate="2017-05-09T00:00:01"
        activeOrder={null}
      />
    );
    expect(comp.find('Connect(SignupCountdown)')).toHaveLength(1);
  });

  it('renders registration details when user has an active order', () => {
    const comp = shallow(
      <RegistrationStatus
        registrationsCloseDate="2017-05-09"
        activeOrder={{
          id: 501,
          createdAt: '2017-04-09',
          endsAt: '2017-05-09',
          meals: [],
          price: 320,
          symvar: '3454345',
        }}
      />
    );
    expect(comp.find('RegistrationDetails')).toHaveLength(1);
  });
});