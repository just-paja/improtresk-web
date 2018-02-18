import React from 'react';

import { shallow } from 'enzyme';

import Conditions from '../Conditions';

describe('Conditions page component', () => {
  it('renders content', () => {
    const comp = shallow(
      <Conditions
        conditions={{
          text: 'foo',
        }}
        translate={msg => msg}
      />
    );
    expect(comp.find('ReactMarkdown')).toHaveProp('source', 'foo');
  });
});
