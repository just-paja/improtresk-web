import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import OrderForm from '../OrderForm';

describe('OrderForm component', () => {
  it('renders workshop picker', () => {
    const comp = shallow(
      <OrderForm
        year={{ id: 3, year: '2017', startDate: '2017-03-04', endDate: '2017-03-05' }}
        accomodation={[]}
        price={1200}
        form="order"
        meals={[
          {
            id: 1325,
            date: '2017-05-06',
            name: 'lunch',
          },
        ]}
        submit={() => {}}
        workshops={[
          { id: 42, name: 'Longformy', capacityStatus: {}, lectors: [] },
          { id: 43, name: 'Hlasová průprava', capacityStatus: {}, lectors: [] },
        ]}
      />
    );
    expect(comp.find('[name="workshop"]')).toHaveLength(1);
  });

  it('renders meal picker', () => {
    const comp = shallow(
      <OrderForm
        year={{ id: 3, year: '2017', startDate: '2017-03-04', endDate: '2017-03-05' }}
        accomodation={[]}
        price={1200}
        form="order"
        meals={[
          {
            id: 1325,
            date: '2017-05-06',
            name: 'lunch',
          },
        ]}
        submit={() => {}}
        submitted={false}
        workshops={[
          { id: 42, name: 'Longformy', capacityStatus: {}, lectors: [] },
          { id: 43, name: 'Hlasová průprava', capacityStatus: {}, lectors: [] },
        ]}
      />
    );
    expect(comp.find('[name="meals"]')).toHaveLength(1);
  });

  it('renders accomodation picker', () => {
    const comp = shallow(
      <OrderForm
        year={{ id: 3, year: '2017', startDate: '2017-03-04', endDate: '2017-03-05' }}
        accomodation={[]}
        price={1200}
        form="order"
        meals={[
          {
            id: 1325,
            date: '2017-05-06',
            name: 'lunch',
          },
        ]}
        submit={() => {}}
        workshops={[
          { id: 42, name: 'Longformy', capacityStatus: {}, lectors: [] },
          { id: 43, name: 'Hlasová průprava', capacityStatus: {}, lectors: [] },
        ]}
      />
    );
    expect(comp.find('[name="accomodation"]')).toHaveLength(1);
  });

  it('triggers submit on form submit', () => {
    const submitSpy = sinon.spy();
    const comp = shallow(
      <OrderForm
        year={{ id: 3, year: '2017', startDate: '2017-03-04', endDate: '2017-03-05' }}
        accomodation={[]}
        meals={[]}
        form="order"
        submit={submitSpy}
        workshops={[
          { id: 42, name: 'Longformy', capacityStatus: {}, lectors: [] },
          { id: 43, name: 'Hlasová průprava', capacityStatus: {}, lectors: [] },
        ]}
      />
    );
    comp.find('Form').simulate('submit');
    expect(submitSpy.calledOnce).toBeTruthy();
  });
});
