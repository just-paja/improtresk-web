import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import PaymentDetails from '../../../../src/web/components/order/paymentDetails';
import Price from '../../../../src/web/components/price';
import Prop from '../../../../src/web/components/prop';

describe('PaymentDetails component', () => {
  it('renders', () => {
    expect(shallow(
      <PaymentDetails
        price={700}
        symvar="78934539"
      />
    ).node).to.eql(
      <ul className="list-unstyled">
        <Prop icon="bank" label="Číslo účtu">
          2800754192/2010
        </Prop>
        <Prop icon="money" label="Částka k zaplacení">
          <Price price={700} />
        </Prop>
        <Prop icon="key" label="Variabilní symbol">78934539</Prop>
      </ul>
    );
  });
});
