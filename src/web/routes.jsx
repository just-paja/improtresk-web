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
import Locations from './containers/locations';
import NewsDetail from './containers/newsDetail';
import NotFound from './components/notFound';
import ParticipantHome from './components/pages/participant/home';
import Schedule from './containers/schedule';
import Signup from './containers/signup';
import Tips from './containers/tips';
import WorkshopDetail from './containers/workshopDetail';
import Workshops from './containers/workshops';

import { urlTable } from './routeTable';
import { validateLogin } from './session';

export default function configureRoutes(store) {
  return (
    <Route path={urlTable.home} component={App}>
      <IndexRoute component={Home} />
      <Route path={urlTable.accomodation} component={Accomodations} />
      <Route path={urlTable['archive:year']} component={ArchivedYear} />
      <Route path={urlTable.conditions} component={Conditions} />
      <Route path={urlTable.contact} component={Contact} />
      <Route path={urlTable.fees} component={Fees} />
      <Route path={urlTable.food} component={Food} />
      <Route path={urlTable.location} component={Locations} />
      <Route path={urlTable['news:item']} component={NewsDetail} />
      <Route path={urlTable.schedule} component={Schedule} />
      <Route path={urlTable.signup} component={Signup} />
      <Route path={urlTable.tips} component={Tips} />
      <Route path={urlTable.workshops} component={Workshops} />
      <Route path={urlTable['workshops:item']} component={WorkshopDetail} />
      <Route path="" onEnter={validateLogin(store.getState)} name="participant">
        <Route path={urlTable['participant:home']} component={ParticipantHome} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  );
}
