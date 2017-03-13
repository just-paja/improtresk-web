import cookie from 'js-cookie';
import sinon from 'sinon';

import { expect } from 'chai';
import { fork, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { getForm } from '../../../src/web/selectors/forms';
import {
  getApiAuth,
  getAutoLoginStatus,
} from '../../../src/web/selectors/session';
import { sendForm } from '../../../src/web/sagas/forms';
import {
  login,
  loginOnFormSubmit,
  loginOnAction,
  loginOnMount,
  loginOnSignup,
  loginSignup,
  loginWithCookie,
  selectLoginSubmit,
  selectLoginSuccess,
  selectSignupSubmit,
  selectSignupSuccess,
  sendLogin,
  sendSignup,
  signupOnFormSubmit,
} from '../../../src/web/sagas/signup';

import * as api from '../../../src/web/api';

describe('Signup sagas', () => {
  beforeEach(() => {
    sinon.stub(cookie, 'getJSON');
  });
  afterEach(() => {
    cookie.getJSON.restore();
  });
  it('selectSignupSubmit selects signup submit action', () => {
    expect(selectSignupSubmit({ type: 'FORM_SUBMIT_ALLOWED', form: 'signup' })).to.equal(true);
  });
  it('selectSignupSuccess selects signup submit action', () => {
    expect(selectSignupSuccess({ type: 'FORM_SUBMIT_SUCCESS', form: 'signup' })).to.equal(true);
  });
  it('selectLoginSubmit selects signup submit action', () => {
    expect(selectLoginSubmit({ type: 'FORM_SUBMIT_ALLOWED', form: 'login' })).to.equal(true);
  });
  it('selectLoginSuccess selects signup submit action', () => {
    expect(selectLoginSuccess({ type: 'FORM_SUBMIT_SUCCESS', form: 'login' })).to.equal(true);
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
  it('sendSignup creates form submit actions without team name', () => {
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
      team_name: null,
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
    expect(saga.next().value).to.eql(select(getForm, 'signup'));
    expect(saga.next({
      values: {
        email: 'test@localhost.com',
        password: 'foo',
      },
    }).value).to.eql(fork(sendForm, api.login, 'login', {
      email: 'test@localhost.com',
      password: 'foo',
    }));
    expect(saga.next({
      auth_token: 'asdf65a4sdf65asd4f',
    }).value).to.eql(put({
      type: 'PARTICIPANT_REGISTERED',
      data: {
        id: 1,
        name: 'Hugo Ventil',
      },
    }));
    expect(saga.next().value).to.eql(put({
      type: 'FORM_VALUES_CLEAR',
      form: 'signup',
    }));
    expect(saga.next().done).to.equal(true);
  });
  it('signupOnFormSubmit creates actions', () => {
    const saga = signupOnFormSubmit();
    expect(saga.next().value).to.eql(takeLatest(selectSignupSubmit, sendSignup));
    expect(saga.next().done).to.equal(true);
  });
  it('loginOnSignup creates login actions', () => {
    const saga = loginOnSignup();
    expect(saga.next().value).to.eql(takeLatest(selectSignupSuccess, loginSignup));
    expect(saga.next().done).to.equal(true);
  });
  it('loginOnAction creates login actions', () => {
    const saga = loginOnAction();
    expect(saga.next().value).to.eql(takeLatest(selectLoginSuccess, login));
    expect(saga.next().done).to.equal(true);
  });
  it('loginOnMount creates login actions', () => {
    const saga = loginOnMount();
    expect(saga.next().value).to.eql(takeLatest('APP_MOUNTED', loginWithCookie));
    expect(saga.next().done).to.equal(true);
  });
  it('loginOnFormSubmit creates login actions', () => {
    const saga = loginOnFormSubmit();
    expect(saga.next().value).to.eql(takeLatest(selectLoginSubmit, sendLogin));
    expect(saga.next().done).to.equal(true);
  });
  it('loginOnWithCookie creates no action when already attempted', () => {
    const saga = loginWithCookie();
    expect(saga.next().value).to.eql(select(getAutoLoginStatus));
    expect(saga.next(true).done).to.equal(true);
  });
  it('loginOnWithCookie creates login action with auth data', () => {
    const saga = loginWithCookie();
    expect(saga.next().value).to.eql(select(getAutoLoginStatus));
    expect(saga.next(false).value).to.eql(select(getApiAuth));
    expect(saga.next({
      access_token: 'foo',
    }).value).to.eql(put({
      type: 'PARTICIPANT_LOGIN',
      data: { access_token: 'foo' },
    }));
    expect(saga.next().value).to.eql(put({ type: 'PARTICIPANT_LOGIN_AUTO' }));
    expect(saga.next().done).to.equal(true);
  });
  it('loginOnWithCookie creates login action with cookie auth data', () => {
    cookie.getJSON.returns({ access_token: 'foo' });
    const saga = loginWithCookie();
    expect(saga.next().value).to.eql(select(getAutoLoginStatus));
    expect(saga.next(false).value).to.eql(select(getApiAuth));
    expect(saga.next({}).value).to.eql(put({
      type: 'PARTICIPANT_LOGIN',
      data: { access_token: 'foo' },
    }));
    expect(saga.next().value).to.eql(put({ type: 'PARTICIPANT_LOGIN_AUTO' }));
    expect(saga.next().done).to.equal(true);
  });
  it('loginOnWithCookie creates no login action with empty cookie auth data', () => {
    cookie.getJSON.returns(null);
    const saga = loginWithCookie();
    expect(saga.next().value).to.eql(select(getAutoLoginStatus));
    expect(saga.next(false).value).to.eql(select(getApiAuth));
    expect(saga.next({}).value).to.eql(put({ type: 'PARTICIPANT_LOGIN_AUTO' }));
    expect(saga.next().done).to.equal(true);
  });
  it('login creates login actions', () => {
    const saga = login({
      data: {
        auth_token: 'asdf65a4sdf65asd4f',
      },
    });

    expect(saga.next().value).to.eql(put({
      type: 'PARTICIPANT_LOGIN',
      data: {
        auth_token: 'asdf65a4sdf65asd4f',
      },
    }));
    expect(saga.next().value).to.eql(put({
      type: 'FORM_VALUES_CLEAR',
      form: 'login',
    }));
    expect(saga.next().value).to.eql(put(push('/ucastnik')));
    expect(saga.next().done).to.equal(true);
  });
});
