import { takeLatest } from 'redux-saga/effects';

import * as sagas from '..';
import { fetchTextsIfRequired } from '../../../texts/sagas/fetchText';

describe('Fees sagas', () => {
  it('fetchFeesTexts creates fetch actions', () => {
    const saga = sagas.fetchFeesTexts();
    expect(saga.next().value).toEqual(takeLatest(
      'PAGE_FEES_ENTERED',
      fetchTextsIfRequired,
      [
        'what-do-you-pay-for',
        'how-to-pay',
        'how-to-sign-out',
      ]
    ));
    expect(saga.next().done).toBe(true);
  });

  it('fetchLocationsTexts creates fetch actions', () => {
    const saga = sagas.fetchLocationsTexts();
    expect(saga.next().value).toEqual(takeLatest(
      'PAGE_LOCATIONS_ENTERED',
      fetchTextsIfRequired,
      [
        'locations-intro',
      ]
    ));
    expect(saga.next().done).toBe(true);
  });
});
