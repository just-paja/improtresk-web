import React from 'react';

import { expect } from 'chai';
import { IndexRoute, Route } from 'react-router';

import Accomodations from '../../src/web/containers/accomodations';
import App from '../../src/web/containers/app';
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
import ParticipantConfirm from '../../src/web/components/pages/participant/confirm';
import PerformerDetail from '../../src/web/containers/performerDetail';
import ForgottenPassword from '../../src/web/containers/participant/forgottenPassword';
import ChangePassword from '../../src/web/containers/participant/changePassword';
import ChangeFood from '../../src/web/containers/participant/changeFood';
import ChangeWorkshop from '../../src/web/containers/participant/changeWorkshop';
import NewPassword from '../../src/web/containers/participant/newPassword';
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
        <Route component={Accomodations} path="/pro-ucastniky/ubytovani" />
        <Route component={ArchivedYear} path="/archiv/:slug" />
        <Route component={Conditions} path="/pro-ucastniky/podminky" />
        <Route component={Contact} path="/kontakt" />
        <Route component={Fees} path="/pro-ucastniky/poplatky" />
        <Route component={Food} path="/pro-ucastniky/jidlo" />
        <Route component={ForgottenPassword} path="/zapomenute-heslo" />
        <Route component={NewPassword} path="/nove-heslo" />
        <Route component={Locations} path="/pro-ucastniky/lokace" />
        <Route component={NewsDetail} path="/novinky/:slug" />
        <Route component={PerformerDetail} path="/ucinkujici/:slug" />
        <Route component={Schedule} path="/program" />
        <Route component={Signup} path="/prihlaska" onEnter={() => {}} />
        <Route component={Tips} path="/pro-ucastniky/tipy" />
        <Route component={WorkshopDetail} path="/workshopy/:slug" />
        <Route component={Workshops} path="/workshopy" />
        <Route path="" onEnter={() => {}} name="participant">
          <Route path="/ucastnik/potvrzeni" component={ParticipantConfirm} />
          <Route path="/ucastnik" component={ParticipantHome} />
          <Route path="/ucastnik/zmena-hesla" component={ChangePassword} />
          <Route path="/ucastnik/vyber-jidla" component={ChangeFood} />
          <Route path="/ucastnik/zmena-workshopu" component={ChangeWorkshop} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    );
  });
});
