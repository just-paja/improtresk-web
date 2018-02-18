import { call, select, takeLatest } from 'redux-saga/effects';

import { sendForm } from '../../../forms/sagas/sendForm';
import { getForm } from '../../../forms/selectors';

import * as sagas from '..';
import * as api from '../../../api';

describe('Participant sagas', () => {
  it('bindPasswordNewSubmit binds fetch actions', () => {
    const gen = sagas.bindPasswordNewSubmit();
    expect(gen.next().value).toEqual(takeLatest(
      sagas.selectPasswordNewSubmit,
      sagas.passwordNew
    ));
    expect(gen.next().done).toBe(true);
  });

  it('bindPasswordChangeSubmit binds fetch actions', () => {
    const gen = sagas.bindPasswordChangeSubmit();
    expect(gen.next().value).toEqual(takeLatest(
      sagas.selectPasswordChangeSubmit,
      sagas.passwordChange
    ));
    expect(gen.next().done).toBe(true);
  });

  it('bindPasswordResetSubmit binds fetch actions', () => {
    const gen = sagas.bindPasswordResetSubmit();
    expect(gen.next().value).toEqual(takeLatest(
      sagas.selectPasswordResetSubmit,
      sagas.passwordReset
    ));
    expect(gen.next().done).toBe(true);
  });

  it('passwordNew creates select and fetch actions', () => {
    const gen = sagas.passwordNew();
    expect(gen.next().value).toEqual(select(getForm, 'newPassword'));
    expect(gen.next({
      values: {
        newPassword: 'foo',
      },
    }).value).toEqual(call(
      sendForm,
      api.newPassword,
      'newPassword',
      { newPassword: 'foo' }
    ));
    expect(gen.next().done).toBe(true);
  });

  it('passwordChange creates select and fetch actions', () => {
    const gen = sagas.passwordChange();
    expect(gen.next().value).toEqual(select(getForm, 'changePassword'));
    expect(gen.next({
      values: {
        oldPassword: 'foo',
        newPassword: 'bar',
      },
    }).value).toEqual(call(
      sendForm,
      api.changePassword,
      'changePassword',
      {
        oldPassword: 'foo',
        newPassword: 'bar',
      }
    ));
    expect(gen.next().done).toBe(true);
  });

  it('passwordReset creates select and fetch actions', () => {
    const gen = sagas.passwordReset();
    expect(gen.next().value).toEqual(select(getForm, 'resetPassword'));
    expect(gen.next({
      values: {
        email: 'foo@bar.com',
      },
    }).value).toEqual(call(
      sendForm,
      api.resetPassword,
      'resetPassword',
      {
        email: 'foo@bar.com',
      }
    ));
    expect(gen.next().done).toBe(true);
  });

  it('selectPasswordNewSubmit selects new password form submit', () => {
    expect(sagas.selectPasswordNewSubmit({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'newPassword',
    })).toBe(true);
  });

  it('selectPasswordChangeSubmit selects new password form submit', () => {
    expect(sagas.selectPasswordChangeSubmit({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'changePassword',
    })).toBe(true);
  });

  it('selectPasswordResetSubmit selects new password form submit', () => {
    expect(sagas.selectPasswordResetSubmit({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'resetPassword',
    })).toBe(true);
  });
});
