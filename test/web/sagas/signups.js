import { expect } from 'chai';
import { fork, select } from 'redux-saga/effects';

import { getForm } from '../../../src/web/selectors/forms';
import { sendForm } from '../../../src/web/sagas/forms';
import { sendLogin, sendSignup } from '../../../src/web/sagas/signup';

import * as api from '../../../src/web/api';

describe('Signup sagas', () => {
  it('sendSignup creates form submit actions', () => {
    const saga = sendSignup({ type: 'REDUX_ACTION', form: 'signup' });
    expect(saga.next().value).to.eql(select(getForm, 'signup'));
    expect(saga.next({
      values: {
        email: 'mail@test.com',
        password: 'foo',
      },
    }).value).to.eql(fork(sendForm, api.signup, 'signup', {
      email: 'mail@test.com',
      password: 'foo',
    }));
    expect(saga.next().done).to.equal(true);
  });
  it('sendLogin creates form submit actions', () => {
    const saga = sendLogin({ type: 'REDUX_ACTION', form: 'login' });
    expect(saga.next().value).to.eql(select(getForm, 'login'));
    expect(saga.next({
      values: {
        email: 'mail@test.com',
        password: 'foo',
      },
    }).value).to.eql(fork(sendForm, api.login, 'login', {
      email: 'mail@test.com',
      password: 'foo',
    }));
    expect(saga.next().done).to.equal(true);
  });
});
