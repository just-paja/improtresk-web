import Helmet from 'react-helmet';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import Countdown from '../../components/Countdown';
import HumanDate from '../../components/HumanDate';
import UserEntry from '../../components/UserEntry';
import SignupHowto from '../../participants/components/SignupHowto';

import styles from './Signup.css';

export default class Signup extends Component {
  componentWillMount() {
  }

  render() {
    const {
      login,
      onLoginChange,
      onLoginSubmit,
      onSignupsChange,
      signupsClosed,
      onSignupsOpen,
      onSignupsSubmit,
      signupsOpen,
      signupsOpenDate,
      signup,
      teams,
      year,
    } = this.props;

    const title = 'Přihláška';

    let content;

    if (signupsOpenDate) {
      if (signupsClosed) {
        content = (
          <div>
            <p>
              Ajajaj, už je pozdě na přihlašování.
            </p>
            <div className={styles.signupsOpenDate}>
              Přihlášky pro tento ročník jsou už uzavřeny
            </div>
          </div>
        );
      } else if (signupsOpen) {
        content = (
          <div>
            <p>
              Napřed tě musíme dostat do systému. Je to jen pár jednoduchých otázek na
              které potřebujeme znát odpověď. Určitě by to nemělo zabrat víc jak pět
              minut. <b>V druhém kroce</b> si můžeš poskládat Improtřesk tak jak ti
              bude vyhovovat, tedy vybrat workshop, jídlo a ubytování.
            </p>
            <div className={styles.signupsOpenDate}>
              <Countdown
                date={year.startDate}
                countdownMessage="Přihlášky se uzavřou"
                readyMessage="Přihlášky jsou uzavřené"
                suffix
              />
            </div>
            <UserEntry
              login={login}
              onLoginChange={onLoginChange}
              onLoginSubmit={onLoginSubmit}
              onSignupChange={onSignupsChange}
              onSignupSubmit={onSignupsSubmit}
              signup={signup}
              teams={teams}
            />
          </div>
        );
      } else {
        content = (
          <div>
            <p>
              Přihlašování se na této stránce otevře
              {' '}
              <HumanDate date={signupsOpenDate} showTime />.
              Do té doby máš šanci zvážit na jaký workshop chceš. Doporučujeme se přihlásit
              spíš dřív, letos očekáváme davovou tlačenici.
            </p>
            <div className={styles.signupsOpenDate}>
              <Countdown
                date={signupsOpenDate}
                countdownMessage="Přihlášky se otevřou"
                onFinish={onSignupsOpen}
                readyMessage="Přihlášky jsou otevřené"
                suffix
              />
            </div>
          </div>
        );
      }
    } else {
      content = (
        <div>
          <p>
            Tento ročník ještě nemá vypsaný datum otevření přihlášek.
            Sleduj Facebook a novinky ať se včas dozvíš kdy to bude.
          </p>
          <div className={styles.signupsOpenDate}>
            Zatím nemáme datum otevření přihlášek
          </div>
        </div>
      );
    }

    return (
      <Container>
        <Helmet
          title={title}
          meta={[
            { property: 'og:title', content: title },
          ]}
        />
        <h1>{title}</h1>
        {content}
        <hr />
        <SignupHowto />
      </Container>
    );
  }
}

Signup.propTypes = {
  login: PropTypes.object,
  onLoginChange: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
  onSignupsChange: PropTypes.func.isRequired,
  onSignupsOpen: PropTypes.func,
  onSignupsSubmit: PropTypes.func.isRequired,
  signupsClosed: PropTypes.bool,
  signupsOpen: PropTypes.bool,
  signupsOpenDate: PropTypes.string,
  signup: PropTypes.object,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  year: PropTypes.shape({
    startDate: PropTypes.string,
  }),
};

Signup.defaultProps = {
  login: null,
  onSignupsOpen: null,
  signupsClosed: false,
  signupsOpen: false,
  signupsOpenDate: null,
  signup: null,
  year: null,
};
