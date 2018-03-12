import React from 'react';

import { shallow } from 'enzyme';

import Navigation from '../Navigation';

describe('Navigation component', () => {
  it('renders link home with label', () => {
    const comp = shallow(
      <Navigation
        onLogout={() => {}}
        lang="cs"
        currentYear={null}
        translate={msg => msg}
        years={[
          { year: '2016', topic: 'Foo' },
          { year: '2017', topic: 'Bar' },
        ]}
      />
    );

    expect(comp.find('NavbarBrand').filter({ children: 'Improtřesk' }))
      .toHaveProp('href', '/');
  });

  it('renders navigation menu', () => {
    const comp = shallow(
      <Navigation
        onLogout={() => {}}
        lang="cs"
        currentYear={null}
        translate={msg => msg}
        years={[
          { year: '2016', topic: 'Foo' },
          { year: '2017', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find('NavigationMenu')).toHaveLength(1);
  });

  it('passes participant to menu when provided', () => {
    const comp = shallow(
      <Navigation
        onLogout={() => {}}
        lang="cs"
        currentYear={null}
        translate={msg => msg}
        participant={{ name: 'foo' }}
        years={[
          { year: '2016', topic: 'Foo' },
          { year: '2017', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find('NavigationMenu')).toHaveProp('participant', { name: 'foo' });
  });

  it('saves expanded state on toggle', () => {
    const comp = shallow(<Navigation onLogout={() => {}} lang="cs" translate={msg => msg} />);
    comp.setState({ expanded: true });
    comp.find('Navbar').simulate('toggle');
    expect(comp.find('Navbar Collapse')).toHaveProp('isOpen', true);
  });

  it('saves collapsed state on toggle', () => {
    const comp = shallow(<Navigation onLogout={() => {}} lang="cs" translate={msg => msg} />);
    comp.setState({ expanded: false });
    comp.find('Navbar').simulate('toggle');
    expect(comp.find('Navbar Collapse')).toHaveProp('isOpen', false);
  });
});
