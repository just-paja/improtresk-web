import React from 'react';

import { shallow } from 'enzyme';

import OrderPaymentStatus from '../OrderPaymentStatus';

describe('OrderPaymentStatus component', () => {
  it('renders not paid message when not paid', () => {
    const comp = shallow(<OrderPaymentStatus />);
    expect(comp.find('Connect(Message)[name="orders.unpaid"]')).toHaveLength(1);
  });

  it('renders paid message', () => {
    const comp = shallow(<OrderPaymentStatus paid />);
    expect(comp.find('Connect(Message)[name="orders.paid"]')).toHaveLength(1);
  });

  it('renders overpaid message', () => {
    const comp = shallow(<OrderPaymentStatus overPaid />);
    expect(comp.find('Connect(Message)[name="orders.overpaid"]')).toHaveLength(1);
  });

  it('renders canceled', () => {
    const comp = shallow(<OrderPaymentStatus canceled />);
    expect(comp.find('Connect(Message)[name="orders.paymentCanceled"]')).toHaveLength(1);
  });
});
