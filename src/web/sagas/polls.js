import { call, takeLatest } from 'redux-saga/effects';

import { sendForm } from './forms';

import * as api from '../api';
import * as constants from '../constants/actions';

export function* vote(action) {
  yield call(
    sendForm,
    api.pollVote,
    'poll',
    { answer: action.answer },
    { survey: action.survey }
  );
}

export function* bindVote() {
  yield takeLatest(constants.POLL_VOTE, vote);
}

export default [
  bindVote,
];
