import Crossing from 'crossing';
import React from 'react';

import { IndexRoute, Route } from 'react-router';

import App from './containers/app';

import Accomodations from './containers/accomodations';
import Conditions from './containers/conditions';
import Contact from './containers/contact';
import Home from './containers/home';
import NotFound from './components/notFound';
import Schedule from './containers/schedule';
import Tips from './containers/tips';
import WorkshopDetail from './containers/workshopDetail';
import Workshops from './containers/workshops';

const urlTable = {
  home: '/',
  accomodation: '/pro-ucastniky/ubytovani',
  food: '/pro-ucastniky/jidlo',
  fees: '/pro-ucastniky/poplatky',
  tips: '/pro-ucastniky/tipy',
  conditions: '/pro-ucastniky/podminky',
  workshops: '/workshopy',
  'workshops:item': '/workshopy/:slug',
  drive: '/jizdomat',
  'news:item': '/novinky/:slug',
  signup: '/prihlaska',
  schedule: '/program',
  contact: '/kontakt',
  'archive:year': '/archiv/:year',
};

const resolver = new Crossing(new RegExp(':([A-Za-z0-9-_%]{1,})'));
resolver.load(urlTable);

export function idFromSlug(slug) {
  return slug ? slug.split('-').pop() : null;
}

export function reverse(url, params) {
  return resolver.get(url, params);
}

export default function configureRoutes() {
  return (
    <Route path={urlTable.home} component={App}>
      <IndexRoute component={Home} />
      <Route path={urlTable.schedule} component={Schedule} />
      <Route path={urlTable.workshops} component={Workshops} />
      <Route path={urlTable['workshops:item']} component={WorkshopDetail} />
      <Route path={urlTable.contact} component={Contact} />
      <Route path={urlTable.tips} component={Tips} />
      <Route path={urlTable.accomodation} component={Accomodations} />
      <Route path={urlTable.conditions} component={Conditions} />
      <Route path="*" component={NotFound} />
    </Route>
  );
}
