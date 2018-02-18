import React from 'react';

import { shallow } from 'enzyme';

import OrderStatusLabel from '../OrderStatusLabel';

describe('OrderStatusLabel component', () => {
  it('renders unconfirmed message when order is not canceled, not assigned, not paid and not confirmed', () => {
    const comp = shallow(
      <OrderStatusLabel endsAt="2017-01-01T01:01:01Z" translate={msg => msg} />
    );
    expect(comp.find({
      children: 'orders.unconfirmed',
    })).toHaveLength(1);
  });

  it('renders timeout message when order is not canceled, not assigned, not paid and not confirmed', () => {
    const comp = shallow(
      <OrderStatusLabel endsAt="2017-01-01T01:01:01Z" translate={msg => msg} />
    );
    expect(comp.find('OrderTimeout')).toHaveLength(1);
  });

  it('renders waiting to be paid message when order is confirmed, not canceled, not assigned and not paid', () => {
    const comp = shallow(
      <OrderStatusLabel
        confirmed
        endsAt="2017-01-01T01:01:01Z"
        translate={msg => msg}
      />
    );
    expect(comp.find({
      children: 'orders.waitingToBePaid',
    })).toHaveLength(1);
  });

  it('renders timeout when order is confirmed, not canceled, not assigned and not paid', () => {
    const comp = shallow(
      <OrderStatusLabel
        confirmed
        endsAt="2017-01-01T01:01:01Z"
        translate={msg => msg}
      />
    );
    expect(comp.find('OrderTimeout')).toHaveLength(1);
  });

  it('renders waiting to be assigned when order is paid, not canceled and not assigned', () => {
    const comp = shallow(
      <OrderStatusLabel
        paid
        endsAt="2017-01-01T01:01:01Z"
        translate={msg => msg}
      />
    );
    expect(comp.find({
      children: 'waitingToBeAssigned',
    }));
  });

  it('renders assigned message when order is assigned and not canceled', () => {
    const comp = shallow(
      <OrderStatusLabel
        assigned
        endsAt="2017-01-01T01:01:01Z"
        translate={msg => msg}
      />
    );
    expect(comp.find({
      children: 'orders.assigned',
    })).toHaveLength(1);
  });

  it('renders canceled message when order is canceled', () => {
    const comp = shallow(
      <OrderStatusLabel
        canceled
        endsAt="2017-01-01T01:01:01Z"
        translate={msg => msg}
      />
    );
    expect(comp.find({
      children: 'orders.canceled',
    })).toHaveLength(1);
  });
});
