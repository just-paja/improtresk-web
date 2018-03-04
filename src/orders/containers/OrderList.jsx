import { connect } from 'react-redux';

import { requireOrderList } from '../actions';
import { getOrderList, getOrderListProgress } from '../selectors';

import OrderList from '../components/OrderList';
import mapProgress from '../../containers/mapProgress';

const mapStateToProps = state => ({
  orders: getOrderList(state),
});

export default mapProgress(connect(mapStateToProps)(OrderList), {
  progressSelector: getOrderListProgress,
  onResourceChange: requireOrderList,
});
