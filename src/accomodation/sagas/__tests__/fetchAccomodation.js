import { call, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../../sagas/api';
import { isAccomodationListRequired } from '../../selectors';

import * as api from '../../../api';
import * as sagas from '..';

describe('Accomodation sagas', () => {
  it('fetchAccomodationList triggers fetch if needed', () => {
    const gen = sagas.fetchAccomodationList();
    expect(gen.next().value).toEqual(
      call(fetchResourceIfRequired, api.fetchAccomodation, {
        isRequired: isAccomodationListRequired,
        actions: {
          start: 'ACCOMODATION_FETCH_STARTED',
          success: 'ACCOMODATION_FETCH_SUCCESS',
          fail: 'ACCOMODATION_FETCH_ERROR',
        },
      })
    );
    expect(gen.next().done).toBe(true);
  });

  it('requireAccomodationList triggers fetch if needed', () => {
    const gen = sagas.requireAccomodationList();
    expect(gen.next().value).toEqual(takeLatest(
      'ACCOMODATION_REQUIRED',
      sagas.fetchAccomodationList
    ));
    expect(gen.next().done).toBe(true);
  });
});
