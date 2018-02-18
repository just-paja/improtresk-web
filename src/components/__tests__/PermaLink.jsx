import React from 'react';

import { shallow } from 'enzyme';

import Link from '../../containers/Link';
import PermaLink from '../PermaLink';

describe('Permanent link generator component', () => {
  it('renders link with preescaped title', () => {
    expect(shallow(
      <PermaLink
        id={23}
        title="news-item-title"
        to="newsDetail"
      >
        23. 2. 2016
      </PermaLink>
    ).getElement()).toEqual(
      <Link
        to="newsDetail"
        params={{ slug: 'news-item-title-23' }}
      >
        23. 2. 2016
      </Link>
    );
  });

  it('renders link with english title', () => {
    expect(shallow(
      <PermaLink
        id={23}
        title="News Item Title"
        to="newsDetail"
      >
        23. 2. 2016
      </PermaLink>
    ).getElement()).toEqual(
      <Link
        to="newsDetail"
        params={{ slug: 'news-item-title-23' }}
      >
        23. 2. 2016
      </Link>
    );
  });

  it('renders link with czech title', () => {
    expect(shallow(
      <PermaLink
        id={23}
        title="Přespříliš žluťoučký kůň úpěl ďábelské ódy"
        to="newsDetail"
      >
        23. 2. 2016
      </PermaLink>
    ).getElement()).toEqual(
      <Link
        to="newsDetail"
        params={{ slug: 'presprilis-zlutoucky-kun-upel-dabelske-ody-23' }}
      >
        23. 2. 2016
      </Link>
    );
  });

  it('renders link with multiple dashes in title', () => {
    expect(shallow(
      <PermaLink
        id={23}
        title="Multiple  spaces   in--the---title"
        to="newsDetail"
      >
        23. 2. 2016
      </PermaLink>
    ).getElement()).toEqual(
      <Link
        to="newsDetail"
        params={{ slug: 'multiple-spaces-in-the-title-23' }}
      >
        23. 2. 2016
      </Link>
    );
  });

  it('renders link with too long title', () => {
    expect(shallow(
      <PermaLink
        id={23}
        title="Improtřesk je český festival divadelní improvizace a největší setkání improvizátorů"
        to="newsDetail"
      >
        23. 2. 2016
      </PermaLink>
    ).getElement()).toEqual(
      <Link
        to="newsDetail"
        params={{ slug: 'improtresk-je-cesky-festival-divadelni-improviza-23' }}
      >
        23. 2. 2016
      </Link>
    );
  });

  it('does not fail when given no routeParams', () => {
    expect(() => {
      shallow(
        <PermaLink
          id={23}
          title="Improtřesk je český festival"
          to="newsDetail"
        >
          23. 2. 2016
        </PermaLink>
      );
    }).not.toThrow();
  });
});
