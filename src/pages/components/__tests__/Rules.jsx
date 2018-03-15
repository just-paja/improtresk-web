import React from 'react';

import { shallow } from 'enzyme';

import Rules from '../Rules';

describe('Rules page component', () => {
  it('renders content', () => {
    const comp = shallow(
      <Rules translate={msg => msg} />
    );
    expect(comp.find('Connect(ContainerProgress(Connect(Rules)))')).toHaveLength(1);
  });
});
