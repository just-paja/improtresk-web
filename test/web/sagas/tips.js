import { expect } from 'chai';
import { takeLatest } from 'redux-saga/effects';

import { fetchTipsOnMount } from '../../../src/web/sagas/tips';
import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { isValid } from '../../../src/web/selectors/tips';

import * as api from '../../../src/web/api';

describe('Tips sagas', () => {
  it('fetchTipsOnMount creates fetch actions', () => {
    const saga = fetchTipsOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      'TIPS_MOUNTED',
      fetchResourceIfNeeded,
      api.fetchTips,
      isValid,
      {
        onStart: 'TIPS_FETCH_STARTED',
        onSuccess: 'TIPS_FETCH_SUCCESS',
        onError: 'TIPS_FETCH_ERROR',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
});
