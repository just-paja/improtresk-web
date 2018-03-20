import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'reactstrap/lib/Row';

import { FormData } from '../../proptypes';

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
    this.props.onChange(this.props.formData.formName, name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.formData.formName);
  }

  render() {
    const {
      disabled,
      formData,
      teams,
    } = this.props;

    const rulesLabel = <span>Souhlasím s <Link to="conditions">podmínkami festivalu</Link></span>;
    const busy = disabled || formData.loading;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          disabled={busy}
          help={<Message name="participants.fullNameHelp" />}
          label={<Message name="participants.fullName" />}
          name="name"
          onChange={this.handleChange}
          error={formData.fieldErrors.name}
          value={formData.values.name}
          touched={formData.submitted}
        />
        <Input
          disabled={busy}
          help={<Message name="participants.emailHelp" />}
          label={<Message name="participants.email" />}
          name="email"
          onChange={this.handleChange}
          type="email"
          error={formData.fieldErrors.email}
          value={formData.values.email}
          touched={formData.submitted}
        />
        <Input
          disabled={busy}
          help={<Message name="participants.phoneNumberHelp" />}
          label={<Message name="participants.phoneNumber" />}
          name="phone"
          onChange={this.handleChange}
          placeholder="000000000"
          error={formData.fieldErrors.phone}
          value={formData.values.phone}
          touched={formData.submitted}
        />
        <InputDate
          disabled={busy}
          help={<Message name="participants.dateOfBirthHelp" />}
          label={<Message name="participants.dateOfBirth" />}
          name="birthday"
          onChange={this.handleChange}
          error={formData.fieldErrors.birthday}
          value={formData.values.birthday}
          touched={formData.submitted}
        />
        <Row>
          <Col sm={6}>
            <Input
              disabled={busy}
              label={<Message name="participants.password" />}
              name="password"
              onChange={this.handleChange}
              error={formData.fieldErrors.password}
              value={formData.values.password}
              touched={formData.submitted}
              type="password"
            />
          </Col>
          <Col sm={6}>
            <Input
              disabled={busy}
              label={<Message name="participants.passwordCheck" />}
              name="passwordCheck"
              onChange={this.handleChange}
              error={formData.fieldErrors.passwordCheck}
              value={formData.values.passwordCheck}
              touched={formData.submitted}
              type="password"
            />
          </Col>
        </Row>
        <InputSelect
          disabled={busy}
          help={<Message name="participants.teamHelp" />}
          label={<Message name="participants.team" />}
          name="team_name"
          onChange={this.handleChange}
          error={formData.fieldErrors.team_name}
          value={formData.values.team_name}
          touched={formData.submitted}
          options={teams}
        />
        <Col xs={12}>
          <InputCheckbox
            disabled={busy}
            name="rules_accepted"
            label={rulesLabel}
            error={formData.fieldErrors.rules_accepted}
            onChange={this.handleChange}
            value={formData.values.rules_accepted}
          />
          <InputCheckbox
            disabled={busy}
            name="newsletter"
            label={<Message name="participants.newsletter" />}
            error={formData.fieldErrors.newsletter}
            onChange={this.handleChange}
            value={formData.values.newsletter}
          />
        </Col>
        <FormErrors errors={formData.submitErrors} />
        <Button
          disabled={busy}
          color="primary"
          icon="user-plus"
          loading={formData.loading}
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
  formData: FormData.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Signup.defaultProps = {
  disabled: false,
};
