import sinon from 'sinon';

import { expect } from 'chai';
import { call, takeLatest } from 'redux-saga/effects';

import { sendForm } from '../../../src/web/sagas/forms';
import { invalidate } from '../../../src/web/sagas/news';

import {
  bindReloadNewsDetail,
  bindVote,
  bindVoteStore,
  selectVoteSuccess,
  vote,
  voteStore,
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

  it('selectVoteSuccess selects poll success', () => {
    expect(selectVoteSuccess({
      type: 'FORM_SUBMIT_SUCCESS',
      form: 'poll',
    })).to.equal(true);
  });
  it('bindVote submits vote', () => {
    const saga = bindVote();
    expect(saga.next().value).to.eql(takeLatest('POLL_VOTE', vote));
    expect(saga.next().done).to.equal(true);
  });
  it('bindVoteStore binds voteStore', () => {
    const saga = bindVoteStore();
    expect(saga.next().value).to.eql(takeLatest(selectVoteSuccess, voteStore));
    expect(saga.next().done).to.equal(true);
  });
  it('bindReloadNewsDetail reloads news detail on vote success', () => {
    const saga = bindReloadNewsDetail();
    expect(saga.next().value).to.eql(takeLatest(
      selectVoteSuccess,
      invalidate
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
    expect(saga.next().done).to.equal(true);
  });
  it('vote submits vote as form', () => {
    const saga = voteStore({ survey: 9 });
    saga.next();
    expect(localStorage.setItem.args).to.eql([
      ['votedPoll9', true],
    ]);
    expect(saga.next().done).to.equal(true);
  });
});
