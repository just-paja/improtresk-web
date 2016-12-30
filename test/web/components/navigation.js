import React from 'react';

import { expect } from 'chai';
import { Navbar } from 'react-bootstrap';
import { shallow } from 'enzyme';

import Link from '../../../src/web/components/link';
import Navigation from '../../../src/web/components/navigation';
import NavigationMenu from '../../../src/web/components/navigationMenu';

describe('Navigation component', () => {
  it('renders layout and content', () => {
    expect(shallow(
      <Navigation
        currentYear={null}
        years={[
          { year: '2016', topic: 'Foo' },
          { year: '2017', topic: 'Bar' },
        ]}
      />
    ).node).to.eql(
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="home">Improtřesk</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <NavigationMenu
            currentYear={null}
            years={[
              { year: '2016', topic: 'Foo' },
              { year: '2017', topic: 'Bar' },
            ]}
          />
        </Navbar.Collapse>
      </Navbar>
    );
  });
});
