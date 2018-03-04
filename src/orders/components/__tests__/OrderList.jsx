import React from 'react';

import { shallow } from 'enzyme';

import OrderList from '../OrderList';

describe('OrderList component', () => {
  it('renders list of order list items', () => {
    const comp = shallow(
      <OrderList
        orders={[
          {
            id: 457,
            symvar: '897233289732',
            endsAt: '2018-05-09',
            createdAt: '2018-05-09',
            price: 666,
            meals: [
              {
                date: '2018-05-12',
                id: '10',
                name: 'dinner',
                price: 10,
              },
            ],
          },
        ]}
      />
    );
    expect(comp.find('OrderListItem')).toHaveProp('price', 666);
  });
});
