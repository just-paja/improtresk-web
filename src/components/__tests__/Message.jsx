import React from 'react';

import { shallow } from 'enzyme';

import Message from '../Message';

describe('Message component', () => {
  it('renders message', () => {
    const comp = shallow(
      <Message
        name="long.message.name"
        translate={msg => msg}
      />
    );
    expect(comp.find({
      children: 'long.message.name',
    })).toHaveLength(1);
  });
});
