import { connect } from 'react-redux';

import ChangeFood from './components/ChangeFood';
import mapPageProgress from './mapPageProgress';

import { getActiveOrder, getOrderListProgress } from '../orders/selectors';
import { requireOrderList } from '../orders/actions';
import { redirectHome } from '../participants/actions';

const mapStateToProps = state => ({
  order: getActiveOrder(state),
});

const mapDispatchToProps = {
  onMissingOrder: redirectHome,
};

export default mapPageProgress({
  progressSelector: getOrderListProgress,
  onResourceChange: requireOrderList,
})(connect(mapStateToProps, mapDispatchToProps)(ChangeFood));
