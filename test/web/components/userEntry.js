import Col from 'react-bootstrap/lib/Col';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Well from 'react-bootstrap/lib/Well';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import UserEntry from '../../../src/web/components/userEntry';
import Login from '../../../src/web/components/login';
import Signup from '../../../src/web/components/signup';

describe('User Entry component', () => {
  it('renders', () => {
    expect(shallow(
      <UserEntry
        login={{
          errors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          errors: {},
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    ).node).to.eql(
      <Row>
        <Col md={6}>
          <h2>Už jsem zaregistrovaný</h2>
          <Well>
            <Login
              disabled={false}
              errors={{}}
              form="login"
              onChange={() => {}}
              onSubmit={() => {}}
              values={{ email: 'foo' }}
            />
          </Well>
        </Col>
        <Col md={6}>
          <h2>Registrace</h2>
          <Signup
            disabled={false}
            errors={{}}
            form="signup"
            onChange={() => {}}
            onSubmit={() => {}}
            teams={[]}
            values={{ name: 'foo' }}
          />
        </Col>
      </Row>
    );
  });
  it('renders disabled when loading login form', () => {
    expect(shallow(
      <UserEntry
        login={{
          loading: true,
          errors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          errors: {},
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    ).node).to.eql(
      <Row>
        <Col md={6}>
          <h2>Už jsem zaregistrovaný</h2>
          <Well>
            <Login
              disabled
              errors={{}}
              form="login"
              loading
              onChange={() => {}}
              onSubmit={() => {}}
              values={{ email: 'foo' }}
            />
          </Well>
        </Col>
        <Col md={6}>
          <h2>Registrace</h2>
          <Signup
            disabled
            errors={{}}
            form="signup"
            onChange={() => {}}
            onSubmit={() => {}}
            teams={[]}
            values={{ name: 'foo' }}
          />
        </Col>
      </Row>
    );
  });
  it('renders disabled when loading signup form', () => {
    expect(shallow(
      <UserEntry
        login={{
          errors: {},
          values: { email: 'foo' },
        }}
        onLoginChange={() => {}}
        onLoginSubmit={() => {}}
        onSignupChange={() => {}}
        onSignupSubmit={() => {}}
        signup={{
          errors: {},
          loading: true,
          values: { name: 'foo' },
        }}
        teams={[]}
      />
    ).node).to.eql(
      <Row>
        <Col md={6}>
          <h2>Už jsem zaregistrovaný</h2>
          <Well>
            <Login
              disabled
              errors={{}}
              form="login"
              onChange={() => {}}
              onSubmit={() => {}}
              values={{ email: 'foo' }}
            />
          </Well>
        </Col>
        <Col md={6}>
          <h2>Registrace</h2>
          <Signup
            disabled
            errors={{}}
            form="signup"
            loading
            onChange={() => {}}
            onSubmit={() => {}}
            teams={[]}
            values={{ name: 'foo' }}
          />
        </Col>
      </Row>
    );
  });
});
