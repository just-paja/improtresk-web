import React from 'react';

import { shallow } from 'enzyme';

import FoodSummary from '../FoodSummary';

describe('FoodSummary component', () => {
  it('renders passed ordered meals', () => {
    const comp = shallow(
      <FoodSummary
        meals={[
          {
            id: 616,
            name: 'lunch',
            date: '2016-01-02',
            orderedSoup: { name: 'Květáková' },
            orderedFood: { name: 'Svíčková' },
          },
        ]}
        translate={msg => msg}
      />
    );
    expect(comp.find('OrderedMeal').props()).toMatchObject({
      name: 'lunch',
      date: '2016-01-02',
      soup: 'Květáková',
      food: 'Svíčková',
    });
  });

  it('renders ordered meal without selcted main course', () => {
    const comp = shallow(
      <FoodSummary
        meals={[
          {
            id: 616,
            name: 'lunch',
            date: '2016-01-02',
            orderedSoup: { name: 'Květáková' },
          },
        ]}
        translate={msg => msg}
      />
    );
    expect(comp.find('OrderedMeal').props()).toMatchObject({
      name: 'lunch',
      date: '2016-01-02',
      soup: 'Květáková',
      food: null,
    });
  });

  it('renders ordered meal without selected soup', () => {
    const comp = shallow(
      <FoodSummary
        meals={[
          {
            id: 616,
            name: 'lunch',
            date: '2016-01-02',
            orderedFood: { name: 'Svíčková' },
          },
        ]}
        translate={msg => msg}
      />
    );
    expect(comp.find('OrderedMeal').props()).toMatchObject({
      name: 'lunch',
      date: '2016-01-02',
      soup: null,
      food: 'Svíčková',
    });
  });
});
