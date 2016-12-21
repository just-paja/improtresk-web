import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Link from '../../../src/web/components/link';
import PermaLink from '../../../src/web/components/permaLink';

describe('Permanent link generator component', () => {
  it('renders link with preescaped title', () => {
    expect(shallow(
      <PermaLink
        id={23}
        title="news-item-title"
        to="news:item"
      >23. 2. 2016</PermaLink>
    ).node).to.eql(
      <Link
        to="news:item"
        params={{ slug: 'news-item-title-23' }}
      >23. 2. 2016</Link>
    );
  });

  it('renders link with english title', () => {
    expect(shallow(
      <PermaLink
        id={23}
        title="News Item Title"
        to="news:item"
      >23. 2. 2016</PermaLink>
    ).node).to.eql(
      <Link
        to="news:item"
        params={{ slug: 'news-item-title-23' }}
      >23. 2. 2016</Link>
    );
  });

  it('renders link with czech title', () => {
    expect(shallow(
      <PermaLink
        id={23}
        title="Přespříliš žluťoučký kůň úpěl ďábelské ódy"
        to="news:item"
      >23. 2. 2016</PermaLink>
    ).node).to.eql(
      <Link
        to="news:item"
        params={{ slug: 'presprilis-zlutoucky-kun-upel-dabelske-ody-23' }}
      >23. 2. 2016</Link>
    );
  });

  it('renders link with multiple dashes in title', () => {
    expect(shallow(
      <PermaLink
        id={23}
        title="Multiple  spaces   in--the---title"
        to="news:item"
      >23. 2. 2016</PermaLink>
    ).node).to.eql(
      <Link
        to="news:item"
        params={{ slug: 'multiple-spaces-in-the-title-23' }}
      >23. 2. 2016</Link>
    );
  });

  it('renders link with too long title', () => {
    expect(shallow(
      <PermaLink
        id={23}
        title="Improtřesk je český festival divadelní improvizace a největší setkání improvizátorů"
        to="news:item"
      >23. 2. 2016</PermaLink>
    ).node).to.eql(
      <Link
        to="news:item"
        params={{ slug: 'improtresk-je-cesky-festival-divadelni-improviza-23' }}
      >23. 2. 2016</Link>
    );
  });
});
