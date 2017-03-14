import { expect } from 'chai';
import { takeLatest } from 'redux-saga/effects';

import { fetchTextsOnMount } from '../../../src/web/sagas/home';
import { fetchTextsIfNeeded } from '../../../src/web/sagas/texts';

describe('Home sagas', () => {
  it('fetchTextsOnMount creates fetch actions', () => {
    const saga = fetchTextsOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      'HOME_MOUNTED',
      fetchTextsIfNeeded,
      [
        'about-festival-short',
      ]
    ));
    expect(saga.next().done).to.equal(true);
  });
});
