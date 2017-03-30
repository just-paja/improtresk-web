import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Prop from '../../../src/web/components/prop';
import Capacity from '../../../src/web/components/capacity';
import WorkshopSummaryOneLine from '../../../src/web/components/workshopSummaryOneLine';

describe('Workshop Summary One Line component', () => {
  it('renders', () => {
    expect(shallow(
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
    ).node).to.eql(
      <div>
        <h3 className="workshopSummaryOneLine-heading">Pantomima a fyzické divadlo</h3>
        <ul className="list-unstyled workshopSummaryOneLine-list">
          <Prop label="Lektoři">Vojtěch Svoboda, Martin Skot</Prop>
          <Capacity
            assigned={10}
            capacity={12}
            reserved={1}
            freeSpots={1}
          />
        </ul>
      </div>
    );
  });
  it('renders without capacity', () => {
    expect(shallow(
      <WorkshopSummaryOneLine
        hideCapacity
        name="Pantomima a fyzické divadlo"
        lectors={[
          { lector: { name: 'Vojtěch Svoboda' }, role: 'Hlavní lektor' },
          { lector: { name: 'Martin Skot' }, role: 'Pomocný lektor' },
        ]}
      />
    ).node).to.eql(
      <div>
        <h3 className="workshopSummaryOneLine-heading">Pantomima a fyzické divadlo</h3>
        <ul className="list-unstyled workshopSummaryOneLine-list">
          <Prop label="Lektoři">Vojtěch Svoboda, Martin Skot</Prop>
        </ul>
      </div>
    );
  });
});
