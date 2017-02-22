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
      onChange,
      onSubmit,
      signupsOpen,
      signupsOpenDate,
      ready,
      signup,
    } = this.props;

    const title = 'Přihláška';

    if (!ready) {
      return null;
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
        {
          signupsOpen ? (
            <div>
              <p>
                Napřed tě musíme dostat do systému. Je to jen pár jednoduchých otázek na
                které potřebujeme znát odpověď. Určitě by to nemělo zabrat víc jak dvě
                minuty. <b>V druhém kroce</b> si můžeš poskládat Improtřesk tak jak ti
                bude vyhovovat, tedy vybrat workshop, jídlo a ubytování.
              </p>
              <UserEntry
                onSignupChange={onChange}
                onSignupSubmit={onSubmit}
                signup={signup}
              />
            </div>
          ) : (
            <div>
              <p>
                Přihlašování se na této stránce otevře
                {' '}
                <HumanDate date={signupsOpenDate} showTime />.
                Do té doby máš šanci zvážit na jaký workshop chceš. Doporučujeme se přihlásit
                spíš dřív, letos očekáváme davovou tlačenici.
              </p>
              <div className={styles.signupsOpenDate}>
                <Countdown date={signupsOpenDate} />
              </div>
            </div>
          )
        }
        <hr />
        <SignupHowto />
      </Container>
    );
  }
}

SignupPage.propTypes = {
  onMount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  signupsOpen: PropTypes.bool,
  signupsOpenDate: PropTypes.string,
  ready: PropTypes.bool,
  signup: PropTypes.object,
};

SignupPage.defaultProps = {
  signupsOpen: false,
  signupsOpenDate: null,
  ready: false,
  signup: null,
};
