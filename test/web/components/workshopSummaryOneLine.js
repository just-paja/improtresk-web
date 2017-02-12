import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

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
        Pantomima a fyzické divadlo: Vojtěch Svoboda (Hlavní lektor), Martin Skot (Pomocný lektor)
      </div>
    );
  });
});
