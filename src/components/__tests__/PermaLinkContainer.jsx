import NavItem from 'reactstrap/lib/NavItem';
import React from 'react';

import { shallow } from 'enzyme';

import LinkContainer from '../../containers/LinkContainer';
import PermaLinkContainer from '../PermaLinkContainer';

describe('Permanent Link Container component', () => {
  it('renders perma link component with tag prop', () => {
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
    expect(comp.find('PermaLink')).toHaveProp('tag', LinkContainer);
  });
});
