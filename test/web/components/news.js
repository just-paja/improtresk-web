import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import News from '../../../src/web/components/news';
import NewsItem from '../../../src/web/components/newsItem';

describe('News list component', () => {
  it('renders', () => {
    expect(shallow(
      <News
        news={[
          {
            createdAt: '2016-01-02T03:04:05',
            id: 21,
            text: 'foo',
          },
          {
            createdAt: '2016-01-02T09:04:05',
            id: 25,
            text: 'bar',
          },
        ]}
      />
    ).node).to.eql(
      <div>
        <NewsItem
          createdAt="2016-01-02T03:04:05"
          id={21}
          text="foo"
        />
        <NewsItem
          createdAt="2016-01-02T09:04:05"
          id={25}
          text="bar"
        />
      </div>
    );
  });
});
