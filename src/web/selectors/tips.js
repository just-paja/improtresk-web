import { createSelector } from 'reselect';

const getTipsState = state => state.tips;

export const tipsAll = createSelector(getTipsState, tips => tips.data);

export default { tipsAll };
