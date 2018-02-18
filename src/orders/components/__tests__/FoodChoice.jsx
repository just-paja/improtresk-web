import React from 'react';

import { shallow } from 'enzyme';

import FoodChoice from '../FoodChoice';

describe('FoodChoice component', () => {
  it('renders selected food name', () => {
    const comp = shallow(
      <FoodChoice foodName="Svíčková" translate={msg => msg} />
    );
    expect(comp.find({
      children: 'Svíčková',
    })).toHaveLength(1);
  });

  it('renders default food when given no choice and picking food is disabled', () => {
    const comp = shallow(<FoodChoice translate={msg => msg} useDefault />);
    expect(comp.find({ children: 'orders.defaultFood' })).toHaveLength(1);
  });

  it('renders default food when given no choice and picking food is enabled', () => {
    const comp = shallow(<FoodChoice translate={msg => msg} />);
    expect(comp.find({ children: 'orders.foodNotSelected' })).toHaveLength(1);
  });
});
