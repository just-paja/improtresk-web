import Crossing from 'crossing';
import React from 'react';

import { IndexRoute, Route } from 'react-router';

import App from './containers/app';

import Accomodations from './containers/accomodations';
import ArchivedYear from './containers/archivedYear';
import Conditions from './containers/conditions';
import Contact from './containers/contact';
import Fees from './containers/fees';
import Food from './containers/food';
import Home from './containers/home';
import NewsDetail from './containers/newsDetail';
import NotFound from './components/notFound';
import Schedule from './containers/schedule';
import Signup from './containers/signup';
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
  location: '/pro-ucastniky/lokace',
  workshops: '/workshopy',
  'workshops:item': '/workshopy/:slug',
  drive: '/jizdomat',
  'news:item': '/novinky/:slug',
  signup: '/prihlaska',
  schedule: '/program',
  contact: '/kontakt',
  'archive:year': '/archiv/:slug',
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
      <Route path={urlTable.accomodation} component={Accomodations} />
      <Route path={urlTable['archive:year']} component={ArchivedYear} />
      <Route path={urlTable.conditions} component={Conditions} />
      <Route path={urlTable.contact} component={Contact} />
      <Route path={urlTable.fees} component={Fees} />
      <Route path={urlTable.food} component={Food} />
      <Route path={urlTable['news:item']} component={NewsDetail} />
      <Route path={urlTable.schedule} component={Schedule} />
      <Route path={urlTable.signup} component={Signup} />
      <Route path={urlTable.tips} component={Tips} />
      <Route path={urlTable.workshops} component={Workshops} />
      <Route path={urlTable['workshops:item']} component={WorkshopDetail} />
      <Route path="*" component={NotFound} />
    </Route>
  );
}
