import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import WorkshopSummaryOneLine from '../../../src/web/components/workshopSummaryOneLine';

describe('Workshop Summary One Line component', () => {
  it('renders', () => {
    expect(shallow(
      <WorkshopSummaryOneLine
        name="Pantomima a fyzické divadlo"
        lectorName="Vojtěch Svoboda"
      />
    ).node).to.eql(
      <div>
        Vojtěch Svoboda: Pantomima a fyzické divadlo
      </div>
    );
  });
});
