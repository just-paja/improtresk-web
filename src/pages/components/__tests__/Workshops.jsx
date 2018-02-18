import React from 'react';

import { shallow } from 'enzyme';

import Workshops from '../Workshops';

describe('Workshops page component', () => {
  it('renders workshop list', () => {
    const comp = shallow(
      <Workshops
        translate={msg => msg}
        routeParams={{}}
        onLeave={() => {}}
        workshops={[
          {
            id: 12,
            desc: 'foo',
          },
          {
            id: 15,
            desc: 'bar',
          },
        ]}
      />
    );
    expect(comp.find('WorkshopList')).toHaveLength(1);
  });
});
