import { call, put, select, takeLatest } from 'redux-saga/effects';

import { sendForm } from '../../../forms/sagas/sendForm';
import { getSignupForm } from '../../selectors';

import * as sagas from '..';
import * as api from '../../../api';

describe('Signup sagas', () => {
  it('selectSignupSubmit selects signup submit action', () => {
    expect(sagas.selectSignupSubmit({ type: 'FORM_SUBMIT_ALLOWED', form: 'signup' })).toBe(true);
  });

  it('selectSignupSuccess selects signup submit action', () => {
    expect(sagas.selectSignupSuccess({ type: 'FORM_SUBMIT_SUCCESS', form: 'signup' })).toBe(true);
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
});
