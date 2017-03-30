import Label from 'react-bootstrap/lib/Label';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import OrderStatus from '../../../../src/web/components/order/status';
import OrderTimeout from '../../../../src/web/components/order/timeout';

describe('OrderStatus component', () => {
  it('renders default message', () => {
    expect(shallow(
      <OrderStatus endsAt="2017-01-01T01:01:01Z" />
    ).node).to.eql(
      <span>
        <Label bsStyle="danger">Nepotvrzeno</Label>
        {' '}
        <OrderTimeout endsAt="2017-01-01T01:01:01Z" />
      </span>
    );
  });
  it('renders confirmed message', () => {
    expect(shallow(
      <OrderStatus
        confirmed
        endsAt="2017-01-01T01:01:01Z"
      />
    ).node).to.eql(
      <span>
        <Label bsStyle="warning">Potvrzeno uživatelem</Label>
        <span>
          {' '}
          <OrderTimeout endsAt="2017-01-01T01:01:01Z" />
        </span>
      </span>
    );
  });
  it('renders paid message', () => {
    expect(shallow(
      <OrderStatus
        paid
        endsAt="2017-01-01T01:01:01Z"
      />
    ).node).to.eql(
      <Label bsStyle="info">Zaplaceno, čeká na zařazení</Label>
    );
  });
  it('renders assigned message', () => {
    expect(shallow(
      <OrderStatus
        assigned
        endsAt="2017-01-01T01:01:01Z"
      />
    ).node).to.eql(
      <Label bsStyle="success">Zařazeno na workshop</Label>
    );
  });
  it('renders canceled message', () => {
    expect(shallow(
      <OrderStatus
        canceled
        endsAt="2017-01-01T01:01:01Z"
      />
    ).node).to.eql(
      <Label bsStyle="danger">Zrušeno uživatelem</Label>
    );
  });
});
