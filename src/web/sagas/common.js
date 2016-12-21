import { fork, select } from 'redux-saga/effects';

export const ifNeeded = (generator, selector) => function* ifNeededInner() {
  const valid = yield select(selector);

  if (!valid) {
    yield fork(generator);
  }
};

export default { ifNeeded };
