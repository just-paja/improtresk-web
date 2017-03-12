import { expect } from 'chai';
import { fork, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { getForm } from '../../../src/web/selectors/forms';
import { sendForm } from '../../../src/web/sagas/forms';
import {
  loginOnFormSubmit,
  loginOnSignup,
  loginSignup,
  selectLoginSubmit,
  selectSignupSubmit,
  selectSignupSuccess,
  sendLogin,
  sendSignup,
  signupOnFormSubmit,
} from '../../../src/web/sagas/signup';

import * as api from '../../../src/web/api';

describe('Signup sagas', () => {
  it('selectSignupSubmit selects signup submit action', () => {
    expect(selectSignupSubmit({ type: 'FORM_SUBMIT_ALLOWED', form: 'signup' })).to.equal(true);
  });
  it('selectSignupSuccess selects signup submit action', () => {
    expect(selectSignupSuccess({ type: 'FORM_SUBMIT_SUCCESS', form: 'signup' })).to.equal(true);
  });
  it('selectLoginSubmit selects signup submit action', () => {
    expect(selectLoginSubmit({ type: 'FORM_SUBMIT_ALLOWED', form: 'login' })).to.equal(true);
  });
  it('sendSignup creates form submit actions', () => {
    const saga = sendSignup({ type: 'REDUX_ACTION', form: 'signup' });
    expect(saga.next().value).to.eql(select(getForm, 'signup'));
    expect(saga.next({
      values: {
        email: 'mail@test.com',
        password: 'foo',
        team_name: {
          label: 'foo',
          value: 'Test Team',
        },
      },
    }).value).to.eql(fork(sendForm, api.signup, 'signup', {
      email: 'mail@test.com',
      password: 'foo',
      team_name: 'Test Team',
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
  it('loginSignup creates actions', () => {
    const saga = loginSignup({
      type: 'REDUX_ACTION',
      data: {
        id: 1,
        name: 'Hugo Ventil',
      },
    });
    expect(saga.next().value).to.eql(put({
      type: 'SIGNUP_REGISTERED',
      data: {
        id: 1,
        name: 'Hugo Ventil',
      },
    }));
    expect(saga.next().value).to.eql(put(push('/ucastnik')));
    expect(saga.next().done).to.equal(true);
  });
  it('signupOnFormSubmit creates actions', () => {
    const saga = signupOnFormSubmit();
    expect(saga.next().value).to.eql(takeLatest(selectSignupSubmit, sendSignup));
    expect(saga.next().done).to.equal(true);
  });
  it('loginOnSignup creates actions', () => {
    const saga = loginOnSignup();
    expect(saga.next().value).to.eql(takeLatest(selectSignupSuccess, loginSignup));
    expect(saga.next().done).to.equal(true);
  });
  it('loginOnFormSubmit creates actions', () => {
    const saga = loginOnFormSubmit();
    expect(saga.next().value).to.eql(takeLatest(selectLoginSubmit, sendLogin));
    expect(saga.next().done).to.equal(true);
  });
});
