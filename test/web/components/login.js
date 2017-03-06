import React from 'react';
import sinon from 'sinon';

import { Form } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Button from '../../../src/web/components/button';
import Input from '../../../src/web/components/input';
import Login from '../../../src/web/components/login';

describe('Login Form component', () => {
  it('renders form', () => {
    expect(shallow(
      <Login
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
          label="Heslo"
          name="password"
          type="password"
          onChange={() => {}}
          touched={false}
        />
        <Button
          bsStyle="primary"
          icon="key"
          type="submit"
        >Přihlásit</Button>
      </Form>
    );
  });
  it('renders form disabled', () => {
    expect(shallow(
      <Login
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
          label="E-mail"
          name="email"
          onChange={() => {}}
          type="email"
          touched={false}
        />
        <Input
          disabled
          label="Heslo"
          name="password"
          type="password"
          onChange={() => {}}
          touched={false}
        />
        <Button
          disabled
          bsStyle="primary"
          icon="key"
          type="submit"
        >Přihlásit</Button>
      </Form>
    );
  });
  it('injects form name into onChange', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Login
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
      <Login
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
