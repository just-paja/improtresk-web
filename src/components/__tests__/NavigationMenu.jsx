import React from 'react';

import { shallow } from 'enzyme';

import NavigationMenu from '../NavigationMenu';

describe('Navigation menu component', () => {
  it('renders link to locations', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: '/cs/lokace',
    }).find('Connect(Message)')).toHaveProp('name', 'menu.locations');
  });

  it('renders link to accomodation', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: '/cs/ubytovani',
    }).find('Connect(Message)')).toHaveProp('name', 'menu.accomodation');
  });

  it('renders link to food information', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: '/cs/jidlo',
    }).find('Connect(Message)')).toHaveProp('name', 'menu.food');
  });

  it('renders link to fees information', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: '/cs/poplatky',
    }).find('Connect(Message)')).toHaveProp('name', 'menu.fees');
  });

  it('renders link to terms and conditions', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: '/cs/podminky',
    }).find('Connect(Message)')).toHaveProp('name', 'menu.conditions');
  });

  it('renders link to tips', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: '/cs/tipy',
    }).find('Connect(Message)')).toHaveProp('name', 'menu.tips');
  });

  it('renders link to workshops', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: '/cs/workshopy',
    }).find('Connect(Message)')).toHaveProp('name', 'menu.workshops');
  });

  it('renders link to signup given user is logged out', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: '/cs/prihlaska',
    }).find('Connect(Message)')).toHaveProp('name', 'menu.signup');
  });

  it('renders without link to signup given user is logged in', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        participant={{
          name: 'Foo',
        }}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({ to: '/cs/prihlaska' })).toHaveLength(0);
  });

  it('renders link to festival schedule', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        participant={{
          name: 'Foo',
        }}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: '/cs/program',
    }).find('Connect(Message)')).toHaveProp('name', 'menu.schedule');
  });

  it('renders link to archived years', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        participant={{
          name: 'Foo',
        }}
        years={[
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: 'archiveYearDetail',
      id: '2016',
    }).children('NavLink')).toHaveProp('children', ['2016', ' - ', 'Bar']);
  });

  it('renders link to contact', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: '/cs/kontakt',
    }).find('Connect(Message)')).toHaveProp('name', 'menu.contact');
  });

  it('renders link to user profile given user is logged in', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        participant={{
          id: 10,
          name: 'Foo',
        }}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({
      to: '/cs/ucastnik',
    }).children('NavLink').children().at(2)).toIncludeText('Foo');
  });

  it('renders without link to user profile given user is logged out', () => {
    const comp = shallow(
      <NavigationMenu
        lang="cs"
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        translate={msg => msg}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    );
    expect(comp.find({ to: '/cs/ucastnik' })).toHaveLength(0);
  });
});
