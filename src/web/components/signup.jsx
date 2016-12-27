import Checkbox from 'react-bootstrap/lib/Checkbox';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import React, { Component, PropTypes } from 'react';

import Link from './link';
import Input from './input';
import InputSelect from './inputSelect';

export default class Signup extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, value) {
    this.props.onChange(this.props.form, name, value);
  }

  render() {
    const { errors, values } = this.props;

    return (
      <Form>
        <Input
          help="Jméno, příjmení a ostatní jména která nalezneš na svém občanském průkazu"
          label="Tvoje celé jméno"
          name="name"
          onChange={this.handleChange}
          error={errors.name}
          value={values.name}
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
        />
        <Input
          help={
            'V pravidlech festivalu se dočtete o věkovém limitu. Musíme si ověřit váš věk také ' +
            'abychom vás mohli lépe vyúčtovat.'
          }
          label="Datum narození"
          name="dob"
          onChange={this.handleChange}
          error={errors.dob}
          value={values.dob}
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
        />
        <FormGroup>
          <Checkbox
            name="rules"
            label="pravidla"
            inline
          >Souhlasím s <Link to="conditions">podmínkami festivalu</Link></Checkbox>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <Checkbox
            name="newsletter"
            label="pravidla"
            inline
          >Chci dostávat e-mailem novinky o událostech Improligy</Checkbox>
          <FormControl.Feedback />
        </FormGroup>
      </Form>
    );
  }
}

Signup.propTypes = {
  form: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};
