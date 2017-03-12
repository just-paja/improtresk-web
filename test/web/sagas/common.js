import { expect } from 'chai';
import { call, fork, put, select } from 'redux-saga/effects';

import { fetchResource, fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { getApiSource } from '../../../src/web/selectors/session';

describe('Common saga helpers', () => {
  it('fetchResourceIfNeeded does not fetch when validity selector returns true', () => {
    const fetch = () => {};
    const selector = () => true;
    const testFetchIfNeeded = fetchResourceIfNeeded(
      fetch,
      selector,
      {
        onStart: 'started',
        onSuccess: 'succeeded',
        onError: 'failed',
        code: 'code',
      },
      { type: 'REDUX_ACTION', code: 'code' }
    );

    expect(testFetchIfNeeded.next().value).to.eql(select(selector));
    expect(testFetchIfNeeded.next(true).done).to.equal(true);
  });
  it('fetchResourceIfNeeded calls fetchResource when validity selector returns false', () => {
    const selector = () => false;
    const fetch = () => {};

    const testFetchIfNeeded = fetchResourceIfNeeded(
      fetch,
      selector,
      {
        onStart: 'started',
        onSuccess: 'succeeded',
        onError: 'failed',
        code: 'code',
      },
      { type: 'REDUX_ACTION' }
    );

    expect(testFetchIfNeeded.next().value).to.eql(select(selector));
    expect(testFetchIfNeeded.next(false).value).to.eql(fork(
      fetchResource,
      fetch,
      {
        onStart: 'started',
        onSuccess: 'succeeded',
        onError: 'failed',
        code: 'code',
      },
      { type: 'REDUX_ACTION' }
    ));
  });
  it('fetchResource dispatches onStart and onSuccess actions', () => {
    const fetch = () => {};
    const testFetch = fetchResource(
      fetch,
      {
        onStart: 'started',
        onSuccess: 'succeeded',
        onError: 'failed',
        code: 'code',
      },
      { type: 'REDUX_ACTION' }
    );

    expect(testFetch.next().value).to.eql(select(getApiSource));
    expect(testFetch.next('http://localhost').value)
      .to.eql(put({ type: 'started', code: 'code' }));
    expect(testFetch.next().value)
      .to.eql(call(fetch, {
        apiSource: 'http://localhost',
        code: 'code',
        type: 'REDUX_ACTION',
      }));

    const response = {
      status: 200,
      json: () => ({ text: 'foo' }),
    };

    expect(testFetch.next(response).value).to.eql({ text: 'foo' });

    expect(testFetch.next({ text: 'foo' }).value).to.eql(put({
      type: 'succeeded',
      code: 'code',
      data: {
        text: 'foo',
      },
    }));
  });
  it('fetchResource dispatches onStart and onSuccess 204 actions', () => {
    const fetch = () => {};
    const testFetch = fetchResource(
      fetch,
      {
        onStart: 'started',
        onSuccess: 'succeeded',
        onError: 'failed',
        code: 'code',
      },
      { type: 'REDUX_ACTION' }
    );

    expect(testFetch.next().value).to.eql(select(getApiSource));
    expect(testFetch.next('http://localhost').value)
      .to.eql(put({ type: 'started', code: 'code' }));
    expect(testFetch.next().value)
      .to.eql(call(fetch, {
        apiSource: 'http://localhost',
        code: 'code',
        type: 'REDUX_ACTION',
      }));

    const response = { status: 204 };

    expect(testFetch.next(response).value).to.eql([]);
    expect(testFetch.next([]).value).to.eql(put({
      type: 'succeeded',
      code: 'code',
      data: [],
    }));
  });
  it('fetchResource dispatches onStart and onError actions on < 200 status', () => {
    const fetch = () => {};
    const testFetch = fetchResource(
      fetch,
      {
        onStart: 'started',
        onSuccess: 'succeeded',
        onError: 'failed',
        code: 'code',
      },
      { type: 'REDUX_ACTION' }
    );

    expect(testFetch.next().value).to.eql(select(getApiSource));
    expect(testFetch.next('http://localhost').value)
      .to.eql(put({ type: 'started', code: 'code' }));
    expect(testFetch.next().value)
      .to.eql(call(fetch, {
        apiSource: 'http://localhost',
        code: 'code',
        type: 'REDUX_ACTION',
      }));
    expect(testFetch.next({
      status: 199,
      json: () => ({ errors: ['test error'] }),
      error: 'foo',
    }).value).to.eql({ errors: ['test error'] });
    expect(testFetch.next({ errors: ['test error'] }).value).to.eql(put({
      type: 'failed',
      data: { errors: ['test error'] },
      code: 'code',
      status: 199,
      error: 'foo',
    }));
    expect(testFetch.next().done).to.equal(true);
  });
  it('fetchResource dispatches onStart and onError actions on < 400 status', () => {
    const fetch = () => {};
    const testFetch = fetchResource(
      fetch,
      {
        onStart: 'started',
        onSuccess: 'succeeded',
        onError: 'failed',
        code: 'code',
      },
      { type: 'REDUX_ACTION' }
    );

    expect(testFetch.next().value).to.eql(select(getApiSource));
    expect(testFetch.next('http://localhost').value)
      .to.eql(put({ type: 'started', code: 'code' }));
    expect(testFetch.next().value)
      .to.eql(call(fetch, {
        apiSource: 'http://localhost',
        code: 'code',
        type: 'REDUX_ACTION',
      }));
    expect(testFetch.next({
      status: 400,
      json: () => ({ errors: ['test error'] }),
      error: 'foo',
    }).value).to.eql({ errors: ['test error'] });
    expect(testFetch.next({ errors: ['test error'] }).value).to.eql(put({
      type: 'failed',
      data: { errors: ['test error'] },
      code: 'code',
      status: 400,
      error: 'foo',
    }));
    expect(testFetch.next().done).to.equal(true);
  });
  it('fetchResource dispatches onStart and onError actions', () => {
    const fetch = () => {};
    const testFetch = fetchResource(
      fetch,
      {
        onStart: 'started',
        onSuccess: 'succeeded',
        onError: 'failed',
        code: 'code',
      },
      { type: 'REDUX_ACTION' }
    );

    expect(testFetch.next().value).to.eql(select(getApiSource));
    expect(testFetch.next('http://localhost').value)
      .to.eql(put({ type: 'started', code: 'code' }));
    expect(testFetch.next().value)
      .to.eql(call(fetch, {
        apiSource: 'http://localhost',
        code: 'code',
        type: 'REDUX_ACTION',
      }));

    const testError = new Error('test');
    const response = {
      status: 200,
      json: () => {
        throw testError;
      },
    };

    expect(testFetch.next(response).value).to.eql(put({
      type: 'failed',
      error: testError,
      code: 'code',
    }));
  });
});
