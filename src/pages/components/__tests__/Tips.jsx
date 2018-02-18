import React from 'react';

import { shallow } from 'enzyme';

import Tips from '../Tips';

describe('Tips page component', () => {
  it('renders tip list', () => {
    const comp = shallow(
      <Tips
        translate={msg => msg}
        tips={[
          {
            id: 21,
            name: 'Foo',
            photos: [],
            text: 'Bar',
          },
          {
            id: 23,
            name: 'Boo',
            photos: [],
            text: 'Far',
          },
        ]}
        ready
      />
    );
    expect(comp.find('TipList')).toHaveLength(1);
  });
});
