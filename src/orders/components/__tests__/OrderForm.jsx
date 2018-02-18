import Form from 'reactstrap/lib/Form';
import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import OrderForm from '../OrderForm';

describe('OrderForm component', () => {
  it('renders workshop picker', () => {
    const comp = shallow(
      <OrderForm
        accomodation={[]}
        price={1200}
        errors={{}}
        form="order"
        meals={[
          {
            id: 1325,
            date: '2017-05-06',
            name: 'lunch',
          },
        ]}
        onChange={() => {}}
        onSubmit={() => {}}
        onMount={() => {}}
        onUnmount={() => {}}
        submitted={false}
        values={{
          accomodationInfo: true,
          workshop: 42,
        }}
        translate={msg => msg}
        workshops={[
          { id: 42, name: 'Longformy', capacityStatus: {}, lectors: [] },
          { id: 43, name: 'Hlasová průprava', capacityStatus: {}, lectors: [] },
        ]}
      />
    );
    expect(comp.find('WorkshopPicker')).toHaveLength(1);
  });

  it('renders meal picker', () => {
    const comp = shallow(
      <OrderForm
        accomodation={[]}
        price={1200}
        errors={{}}
        form="order"
        meals={[
          {
            id: 1325,
            date: '2017-05-06',
            name: 'lunch',
          },
        ]}
        onChange={() => {}}
        onSubmit={() => {}}
        onMount={() => {}}
        onUnmount={() => {}}
        submitted={false}
        values={{
          accomodationInfo: true,
          workshop: 42,
        }}
        translate={msg => msg}
        workshops={[
          { id: 42, name: 'Longformy', capacityStatus: {}, lectors: [] },
          { id: 43, name: 'Hlasová průprava', capacityStatus: {}, lectors: [] },
        ]}
      />
    );
    expect(comp.find('MealPicker')).toHaveLength(1);
  });

  it('renders accomodation picker', () => {
    const comp = shallow(
      <OrderForm
        accomodation={[]}
        price={1200}
        errors={{}}
        form="order"
        meals={[
          {
            id: 1325,
            date: '2017-05-06',
            name: 'lunch',
          },
        ]}
        onChange={() => {}}
        onSubmit={() => {}}
        onMount={() => {}}
        onUnmount={() => {}}
        submitted={false}
        values={{
          accomodationInfo: true,
          workshop: 42,
        }}
        translate={msg => msg}
        workshops={[
          { id: 42, name: 'Longformy', capacityStatus: {}, lectors: [] },
          { id: 43, name: 'Hlasová průprava', capacityStatus: {}, lectors: [] },
        ]}
      />
    );
    expect(comp.find('AccomodationPicker')).toHaveLength(1);
  });

  it('triggers onChange on workshop change', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <OrderForm
        accomodation={[]}
        meals={[]}
        errors={{}}
        form="order"
        onChange={changeSpy}
        onSubmit={() => {}}
        onMount={() => {}}
        onUnmount={() => {}}
        values={{
          workshop: 42,
        }}
        translate={msg => msg}
        workshops={[
          { id: 42, name: 'Longformy', capacityStatus: {}, lectors: [] },
          { id: 43, name: 'Hlasová průprava', capacityStatus: {}, lectors: [] },
        ]}
      />
    );

    comp.find('WorkshopPicker').simulate('change', 'workshop', 42);
    expect(changeSpy.args).toEqual([
      ['order', 'workshop', 42],
    ]);
  });

  it('triggers onSubmit on form submit', () => {
    const submitSpy = sinon.spy();
    const preventDefaultSpy = sinon.spy();
    const comp = shallow(
      <OrderForm
        accomodation={[]}
        meals={[]}
        errors={{}}
        form="order"
        onChange={() => {}}
        onSubmit={submitSpy}
        onMount={() => {}}
        onUnmount={() => {}}
        values={{
          workshop: 42,
        }}
        translate={msg => msg}
        workshops={[
          { id: 42, name: 'Longformy', capacityStatus: {}, lectors: [] },
          { id: 43, name: 'Hlasová průprava', capacityStatus: {}, lectors: [] },
        ]}
      />
    );

    comp.find(Form).simulate('submit', {
      preventDefault: preventDefaultSpy,
    });
    expect(submitSpy.args).toEqual([
      ['order'],
    ]);
    expect(preventDefaultSpy.calledOnce).toBe(true);
  });

  it('triggers onUnmount on component unmount', () => {
    const unmountSpy = sinon.spy();
    const comp = shallow(
      <OrderForm
        accomodation={[]}
        meals={[]}
        errors={{}}
        form="order"
        onChange={() => {}}
        onSubmit={() => {}}
        onMount={() => {}}
        onUnmount={unmountSpy}
        values={{
          workshop: 42,
        }}
        translate={msg => msg}
        workshops={[
          { id: 42, name: 'Longformy', capacityStatus: {}, lectors: [] },
          { id: 43, name: 'Hlasová průprava', capacityStatus: {}, lectors: [] },
        ]}
      />
    );

    comp.instance().componentWillUnmount();
    expect(unmountSpy.calledOnce).toBe(true);
  });
});
