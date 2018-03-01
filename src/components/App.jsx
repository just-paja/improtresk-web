import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { ErrorType, ResourceProgress } from 'react-saga-rest/lib/proptypes';

import Accomodation from '../pages/Accomodation';
import AppErrors from './AppErrors';
import AppHelmet from './AppHelmet';
import AppLoader from './AppLoader';
import CrashHandler from './CrashHandler';
import ArchivedYear from '../pages/ArchivedYear';
import Conditions from '../pages/Conditions';
import Contact from '../pages/Contact';
import Fees from '../pages/Fees';
import Food from '../pages/Food';
import Footer from './Footer';
import ForgottenPassword from '../pages/ForgottenPassword';
import Home from '../pages/Home';
// import ChangeFood from '../pages/changeFood';
// import ChangePassword from '../pages/changePassword';
// import ChangeWorkshop from '../pages/changeWorkshop';
import LanguageRedirect from '../pages/LanguageRedirect';
import Locations from '../pages/Locations';
import Navigation from './Navigation';
import NewPassword from '../pages/NewPassword';
import NewsDetail from '../pages/NewsDetail';
import NotFound from '../pages/NotFound';
// import ParticipantConfirm from '../pages/participantConfirm';
// import ParticipantHome from '../pages/participantHome';
// import PerformerDetail from '../pages/performerDetail';
import ProgressBar from './ProgressBar';
// import Schedule from '../pages/schedule';
import Signup from '../pages/Signup';
import Tips from '../pages/Tips';
import WorkshopDetail from '../pages/WorkshopDetailPage';
import Workshops from '../pages/Workshops';

import { getAvailableLangs, getUrlPattern } from '../routeTable';

import styles from './App.css';

class App extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const {
      activeRequests,
      currentYear,
      errors,
      host,
      lang,
      participant,
      progress,
      years,
    } = this.props;

    const defaultTitle = 'Festival divadelní improvizace';
    const titleTemplate = currentYear ? `%s - Improtřesk ${currentYear.year}` : '%s - Improtřesk';
    const langs = getAvailableLangs();

    if (progress.loading || !lang) {
      return <AppLoader />;
    }

    if (progress.failed) {
      return <div>App failed</div>;
    }

    const routes = [
      ...langs.map(routeLang => [
        <Route key={`${lang}home`} component={Home} exact path={getUrlPattern(routeLang, 'home')} />,
        <Route key={`${lang}accomodation`} component={Accomodation} path={getUrlPattern(routeLang, 'accomodation')} />,
        <Route key={`${lang}archiveYearDetail`} component={ArchivedYear} path={getUrlPattern(routeLang, 'archiveYearDetail')} />,
        <Route key={`${lang}fees`} component={Fees} path={getUrlPattern(routeLang, 'fees')} />,
        <Route key={`${lang}conditions`} component={Conditions} path={getUrlPattern(routeLang, 'conditions')} />,
        <Route key={`${lang}contact`} component={Contact} path={getUrlPattern(routeLang, 'contact')} />,
        <Route key={`${lang}food`} component={Food} path={getUrlPattern(routeLang, 'food')} />,
        <Route key={`${lang}participantForgottenPassword`} component={ForgottenPassword} path={getUrlPattern(routeLang, 'participantForgottenPassword')} />,
        <Route key={`${lang}location`} component={Locations} path={getUrlPattern(routeLang, 'location')} />,
        <Route key={`${lang}newsDetail`} component={NewsDetail} path={getUrlPattern(routeLang, 'newsDetail')} />,
        <Route key={`${lang}newPassword`} component={NewPassword} path={getUrlPattern(routeLang, 'participantNewPassword')} />,
        <Route key={`${lang}signup`} component={Signup} path={getUrlPattern(routeLang, 'signup')} />,
        <Route key={`${lang}tips`} component={Tips} path={getUrlPattern(routeLang, 'tips')} />,
        <Route key={`${lang}workshops`} component={Workshops} exact path={getUrlPattern(routeLang, 'workshops')} />,
        <Route key={`${lang}workshopDetail`} component={WorkshopDetail} path={getUrlPattern(routeLang, 'workshopDetail')} />,
      ]),
      <Route key="languageRedirect" exact path="/" component={LanguageRedirect} />,
      <Route key="notfound" component={NotFound} />,
    ];

    return (
      <div className={styles.app}>
        <CrashHandler>
          <AppHelmet
            defaultTitle={defaultTitle}
            host={host}
            pathname="/"
            titleTemplate={titleTemplate}
          />
          <Navigation
            currentYear={currentYear}
            lang={lang}
            participant={participant}
            years={years}
          />
          <ProgressBar activeRequests={activeRequests} />
          <AppErrors errors={errors} />
          <div className="app-content">
            <Switch>
              {routes}
            </Switch>
          </div>
          <Footer partners={[]} />
        </CrashHandler>
      </div>
    );
  }
}

App.propTypes = {
  activeRequests: PropTypes.number,
  currentYear: PropTypes.shape({
    year: PropTypes.string,
  }),
  errors: PropTypes.arrayOf(ErrorType).isRequired,
  host: PropTypes.string,
  lang: PropTypes.string,
  participant: PropTypes.object,
  progress: ResourceProgress.isRequired,
  onMount: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  activeRequests: 0,
  currentYear: null,
  host: null,
  lang: null,
  participant: null,
  years: null,
};

export default App;


/*
<Route component={PerformerDetail} path={urlTable['performerDetail']} />
<Route component={Schedule} path={urlTable.schedule} />
<Route
path={urlTable['participantConfirmOrder']}
component={ParticipantConfirm}
isLoggedIn={participant}
/>
<Route
path={urlTable['participantHome']}
component={ParticipantHome}
isLoggedIn={participant}
/>
<Route
path={urlTable['participantChangePassword']}
component={ChangePassword}
isLoggedIn={participant}
/>
<Route
path={urlTable['participantChangeFood']}
component={ChangeFood}
isLoggedIn={participant}
/>
<Route
path={urlTable['participantChangeWorkshop']}
component={ChangeWorkshop}
isLoggedIn={participant}
/>
*/
