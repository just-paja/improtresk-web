import React from 'react';
import sinon from 'sinon';

import { Col, Form, Row } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Button from '../../../src/web/components/button';
import FormErrors from '../../../src/web/components/formErrors';
import Link from '../../../src/web/components/link';
import Input from '../../../src/web/components/input';
import InputCheckbox from '../../../src/web/components/inputCheckbox';
import InputDate from '../../../src/web/components/inputDate';
import InputSelect from '../../../src/web/components/inputSelect';
import Signup from '../../../src/web/components/signup';

describe('Signup Form component', () => {
  it('renders form', () => {
    expect(shallow(
      <Signup
        form="signup"
        onChange={() => {}}
        onSubmit={() => {}}
        errors={{
          name: 'name error',
          email: 'email error',
          phone: 'phone error',
          birthday: 'birthday error',
          team_name: 'team error',
          rules_accepted: 'rules error',
        }}
        values={{
          name: 'name value',
          email: 'email value',
          phone: 'phone value',
          birthday: 'birthday value',
          team_name: 'team value',
          rules_accepted: false,
          newsletter: false,
        }}
      />
    ).node).to.eql(
      <Form onSubmit={() => {}}>
        <Input
          disabled={false}
          help="Jméno, příjmení a ostatní jména která nalezneš na svém občanském průkazu"
          label="Tvoje celé jméno"
          name="name"
          onChange={() => {}}
          error="name error"
          value="name value"
          touched={false}
        />
        <Input
          disabled={false}
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
          touched={false}
        />
        <Input
          disabled={false}
          help={
            'Pokud zjistíme že se něco nepovedlo, tak ti budeme volat. Pokud telefon nevyplníš, ' +
            'bereš zodpovědnost na sebe.'
          }
          label="Telefonní číslo"
          name="phone"
          onChange={() => {}}
          placeholder="000000000"
          error="phone error"
          value="phone value"
          touched={false}
        />
        <InputDate
          disabled={false}
          help={
            'V pravidlech festivalu se dočtete o věkovém limitu. Musíme si ověřit váš věk také ' +
            'abychom vás mohli lépe vyúčtovat.'
          }
          label="Datum narození"
          name="birthday"
          onChange={() => {}}
          error="birthday error"
          value="birthday value"
          touched={false}
        />
        <Row>
          <Col sm={6}>
            <Input
              disabled={false}
              label="Heslo"
              name="password"
              type="password"
              onChange={() => {}}
              touched={false}
            />
          </Col>
          <Col sm={6}>
            <Input
              disabled={false}
              label="Kontrola hesla"
              name="passwordCheck"
              type="password"
              onChange={() => {}}
              touched={false}
            />
          </Col>
        </Row>
        <InputSelect
          disabled={false}
          help={
            'Tento údaj použijeme pro malé sčítání improvizátorů, ale také při rozdělování ' +
            'mistností na spaní'
          }
          label="Tvoje skupina"
          name="team_name"
          onChange={() => {}}
          error="team error"
          value="team value"
          touched={false}
        />
        <InputCheckbox
          disabled={false}
          name="rules_accepted"
          label={<span>Souhlasím s <Link to="conditions">podmínkami festivalu</Link></span>}
          onChange={() => {}}
          error="rules error"
          value={false}
        />
        <InputCheckbox
          disabled={false}
          name="newsletter"
          label="Chci dostávat e-mailem novinky o událostech Improligy"
          onChange={() => {}}
          value={false}
        />
        <FormErrors />
        <Button
          disabled={false}
          bsStyle="primary"
          type="submit"
        >Zaregistrovat</Button>
      </Form>
    );
  });
  it('renders form disabled', () => {
    expect(shallow(
      <Signup
        form="signup"
        onChange={() => {}}
        onSubmit={() => {}}
        errors={{}}
        values={{}}
        disabled
      />
    ).node).to.eql(
      <Form onSubmit={() => {}}>
        <Input
          disabled
          help="Jméno, příjmení a ostatní jména která nalezneš na svém občanském průkazu"
          label="Tvoje celé jméno"
          name="name"
          onChange={() => {}}
          touched={false}
        />
        <Input
          disabled
          help={
            'Přes tento e-mail s vámi budeme komunikovat ohledně přihlášky. Určitě ' +
            'chceš vyplnit správný.'
          }
          label="E-mail"
          name="email"
          onChange={() => {}}
          type="email"
          touched={false}
        />
        <Input
          disabled
          help={
            'Pokud zjistíme že se něco nepovedlo, tak ti budeme volat. Pokud telefon nevyplníš, ' +
            'bereš zodpovědnost na sebe.'
          }
          label="Telefonní číslo"
          name="phone"
          onChange={() => {}}
          placeholder="000000000"
          touched={false}
        />
        <InputDate
          disabled
          help={
            'V pravidlech festivalu se dočtete o věkovém limitu. Musíme si ověřit váš věk také ' +
            'abychom vás mohli lépe vyúčtovat.'
          }
          label="Datum narození"
          name="birthday"
          onChange={() => {}}
          touched={false}
        />
        <Row>
          <Col sm={6}>
            <Input
              disabled
              label="Heslo"
              name="password"
              type="password"
              onChange={() => {}}
              touched={false}
            />
          </Col>
          <Col sm={6}>
            <Input
              disabled
              label="Kontrola hesla"
              name="passwordCheck"
              type="password"
              onChange={() => {}}
              touched={false}
            />
          </Col>
        </Row>
        <InputSelect
          disabled
          help={
            'Tento údaj použijeme pro malé sčítání improvizátorů, ale také při rozdělování ' +
            'mistností na spaní'
          }
          label="Tvoje skupina"
          name="team_name"
          onChange={() => {}}
          touched={false}
        />
        <InputCheckbox
          disabled
          name="rules_accepted"
          label={<span>Souhlasím s <Link to="conditions">podmínkami festivalu</Link></span>}
          onChange={() => {}}
        />
        <InputCheckbox
          disabled
          name="newsletter"
          label="Chci dostávat e-mailem novinky o událostech Improligy"
          onChange={() => {}}
        />
        <FormErrors />
        <Button
          disabled
          bsStyle="primary"
          type="submit"
        >Zaregistrovat</Button>
      </Form>
    );
  });
  it('injects form name into onChange', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Signup
        form="signup"
        onChange={changeSpy}
        onSubmit={() => {}}
        errors={{}}
        values={{}}
      />
    );

    comp.find('Input').at(0).simulate('change', 'name', 'foo');
    expect(changeSpy.args).to.eql([
      ['signup', 'name', 'foo'],
    ]);
  });
  it('triggers onSubmit on form submit', () => {
    const preventDefaultSpy = sinon.spy();
    const submitSpy = sinon.spy();
    const comp = shallow(
      <Signup
        form="signup"
        onChange={() => {}}
        onSubmit={submitSpy}
        errors={{}}
        values={{}}
      />
    );

    comp.simulate('submit', {
      preventDefault: preventDefaultSpy,
    });
    expect(submitSpy.args).to.eql([
      ['signup'],
    ]);
    expect(preventDefaultSpy.calledOnce).to.equal(true);
  });
});
