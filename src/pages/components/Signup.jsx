import Col from 'reactstrap/lib/Col';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import HelmetTitle from '../../containers/HelmetTitle';
import SignupCountdown from '../../years/containers/SignupCountdown';
import SignupIntro from '../../participants/components/SignupIntro';
import SignupTooLate from '../../participants/components/SignupTooLate';
import SignupWillOpen from '../../participants/components/SignupWillOpen';
import SignupOpenDateUnsure from '../../participants/components/SignupOpenDateUnsure';
import UserEntry from '../../components/UserEntry';

import styles from './Signup.css';

const Signup = ({
  signupsClosed,
  onSignupsOpen,
  signupsOpen,
  signupsOpenDate,
  translate,
}) => {
  let content;
  if (signupsOpenDate && signupsClosed) {
    content = <SignupTooLate />;
  } else if (signupsOpenDate && !signupsOpen) {
    content = <SignupWillOpen signupsOpenDate={signupsOpenDate} />;
  }
  return (
    <div>
      <Container>
        <HelmetTitle title={translate('pages.signup')} />
        <Row>
          <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
            <h1 className="decent">{translate('pages.signup')}</h1>
            <SignupIntro />
            {signupsOpenDate ? content : <SignupOpenDateUnsure />}
            <UserEntry />
          </Col>
        </Row>
      </Container>
      <hr />
      <div className={styles.signupsOpenDate}>
        <SignupCountdown onOpen={onSignupsOpen} />
      </div>
    </div>
  );
};

Signup.propTypes = {
  onSignupsOpen: PropTypes.func,
  signupsClosed: PropTypes.bool,
  signupsOpen: PropTypes.bool,
  signupsOpenDate: PropTypes.string,
  translate: PropTypes.func.isRequired,
};

Signup.defaultProps = {
  onSignupsOpen: null,
  signupsClosed: false,
  signupsOpen: false,
  signupsOpenDate: null,
};

export default Signup;
