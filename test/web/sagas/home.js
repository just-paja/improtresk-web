import { expect } from 'chai';
import { takeLatest } from 'redux-saga/effects';

import {
  fetchTextsOnMount,
  openVandaDoor,
  bindVandaDoor,
} from '../../../src/web/sagas/home';
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
  it('bindVandaDoor binds vandadoor to open on home mount', () => {
    const saga = bindVandaDoor();
    expect(saga.next().value).to.eql(takeLatest('HOME_MOUNTED', openVandaDoor));
    expect(saga.next().done).to.equal(true);
  });
  it('openVandaDoor does nothing without window', () => {
    const saga = openVandaDoor();
    expect(saga.next().done).to.equal(true);
  });
});
