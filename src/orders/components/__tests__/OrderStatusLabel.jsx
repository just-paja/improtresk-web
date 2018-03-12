import moment from 'moment-timezone';
import sinon from 'sinon';
import React from 'react';

import { shallow } from 'enzyme';

import OrderStatusLabel from '../OrderStatusLabel';

describe('OrderStatusLabel component', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers(moment('2016-12-23T12:12:12'));
  });

  afterEach(() => {
    clock.restore();
  });

  it('renders unconfirmed message when order is not cancelled, not assigned, not paid and not confirmed', () => {
    const comp = shallow(
      <OrderStatusLabel endsAt="2017-01-01T01:01:01Z" translate={msg => msg} />
    );
    expect(comp.find('Connect(Message)[name="orders.unconfirmed"]')).toHaveLength(1);
  });

  it('renders waiting to be paid message when order is confirmed, not cancelled, not assigned and not paid', () => {
    const comp = shallow(
      <OrderStatusLabel
        confirmed
        endsAt="2017-01-01T01:01:01Z"
        translate={msg => msg}
      />
    );
    expect(comp.find('Connect(Message)[name="orders.waitingToBePaid"]')).toHaveLength(1);
  });

  it('renders waiting to be assigned when order is paid, not cancelled and not assigned', () => {
    const comp = shallow(
      <OrderStatusLabel
        paid
        endsAt="2017-01-01T01:01:01Z"
        translate={msg => msg}
      />
    );
    expect(comp.find('Connect(Message)[name="orders.waitingToBeAssigned"]'));
  });

  it('renders assigned message when order is assigned and not cancelled', () => {
    const comp = shallow(
      <OrderStatusLabel
        assigned
        endsAt="2017-01-01T01:01:01Z"
        translate={msg => msg}
      />
    );
    expect(comp.find('Connect(Message)[name="orders.assigned"]')).toHaveLength(1);
  });

  it('renders cancelled message when order is cancelled', () => {
    const comp = shallow(
      <OrderStatusLabel
        cancelled
        endsAt="2017-01-01T01:01:01Z"
        translate={msg => msg}
      />
    );
    expect(comp.find('Connect(Message)[name="orders.cancelled"]')).toHaveLength(1);
  });
});
