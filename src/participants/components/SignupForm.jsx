import Col from 'reactstrap/lib/Col';
import React from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

import { Field } from 'redux-form';

import { FormGeneralError } from '../../proptypes';

import Button from '../../components/Button';
import Form from '../../forms/components/Form';
import Input from '../../forms/components/Input';
import InputCheckbox from '../../forms/components/InputCheckbox';
import InputSelect from '../../forms/components/InputSelect';
import Link from '../../containers/Link';
import Message from '../../containers/Message';
import SignupSuccess from './SignupSuccess';

const SignupForm = ({
  disabled,
  error,
  form,
  pristine,
  submit,
  submitSucceeded,
  submitting,
  teams,
}) => {
  const rulesLabel = <span>Souhlasím s <Link to="conditions">podmínkami festivalu</Link></span>;
  const busy = disabled || submitting;

  if (submitSucceeded) {
    return <SignupSuccess />;
  }

  return (
    <Form error={error} name={form} onSubmit={submit}>
      <Field
        name="name"
        component={Input}
        disabled={busy}
        help="participants.fullNameHelp"
        label="participants.fullName"
      />
      <Field
        component={Input}
        disabled={busy}
        help="participants.emailHelp"
        label="participants.email"
        name="email"
        type="email"
      />
      <Field
        component={Input}
        disabled={busy}
        help="participants.phoneNumberHelp"
        label="participants.phoneNumber"
        name="phone"
        placeholder="000000000"
      />
      <Field
        component={Input}
        disabled={busy}
        help="participants.dateOfBirthHelp"
        label="participants.dateOfBirth"
        name="birthday"
        type="date"
      />
      <Field
        component={InputSelect}
        disabled={busy}
        help="participants.teamHelp"
        label="participants.team"
        name="team_name"
        options={teams}
        simpleValue
      />
      <Row>
        <Col sm={6}>
          <Field
            component={Input}
            disabled={busy}
            label="participants.password"
            name="password"
            type="password"
          />
        </Col>
        <Col sm={6}>
          <Field
            component={Input}
            disabled={busy}
            label="participants.passwordCheck"
            name="passwordCheck"
            type="password"
          />
        </Col>
      </Row>
      <Col xs={12}>
        <Field
          component={InputCheckbox}
          disabled={busy}
          name="rules_accepted"
          label={rulesLabel}
        />
        <Field
          component={InputCheckbox}
          disabled={busy}
          name="newsletter"
          label="participants.newsletter"
        />
      </Col>
      <Button
        disabled={disabled || pristine}
        color="primary"
        icon="user-plus"
        loading={busy}
        type="submit"
      >
        <Message name="participants.register" />
      </Button>
    </Form>
  );
};

SignupForm.propTypes = {
  disabled: PropTypes.bool,
  error: FormGeneralError,
  form: PropTypes.string.isRequired,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  submit: PropTypes.func.isRequired,
};

SignupForm.defaultProps = {
  disabled: false,
  error: null,
  pristine: false,
  submitting: false,
  submitSucceeded: false,
};

export default SignupForm;
