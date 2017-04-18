import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import OrderedMeal from '../../../../src/web/components/order/orderedMeal';
import HumanDate from '../../../../src/web/components/humanDate';

describe('OrderedMeal component', () => {
  it('renders', () => {
    expect(shallow(
      <OrderedMeal
        name="lunch"
        date="2016-01-02"
        soup="Květáková"
        food="Svíčková"
      />
    ).node).to.eql(
      <div>
        <strong>Oběd <HumanDate date="2016-01-02" /></strong>
        <div>Polévka: Květáková</div>
        <div>Hlavní chod: Svíčková</div>
      </div>
    );
  });
});
