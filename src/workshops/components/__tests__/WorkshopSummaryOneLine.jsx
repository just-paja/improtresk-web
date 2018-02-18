import React from 'react';

import { shallow } from 'enzyme';

import WorkshopSummaryOneLine from '../WorkshopSummaryOneLine';

describe('Workshop Summary One Line component', () => {
  it('renders all lector names separated by comma', () => {
    const comp = shallow(
      <WorkshopSummaryOneLine
        assigned={10}
        capacity={12}
        reserved={1}
        freeSpots={1}
        name="Pantomima a fyzické divadlo"
        lectors={[
          { lector: { name: 'Vojtěch Svoboda' }, role: 'Hlavní lektor' },
          { lector: { name: 'Martin Skot' }, role: 'Pomocný lektor' },
        ]}
      />
    );
    expect(comp.find({ children: 'Vojtěch Svoboda, Martin Skot' })).toHaveLength(1);
  });

  it('renders capacity', () => {
    const comp = shallow(
      <WorkshopSummaryOneLine
        assigned={10}
        capacity={12}
        reserved={1}
        freeSpots={1}
        name="Pantomima a fyzické divadlo"
        lectors={[
          { lector: { name: 'Vojtěch Svoboda' }, role: 'Hlavní lektor' },
          { lector: { name: 'Martin Skot' }, role: 'Pomocný lektor' },
        ]}
      />
    );
    expect(comp.find('Capacity')).toHaveProp('assigned', 10);
    expect(comp.find('Capacity')).toHaveProp('capacity', 12);
    expect(comp.find('Capacity')).toHaveProp('reserved', 1);
    expect(comp.find('Capacity')).toHaveProp('freeSpots', 1);
  });

  it('renders without capacity', () => {
    const comp = shallow(
      <WorkshopSummaryOneLine
        hideCapacity
        name="Pantomima a fyzické divadlo"
        lectors={[
          { lector: { name: 'Vojtěch Svoboda' }, role: 'Hlavní lektor' },
          { lector: { name: 'Martin Skot' }, role: 'Pomocný lektor' },
        ]}
      />
    );
    expect(comp.find('Capacity')).toHaveLength(0);
  });
});
