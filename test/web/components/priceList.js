import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import PriceList from '../../../src/web/components/priceList';
import PriceListItem from '../../../src/web/components/priceListItem';

describe('PriceList component', () => {
  it('renders', () => {
    expect(shallow(
      <PriceList
        prices={[
          {
            id: 21,
            takesEffectOn: '2016-01-02',
            endsOn: '2016-01-05',
            price: 1200,
          },
          {
            id: 78,
            takesEffectOn: '2016-01-05',
            price: 1900,
          },
        ]}
      />
    ).node).to.eql(
      <ul>
        <li>
          <PriceListItem
            endsOn="2016-01-05"
            takesEffectOn="2016-01-02"
            price={1200}
          />
        </li>
        <li>
          <PriceListItem
            takesEffectOn="2016-01-05"
            price={1900}
          />
        </li>
      </ul>
    );
  });
  it('renders empty without prices', () => {
    expect(shallow(
      <PriceList prices={[]} />
    ).node).to.equal(null);
  });
});
