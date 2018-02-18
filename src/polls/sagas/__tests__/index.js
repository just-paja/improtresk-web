import sinon from 'sinon';

import { call, takeLatest } from 'redux-saga/effects';

import { sendForm } from '../../../forms/sagas/sendForm';

import {
  onUserVote,
  onUserVoteSuccess,
  selectVoteSuccess,
  vote,
  voteStore,
} from '../';

import * as api from '../../../api';

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
    })).toBe(true);
  });

  it('onUserVote submits vote', () => {
    const saga = onUserVote();
    expect(saga.next().value).toEqual(takeLatest('POLL_VOTE', vote));
    expect(saga.next().done).toBe(true);
  });

  it('onUserVoteSuccess binds voteStore', () => {
    const saga = onUserVoteSuccess();
    expect(saga.next().value).toEqual(takeLatest(selectVoteSuccess, voteStore));
    expect(saga.next().done).toBe(true);
  });

  it('vote submits vote as form', () => {
    const saga = vote({
      survey: 9,
      answer: 5,
    });
    expect(saga.next().value).toEqual(call(
      sendForm,
      api.pollVote,
      'poll',
      { answer: 5 },
      { survey: 9 }
    ));
    expect(saga.next().done).toBe(true);
  });

  it('vote submits vote as form', () => {
    const saga = voteStore({ survey: 9 });
    saga.next();
    expect(localStorage.setItem.args).toEqual([
      ['votedPoll9', true],
    ]);
    expect(saga.next().done).toBe(true);
  });
});
