import React from 'react';

import { shallow } from 'enzyme';

import Capacity from '../Capacity';

describe('Capacity component', () => {
  it('free spots by default', () => {
    const comp = shallow(<Capacity freeSpots={15} />);
    expect(comp.find('Connect(Message)[name="capacity.freeSpots"]'))
      .toHaveProp('data', { freeSpots: 15 });
  });

  it('free and reserved spots', () => {
    const comp = shallow(<Capacity freeSpots={15} reserved={5} />);
    expect(comp.find('Connect(Message)[name="capacity.freeSpotsAndReservations"]'))
      .toHaveProp('data', { freeSpots: 15, reserved: 5 });
  });

  it('fully reserved with reserved spots', () => {
    const comp = shallow(<Capacity fullyReserved reserved={5} />);
    expect(comp.find('Connect(Message)[name="capacity.fullyReserved"]'))
      .toHaveProp('data', { reserved: 5 });
  });

  it('renders custom blocked message', () => {
    const comp = shallow(<Capacity fullyAssigned />);
    expect(comp.find('Connect(Message)[name="capacity.full"]')).toHaveLength(1);
  });
});
