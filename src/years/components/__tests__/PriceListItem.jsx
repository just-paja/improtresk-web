import React from 'react';

import { shallow } from 'enzyme';

import PriceListItem from '../PriceListItem';

describe('PriceListItem component', () => {
  it('renders from date', () => {
    const comp = shallow(
      <PriceListItem
        endsOn="2016-01-05"
        name="Zlevněná"
        price={1200}
        takesEffectOn="2016-01-02"
      />
    );
    expect(comp.find('HumanDate[date="2016-01-02"]')).toHaveLength(1);
  });

  it('renders to date', () => {
    const comp = shallow(
      <PriceListItem
        endsOn="2016-01-05"
        name="Zlevněná"
        price={1200}
        takesEffectOn="2016-01-02"
      />
    );
    expect(comp.find('HumanDate[date="2016-01-05"]')).toHaveLength(1);
  });

  it('renders price', () => {
    const comp = shallow(
      <PriceListItem
        endsOn="2016-01-05"
        name="Zlevněná"
        price={1200}
        takesEffectOn="2016-01-02"
      />
    );
    expect(comp.find('Price')).toHaveProp('price', 1200);
  });

  it('renders without to date given end date was not passed', () => {
    const comp = shallow(
      <PriceListItem
        name="Zlevněná"
        price={1500}
        takesEffectOn="2016-01-06"
      />
    );
    expect(comp.find('HumanDate')).toHaveLength(1);
  });
});
