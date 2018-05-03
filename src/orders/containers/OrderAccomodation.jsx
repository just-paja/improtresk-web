import { connect } from 'react-redux';

import { orderListFetch } from '../actions';
import { getActiveOrder, getOrderListProgress } from '../selectors';
import { getParticipantDetail } from '../../participants/selectors';
import { getRoomChoice } from '../../roommates/selectors';

import OrderAccomodation from '../components/OrderAccomodation';
import mapProgress from '../../containers/mapProgress';

const mapStateToProps = state => ({
  order: getActiveOrder(state),
  participant: getParticipantDetail(state),
  roomChoice: getRoomChoice(state),
});

export default mapProgress(connect(mapStateToProps)(OrderAccomodation), {
  progressSelector: getOrderListProgress,
  onResourceChange: orderListFetch,
});
