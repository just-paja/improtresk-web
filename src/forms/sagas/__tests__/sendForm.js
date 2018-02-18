import { call } from 'redux-saga/effects';

import { fetchResource } from '../../../sagas/api';
import { sendForm } from '..';

describe('Form saga helpers', () => {
  it('sendForm dispatches resource fetch', () => {
    const apiAction = () => {};
    const saga = sendForm(apiAction, 'login', {
      email: 'mail@test.com',
      password: 'foo',
    });

    expect(saga.next().value).toEqual(call(fetchResource, apiAction, {
      actions: {
        start: 'FORM_SUBMIT_STARTED',
        success: 'FORM_SUBMIT_SUCCESS',
        fail: 'FORM_SUBMIT_ERROR',
      },
      actionData: {
        form: 'login',
      },
      params: {
        formData: {
          email: 'mail@test.com',
          password: 'foo',
        },
      },
    }));
    expect(saga.next().done).toBe(true);
  });

  it('sendForm dispatches resource fetch with params', () => {
    const apiAction = () => {};
    const saga = sendForm(apiAction, 'login', { email: 'mail@test.com' }, { foo: 'bar' });

    expect(saga.next().value).toEqual(call(fetchResource, apiAction, {
      actions: {
        start: 'FORM_SUBMIT_STARTED',
        success: 'FORM_SUBMIT_SUCCESS',
        fail: 'FORM_SUBMIT_ERROR',
      },
      actionData: {
        form: 'login',
      },
      params: {
        formData: {
          email: 'mail@test.com',
        },
        foo: 'bar',
      },
    }));
    expect(saga.next().done).toBe(true);
  });
});
