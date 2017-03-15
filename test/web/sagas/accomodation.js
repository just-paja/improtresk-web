import { expect } from 'chai';
import { takeLatest } from 'redux-saga/effects';

import { fetchResourceIfNeeded } from '../../../src/web/sagas/common';
import { fetchTextsIfNeeded } from '../../../src/web/sagas/texts';
import {
  fetchAccomodationOnMount,
  fetchTextsOnMount,
} from '../../../src/web/sagas/accomodation';
import { isValid } from '../../../src/web/selectors/accomodation';

import * as api from '../../../src/web/api';

describe('Accomodation sagas', () => {
  it('fetchAccomodationOnMount creates fetch actions', () => {
    const saga = fetchAccomodationOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      'ACCOMODATION_MOUNTED',
      fetchResourceIfNeeded,
      api.fetchAccomodation,
      isValid,
      {
        onStart: 'ACCOMODATION_FETCH_STARTED',
        onSuccess: 'ACCOMODATION_FETCH_SUCCESS',
        onError: 'ACCOMODATION_FETCH_ERROR',
      }
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('fetchTextsOnMount creates fetch actions', () => {
    const saga = fetchTextsOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      [
        'ACCOMODATION_MOUNTED',
        'REQUEST_PARTICIPANT_DETAILS',
      ],
      fetchTextsIfNeeded,
      ['accomodation-intro']
    ));
    expect(saga.next().done).to.equal(true);
  });
});
