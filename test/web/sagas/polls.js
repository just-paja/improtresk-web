import sinon from 'sinon';

import { expect } from 'chai';
import { call, takeLatest } from 'redux-saga/effects';

import { sendForm } from '../../../src/web/sagas/forms';
import { fetchNewsDetail } from '../../../src/web/sagas/news';

import {
  bindReloadNewsDetail,
  bindVote,
  selectVoteSuccess,
  vote,
} from '../../../src/web/sagas/polls';

import * as api from '../../../src/web/api';

describe('Polls sagas', () => {
  beforeEach(() => {
    global.localStorage = {
      setItem: sinon.spy(),
    };
  });

  afterEach(() => {
    global.localStorage = undefined;
  });

  it('bindVote submits vote', () => {
    const saga = bindVote();
    expect(saga.next().value).to.eql(takeLatest('POLL_VOTE', vote));
    expect(saga.next().done).to.equal(true);
  });
  it('bindReloadNewsDetail reloads news detail on vote success', () => {
    const saga = bindReloadNewsDetail();
    expect(saga.next().value).to.eql(takeLatest(
      selectVoteSuccess,
      fetchNewsDetail
    ));
    expect(saga.next().done).to.equal(true);
  });
  it('vote submits vote as form', () => {
    const saga = vote({
      survey: 9,
      answer: 5,
    });
    expect(saga.next().value).to.eql(call(
      sendForm,
      api.pollVote,
      'poll',
      { answer: 5 },
      { survey: 9 }
    ));
    saga.next();
    expect(localStorage.setItem.args).to.eql([
      ['votedPoll9', true],
    ]);
    expect(saga.next().done).to.equal(true);
  });
});
