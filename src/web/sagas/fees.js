import { takeLatest } from 'redux-saga';

import { fetchTextsIfNeeded } from './texts';

import * as constants from '../constants/actions';
import * as texts from '../constants/texts';

export function* fetchTextsOnMount() {
  yield* takeLatest(
    constants.FEES_MOUNTED,
    fetchTextsIfNeeded,
    [
      texts.FEES_WHAT_DO_YOU_PAY_FOR,
      texts.FEES_HOW_TO_PAY,
      texts.FEES_HOW_TO_SIGN_OUT,
    ]
  );
}

export default [
  fetchTextsOnMount,
];
