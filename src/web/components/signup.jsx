import Form from 'react-bootstrap/lib/Form';
import React, { Component, PropTypes } from 'react';

import Button from './button';
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
    const { errors, sending, submitted, values } = this.props;

    const rulesLabel = <span>Souhlasím s <Link to="conditions">podmínkami festivalu</Link></span>;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          help="Jméno, příjmení a ostatní jména která nalezneš na svém občanském průkazu"
          label="Tvoje celé jméno"
          name="name"
          onChange={this.handleChange}
          error={errors.name}
          value={values.name}
          touched={submitted}
        />
        <Input
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
          help={
            'Pokud zjistíme že se něco nepovedlo, tak ti budeme volat. Pokud telefon nevyplníš, ' +
            'bereš zodpovědnost na sebe.'
          }
          label="Telefonní číslo"
          name="phone"
          onChange={this.handleChange}
          error={errors.phone}
          value={values.phone}
          touched={submitted}
        />
        <InputDate
          help={
            'V pravidlech festivalu se dočtete o věkovém limitu. Musíme si ověřit váš věk také ' +
            'abychom vás mohli lépe vyúčtovat.'
          }
          label="Datum narození"
          name="dob"
          onChange={this.handleChange}
          error={errors.dob}
          value={values.dob}
          touched={submitted}
        />
        <InputSelect
          help={
            'Tento údaj použijeme pro malé sčítání improvizátorů, ale také při rozdělování ' +
            'mistností na spaní'
          }
          label="Tvoje skupina"
          name="team"
          onChange={this.handleChange}
          options={[
            { value: 'foo', label: 'Foo' },
            { value: 'bar', label: 'Bar' },
          ]}
          error={errors.team}
          value={values.team}
          touched={submitted}
        />
        <InputCheckbox
          name="rules"
          label={rulesLabel}
          error={errors.rules}
          onChange={this.handleChange}
          value={values.rules}
        />
        <InputCheckbox
          name="newsletter"
          label="Chci dostávat e-mailem novinky o událostech Improligy"
          error={errors.newsletter}
          onChange={this.handleChange}
          value={values.newsletter}
        />
        <Button
          bsStyle="primary"
          loading={sending}
          type="submit"
        >Zaregistrovat</Button>
      </Form>
    );
  }
}

Signup.propTypes = {
  errors: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  sending: PropTypes.bool,
  submitted: PropTypes.bool,
};

Signup.defaultProps = {
  sending: false,
  submitted: false,
};
