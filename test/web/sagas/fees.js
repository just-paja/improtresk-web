import { expect } from 'chai';
import { takeLatest } from 'redux-saga/effects';

import { fetchTextsOnMount } from '../../../src/web/sagas/fees';
import { fetchTextsIfNeeded } from '../../../src/web/sagas/texts';

describe('Fees sagas', () => {
  it('fetchTextsOnMount creates fetch actions', () => {
    const saga = fetchTextsOnMount();
    expect(saga.next().value).to.eql(takeLatest(
      'FEES_MOUNTED',
      fetchTextsIfNeeded,
      [
        'what-do-you-pay-for',
        'how-to-pay',
        'how-to-sign-out',
      ]
    ));
    expect(saga.next().done).to.equal(true);
  });
});
