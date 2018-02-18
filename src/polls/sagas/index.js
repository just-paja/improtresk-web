import { call, takeLatest } from 'redux-saga/effects';

import { sendForm } from '../../forms/sagas/sendForm';

import * as api from '../../api';
import * as actions from '../constants';
import * as formActions from '../../forms/constants';

export const selectVoteSuccess = action =>
  action.type === formActions.FORM_SUBMIT_SUCCESS && action.form === 'poll';

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

export function* onUserVote() {
  yield takeLatest(actions.POLL_VOTE, vote);
}

export function* onUserVoteSuccess() {
  yield takeLatest(selectVoteSuccess, voteStore);
}

export default [
  onUserVote,
  onUserVoteSuccess,
];
