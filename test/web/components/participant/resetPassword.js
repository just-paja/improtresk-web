import Form from 'react-bootstrap/lib/Form';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Button from '../../../../src/web/components/button';
import Input from '../../../../src/web/components/input';
import ResetPassword from '../../../../src/web/components/participant/resetPassword';


describe('Participant ResetPassword component', () => {
  it('renders', () => {
    expect(shallow(
      <ResetPassword
        errors={{}}
        form="resetPassword"
        onChange={() => {}}
        onSubmit={() => {}}
        values={{ email: 'test@example.com' }}
      />
    ).node).to.eql(
      <Form onSubmit={() => {}}>
        <Input
          disabled={false}
          name="email"
          onChange={() => {}}
          type="email"
          value="test@example.com"
        />
        <Button loading={false} type="submit">Změnit heslo</Button>
      </Form>
    );
  });
  it('renders with errors', () => {
    expect(shallow(
      <ResetPassword
        errors={{
          email: 'Unknown e-mail',
        }}
        form="resetPassword"
        onChange={() => {}}
        onSubmit={() => {}}
        values={{ email: 'test@example.com' }}
      />
    ).node).to.eql(
      <Form onSubmit={() => {}}>
        <Input
          disabled={false}
          error="Unknown e-mail"
          name="email"
          onChange={() => {}}
          type="email"
          value="test@example.com"
        />
        <Button loading={false} type="submit">Změnit heslo</Button>
      </Form>
    );
  });
  it('renders disabled when loading', () => {
    expect(shallow(
      <ResetPassword
        errors={{}}
        form="resetPassword"
        loading
        onChange={() => {}}
        onSubmit={() => {}}
        values={{ email: 'test@example.com' }}
      />
    ).node).to.eql(
      <Form onSubmit={() => {}}>
        <Input
          disabled
          name="email"
          onChange={() => {}}
          type="email"
          value="test@example.com"
        />
        <Button loading type="submit">Změnit heslo</Button>
      </Form>
    );
  });

  it('triggers onChange with form, input and value', () => {
    const onChangeSpy = sinon.spy();
    const comp = shallow(
      <ResetPassword
        errors={{}}
        form="resetPassword"
        onChange={onChangeSpy}
        onSubmit={() => {}}
        values={{ email: 'test@example.com' }}
      />
    );

    comp.find(Input).simulate('change', 'email', 'test@example.com');
    expect(onChangeSpy.args).to.eql([
      ['resetPassword', 'email', 'test@example.com'],
    ]);
  });
  it('triggers onSubmit with form', () => {
    const onSubmitSpy = sinon.spy();
    const preventDefaultSpy = sinon.spy();
    const comp = shallow(
      <ResetPassword
        errors={{}}
        form="resetPassword"
        onChange={() => {}}
        onSubmit={onSubmitSpy}
        values={{ email: 'test@example.com' }}
      />
    );

    comp.simulate('submit', {
      preventDefault: preventDefaultSpy,
    });
    expect(onSubmitSpy.args).to.eql([
      ['resetPassword'],
    ]);
    expect(preventDefaultSpy.calledOnce).to.equal(true);
  });
});
