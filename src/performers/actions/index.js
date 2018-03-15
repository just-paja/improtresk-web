import * as constants from '../constants';

export const requirePerformerList = () => ({
  type: constants.PERFORMERS_REQUIRED,
});

export const requirePerformerDetail = slug => ({
  type: constants.PERFORMER_DETAIL_REQUIRED,
  slug,
});
