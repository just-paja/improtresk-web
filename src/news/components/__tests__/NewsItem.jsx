import React from 'react';

import { shallow } from 'enzyme';

import NewsItem from '../NewsItem';

describe('News item component', () => {
  it('renders permalink with news title', () => {
    const comp = shallow(
      <NewsItem
        createdAt="2016-01-02T03:04:05"
        id={21}
        name="foo"
      />
    );
    expect(comp.find('PermaLink').children()).toHaveText('foo');
  });
});
