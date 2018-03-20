import sinon from 'sinon';
import React from 'react';

import { shallow } from 'enzyme';

import FoodPicker from '../FoodPicker';

describe('FoodPicker component', () => {
  it('renders each meal as food picker item', () => {
    const comp = shallow(
      <FoodPicker
        name="food"
        meals={[
          {
            id: 10,
            name: 'lunch',
            food: [
              {
                id: 16,
                name: 'Řízek',
              },
            ],
            soups: [
              {
                id: 11,
                name: 'Květáková',
              },
            ],
            date: '2018-05-11',
          },
        ]}
        value={{
          10: {
            food: 16,
            soup: 11,
          },
        }}
        onChange={() => {}}
      />
    );
    expect(comp.find('FoodPickerItem').props()).toMatchObject({
      id: 10,
      name: 'lunch',
      food: [
        {
          id: 16,
          name: 'Řízek',
        },
      ],
      soups: [
        {
          id: 11,
          name: 'Květáková',
        },
      ],
      date: '2018-05-11',
      orderedFood: 16,
      orderedSoup: 11,
    });
  });

  it('triggers onChange with selected value', () => {
    const onChange = sinon.spy();
    const comp = shallow(
      <FoodPicker
        name="food"
        meals={[
          {
            id: 10,
            name: 'lunch',
            food: [
              {
                id: 16,
                name: 'Řízek',
              },
            ],
            soups: [
              {
                id: 11,
                name: 'Květáková',
              },
            ],
            date: '2018-05-11',
          },
        ]}
        value={{}}
        onChange={onChange}
      />
    );
    comp.find('FoodPickerItem').simulate('change', 10, {
      food: 16,
      soup: 11,
    });
    expect(onChange.getCall(0).args).toEqual([
      'food',
      {
        10: {
          food: 16,
          soup: 11,
        },
      },
    ]);
  });

  it('triggers onChange with replaced meal value', () => {
    const onChange = sinon.spy();
    const comp = shallow(
      <FoodPicker
        name="food"
        meals={[
          {
            id: 10,
            name: 'lunch',
            food: [
              {
                id: 16,
                name: 'Řízek',
              },
            ],
            soups: [
              {
                id: 11,
                name: 'Květáková',
              },
            ],
            date: '2018-05-11',
          },
        ]}
        value={{
          10: {
            food: null,
            soup: null,
          },
        }}
        onChange={onChange}
      />
    );
    comp.find('FoodPickerItem').simulate('change', 10, {
      food: 16,
      soup: 11,
    });
    expect(onChange.getCall(0).args).toEqual([
      'food',
      {
        10: {
          food: 16,
          soup: 11,
        },
      },
    ]);
  });

  it('triggers onChange with untouched other values', () => {
    const onChange = sinon.spy();
    const comp = shallow(
      <FoodPicker
        name="food"
        meals={[
          {
            id: 10,
            name: 'lunch',
            food: [
              {
                id: 16,
                name: 'Řízek',
              },
            ],
            soups: [
              {
                id: 11,
                name: 'Květáková',
              },
            ],
            date: '2018-05-11',
          },
          {
            id: 11,
            name: 'lunch',
            food: [
              {
                id: 17,
                name: 'Řízek',
              },
            ],
            soups: [
              {
                id: 12,
                name: 'Květáková',
              },
            ],
            date: '2018-05-11',
          },
        ]}
        value={{
          10: {
            food: 16,
            soup: 11,
          },
        }}
        onChange={onChange}
      />
    );
    comp.find('FoodPickerItem').at(1).simulate('change', 11, {
      food: 17,
      soup: 12,
    });
    expect(onChange.getCall(0).args).toEqual([
      'food',
      {
        10: {
          food: 16,
          soup: 11,
        },
        11: {
          food: 17,
          soup: 12,
        },
      },
    ]);
  });
});
