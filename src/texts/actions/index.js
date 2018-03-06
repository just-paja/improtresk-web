import * as constants from '../constants';

export const requireText = category => ({
  type: constants.TEXT_REQUIRED,
  category,
});

export default { requireText };
