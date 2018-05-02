import Col from 'reactstrap/lib/Col';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';

import { getUrlParams } from 'query-string-manipulator';

import Container from '../../components/Container';
import HelmetTitle from '../../containers/HelmetTitle';
import SignupCountdown from '../../years/containers/SignupCountdown';
import SignupIntro from '../../participants/components/SignupIntro';
import SignupTooLate from '../../participants/components/SignupTooLate';
import SignupWillOpen from '../../participants/components/SignupWillOpen';
import SignupOpenDateUnsure from '../../participants/components/SignupOpenDateUnsure';
import UserEntry from '../../components/UserEntry';

import styles from './Signup.css';

export default class Signup extends Component {
  componentDidMount() {
    const params = getUrlParams(this.props.location.search)
      .filter(param => param.key === 'redirectTo');
    this.props.onRedirectSet(params.length === 0 ? null : params[0].value);
  }
  render() {
    const {
      signupsClosed,
      onSignupsOpen,
      signupsOpen,
      signupsOpenDate,
      translate,
    } = this.props;
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
  }
}

Signup.propTypes = {
  location: PropTypes.object.isRequired,
  onRedirectSet: PropTypes.func.isRequired,
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
