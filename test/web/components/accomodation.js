import Markdown from 'react-markdown';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Address from '../../../src/web/components/address';
import Accomodation from '../../../src/web/components/accomodation';
import Gallery from '../../../src/web/components/gallery';
import Prop from '../../../src/web/components/prop';
import Price from '../../../src/web/components/price';

describe('Address component', () => {
  it('renders link', () => {
    expect(shallow(
      <Accomodation
        address="Nádražní 846, 399 01 Milevsko"
        name="Dům Kultury Milevsko"
        photos={[]}
        price={200}
        text="Some long description"
      />
    ).node).to.eql(
      <div>
        <h2>Dům Kultury Milevsko</h2>
        <ul className="list-unstyled">
          <Prop label="Adresa" icon="map-marker">
            <Address address="Nádražní 846, 399 01 Milevsko" />
          </Prop>
          <Prop label="Příplatek" icon="money">
            <Price price={200} />
          </Prop>
        </ul>

        <Markdown source="Some long description" />
        <Gallery photos={[]} />
      </div>
    );
  });
});