import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Tip from '../../../src/web/components/tip';
import ObjectList from '../../../src/web/components/objectList';
import TipList from '../../../src/web/components/tipList';

describe('Object list component', () => {
  it('renders', () => {
    expect(shallow(
      <TipList
        tips={[
          {
            id: 21,
            name: 'Foo',
            photos: [],
            text: 'Bar',
          },
        ]}
      />
    ).node).to.eql(
      <ObjectList
        Component={Tip}
        data={[
          {
            id: 21,
            name: 'Foo',
            photos: [],
            text: 'Bar',
          },
        ]}
      />
    );
  });
});
