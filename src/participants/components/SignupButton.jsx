import Alert from 'reactstrap/lib/Alert';
import Button from 'reactstrap/lib/Button';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import HumanDate from '../../components/HumanDate';
import LinkContainer from '../../containers/LinkContainer';
import Message from '../../containers/Message';

const getSignupText = (endAt, startAt, alreadyFull) => {
  if (moment().isBefore(startAt)) {
    return {
      disabled: true,
      showStartDate: true,
      textButton: null,
    };
  }

  if (moment().isAfter(endAt)) {
    return {
      disabled: true,
      showStartDate: false,
      textButton: 'participants.signupsAlreadyClosed',
    };
  }

  if (alreadyFull) {
    return {
      disabled: true,
      showStartDate: false,
      textButton: 'participants.signupsAlreadyFull',
    };
  }

  return {
    disabled: false,
    showStartDate: false,
    textButton: 'participants.signupToFestival',
  };
};

const SignupButton = ({
  alreadyFull,
  endAt,
  startAt,
}) => {
  const {
    disabled,
    showStartDate,
    textButton,
  } = getSignupText(endAt, startAt, alreadyFull);

  if (!startAt) {
    return null;
  }

  return (
    <div>
      {(showStartDate ?
        <Alert color="info">
          <Message name="participants.signupsWillOpen" />
          {' '}
          <HumanDate date={startAt} showTime />
        </Alert> :
        <LinkContainer to="signup">
          <Button disabled={disabled} color="primary">
            <Message name={textButton} />
          </Button>
        </LinkContainer>
      )}
    </div>
  );
};

SignupButton.propTypes = {
  alreadyFull: PropTypes.bool,
  endAt: PropTypes.string,
  startAt: PropTypes.string,
};

SignupButton.defaultProps = {
  alreadyFull: false,
  endAt: null,
  startAt: null,
};

export default SignupButton;
