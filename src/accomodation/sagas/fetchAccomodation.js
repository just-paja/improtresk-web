import createCapacitySaga from '../../years/sagas/createCapacitySaga';

import { accomodationListFetch } from '../actions';
import { getAccomodationListState } from '../selectors';

export default createCapacitySaga(accomodationListFetch, {
  stateSelector: getAccomodationListState,
});
