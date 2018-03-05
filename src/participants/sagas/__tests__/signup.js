import cookie from 'js-cookie';
import sinon from 'sinon';

import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  getApiAuth,
  getAutoLoginStatus,
} from '../../../selectors/session';
import { sendForm } from '../../../forms/sagas/sendForm';
import { getLoginForm, getSignupForm } from '../../selectors';

import * as sagas from '..';
import * as api from '../../../api';

describe('Signup sagas', () => {
  beforeEach(() => {
    sinon.stub(cookie, 'getJSON');
  });

  afterEach(() => {
    cookie.getJSON.restore();
  });

  it('selectSignupSubmit selects signup submit action', () => {
    expect(sagas.selectSignupSubmit({ type: 'FORM_SUBMIT_ALLOWED', form: 'signup' })).toBe(true);
  });

  it('selectSignupSuccess selects signup submit action', () => {
    expect(sagas.selectSignupSuccess({ type: 'FORM_SUBMIT_SUCCESS', form: 'signup' })).toBe(true);
  });

  it('selectLoginSubmit selects signup submit action', () => {
    expect(sagas.selectLoginSubmit({ type: 'FORM_SUBMIT_ALLOWED', form: 'login' })).toBe(true);
  });

  it('selectLoginSuccess selects signup submit action', () => {
    expect(sagas.selectLoginSuccess({ type: 'FORM_SUBMIT_SUCCESS', form: 'login' })).toBe(true);
  });

  it('sendSignup creates form submit actions', () => {
    const gen = sagas.sendSignup({ type: 'REDUX_ACTION', form: 'signup' });
    expect(gen.next().value).toEqual(select(getSignupForm));
    expect(gen.next({
      values: {
        email: 'mail@test.com',
        password: 'foo',
        team_name: {
          label: 'foo',
          value: 'Test Team',
        },
      },
    }).value).toEqual(call(sendForm, api.signup, 'signup', {
      email: 'mail@test.com',
      password: 'foo',
      team_name: 'Test Team',
    }));
    expect(gen.next().done).toBe(true);
  });

  it('sendSignup creates form submit actions without team name', () => {
    const gen = sagas.sendSignup({ type: 'REDUX_ACTION', form: 'signup' });
    expect(gen.next().value).toEqual(select(getSignupForm));
    expect(gen.next({
      values: {
        email: 'mail@test.com',
        password: 'foo',
      },
    }).value).toEqual(call(sendForm, api.signup, 'signup', {
      email: 'mail@test.com',
      password: 'foo',
      team_name: undefined,
    }));
    expect(gen.next().done).toBe(true);
  });

  it('sendLogin creates form submit actions', () => {
    const gen = sagas.sendLogin({ type: 'REDUX_ACTION', form: 'login' });
    expect(gen.next().value).toEqual(select(getLoginForm));
    expect(gen.next({
      values: {
        email: 'mail@test.com',
        password: 'foo',
      },
    }).value).toEqual(call(sendForm, api.login, 'login', {
      email: 'mail@test.com',
      password: 'foo',
    }));
    expect(gen.next().done).toBe(true);
  });

  it('loginSignup creates actions', () => {
    const gen = sagas.loginSignup({
      type: 'REDUX_ACTION',
      data: {
        id: 1,
        name: 'Hugo Ventil',
      },
    });
    expect(gen.next().value).toEqual(select(getSignupForm));
    expect(gen.next({
      values: {
        email: 'test@localhost.com',
        password: 'foo',
      },
    }).value).toEqual(call(sendForm, api.login, 'login', {
      email: 'test@localhost.com',
      password: 'foo',
    }));
    expect(gen.next({
      auth_token: 'asdf65a4sdf65asd4f',
    }).value).toEqual(put({
      type: 'PARTICIPANT_REGISTERED',
      data: {
        id: 1,
        name: 'Hugo Ventil',
      },
    }));
    expect(gen.next().value).toEqual(put({
      type: 'FORM_VALUES_CLEAR',
      form: 'signup',
    }));
    expect(gen.next().done).toBe(true);
  });

  it('signupOnFormSubmit creates actions', () => {
    const gen = sagas.signupOnFormSubmit();
    expect(gen.next().value).toEqual(takeLatest(sagas.selectSignupSubmit, sagas.sendSignup));
    expect(gen.next().done).toBe(true);
  });

  it('loginOnSignup creates login actions', () => {
    const gen = sagas.loginOnSignup();
    expect(gen.next().value).toEqual(takeLatest(sagas.selectSignupSuccess, sagas.loginSignup));
    expect(gen.next().done).toBe(true);
  });

  it('loginOnAction creates login actions', () => {
    const gen = sagas.loginOnAction();
    expect(gen.next().value).toEqual(takeLatest(sagas.selectLoginSuccess, sagas.login));
    expect(gen.next().done).toBe(true);
  });

  it('loginOnMount creates login actions', () => {
    const gen = sagas.loginOnMount();
    expect(gen.next().value).toEqual(takeLatest('APP_MOUNTED', sagas.loginWithCookie));
    expect(gen.next().done).toBe(true);
  });

  it('loginOnFormSubmit creates login actions', () => {
    const gen = sagas.loginOnFormSubmit();
    expect(gen.next().value).toEqual(takeLatest(sagas.selectLoginSubmit, sagas.sendLogin));
    expect(gen.next().done).toBe(true);
  });

  it('loginOnWithCookie creates no action when already attempted', () => {
    const gen = sagas.loginWithCookie();
    expect(gen.next().value).toEqual(select(getAutoLoginStatus));
    expect(gen.next(true).done).toBe(true);
  });

  it('loginOnWithCookie creates login action with auth data', () => {
    const gen = sagas.loginWithCookie();
    expect(gen.next().value).toEqual(select(getAutoLoginStatus));
    expect(gen.next(false).value).toEqual(select(getApiAuth));
    expect(gen.next({
      access_token: 'foo',
    }).value).toEqual(put({ type: 'PARTICIPANT_LOGIN_AUTO' }));
    expect(gen.next().value).toEqual(put({
      type: 'PARTICIPANT_LOGIN_AUTO_SUCCESS',
      data: { access_token: 'foo' },
    }));
    expect(gen.next().done).toBe(true);
  });

  it('loginOnWithCookie creates login action with cookie auth data', () => {
    cookie.getJSON.returns({ access_token: 'foo' });
    const gen = sagas.loginWithCookie();
    expect(gen.next().value).toEqual(select(getAutoLoginStatus));
    expect(gen.next(false).value).toEqual(select(getApiAuth));
    expect(gen.next().value).toEqual(put({ type: 'PARTICIPANT_LOGIN_AUTO' }));
    expect(gen.next({}).value).toEqual(put({
      type: 'PARTICIPANT_LOGIN_AUTO_SUCCESS',
      data: { access_token: 'foo' },
    }));
    expect(gen.next().done).toBe(true);
  });

  it('loginOnWithCookie creates logout action with empty cookie auth data', () => {
    cookie.getJSON.returns(null);
    const gen = sagas.loginWithCookie();
    expect(gen.next().value).toEqual(select(getAutoLoginStatus));
    expect(gen.next(false).value).toEqual(select(getApiAuth));
    expect(gen.next({}).value).toEqual(put({ type: 'PARTICIPANT_LOGIN_AUTO' }));
    expect(gen.next({}).value).toEqual(put({ type: 'PARTICIPANT_LOGOUT', data: null }));
    expect(gen.next().done).toBe(true);
  });

  it('login creates login actions', () => {
    const gen = sagas.login({
      data: {
        auth_token: 'asdf65a4sdf65asd4f',
      },
    });

    expect(gen.next().value).toEqual(put({
      type: 'PARTICIPANT_LOGIN',
      data: {
        auth_token: 'asdf65a4sdf65asd4f',
      },
    }));
    expect(gen.next().value).toEqual(put({
      type: 'FORM_VALUES_CLEAR',
      form: 'login',
    }));
    // expect(gen.next().value).toEqual(call(redirectHome));
    expect(gen.next().done).toBe(true);
  });
});
