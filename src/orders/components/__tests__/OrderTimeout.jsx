import React from 'react';

import { shallow } from 'enzyme';

import OrderTimeout from '../OrderTimeout';

describe('OrderTimeout component', () => {
  it('renders countdown', () => {
    const comp = shallow(
      <OrderTimeout endsAt="2017-01-01T01:01:01Z" translate={msg => msg} />
    );
    expect(comp.find('Countdown')).toHaveLength(1);
  });

  it('renders countdown message', () => {
    const comp = shallow(
      <OrderTimeout endsAt="2017-01-01T01:01:01Z" translate={msg => msg} />
    );
    expect(comp.find('Countdown')).toHaveProp('countdownMessage', 'orders.expiresIn');
  });
});
