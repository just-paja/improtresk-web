import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

import Button from '../../components/Button';
import FormErrors from '../../forms/containers/FormErrors';
import Input from '../../forms/components/Input';
import InputDate from '../../forms/components/InputDate';
import InputCheckbox from '../../forms/components/InputCheckbox';
import InputSelect from '../../forms/components/InputSelect';
import Link from '../../containers/Link';
import Message from '../../containers/Message';

export default class Signup extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    this.props.onChange(this.props.form, name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.form);
  }

  render() {
    const {
      disabled,
      errors,
      sending,
      submitErrors,
      submitted,
      teams,
      values,
    } = this.props;

    const rulesLabel = <span>Souhlasím s <Link to="conditions">podmínkami festivalu</Link></span>;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          disabled={disabled}
          help={<Message name="participants.fullNameHelp" />}
          label={<Message name="participants.fullName" />}
          name="name"
          onChange={this.handleChange}
          error={errors.name}
          value={values.name}
          touched={submitted}
        />
        <Input
          disabled={disabled}
          help={<Message name="participants.emailHelp" />}
          label={<Message name="participants.email" />}
          name="email"
          onChange={this.handleChange}
          type="email"
          error={errors.email}
          value={values.email}
          touched={submitted}
        />
        <Input
          disabled={disabled}
          help={<Message name="participants.phoneNumberHelp" />}
          label={<Message name="participants.phoneNumber" />}
          name="phone"
          onChange={this.handleChange}
          placeholder="000000000"
          error={errors.phone}
          value={values.phone}
          touched={submitted}
        />
        <InputDate
          disabled={disabled}
          help={<Message name="participants.dateOfBirthHelp" />}
          label={<Message name="participants.dateOfBirth" />}
          name="birthday"
          onChange={this.handleChange}
          error={errors.birthday}
          value={values.birthday}
          touched={submitted}
        />
        <Row>
          <Col sm={6}>
            <Input
              disabled={disabled}
              label={<Message name="participants.password" />}
              name="password"
              onChange={this.handleChange}
              error={errors.password}
              value={values.password}
              touched={submitted}
              type="password"
            />
          </Col>
          <Col sm={6}>
            <Input
              disabled={disabled}
              label={<Message name="participants.passwordCheck" />}
              name="passwordCheck"
              onChange={this.handleChange}
              error={errors.passwordCheck}
              value={values.passwordCheck}
              touched={submitted}
              type="password"
            />
          </Col>
        </Row>
        <InputSelect
          disabled={disabled}
          help={<Message name="participants.teamHelp" />}
          label={<Message name="participants.team" />}
          name="team_name"
          onChange={this.handleChange}
          error={errors.team_name}
          value={values.team_name}
          touched={submitted}
          options={teams}
        />
        <InputCheckbox
          disabled={disabled}
          name="rules_accepted"
          label={rulesLabel}
          error={errors.rules_accepted}
          onChange={this.handleChange}
          value={values.rules_accepted}
        />
        <InputCheckbox
          disabled={disabled}
          name="newsletter"
          label={<Message name="participants.newsletter" />}
          error={errors.newsletter}
          onChange={this.handleChange}
          value={values.newsletter}
        />
        <FormErrors errors={submitErrors} />
        <Button
          disabled={disabled}
          bsStyle="primary"
          icon="user-plus"
          loading={sending}
          type="submit"
        >
          <Message name="participants.register" />
        </Button>
      </Form>
    );
  }
}

Signup.propTypes = {
  disabled: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  sending: PropTypes.bool,
  submitErrors: PropTypes.arrayOf(PropTypes.string),
  submitted: PropTypes.bool,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.object.isRequired,
};

Signup.defaultProps = {
  disabled: false,
  sending: false,
  submitErrors: null,
  submitted: false,
};
