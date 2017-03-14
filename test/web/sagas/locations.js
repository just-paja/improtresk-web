import { expect } from 'chai';
import { takeLatest } from 'redux-saga/effects';

import { fetchTextsOnMount } from '../../../src/web/sagas/locations';
import { fetchTextsIfNeeded } from '../../../src/web/sagas/texts';

describe('Location sagas', () => {
  it('fetchTextsOnMount creates fetch actions', () => {
    const saga = fetchTextsOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      'REQUEST_WORKSHOP_LOCATIONS',
      fetchTextsIfNeeded,
      [
        'locations-intro',
      ]
    ));
    expect(saga.next().done).to.equal(true);
  });
});
