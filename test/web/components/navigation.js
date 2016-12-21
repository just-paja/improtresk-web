import React from 'react';

import { expect } from 'chai';
import { Link } from 'react-router';
import { Navbar } from 'react-bootstrap';
import { shallow } from 'enzyme';

import Navigation from '../../../src/web/components/navigation';
import NavigationMenu from '../../../src/web/components/navigationMenu';

describe('Navigation component', () => {
  it('renders layout and content', () => {
    expect(shallow(
      <Navigation
        years={[
          { year: '2016', topic: 'Foo' },
          { year: '2017', topic: 'Bar' },
        ]}
      />
    ).node).to.eql(
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Improtřesk</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <NavigationMenu
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
