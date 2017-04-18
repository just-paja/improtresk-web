import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import OrderedMeal from '../../../../src/web/components/order/orderedMeal';
import FoodSummary from '../../../../src/web/components/order/foodSummary';

describe('FoodSummary component', () => {
  it('renders', () => {
    expect(shallow(
      <FoodSummary
        meals={[
          {
            name: 'lunch',
            date: '2016-01-02',
            soup: { name: 'Květáková' },
            food: { name: 'Svíčková' },
          },
          {
            name: 'dinner',
            date: '2016-01-02',
            food: { name: 'Svíčková' },
          },
        ]}
      />
    ).node).to.eql(
      <div>
        <OrderedMeal
          name="lunch"
          date="2016-01-02"
          soup="Květáková"
          food="Svíčková"
        />
        <OrderedMeal
          name="dinner"
          date="2016-01-02"
          food="Svíčková"
        />
      </div>
    );
  });
});
