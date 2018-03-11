import React from 'react';

import { shallow } from 'enzyme';

import OrderListItem from '../OrderListItem';

describe('OrderListItem component', () => {
  it('renders year number', () => {
    const comp = shallow(
      <OrderListItem
        order={{
          id: 457,
          symvar: '97233289732',
          endsAt: '2018-05-09',
          createdAt: '2017-04-09',
          price: 666,
          year: {
            year: '2017',
          },
          reservation: {
            endsAt: '2018-03-05T00:00:00',
          },
          meals: [
            {
              date: '2018-05-12',
              id: '10',
              name: 'dinner',
              price: 10,
            },
          ],
        }}
      />
    );
    expect(comp.find({ children: '2017' })).toHaveLength(1);
  });

  it('renders order number', () => {
    const comp = shallow(
      <OrderListItem
        order={{
          id: 457,
          symvar: '97233289732',
          endsAt: '2018-05-09',
          createdAt: '2017-04-09',
          price: 666,
          year: {
            year: '2017',
          },
          reservation: {
            endsAt: '2018-03-05T00:00:00',
          },
          meals: [
            {
              date: '2018-05-12',
              id: '10',
              name: 'dinner',
              price: 10,
            },
          ],
        }}
      />
    );
    expect(comp.find('Connect(Message)[name="orders.number"]')).toHaveProp('data', {
      symvar: '97233289732',
    });
  });
});
