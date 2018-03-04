import React from 'react';

import { shallow } from 'enzyme';

import OrderListItem from '../OrderListItem';

describe('OrderListItem component', () => {
  it('renders price', () => {
    const comp = shallow(
      <OrderListItem
        id={457}
        symvar="97233289732"
        endsAt="2018-05-09"
        createdAt="2017-04-09"
        price={666}
        meals={[
          {
            date: '2018-05-12',
            id: '10',
            name: 'dinner',
            price: 10,
          },
        ]}
      />
    );
    expect(comp.find('Price')).toHaveProp('price', 666);
  });

  it('renders date created', () => {
    const comp = shallow(
      <OrderListItem
        id={457}
        symvar="97233289732"
        endsAt="2017-05-09"
        createdAt="2017-04-09"
        price={666}
        year="2017"
        meals={[
          {
            date: '2018-05-12',
            id: '10',
            name: 'dinner',
            price: 10,
          },
        ]}
      />
    );
    expect(comp.find('HumanDate')).toHaveProp('date', '2017-04-09');
  });
});
