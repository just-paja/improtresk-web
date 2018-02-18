import React from 'react';

import { shallow } from 'enzyme';

import OrderedMeal from '../OrderedMeal';

describe('OrderedMeal component', () => {
  it('renders date', () => {
    const comp = shallow(
      <OrderedMeal
        name="lunch"
        date="2016-01-02"
        soup="Květáková"
        food="Svíčková"
        translate={msg => msg}
      />
    );
    expect(comp.find('HumanDate')).toHaveProp('date', '2016-01-02');
  });

  it('renders soup', () => {
    const comp = shallow(
      <OrderedMeal
        name="lunch"
        date="2016-01-02"
        soup="Květáková"
        food="Svíčková"
        translate={msg => msg}
      />
    );
    expect(comp.find('FoodChoice').filter({ foodName: 'Květáková' })).toHaveLength(1);
  });

  it('renders main course', () => {
    const comp = shallow(
      <OrderedMeal
        name="lunch"
        date="2016-01-02"
        soup="Květáková"
        food="Svíčková"
        translate={msg => msg}
      />
    );
    expect(comp.find('FoodChoice').filter({ foodName: 'Svíčková' })).toHaveLength(1);
  });
});
