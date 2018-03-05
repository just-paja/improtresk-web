import React from 'react';

import { shallow } from 'enzyme';

import ArchivedYear from '../ArchivedYear';

describe('Workshop Detail page component', () => {
  it('renders year title', () => {
    const comp = shallow(
      <ArchivedYear
        onDataRequest={() => {}}
        routeParams={{}}
        workshops={[]}
        ready
        topic="foo"
        year="2016"
      />
    );
    expect(comp.find({ children: 'Ročník 2016' })).toHaveLength(1);
  });
});
