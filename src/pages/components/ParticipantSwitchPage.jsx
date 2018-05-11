import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { getAvailableLangs, getUrlPattern } from '../../routeTable';

import ChangeFood from '../../pages/ChangeFood';
import ChangePasswordPage from '../../pages/ChangePasswordPage';
import NotFound from '../../pages/NotFound';
import ParticipantEdit from '../../pages/ParticipantEdit';
import ParticipantHome from '../../pages/ParticipantHome';
import ParticipantIdentityEdit from '../../pages/ParticipantIdentityEdit';
import ParticipantRegistration from '../../pages/ParticipantRegistration';
import ParticipantRoomSelection from '../../pages/ParticipantRoomSelection';
import TicketRedirect from '../TicketRedirect';
import PrivateRoute from '../../containers/PrivateRoute';

const getRoutes = () => {
  const langs = getAvailableLangs();
  const routes = langs.map(routeLang => [
    <PrivateRoute key={`${routeLang}participantEdit`} exact path={getUrlPattern(routeLang, 'participantEdit')} component={ParticipantEdit} />,
    <PrivateRoute key={`${routeLang}participantHome`} exact path={getUrlPattern(routeLang, 'participantHome')} component={ParticipantHome} />,
    <PrivateRoute key={`${routeLang}participantChangeFood`} component={ChangeFood} path={getUrlPattern(routeLang, 'participantChangeFood')} />,
    <PrivateRoute key={`${routeLang}participantChangePassword`} exact path={getUrlPattern(routeLang, 'participantChangePassword')} component={ChangePasswordPage} />,
    <PrivateRoute key={`${routeLang}participantIdentityEdit`} exact path={getUrlPattern(routeLang, 'participantIdentityEdit')} component={ParticipantIdentityEdit} />,
    <PrivateRoute key={`${routeLang}participantRegister`} exact path={getUrlPattern(routeLang, 'participantRegister')} component={ParticipantRegistration} />,
    <PrivateRoute key={`${routeLang}participantRoomSelection`} exact path={getUrlPattern(routeLang, 'participantRoomSelection')} component={ParticipantRoomSelection} />,
    <PrivateRoute key={`${routeLang}participantTicket`} component={TicketRedirect} path={getUrlPattern(routeLang, 'participantTicket')} />,
  ]).reduce((aggr, langRoutes) => aggr.concat(langRoutes), []);
  routes.push(<Route key="notfound" component={NotFound} />);
  return routes;
};

const ParticipantSwitchPage = () => (
  <Switch>
    {getRoutes()}
  </Switch>
);

export default ParticipantSwitchPage;
