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
      <Navbar
        expanded={false}
        fixedTop
        onSelect={() => {}}
        onToggle={() => {}}
      >
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
  it('renders with participant', () => {
    expect(shallow(
      <Navigation
        currentYear={null}
        participant={{ name: 'foo' }}
        years={[
          { year: '2016', topic: 'Foo' },
          { year: '2017', topic: 'Bar' },
        ]}
      />
    ).node).to.eql(
      <Navbar
        expanded={false}
        fixedTop
        onSelect={() => {}}
        onToggle={() => {}}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="home">Improtřesk</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <NavigationMenu
            currentYear={null}
            participant={{ name: 'foo' }}
            years={[
              { year: '2016', topic: 'Foo' },
              { year: '2017', topic: 'Bar' },
            ]}
          />
        </Navbar.Collapse>
      </Navbar>
    );
  });
  it('saves expanded state on toggle', () => {
    const comp = shallow(<Navigation />);
    comp.find(Navbar).simulate('toggle', true);
    expect(comp.state()).to.eql({ expanded: true });
  });
  it('saves collapsed state on toggle', () => {
    const comp = shallow(<Navigation />);
    comp.find(Navbar).simulate('toggle', false);
    expect(comp.state()).to.eql({ expanded: false });
  });
});
