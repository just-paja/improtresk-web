import * as constants from '../constants';

export const requireScheduleEvents = () => ({
  type: constants.SCHEDULE_EVENTS_REQUIRED,
});

export default { requireScheduleEvents };
