import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getTipsState = state => state.tips;

export const tipsAll = createSelector(getTipsState, tips => tips.data);

export const isValid = state => isStateValid(state.tips);
