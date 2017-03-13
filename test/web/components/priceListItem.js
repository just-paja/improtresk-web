import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import HumanDate from '../../../src/web/components/humanDate';
import Price from '../../../src/web/components/price';
import PriceListItem from '../../../src/web/components/priceListItem';

describe('PriceListItem component', () => {
  it('renders', () => {
    expect(shallow(
      <PriceListItem
        endsOn="2016-01-05"
        name="Zlevněná"
        price={1200}
        takesEffectOn="2016-01-02"
      />
    ).node).to.eql(
      <span>
        od{' '}
        <HumanDate date="2016-01-02" />
        <span>
          {' do '}
          <HumanDate date="2016-01-05" />
        </span>
        {': '}
        <Price price={1200} />
      </span>
    );
  });
  it('renders without endsOn date', () => {
    expect(shallow(
      <PriceListItem
        name="Zlevněná"
        price={1500}
        takesEffectOn="2016-01-06"
      />
    ).node).to.eql(
      <span>
        od{' '}
        <HumanDate date="2016-01-06" />
        {': '}
        <Price price={1500} />
      </span>
    );
  });
});
