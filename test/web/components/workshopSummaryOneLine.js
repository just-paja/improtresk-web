import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Prop from '../../../src/web/components/prop';
import WorkshopSummaryOneLine from '../../../src/web/components/workshopSummaryOneLine';

describe('Workshop Summary One Line component', () => {
  it('renders', () => {
    expect(shallow(
      <WorkshopSummaryOneLine
        name="Pantomima a fyzické divadlo"
        lectors={[
          { lector: { name: 'Vojtěch Svoboda' }, role: 'Hlavní lektor' },
          { lector: { name: 'Martin Skot' }, role: 'Pomocný lektor' },
        ]}
      />
    ).node).to.eql(
      <div>
        <strong>Pantomima a fyzické divadlo</strong><br />
        <ul className="list-unstyled workshopSummaryOneLine-list">
          <Prop label="Lektoři">Vojtěch Svoboda, Martin Skot</Prop>
          <Prop label="Kapacita" />
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
        <strong>Pantomima a fyzické divadlo</strong><br />
        <ul className="list-unstyled workshopSummaryOneLine-list">
          <Prop label="Lektoři">Vojtěch Svoboda, Martin Skot</Prop>
        </ul>
      </div>
    );
  });
});
