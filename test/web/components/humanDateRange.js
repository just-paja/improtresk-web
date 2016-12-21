import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import HumanDate from '../../../src/web/components/humanDate';
import HumanDateRange from '../../../src/web/components/humanDateRange';

describe('Human Date Range component', () => {
  it('renders human date range where first date has no year', () => {
    expect(shallow(
      <HumanDateRange
        start="2016-01-02"
        end="2016-03-04"
      />
    ).node).to.eql(
      <span>
        <HumanDate date="2016-01-02" showYear={false} />
        {' '}-{' '}
        <HumanDate date="2016-03-04" />
      </span>
    );
  });
});
