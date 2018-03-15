import React from 'react';

import { shallow } from 'enzyme';

import MealList from '../MealList';

describe('MealList component', () => {
  it('renders food menu for each meal', () => {
    const comp = shallow(
      <MealList
        mealList={[
          {
            id: 10,
            date: '2018-05-11',
            food: [
              {
                id: 1,
                name: 'Svíčková',
              },
            ],
            soups: [
              {
                id: 11,
                name: 'Květáková',
              },
            ],
            name: 'lunch',
          },
        ]}
      />
    );
    expect(comp.find('FoodMenu').props()).toMatchObject({
      id: 10,
      date: '2018-05-11',
      food: [
        {
          id: 1,
          name: 'Svíčková',
        },
      ],
      soups: [
        {
          id: 11,
          name: 'Květáková',
        },
      ],
      name: 'lunch',
    });
  });

  it('renders empty message when there are no meals', () => {
    const comp = shallow(
      <MealList
        mealList={[]}
      />
    );
    expect(comp.find('Connect(Message)[name="food.festivalMenuEmpty"]'))
      .toHaveLength(1);
  });
});
