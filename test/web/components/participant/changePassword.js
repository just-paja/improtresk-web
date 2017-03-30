import Form from 'react-bootstrap/lib/Form';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Button from '../../../../src/web/components/button';
import FormErrors from '../../../../src/web/components/formErrors';
import Input from '../../../../src/web/components/inputs/input';
import ChangePassword from '../../../../src/web/components/participant/changePassword';


describe('Participant ChangePassword component', () => {
  it('renders', () => {
    expect(shallow(
      <ChangePassword
        errors={{}}
        form="changePassword"
        onChange={() => {}}
        onSubmit={() => {}}
        values={{
          oldPassword: 'oldPassword',
          newPassword: 'newPassword',
          newPasswordConfirm: 'newPasswordConfirm',
        }}
      />
    ).node).to.eql(
      <Form onSubmit={() => {}}>
        <Input
          disabled={false}
          name="oldPassword"
          onChange={() => {}}
          type="password"
          value="oldPassword"
        />
        <Input
          disabled={false}
          name="newPassword"
          onChange={() => {}}
          type="password"
          value="newPassword"
        />
        <Input
          disabled={false}
          name="newPasswordConfirm"
          onChange={() => {}}
          type="password"
          value="newPasswordConfirm"
        />
        <FormErrors errors={null} />
        <Button loading={false} type="submit">Změnit heslo</Button>
      </Form>
    );
  });
  it('renders with newPassword flag', () => {
    expect(shallow(
      <ChangePassword
        errors={{}}
        form="changePassword"
        newPassword
        onChange={() => {}}
        onSubmit={() => {}}
        values={{
          newPassword: 'newPassword',
          newPasswordConfirm: 'newPasswordConfirm',
        }}
      />
    ).node).to.eql(
      <Form onSubmit={() => {}}>
        <Input
          disabled={false}
          name="newPassword"
          onChange={() => {}}
          type="password"
          value="newPassword"
        />
        <Input
          disabled={false}
          name="newPasswordConfirm"
          onChange={() => {}}
          type="password"
          value="newPasswordConfirm"
        />
        <FormErrors errors={null} />
        <Button loading={false} type="submit">Změnit heslo</Button>
      </Form>
    );
  });
  it('renders with errors', () => {
    expect(shallow(
      <ChangePassword
        errors={{
          oldPassword: 'required',
          newPassword: 'required',
          newPasswordConfirm: 'required',
        }}
        form="changePassword"
        onChange={() => {}}
        onSubmit={() => {}}
        submitErrors={[
          'foo',
        ]}
        values={{
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: '',
        }}
      />
    ).node).to.eql(
      <Form onSubmit={() => {}}>
        <Input
          disabled={false}
          error="required"
          name="oldPassword"
          onChange={() => {}}
          type="password"
          value=""
        />
        <Input
          disabled={false}
          error="required"
          name="newPassword"
          onChange={() => {}}
          type="password"
          value=""
        />
        <Input
          disabled={false}
          error="required"
          name="newPasswordConfirm"
          onChange={() => {}}
          type="password"
          value=""
        />
        <FormErrors errors={['foo']} />
        <Button loading={false} type="submit">Změnit heslo</Button>
      </Form>
    );
  });
  it('renders disabled when loading', () => {
    expect(shallow(
      <ChangePassword
        errors={{}}
        form="changePassword"
        loading
        onChange={() => {}}
        onSubmit={() => {}}
        values={{
          oldPassword: 'oldPassword',
          newPassword: 'newPassword',
          newPasswordConfirm: 'newPasswordConfirm',
        }}
      />
    ).node).to.eql(
      <Form onSubmit={() => {}}>
        <Input
          disabled
          name="oldPassword"
          onChange={() => {}}
          type="password"
          value="oldPassword"
        />
        <Input
          disabled
          name="newPassword"
          onChange={() => {}}
          type="password"
          value="newPassword"
        />
        <Input
          disabled
          name="newPasswordConfirm"
          onChange={() => {}}
          type="password"
          value="newPasswordConfirm"
        />
        <FormErrors errors={null} />
        <Button loading type="submit">Změnit heslo</Button>
      </Form>
    );
  });

  it('triggers onChange with form, input and value', () => {
    const onChangeSpy = sinon.spy();
    const comp = shallow(
      <ChangePassword
        errors={{}}
        form="resetPassword"
        onChange={onChangeSpy}
        onSubmit={() => {}}
        values={{ email: 'test@example.com' }}
      />
    );

    comp.find(Input).at(0).simulate('change', 'oldPassword', 'foo');
    expect(onChangeSpy.args).to.eql([
      ['resetPassword', 'oldPassword', 'foo'],
    ]);
  });
  it('triggers onSubmit with form', () => {
    const onSubmitSpy = sinon.spy();
    const preventDefaultSpy = sinon.spy();
    const comp = shallow(
      <ChangePassword
        errors={{}}
        form="resetPassword"
        onChange={() => {}}
        onSubmit={onSubmitSpy}
        values={{}}
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
