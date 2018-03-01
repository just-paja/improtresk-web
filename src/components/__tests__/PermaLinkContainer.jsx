import NavItem from 'reactstrap/lib/NavItem';
import React from 'react';

import { shallow } from 'enzyme';

import PermaLinkContainer from '../PermaLinkContainer';

describe('Permanent Link Container component', () => {
  it('renders link container', () => {
    const comp = shallow(
      <PermaLinkContainer
        lang="cs"
        id={1}
        title="Přespříliš žluťoučký kůň úpěl ďábelské ódy"
        to="newsDetail"
      >
        <NavItem>bar</NavItem>
      </PermaLinkContainer>
    );
    expect(comp.find('Connect(LinkContainer)')).toHaveProp('routeParams', {
      slug: 'presprilis-zlutoucky-kun-upel-dabelske-ody-1',
    });
  });

  it('does not fail when given no route params', () => {
    expect(() => {
      shallow(
        <PermaLinkContainer
          lang="cs"
          id={1}
          title="Přespříliš žluťoučký kůň úpěl ďábelské ódy"
          to="newsDetail"
        >
          <NavItem>bar</NavItem>
        </PermaLinkContainer>
      );
    }).not.toThrow();
  });
});
