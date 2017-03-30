import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Header from '../../../../src/web/components/order/header';
import HumanDate from '../../../../src/web/components/humanDate';
import Meal from '../../../../src/web/components/meal';
import Prop from '../../../../src/web/components/prop';
import Status from '../../../../src/web/components/order/status';

describe('Header component', () => {
  it('renders', () => {
    expect(shallow(
      <Header
        accomodation={{ name: 'Accomodation foo' }}
        assigned
        confirmed
        canceled
        endsAt="2017-01-01T01:01:01Z"
        meals={[
          {
            id: 1,
            name: 'Meal foo',
            date: '2015-01-02',
          },
        ]}
        paid
        workshop={{
          id: 1,
          name: 'Workshop foo',
          lectors: [],
        }}
        year={{
          id: 1,
          startDate: '2017-01-01T01:01:01Z',
        }}
      />
    ).node).to.eql(
      <ul className="list-unstyled">
        <Prop label="Stav">
          <Status
            assigned
            confirmed
            canceled
            paid
            endsAt="2017-01-01T01:01:01Z"
          />
        </Prop>
        <Prop label="Workshop">Workshop foo</Prop>
        <Prop label="Datum">
          <HumanDate date="2017-01-01T01:01:01Z" />
        </Prop>
        <Prop label="Jídlo">
          <Meal name="Meal foo" date="2015-01-02" />
        </Prop>
        <Prop label="Ubytování">
          Accomodation foo
        </Prop>
      </ul>
    );
  });
  it('renders without data', () => {
    expect(shallow(
      <Header
        endsAt="2017-01-01T01:01:01Z"
        meals={[]}
      />
    ).node).to.eql(
      <ul className="list-unstyled">
        <Prop label="Stav">
          <Status endsAt="2017-01-01T01:01:01Z" />
        </Prop>
        <Prop label="Workshop" />
        <Prop label="Datum" />
        <Prop label="Jídlo" />
        <Prop label="Ubytování" />
      </ul>
    );
  });
});
