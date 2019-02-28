import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Route, Switch } from 'react-router-dom'
import { ResourceProgress } from 'react-saga-rest/lib/proptypes'

import Accomodation from '../pages/Accomodation'
import AppCrash from './AppCrash'
import AppHelmet from './AppHelmet'
import AppLoader from './AppLoader'
import ArchivedYear from '../pages/ArchivedYear'
import Contact from '../pages/Contact'
import CrashHandler from './CrashHandler'
import Fees from '../pages/Fees'
import Food from '../pages/Food'
import Footer from './Footer'
import ForgottenPassword from '../pages/ForgottenPassword'
import Home from '../pages/Home'
import LanguageRedirect from '../pages/LanguageRedirect'
import Locations from '../pages/Locations'
import Navigation from './Navigation'
import NewPasswordPage from '../pages/NewPasswordPage'
import NewsDetail from '../pages/NewsDetail'
import NotFound from '../pages/NotFound'
import ParticipantSwitchPage from '../pages/ParticipantSwitchPage'
import PerformerDetail from '../pages/PerformerDetail'
import PrivateRoute from '../containers/PrivateRoute'
import ProgressBar from './ProgressBar'
import Rules from '../pages/Rules'
import Schedule from '../pages/Schedule'
import Signup from '../pages/Signup'
import Tips from '../pages/Tips'
import WorkshopDetail from '../pages/WorkshopDetailPage'
import Workshops from '../pages/Workshops'

import { getAvailableLangs, getUrlPattern } from '../routeTable'
import { Year } from '../proptypes'

import styles from './App.css'

const getAppRoutes = () => {
  const langs = getAvailableLangs()
  const routes = langs.map(routeLang => [
    <Route key={`${routeLang}accomodation`} component={Accomodation} path={getUrlPattern(routeLang, 'accomodation')} />,
    <Route key={`${routeLang}archiveYearDetail`} component={ArchivedYear} path={getUrlPattern(routeLang, 'archiveYearDetail')} />,
    <Route key={`${routeLang}conditions`} component={Rules} path={getUrlPattern(routeLang, 'conditions')} />,
    <Route key={`${routeLang}contact`} component={Contact} path={getUrlPattern(routeLang, 'contact')} />,
    <Route key={`${routeLang}fees`} component={Fees} path={getUrlPattern(routeLang, 'fees')} />,
    <Route key={`${routeLang}food`} component={Food} path={getUrlPattern(routeLang, 'food')} />,
    <Route key={`${routeLang}home`} component={Home} exact path={getUrlPattern(routeLang, 'home')} />,
    <Route key={`${routeLang}location`} component={Locations} path={getUrlPattern(routeLang, 'location')} />,
    <Route key={`${routeLang}newPassword`} component={NewPasswordPage} path={getUrlPattern(routeLang, 'participantNewPassword')} />,
    <Route key={`${routeLang}newsDetail`} component={NewsDetail} path={getUrlPattern(routeLang, 'newsDetail')} />,
    <Route key={`${routeLang}participantForgottenPassword`} component={ForgottenPassword} path={getUrlPattern(routeLang, 'participantForgottenPassword')} />,
    <Route key={`${routeLang}performerDetail`} component={PerformerDetail} path={getUrlPattern(routeLang, 'performerDetail')} />,
    <Route key={`${routeLang}schedule`} component={Schedule} path={getUrlPattern(routeLang, 'schedule')} />,
    <Route key={`${routeLang}signup`} component={Signup} path={getUrlPattern(routeLang, 'signup')} />,
    <Route key={`${routeLang}tips`} component={Tips} path={getUrlPattern(routeLang, 'tips')} />,
    <Route key={`${routeLang}workshopDetail`} component={WorkshopDetail} path={getUrlPattern(routeLang, 'workshopDetail')} />,
    <Route key={`${routeLang}workshops`} component={Workshops} exact path={getUrlPattern(routeLang, 'workshops')} />,
    <PrivateRoute key={`${routeLang}participantHome`} path={getUrlPattern(routeLang, 'participantHome')} component={ParticipantSwitchPage} />
  ]).reduce((aggr, langRoutes) => aggr.concat(langRoutes), [])
  routes.push(<Route key='languageRedirect' exact path='/' component={LanguageRedirect} />)
  routes.push(<Route key='notfound' component={NotFound} />)
  return routes
}

class App extends Component {
  constructor (props) {
    super(props)
    props.onMount()
  }

  render () {
    const {
      activeRequests,
      currentYear,
      entryPath,
      host,
      lang,
      participant,
      progress,
      onLogout,
      translate,
      years
    } = this.props

    if ((!progress.failed && !progress.valid) || progress.loading || !lang) {
      return <AppLoader />
    }

    if (progress.failed) {
      return <AppCrash />
    }

    const routes = getAppRoutes()
    return (
      <div className={styles.app}>
        <CrashHandler>
          <AppHelmet
            entryPath={entryPath}
            host={host}
            translate={translate}
            year={currentYear}
          />
          <Navigation
            currentYear={currentYear}
            lang={lang}
            participant={participant}
            years={years}
            onLogout={onLogout}
          />
          <ProgressBar activeRequests={activeRequests} />
          <div className='app-content'>
            <Switch>
              {routes}
            </Switch>
          </div>
          <Footer partners={[]} />
        </CrashHandler>
      </div>
    )
  }
}

App.propTypes = {
  activeRequests: PropTypes.number,
  currentYear: Year,
  entryPath: PropTypes.string,
  host: PropTypes.string,
  lang: PropTypes.string,
  participant: PropTypes.object,
  progress: ResourceProgress.isRequired,
  onMount: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(Year)
}

App.defaultProps = {
  activeRequests: 0,
  currentYear: null,
  entryPath: null,
  host: null,
  lang: null,
  participant: null,
  years: null
}

export default App

/*
<Route
path={urlTable['participantChangeWorkshop']}
component={ChangeWorkshop}
isLoggedIn={participant}
/>
*/
