import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Capacity from '../../../src/web/components/capacity';

describe('Capacity component', () => {
  it('free spots by default', () => {
    expect(shallow(
      <Capacity freeSpots={15} />
    ).node).to.eql(
      <span>15 volných míst</span>
    );
  });

  it('free and reserved spots', () => {
    expect(shallow(
      <Capacity freeSpots={15} reserved={5} />
    ).node).to.eql(
      <span>15 volných míst, 5 dočasných rezervací</span>
    );
  });

  it('fully reserved with reserved spots', () => {
    expect(shallow(
      <Capacity fullyReserved reserved={5} />
    ).node).to.eql(
      <span>5 dočasných rezervací</span>
    );
  });

  it('renders custom blocked message', () => {
    expect(shallow(
      <Capacity fullyAssigned />
    ).node).to.eql(
      <span>Plně obsazeno</span>
    );
  });
});
