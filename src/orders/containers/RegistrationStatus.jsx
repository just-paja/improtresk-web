import { connect } from 'react-redux';

import { requireOrderList } from '../actions';
import { getActiveOrder, getOrderListProgress } from '../selectors';
import { getRegistrationCloseDate } from '../../years/selectors';

import RegistrationStatus from '../components/RegistrationStatus';
import mapProgress from '../../containers/mapProgress';

const mapStateToProps = state => ({
  activeOrder: getActiveOrder(state),
  registrationsCloseDate: getRegistrationCloseDate(state),
});

export default mapProgress(connect(mapStateToProps)(RegistrationStatus), {
  progressSelector: getOrderListProgress,
  onResourceChange: requireOrderList,
});
