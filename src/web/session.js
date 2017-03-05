import { isLoggedIn } from './selectors/session';
import { reverse } from './routeTable';
import { updateParticipantLastAction } from './api';

export const validateLogin = getState =>
  (nextLocationState, replace) => {
    const state = getState();

    if (isLoggedIn(state)) {
      updateParticipantLastAction();
    } else {
      replace(reverse('signup'));
    }
  };

export default { validateLogin };
