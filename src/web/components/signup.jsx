import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import Button from './button';
import FormErrors from './formErrors';
import Link from './link';
import Input from './input';
import InputCheckbox from './inputCheckbox';
import InputDate from './inputDate';
import InputSelect from './inputSelect';

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
    const { disabled, errors, sending, submitErrors, submitted, values } = this.props;

    const rulesLabel = <span>Souhlasím s <Link to="conditions">podmínkami festivalu</Link></span>;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          disabled={disabled}
          help="Jméno, příjmení a ostatní jména která nalezneš na svém občanském průkazu"
          label="Tvoje celé jméno"
          name="name"
          onChange={this.handleChange}
          error={errors.name}
          value={values.name}
          touched={submitted}
        />
        <Input
          disabled={disabled}
          help={
            'Přes tento e-mail s vámi budeme komunikovat ohledně přihlášky. Určitě ' +
            'chceš vyplnit správný.'
          }
          label="E-mail"
          name="email"
          onChange={this.handleChange}
          type="email"
          error={errors.email}
          value={values.email}
          touched={submitted}
        />
        <Input
          disabled={disabled}
          help={
            'Pokud zjistíme že se něco nepovedlo, tak ti budeme volat. Pokud telefon nevyplníš, ' +
            'bereš zodpovědnost na sebe.'
          }
          label="Telefonní číslo"
          name="phone"
          onChange={this.handleChange}
          placeholder="000000000"
          error={errors.phone}
          value={values.phone}
          touched={submitted}
        />
        <InputDate
          disabled={disabled}
          help={
            'V pravidlech festivalu se dočtete o věkovém limitu. Musíme si ověřit váš věk také ' +
            'abychom vás mohli lépe vyúčtovat.'
          }
          label="Datum narození"
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
              label="Heslo"
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
              label="Kontrola hesla"
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
          help={
            'Tento údaj použijeme pro malé sčítání improvizátorů, ale také při rozdělování ' +
            'mistností na spaní'
          }
          label="Tvoje skupina"
          name="team_name"
          onChange={this.handleChange}
          error={errors.team_name}
          value={values.team_name}
          touched={submitted}
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
          label="Chci dostávat e-mailem novinky o událostech Improligy"
          error={errors.newsletter}
          onChange={this.handleChange}
          value={values.newsletter}
        />
        <FormErrors errors={submitErrors} />
        <Button
          disabled={disabled}
          bsStyle="primary"
          loading={sending}
          type="submit"
        >Zaregistrovat</Button>
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
  values: PropTypes.object.isRequired,
  sending: PropTypes.bool,
  submitErrors: PropTypes.arrayOf(PropTypes.string),
  submitted: PropTypes.bool,
};

Signup.defaultProps = {
  disabled: false,
  sending: false,
  submitErrors: null,
  submitted: false,
};
