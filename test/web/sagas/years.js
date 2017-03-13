import { expect } from 'chai';
import { takeLatest } from 'redux-saga/effects';

import { fetchYearsOnMount } from '../../../src/web/sagas/years';
import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { shouldFetchYears } from '../../../src/web/selectors/years';

import * as api from '../../../src/web/api';

describe('Tips sagas', () => {
  it('fetchYearsOnMount creates fetch actions', () => {
    const saga = fetchYearsOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      [
        'APP_MOUNTED',
        'HOME_MOUNTED',
        'CONDITIONS_MOUNTED',
        'SIGNUP_MOUNTED',
      ],
      fetchResourceIfNeeded,
      api.fetchYears,
      shouldFetchYears,
      {
        onStart: 'YEARS_FETCH_STARTED',
        onSuccess: 'YEARS_FETCH_SUCCESS',
        onError: 'YEARS_FETCH_ERROR',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
});
