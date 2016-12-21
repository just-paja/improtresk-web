import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import HumanDate from '../../../src/web/components/humanDate';
import NewsItem from '../../../src/web/components/newsItem';
import PermaLink from '../../../src/web/components/permaLink';

describe('News item component', () => {
  it('renders', () => {
    expect(shallow(
      <NewsItem
        createdAt="2016-01-02T03:04:05"
        id={21}
        text="foo"
      />
    ).node).to.eql(
      <div>
        <div>foo</div>
        <PermaLink id={21} title="foo" to="news:item">
          <HumanDate date="2016-01-02T03:04:05" showTime />
        </PermaLink>
      </div>
    );
  });
});
