import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import moment from 'moment';
import React, { PropTypes } from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import HumanDate from './humanDate';

import { reverse } from '../routes';

const getSignupText = (endAt, startAt, alreadyFull) => {
  if (moment().isBefore(startAt)) {
    return {
      disabled: true,
      showStartDate: true,
      textButton: 'Přihlašování se ještě neotevřelo',
    };
  }

  if (moment().isAfter(endAt)) {
    return {
      disabled: true,
      showStartDate: false,
      textButton: 'Přihlašování již bylo uzavřeno',
    };
  }

  if (alreadyFull) {
    return {
      disabled: true,
      showStartDate: false,
      textButton: 'Všechna místa jsou obsazena',
    };
  }

  return {
    disabled: false,
    showStartDate: false,
    textButton: 'Přihlásit na Improtřesk',
  };
};

const SignupButton = ({ endAt, startAt, alreadyFull }) => {
  const { disabled, showStartDate, textButton } = getSignupText(endAt, startAt, alreadyFull);

  return (
    <div>
      {(showStartDate ?
        <Alert bsStyle="warning">
          Přihlašování se otevře <HumanDate date={startAt} showTime />
        </Alert> :
        <LinkContainer to={reverse('signup')}>
          <Button disabled={disabled} bsStyle="primary">{textButton}</Button>
        </LinkContainer>
      )}
    </div>
  );
};

SignupButton.propTypes = {
  alreadyFull: PropTypes.bool,
  endAt: PropTypes.string.isRequired,
  startAt: PropTypes.string.isRequired,
};

SignupButton.defaultProps = {
  alreadyFull: false,
};

export default SignupButton;
