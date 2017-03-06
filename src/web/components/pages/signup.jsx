import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import Countdown from '../countdown';
import HumanDate from '../humanDate';
import UserEntry from '../userEntry';
import SignupHowto from '../signupHowto';

import styles from './signup.css';

export default class SignupPage extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const {
      login,
      onLoginChange,
      onLoginSubmit,
      onSignupsChange,
      onSignupsOpen,
      onSignupsSubmit,
      signupsOpen,
      signupsOpenDate,
      ready,
      signup,
    } = this.props;

    const title = 'Přihláška';

    if (!ready) {
      return null;
    }
    /* eslint-disable no-nested-ternary */
    return (
      <Container>
        <Helmet
          title={title}
          meta={[
            { property: 'og:title', content: title },
          ]}
        />
        <h1>{title}</h1>
        {
          signupsOpen ? (
            <div>
              <p>
                Napřed tě musíme dostat do systému. Je to jen pár jednoduchých otázek na
                které potřebujeme znát odpověď. Určitě by to nemělo zabrat víc jak pět
                minut. <b>V druhém kroce</b> si můžeš poskládat Improtřesk tak jak ti
                bude vyhovovat, tedy vybrat workshop, jídlo a ubytování.
              </p>
              <UserEntry
                login={login}
                onLoginChange={onLoginChange}
                onLoginSubmit={onLoginSubmit}
                onSignupChange={onSignupsChange}
                onSignupSubmit={onSignupsSubmit}
                signup={signup}
              />
            </div>
          ) : (
            signupsOpenDate ? (
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
            ) : (
              <div>
                <p>Buď jdeš moc pozdě nebo moc brzo.</p>
                <div className={styles.signupsOpenDate}>
                  Přihlášky jsou v tuto chvíli uzavřeny
                </div>
              </div>
            )
          )
        }
        <hr />
        <SignupHowto />
      </Container>
    );
  }
}

SignupPage.propTypes = {
  login: PropTypes.object,
  onMount: PropTypes.func.isRequired,
  onLoginChange: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
  onSignupsChange: PropTypes.func.isRequired,
  onSignupsOpen: PropTypes.func,
  onSignupsSubmit: PropTypes.func.isRequired,
  signupsOpen: PropTypes.bool,
  signupsOpenDate: PropTypes.string,
  ready: PropTypes.bool,
  signup: PropTypes.object,
};

SignupPage.defaultProps = {
  login: null,
  onSignupsOpen: null,
  signupsOpen: false,
  signupsOpenDate: null,
  ready: false,
  signup: null,
};
