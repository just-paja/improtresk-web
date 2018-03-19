import React from 'react';

import { shallow } from 'enzyme';

import AppHelmet from '../AppHelmet';

describe('AppHelmet component', () => {
  it('renders default title', () => {
    const comp = shallow(
      <AppHelmet
        host="https://improtresk.cz"
        entryPath="/prihlaska"
        translate={msg => msg}
      />
    );
    expect(comp.find('HelmetWrapper')).toHaveProp('defaultTitle', 'pages.defaultTitle');
  });

  it('renders default title template when no year is active', () => {
    const comp = shallow(
      <AppHelmet
        host="https://improtresk.cz"
        entryPath="/prihlaska"
        translate={msg => msg}
      />
    );
    expect(comp.find('HelmetWrapper')).toHaveProp('titleTemplate', 'pages.titleTemplate');
  });

  it('renders default opengraph title template when no year is active', () => {
    const comp = shallow(
      <AppHelmet
        host="https://improtresk.cz"
        entryPath="/prihlaska"
        translate={msg => msg}
      />
    );
    expect(comp.find('meta[property="og:title"]')).toHaveProp('content', 'pages.titleTemplate');
  });

  it('renders year title template when a year is active', () => {
    const comp = shallow(
      <AppHelmet
        host="https://improtresk.cz"
        entryPath="/prihlaska"
        translate={msg => msg}
        year={{
          id: 10,
          year: '2018',
        }}
      />
    );
    expect(comp.find('HelmetWrapper')).toHaveProp('titleTemplate', 'pages.titleYearTemplate');
  });

  it('renders opengraph URL', () => {
    const comp = shallow(
      <AppHelmet
        host="https://improtresk.cz"
        entryPath="/prihlaska"
        translate={msg => msg}
        year={{
          id: 10,
          year: '2018',
        }}
      />
    );
    expect(comp.find('meta[property="og:url"]')).toHaveProp('content', 'https://improtresk.cz/prihlaska');
  });

  it('renders default description', () => {
    const comp = shallow(
      <AppHelmet
        host="https://improtresk.cz"
        entryPath="/prihlaska"
        translate={msg => msg}
        year={{
          id: 10,
          year: '2018',
        }}
      />
    );
    expect(comp.find('meta[property="og:description"]')).toHaveProp('content', 'pages.about');
  });
});
