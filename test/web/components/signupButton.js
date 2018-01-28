import moment from 'moment';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Alert, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import HumanDate from '../../../src/web/components/humanDate';
import SignupButton from '../../../src/web/components/signupButton';

describe('Signup Button component', () => {
  describe('before signing up is active', () => {
    beforeEach(() => {
      sinon.stub(moment, 'now');
      moment.now.returns('2016-01-02T03:04:05');
    });

    afterEach(() => {
      moment.now.restore();
    });

    it('renders disabled with proper message', () => {
      expect(shallow(
        <SignupButton
          endAt="2016-05-06"
          startAt="2016-03-01"
        />
      ).node).to.eql(
        <div>
          <Alert
            bsStyle="info"
          >Přihlašování se otevře <HumanDate date="2016-03-01" showTime /></Alert>
        </div>
      );
    });
  });
  describe('before signing up is active', () => {
    beforeEach(() => {
      sinon.stub(moment, 'now');
      moment.now.returns('2016-03-01T03:04:05');
    });

    afterEach(() => {
      moment.now.restore();
    });

    it('renders disabled with proper message', () => {
      expect(shallow(
        <SignupButton
          endAt="2016-05-06"
          startAt="2016-03-01"
        />
      ).node).to.eql(
        <div>
          <LinkContainer to="/prihlaska">
            <Button disabled={false} bsStyle="primary">Přihlásit na Improtřesk</Button>
          </LinkContainer>
        </div>
      );
    });
  });
  describe('when all places are taken', () => {
    beforeEach(() => {
      sinon.stub(moment, 'now');
      moment.now.returns('2016-03-01T03:04:05');
    });

    afterEach(() => {
      moment.now.restore();
    });

    it('renders disabled with proper message', () => {
      expect(shallow(
        <SignupButton
          alreadyFull
          endAt="2016-05-06"
          startAt="2016-03-01"
        />
      ).node).to.eql(
        <div>
          <LinkContainer to="/prihlaska">
            <Button disabled bsStyle="primary">Všechna místa jsou obsazena</Button>
          </LinkContainer>
        </div>
      );
    });
  });
  describe('when signing up is closed', () => {
    beforeEach(() => {
      sinon.stub(moment, 'now');
      moment.now.returns('2016-05-06T03:04:05');
    });

    afterEach(() => {
      moment.now.restore();
    });

    it('renders disabled with proper message', () => {
      expect(shallow(
        <SignupButton
          endAt="2016-05-06"
          startAt="2016-03-01"
        />
      ).node).to.eql(
        <div>
          <LinkContainer to="/prihlaska">
            <Button disabled bsStyle="primary">Přihlašování již bylo uzavřeno</Button>
          </LinkContainer>
        </div>
      );
    });
  });
  it('renders empty without start date', () => {
    expect(shallow(<SignupButton />).node).to.eql(null);
  });
});
