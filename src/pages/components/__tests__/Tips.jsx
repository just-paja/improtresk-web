import React from 'react';

import { shallow } from 'enzyme';

import Tips from '../Tips';

describe('Tips page component', () => {
  it('renders tip list', () => {
    const comp = shallow(<Tips translate={msg => msg} />);
    expect(comp.find('Connect(ContainerProgress(Connect(TipList)))')).toHaveLength(1);
  });
});
