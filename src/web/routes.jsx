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
import ParticipantHome from './containers/participantHome';
import PerformerDetail from './containers/performerDetail';
import Schedule from './containers/schedule';
import Signup from './containers/signup';
import Tips from './containers/tips';
import WorkshopDetail from './containers/workshopDetail';
import Workshops from './containers/workshops';

import { urlTable } from './routeTable';
import { validateGuest, validateLogin } from './session';

export default function configureRoutes(store) {
  return (
    <Route path={urlTable.home} component={App}>
      <IndexRoute component={Home} />
      <Route component={Accomodations} path={urlTable.accomodation} />
      <Route component={ArchivedYear} path={urlTable['archive:year']} />
      <Route component={Conditions} path={urlTable.conditions} />
      <Route component={Contact} path={urlTable.contact} />
      <Route component={Fees} path={urlTable.fees} />
      <Route component={Food} path={urlTable.food} />
      <Route component={Locations} path={urlTable.location} />
      <Route component={NewsDetail} path={urlTable['news:item']} />
      <Route component={PerformerDetail} path={urlTable['performers:item']} />
      <Route component={Schedule} path={urlTable.schedule} />
      <Route component={Signup} onEnter={validateGuest(store.getState)} path={urlTable.signup} />
      <Route component={Tips} path={urlTable.tips} />
      <Route component={WorkshopDetail} path={urlTable['workshops:item']} />
      <Route component={Workshops} path={urlTable.workshops} />
      <Route path="" onEnter={validateLogin(store.getState)} name="participant">
        <Route path={urlTable['participant:home']} component={ParticipantHome} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  );
}
