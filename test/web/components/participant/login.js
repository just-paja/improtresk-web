import FontAwesome from 'react-fontawesome';
import React from 'react';
import sinon from 'sinon';

import { Form } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Button from '../../../../src/web/components/button';
import FormErrors from '../../../../src/web/components/formErrors';
import Input from '../../../../src/web/components/inputs/input';
import Link from '../../../../src/web/components/link';
import Login from '../../../../src/web/components/participant/login';

describe('Login Form component', () => {
  it('renders form', () => {
    expect(shallow(
      <Login
        form="signup"
        onChange={() => {}}
        onSubmit={() => {}}
        errors={{
          email: 'email error',
          password: 'password error',
        }}
        values={{
          email: 'email value',
          password: 'test',
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
          value="test"
          error="password error"
        />
        <FormErrors />
        <Button
          bsStyle="primary"
          icon="sign-in"
          type="submit"
        >Přihlásit</Button>
        <Link className="pull-right" to="participant:forgottenPassword">
          <FontAwesome className="fa-fw" name="key" /> Zapomenuté heslo
        </Link>
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
        <FormErrors />
        <Button
          disabled
          bsStyle="primary"
          icon="sign-in"
          type="submit"
        >Přihlásit</Button>
        <Link className="pull-right" to="participant:forgottenPassword">
          <FontAwesome className="fa-fw" name="key" /> Zapomenuté heslo
        </Link>
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
