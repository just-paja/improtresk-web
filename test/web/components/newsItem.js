import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import NewsItem from '../../../src/web/components/newsItem';
import PermaLink from '../../../src/web/components/permaLink';

describe('News item component', () => {
  it('renders', () => {
    expect(shallow(
      <NewsItem
        createdAt="2016-01-02T03:04:05"
        id={21}
        name="foo"
      />
    ).node).to.eql(
      <div>
        <PermaLink id={21} title="foo" to="news:item">
          <strong>foo</strong>
        </PermaLink>
      </div>
    );
  });
});
