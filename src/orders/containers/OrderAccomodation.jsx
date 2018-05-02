import { connect } from 'react-redux';

import { orderListFetch } from '../actions';
import { getActiveOrder, getOrderListProgress } from '../selectors';
import { getParticipantDetail } from '../../participants/selectors';

import OrderAccomodation from '../components/OrderAccomodation';
import mapProgress from '../../containers/mapProgress';

const mapStateToProps = state => ({
  order: getActiveOrder(state),
  participant: getParticipantDetail(state),
});

export default mapProgress(connect(mapStateToProps)(OrderAccomodation), {
  progressSelector: getOrderListProgress,
  onResourceChange: orderListFetch,
});
