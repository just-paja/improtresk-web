import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import HumanTime from '../../../src/web/components/humanTime';
import HumanTimeRange from '../../../src/web/components/humanTimeRange';

describe('HumanTimeRange component', () => {
  it('renders human date range where first date has no year', () => {
    expect(shallow(
      <HumanTimeRange
        start="2016-01-02T01:02:03"
        end="2016-03-04T01:02:03"
      />
    ).node).to.eql(
      <span>
        <HumanTime date="2016-01-02T01:02:03" />
        {' '}-{' '}
        <HumanTime date="2016-03-04T01:02:03" />
      </span>
    );
  });
});
