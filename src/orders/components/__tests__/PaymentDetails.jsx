import React from 'react';

import { shallow } from 'enzyme';

import PaymentDetails from '../PaymentDetails';

describe('PaymentDetails component', () => {
  it('renders static account number', () => {
    const comp = shallow(
      <PaymentDetails
        price={700}
        symvar="78934539"
        translate={msg => msg}
      />
    );
    expect(comp.find({
      children: '2800754192/2010',
    })).toHaveLength(1);
  });
});
