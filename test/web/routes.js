import React from 'react';

import { expect } from 'chai';
import { IndexRoute, Route } from 'react-router';

import App from '../../src/web/containers/app';
import Accomodations from '../../src/web/containers/accomodations';
import ArchivedYear from '../../src/web/containers/archivedYear';
import Conditions from '../../src/web/containers/conditions';
import Contact from '../../src/web/containers/contact';
import Fees from '../../src/web/containers/fees';
import Food from '../../src/web/containers/food';
import Home from '../../src/web/containers/home';
import Locations from '../../src/web/containers/locations';
import NewsDetail from '../../src/web/containers/newsDetail';
import NotFound from '../../src/web/components/notFound';
import ParticipantHome from '../../src/web/components/pages/participant/home';
import Schedule from '../../src/web/containers/schedule';
import Signup from '../../src/web/containers/signup';
import Tips from '../../src/web/containers/tips';
import WorkshopDetail from '../../src/web/containers/workshopDetail';
import Workshops from '../../src/web/containers/workshops';

import configureRoutes from '../../src/web/routes';

describe('Routes', () => {
  it('configureRoutes returns project routes', () => {
    expect(configureRoutes({
      getState: () => {},
    })).to.eql(
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/pro-ucastniky/ubytovani" component={Accomodations} />
        <Route path="/archiv/:slug" component={ArchivedYear} />
        <Route path="/pro-ucastniky/podminky" component={Conditions} />
        <Route path="/kontakt" component={Contact} />
        <Route path="/pro-ucastniky/poplatky" component={Fees} />
        <Route path="/pro-ucastniky/jidlo" component={Food} />
        <Route path="/pro-ucastniky/lokace" component={Locations} />
        <Route path="/novinky/:slug" component={NewsDetail} />
        <Route path="/program" component={Schedule} />
        <Route path="/prihlaska" component={Signup} />
        <Route path="/pro-ucastniky/tipy" component={Tips} />
        <Route path="/workshopy" component={Workshops} />
        <Route path="/workshopy/:slug" component={WorkshopDetail} />
        <Route path="" onEnter={() => {}} name="participant">
          <Route path="/ucastnik" component={ParticipantHome} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    );
  });
});
