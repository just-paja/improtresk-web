import { call, takeLatest } from 'redux-saga/effects';

import { sendForm } from './forms';
import { fetchNewsDetail } from './news';

import * as api from '../api';
import * as constants from '../constants/actions';

export const selectVoteSuccess = action =>
  action.type === constants.FORM_SUBMIT_SUCCESS && action.form === 'poll';

export function* vote(action) {
  yield call(
    sendForm,
    api.pollVote,
    'poll',
    { answer: action.answer },
    { survey: action.survey }
  );
}

export function* voteStore(action) {
  yield localStorage.setItem(`votedPoll${action.survey}`, true);
}

export function* bindVote() {
  yield takeLatest(constants.POLL_VOTE, vote);
}

export function* bindVoteStore() {
  yield takeLatest(selectVoteSuccess, voteStore);
}

export function* bindReloadNewsDetail() {
  yield takeLatest(selectVoteSuccess, fetchNewsDetail);
}

export default [
  bindVote,
  bindVoteStore,
  bindReloadNewsDetail,
];
