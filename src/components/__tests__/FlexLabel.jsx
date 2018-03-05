import React from 'react';

import { shallow } from 'enzyme';

import FlexLabel from '../FlexLabel';

describe('FlexLabel component', () => {
  it('renders wrapped children', () => {
    const comp = shallow(
      <FlexLabel>
        <div className="test foo" />
        <div className="test bar" />
      </FlexLabel>
    );
    expect(comp.find('.column .foo')).toHaveLength(1);
    expect(comp.find('.column .bar')).toHaveLength(1);
  });
});
