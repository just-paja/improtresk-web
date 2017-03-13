import Alert from 'react-bootstrap/lib/Alert';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import OrderPaymentStatus from '../../../src/web/components/orderPaymentStatus';

describe('OrderPaymentStatus component', () => {
  it('renders not paid message', () => {
    expect(shallow(<OrderPaymentStatus />).node).to.eql(
      <Alert bsStyle="danger">Nezaplaceno</Alert>
    );
  });
  it('renders paid message', () => {
    expect(shallow(<OrderPaymentStatus paid />).node).to.eql(
      <Alert bsStyle="success">Zaplaceno</Alert>
    );
  });
  it('renders overpaid message', () => {
    expect(shallow(<OrderPaymentStatus overPaid />).node).to.eql(
      <Alert bsStyle="success">Přeplatek!</Alert>
    );
  });
  it('renders canceled', () => {
    expect(shallow(<OrderPaymentStatus canceled />).node).to.eql(
      <Alert bsStyle="info">Zrušeno</Alert>
    );
  });
});
