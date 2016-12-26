import { expect } from 'chai';
import { fork } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { fetchTextsIfNeeded, fetchTextIfNeeded, isTextCodeValid } from '../../../src/web/sagas/texts';

import * as api from '../../../src/api';

describe('Text sagas', () => {
  it('fetchTextsIfNeeded forks fetchTextsIfNeeded for all texts', () => {
    const testFetchIfNeeded = fetchTextsIfNeeded(
      ['foo', 'bar'],
      { type: 'REDUX_ACTION' }
    );

    expect(testFetchIfNeeded.next().value).to.eql([
      fork(fetchTextIfNeeded, 'foo', { type: 'REDUX_ACTION' }),
      fork(fetchTextIfNeeded, 'bar', { type: 'REDUX_ACTION' }),
    ]);
  });

  it('fetchTextIfNeeded forks fetchResourceIfNeeded for all texts', () => {
    const testFetchIfNeeded = fetchTextIfNeeded(
      'foo',
      { type: 'REDUX_ACTION' }
    );

    const isValid = testFetchIfNeeded.next().value;
    expect(testFetchIfNeeded.next().value).to.eql(fork(
      fetchResourceIfNeeded,
      api.fetchText,
      isValid,
      {
        onStart: 'TEXT_FETCH_STARTED',
        onSuccess: 'TEXT_FETCH_SUCCESS',
        onError: 'TEXT_FETCH_ERROR',
        code: 'foo',
      },
      { type: 'REDUX_ACTION' }
    ));
  });

  it('isTextCodeValid returns false when it is not valid', () => {
    expect(isTextCodeValid('foo')({ })).to.equal(false);
    expect(isTextCodeValid('foo')({ texts: {} })).to.equal(false);
    expect(isTextCodeValid('foo')({ texts: { foo: {} } })).to.equal(false);
    expect(isTextCodeValid('foo')({ texts: { foo: { valid: false } } })).to.equal(false);
  });

  it('isTextCodeValid returns true when valid', () => {
    expect(isTextCodeValid('foo')({ texts: { foo: { valid: true } } })).to.equal(true);
  });
});
