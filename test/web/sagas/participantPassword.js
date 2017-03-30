import { expect } from 'chai';
import { call, select, takeLatest } from 'redux-saga/effects';

import { fetchResource } from '../../../src/web/sagas/common';
import { getForm } from '../../../src/web/selectors/forms';
import {
  bindPasswordChangeSubmit,
  bindPasswordNewSubmit,
  bindPasswordResetSubmit,
  passwordChange,
  passwordNew,
  passwordReset,
  selectPasswordChangeSubmit,
  selectPasswordNewSubmit,
  selectPasswordResetSubmit,
} from '../../../src/web/sagas/participanPassword';

import * as api from '../../../src/web/api';

describe('Participant sagas', () => {
  it('bindPasswordNewSubmit binds fetch actions', () => {
    const saga = bindPasswordNewSubmit();
    expect(saga.next().value).to.eql(takeLatest(
      selectPasswordNewSubmit,
      passwordNew
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('bindPasswordChangeSubmit binds fetch actions', () => {
    const saga = bindPasswordChangeSubmit();
    expect(saga.next().value).to.eql(takeLatest(
      selectPasswordChangeSubmit,
      passwordChange
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('bindPasswordResetSubmit binds fetch actions', () => {
    const saga = bindPasswordResetSubmit();
    expect(saga.next().value).to.eql(takeLatest(
      selectPasswordResetSubmit,
      passwordReset
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('passwordNew creates select and fetch actions', () => {
    const saga = passwordNew();
    expect(saga.next().value).to.eql(select(getForm, 'newPassword'));
    expect(saga.next({
      values: {
        newPassword: 'foo',
      },
    }).value).to.eql(call(
      fetchResource,
      api.newPassword,
      {
        onStart: 'PARTICIPANT_PASSWORD_NEW_STARTED',
        onSuccess: 'PARTICIPANT_PASSWORD_NEW_SUCCESS',
        onError: 'PARTICIPANT_PASSWORD_NEW_ERROR',
        data: {
          newPassword: 'foo',
        },
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('passwordChange creates select and fetch actions', () => {
    const saga = passwordChange();
    expect(saga.next().value).to.eql(select(getForm, 'changePassword'));
    expect(saga.next({
      values: {
        oldPassword: 'foo',
        newPassword: 'bar',
      },
    }).value).to.eql(call(
      fetchResource,
      api.changePassword,
      {
        onStart: 'PARTICIPANT_PASSWORD_CHANGE_STARTED',
        onSuccess: 'PARTICIPANT_PASSWORD_CHANGE_SUCCESS',
        onError: 'PARTICIPANT_PASSWORD_CHANGE_ERROR',
        data: {
          oldPassword: 'foo',
          newPassword: 'bar',
        },
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('passwordReset creates select and fetch actions', () => {
    const saga = passwordReset();
    expect(saga.next().value).to.eql(select(getForm, 'resetPassword'));
    expect(saga.next({
      values: {
        email: 'foo@bar.com',
      },
    }).value).to.eql(call(
      fetchResource,
      api.resetPassword,
      {
        onStart: 'PARTICIPANT_PASSWORD_RESET_STARTED',
        onSuccess: 'PARTICIPANT_PASSWORD_RESET_SUCCESS',
        onError: 'PARTICIPANT_PASSWORD_RESET_ERROR',
        data: {
          email: 'foo@bar.com',
        },
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('selectPasswordNewSubmit selects new password form submit', () => {
    expect(selectPasswordNewSubmit({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'newPassword',
    })).to.equal(true);
  });
  it('selectPasswordChangeSubmit selects new password form submit', () => {
    expect(selectPasswordChangeSubmit({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'changePassword',
    })).to.equal(true);
  });
  it('selectPasswordResetSubmit selects new password form submit', () => {
    expect(selectPasswordResetSubmit({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'resetPassword',
    })).to.equal(true);
  });
});
