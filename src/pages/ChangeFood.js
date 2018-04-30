import { connect } from 'react-redux';

import ChangeFood from './components/ChangeFood';
import mapPageProgress from './mapPageProgress';

import { getActiveOrder, getOrderFormProgress } from '../orders/selectors';
import { requireOrderResources } from '../orders/actions';
import { redirectHome } from '../participants/actions';

const mapStateToProps = state => ({
  order: getActiveOrder(state),
});

const mapDispatchToProps = {
  onMissingOrder: redirectHome,
};

export default mapPageProgress(connect(mapStateToProps, mapDispatchToProps)(ChangeFood), {
  progressSelector: getOrderFormProgress,
  onResourceChange: requireOrderResources,
});
