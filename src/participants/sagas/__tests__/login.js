import cookie from 'js-cookie';
import sinon from 'sinon';

import { push } from 'react-router-redux';

import * as api from '../../../api';

import getSagaTester from '../../../../mock/sagaTester';
import sagas from '..';

describe('Login saga', () => {
  beforeEach(() => {
    sinon.stub(cookie, 'getJSON');
    sinon.stub(cookie, 'set');
    Object.keys(api).forEach(key => sinon.stub(api, key));
  });

  afterEach(() => {
    cookie.getJSON.restore();
    cookie.set.restore();
    Object.keys(api).forEach(key => api[key].restore());
  });

  it('redirects participant to his home page on login', () => {
    const sagaTester = getSagaTester({});

    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'PARTICIPANT_LOGIN' });
    expect(sagaTester.getCalledActions()).toContainEqual(push('/cs/ucastnik'));
  });

  it('submits login form and saves token on success', () => {
    const sagaTester = getSagaTester({});

    api.login.returns({
      status: 200,
      json: () => ({
        access_token: 'Oyh7tWLBGIXmXJrSBjFit9Sz6sCqlu',
        expires_in: 36000,
        token_type: 'Bearer',
        scope: 'write',
        refresh_token: 'TtMGe8ZaC4boRBDXkXqdFwPxV0dQiD',
      }),
    });

    sagaTester.runAll(sagas);
    sagaTester.dispatch({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'login',
    });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'FORM_SUBMIT_STARTED',
      form: 'login',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'FORM_SUBMIT_SUCCESS',
      form: 'login',
    }));
    expect(sagaTester.getState().session.data).toEqual({
      access_token: 'Oyh7tWLBGIXmXJrSBjFit9Sz6sCqlu',
      expires_in: 36000,
      token_type: 'Bearer',
      scope: 'write',
      refresh_token: 'TtMGe8ZaC4boRBDXkXqdFwPxV0dQiD',
    });
  });

  it('fetches participant on login form submit success', () => {
    const sagaTester = getSagaTester({});
    api.login.returns({
      status: 200,
      json: () => ({}),
    });

    sagaTester.runAll(sagas);
    sagaTester.dispatch({
      type: 'FORM_SUBMIT_SUCCESS',
      form: 'login',
      data: {
        access_token: 'Oyh7tWLBGIXmXJrSBjFit9Sz6sCqlu',
        expires_in: 36000,
        token_type: 'Bearer',
        scope: 'write',
        refresh_token: 'TtMGe8ZaC4boRBDXkXqdFwPxV0dQiD',
      },
    });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'PARTICIPANT_FETCH_STARTED',
    }));
  });

  it('fetches participant on login form submit success despite it is valid', () => {
    const sagaTester = getSagaTester({
      participants: {
        detail: {
          data: {
            id: 500,
          },
          valid: true,
        },
      },
    });
    api.login.returns({
      status: 200,
      json: () => ({}),
    });

    sagaTester.runAll(sagas);
    sagaTester.dispatch({
      type: 'FORM_SUBMIT_SUCCESS',
      form: 'login',
      data: {
        access_token: 'Oyh7tWLBGIXmXJrSBjFit9Sz6sCqlu',
        expires_in: 36000,
        token_type: 'Bearer',
        scope: 'write',
        refresh_token: 'TtMGe8ZaC4boRBDXkXqdFwPxV0dQiD',
      },
    });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'PARTICIPANT_FETCH_STARTED',
    }));
  });

  it('saves auth key cookie on login form submit success', () => {
    const sagaTester = getSagaTester({});
    api.login.returns({
      status: 200,
      json: () => ({}),
    });

    sagaTester.runAll(sagas);
    sagaTester.dispatch({
      type: 'FORM_SUBMIT_SUCCESS',
      form: 'login',
      data: {
        access_token: 'Oyh7tWLBGIXmXJrSBjFit9Sz6sCqlu',
        expires_in: 36000,
        token_type: 'Bearer',
        scope: 'write',
        refresh_token: 'TtMGe8ZaC4boRBDXkXqdFwPxV0dQiD',
      },
    });
    expect(cookie.set.calledOnce).toBeTruthy();
    expect(cookie.set.getCall(0).args).toEqual([
      'auth',
      {
        access_token: 'Oyh7tWLBGIXmXJrSBjFit9Sz6sCqlu',
        expires_in: 36000,
        token_type: 'Bearer',
        scope: 'write',
        refresh_token: 'TtMGe8ZaC4boRBDXkXqdFwPxV0dQiD',
      },
      {
        expires: 30,
      },
    ]);
  });

  it('clears login form on submit success', () => {
    const sagaTester = getSagaTester({});
    api.login.returns({
      status: 200,
      json: () => ({}),
    });

    sagaTester.runAll(sagas);
    sagaTester.dispatch({
      type: 'FORM_SUBMIT_SUCCESS',
      form: 'login',
      data: {
        access_token: 'Oyh7tWLBGIXmXJrSBjFit9Sz6sCqlu',
        expires_in: 36000,
        token_type: 'Bearer',
        scope: 'write',
        refresh_token: 'TtMGe8ZaC4boRBDXkXqdFwPxV0dQiD',
      },
    });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'FORM_VALUES_CLEAR',
      form: 'login',
    }));
  });

  it('logins in participant on mount when an auth cookie is defined', () => {
    const sagaTester = getSagaTester({});
    cookie.getJSON.returns({
      access_token: 'Oyh7tWLBGIXmXJrSBjFit9Sz6sCqlu',
      expires_in: 36000,
      token_type: 'Bearer',
      scope: 'write',
      refresh_token: 'TtMGe8ZaC4boRBDXkXqdFwPxV0dQiD',
    });

    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'APP_MOUNTED' });
    expect(cookie.getJSON.calledOnce).toBeTruthy();
    expect(cookie.getJSON.getCall(0).args).toEqual(['auth']);
    expect(sagaTester.getState().session.autoLoginAttempted).toBe(true);
    expect(sagaTester.getState().session.data).toEqual({
      access_token: 'Oyh7tWLBGIXmXJrSBjFit9Sz6sCqlu',
      expires_in: 36000,
      token_type: 'Bearer',
      scope: 'write',
      refresh_token: 'TtMGe8ZaC4boRBDXkXqdFwPxV0dQiD',
    });
  });

  it('logins in participant on mount when no auth cookie is defined', () => {
    const sagaTester = getSagaTester({});
    cookie.getJSON.returns(null);

    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'APP_MOUNTED' });
    expect(cookie.getJSON.calledOnce).toBeTruthy();
    expect(cookie.getJSON.getCall(0).args).toEqual(['auth']);
    expect(sagaTester.getState().session.autoLoginAttempted).toBe(true);
    expect(sagaTester.getState().session.data).toEqual({});
  });

  it('logins in participant on mount when cookie does not contain access token', () => {
    const sagaTester = getSagaTester({});
    cookie.getJSON.returns({
      expires_in: 36000,
      token_type: 'Bearer',
      scope: 'write',
      refresh_token: 'TtMGe8ZaC4boRBDXkXqdFwPxV0dQiD',
    });

    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'APP_MOUNTED' });
    expect(cookie.getJSON.calledOnce).toBeTruthy();
    expect(cookie.getJSON.getCall(0).args).toEqual(['auth']);
    expect(sagaTester.getState().session.autoLoginAttempted).toBe(true);
    expect(sagaTester.getState().session.data).toEqual({});
  });
});
