import { connect } from 'react-redux';

import { orderListFetch } from '../actions';
import { getActiveOrder, getOrderListProgress } from '../selectors';
import { getRegistrationCloseDate, isFoodPickingAllowed } from '../../years/selectors';

import OrderFood from '../components/OrderFood';
import mapProgress from '../../containers/mapProgress';

const mapStateToProps = state => ({
  order: getActiveOrder(state),
  registrationsCloseDate: getRegistrationCloseDate(state),
  isFoodPickingAllowed: isFoodPickingAllowed(state),
});

export default mapProgress(connect(mapStateToProps)(OrderFood), {
  progressSelector: getOrderListProgress,
  onResourceChange: orderListFetch,
});
