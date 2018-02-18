import React from 'react';

import { shallow } from 'enzyme';

import OrderPaymentStatus from '../OrderPaymentStatus';

describe('OrderPaymentStatus component', () => {
  it('renders not paid message when not paid', () => {
    const comp = shallow(<OrderPaymentStatus translate={msg => msg} />);
    expect(comp.find({
      children: 'orders.unpaid',
    })).toHaveLength(1);
  });

  it('renders paid message', () => {
    const comp = shallow(<OrderPaymentStatus paid translate={msg => msg} />);
    expect(comp.find({
      children: 'orders.paid',
    })).toHaveLength(1);
  });

  it('renders overpaid message', () => {
    const comp = shallow(<OrderPaymentStatus overPaid translate={msg => msg} />);
    expect(comp.find({
      children: ['orders.overpaid', '!'],
    })).toHaveLength(1);
  });

  it('renders canceled', () => {
    const comp = shallow(<OrderPaymentStatus canceled translate={msg => msg} />);
    expect(comp.find({
      children: 'orders.paymentCanceled',
    })).toHaveLength(1);
  });
});
