import Col from 'reactstrap/lib/Col';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import HelmetTitle from '../../containers/HelmetTitle';
import HumanDate from '../../components/HumanDate';
import SignupCountdown from '../../years/containers/SignupCountdown';
import SignupHowto from '../../participants/components/SignupHowto';
import SignupIntro from '../../participants/components/SignupIntro';
import SignupTooLate from '../../participants/components/SignupTooLate';
import UserEntry from '../../components/UserEntry';

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
      translate,
    } = this.props;

    const title = translate('pages.signup');

    let content;

    if (signupsOpenDate) {
      if (signupsClosed) {
        content = <SignupTooLate />;
      } else if (signupsOpen) {
        content = (
          <div>
            <SignupIntro />
            <div className={styles.signupsOpenDate}>
              <SignupCountdown onOpen={onSignupsOpen} />
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
              <SignupCountdown onOpen={onSignupsOpen} />
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
        <HelmetTitle title={title} />
        <Row>
          <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
            <h1 className="decent">{title}</h1>
            {content}
          </Col>
        </Row>
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
  translate: PropTypes.func.isRequired,
};

Signup.defaultProps = {
  login: null,
  onSignupsOpen: null,
  signupsClosed: false,
  signupsOpen: false,
  signupsOpenDate: null,
  signup: null,
};
