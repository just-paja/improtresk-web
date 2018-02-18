import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import WorkshopPicker from '../WorkshopPicker';

describe('WorkshopPicker component', () => {
  it('renders picker items', () => {
    const comp = shallow((
      <WorkshopPicker
        name="workshop"
        onChange={() => {}}
        value={21}
        workshops={[
          {
            id: 21,
            lectors: [],
            name: 'Longformy',
            capacityStatus: {
              assigned: 2,
              capacity: 12,
              freeSpots: 7,
              reserved: 3,
            },
          },
          {
            id: 32,
            lectors: [],
            name: 'Kontaktní improvizace',
            capacityStatus: {
              assigned: 0,
              capacity: 19,
              freeSpots: 19,
              reserved: 0,
            },
          },
        ]}
      />
    ));
    expect(comp.find('WorkshopPickerItem')).toHaveLength(2);
  });

  it('renders selected picker items', () => {
    const comp = shallow((
      <WorkshopPicker
        name="workshop"
        onChange={() => {}}
        value={21}
        workshops={[
          {
            id: 21,
            lectors: [],
            name: 'Longformy',
            capacityStatus: {
              assigned: 2,
              capacity: 12,
              freeSpots: 7,
              reserved: 3,
            },
          },
          {
            id: 32,
            lectors: [],
            name: 'Kontaktní improvizace',
            capacityStatus: {
              assigned: 0,
              capacity: 19,
              freeSpots: 19,
              reserved: 0,
            },
          },
        ]}
      />
    ));
    expect(comp.find('WorkshopPickerItem[selected=true]').prop('id')).toBe(21);
  });

  it('renders error when given error and touched', () => {
    const comp = shallow((
      <WorkshopPicker
        name="workshop"
        onChange={() => {}}
        value={21}
        workshops={[
          {
            id: 21,
            lectors: [],
            name: 'Longformy',
            capacityStatus: {
              assigned: 2,
              capacity: 12,
              freeSpots: 7,
              reserved: 3,
            },
          },
        ]}
        error="Something went wrong"
        touched
      />
    ));
    expect(comp.find({
      children: 'Something went wrong',
    })).toHaveLength(1);
  });

  it('triggers onChange with id when not selected', () => {
    const changeSpy = sinon.spy();
    const comp = shallow((
      <WorkshopPicker
        name="workshop"
        onChange={changeSpy}
        value={21}
        workshops={[
          {
            name: 'Longformy',
            id: 21,
            lectors: [],
            capacityStatus: {
              capacity: 12,
            },
          },
        ]}
      />
    ));

    comp.find('WorkshopPickerItem').simulate('change', 21);
    expect(changeSpy.args).toEqual([
      ['workshop', 21],
    ]);
  });
});
