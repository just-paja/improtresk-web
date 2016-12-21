import Crossing from 'crossing';
import React from 'react';

import { IndexRoute, Route } from 'react-router';

import App from './containers/app';
import Home from './containers/home';
import Schedule from './containers/schedule';

const urlTable = {
  home: '/',
  forAttending: '/pro-ucastniky',
  'news:item': '/novinky/:slug',
  signup: '/prihlaska',
  schedule: '/program',
  contact: '/kontakt',
  'archive:year': '/archiv/:year',
};

const resolver = new Crossing(new RegExp(':([A-Za-z0-9-_%]{1,})'));
resolver.load(urlTable);

export function reverse(url, params) {
  return resolver.get(url, params);
}

export default function configureRoutes() {
  return (
    <Route path={urlTable.home} component={App}>
      <IndexRoute component={Home} />
      <Route path={urlTable.schedule} component={Schedule} />
      <Route path={urlTable.contact} component={Home} />
    </Route>
  );
}
