import React from 'react';

import { shallow } from 'enzyme';

import HomeMenu from '../HomeMenu';

describe('Home Menu component', () => {
  it('renders about festival heading', () => {
    const comp = shallow(
      <HomeMenu
        about="bla bla bla"
        news={[
          { topic: 'Foo' },
          { topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find('Connect(Message)[name="pages.aboutFestival"]')).toHaveLength(1);
  });

  it('renders news heading', () => {
    const comp = shallow(
      <HomeMenu
        about="bla bla bla"
        news={[
          { topic: 'Foo' },
          { topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find('Connect(Message)[name="pages.news"]')).toHaveLength(1);
  });

  it('renders about text', () => {
    const comp = shallow(
      <HomeMenu
        about="bla bla bla"
        news={[
          { topic: 'Foo' },
          { topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find('ReactMarkdown')).toHaveProp('source', 'bla bla bla');
  });
});
