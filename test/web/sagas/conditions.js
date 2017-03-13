import { expect } from 'chai';
import { fork, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { isValid } from '../../../src/web/selectors/conditions';
import { yearActiveNumber } from '../../../src/web/selectors/years';

import {
  fetchConditions,
  fetchYearsConditions,
} from '../../../src/web/sagas/conditions';

import * as api from '../../../src/web/api';

describe('Conditions sagas', () => {
  it('fetchConditions creates fetch actions', () => {
    const saga = fetchConditions();
    expect(saga.next().value).to.eql(takeLatest(
      'CONDITIONS_MOUNTED',
      fetchYearsConditions
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchYearsConditions creates fetch actions', () => {
    const saga = fetchYearsConditions();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next('2017').value).to.eql(fork(
      fetchResourceIfNeeded,
      api.fetchConditionsCurrent,
      isValid,
      {
        onStart: 'CONDITIONS_CURRENT_FETCH_STARTED',
        onSuccess: 'CONDITIONS_CURRENT_FETCH_SUCCESS',
        onError: 'CONDITIONS_CURRENT_FETCH_ERROR',
        year: '2017',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchYearsConditions creates nothing without year', () => {
    const saga = fetchYearsConditions();
    expect(saga.next().value).to.eql(select(yearActiveNumber));
    expect(saga.next(null).done).to.equal(true);
  });
});
