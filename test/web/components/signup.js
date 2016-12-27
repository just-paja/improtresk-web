import React from 'react';
import sinon from 'sinon';

import { Checkbox, Form, FormControl, FormGroup } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Link from '../../../src/web/components/link';
import Input from '../../../src/web/components/input';
import InputDate from '../../../src/web/components/inputDate';
import InputSelect from '../../../src/web/components/inputSelect';
import Signup from '../../../src/web/components/signup';

describe('Signup Form component', () => {
  it('renders the form', () => {
    expect(shallow(
      <Signup
        form="signup"
        onChange={() => {}}
        errors={{
          name: 'name error',
          email: 'email error',
          phone: 'phone error',
          dob: 'dob error',
          team: 'team error',
        }}
        values={{
          name: 'name value',
          email: 'email value',
          phone: 'phone value',
          dob: 'dob value',
          team: 'team value',
        }}
      />
    ).node).to.eql(
      <Form>
        <Input
          help="Jméno, příjmení a ostatní jména která nalezneš na svém občanském průkazu"
          label="Tvoje celé jméno"
          name="name"
          onChange={() => {}}
          error="name error"
          value="name value"
        />
        <Input
          help={
            'Přes tento e-mail s vámi budeme komunikovat ohledně přihlášky. Určitě ' +
            'chceš vyplnit správný.'
          }
          label="E-mail"
          name="email"
          onChange={() => {}}
          type="email"
          error="email error"
          value="email value"
        />
        <Input
          help={
            'Pokud zjistíme že se něco nepovedlo, tak ti budeme volat. Pokud telefon nevyplníš, ' +
            'bereš zodpovědnost na sebe.'
          }
          label="Telefonní číslo"
          name="phone"
          onChange={() => {}}
          error="phone error"
          value="phone value"
        />
        <InputDate
          help={
            'V pravidlech festivalu se dočtete o věkovém limitu. Musíme si ověřit váš věk také ' +
            'abychom vás mohli lépe vyúčtovat.'
          }
          label="Datum narození"
          name="dob"
          onChange={() => {}}
          error="dob error"
          value="dob value"
        />
        <InputSelect
          help={
            'Tento údaj použijeme pro malé sčítání improvizátorů, ale také při rozdělování ' +
            'mistností na spaní'
          }
          label="Tvoje skupina"
          name="team"
          onChange={() => {}}
          options={[
            { value: 'foo', label: 'Foo' },
            { value: 'bar', label: 'Bar' },
          ]}
          error="team error"
          value="team value"
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
  });
  it('injects form name into onChange', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Signup
        form="signup"
        onChange={changeSpy}
        errors={{}}
        values={{}}
      />
    );

    comp.find('Input').at(0).simulate('change', 'name', 'foo');
    expect(changeSpy.args).to.eql([
      ['signup', 'name', 'foo'],
    ]);
  });
});
