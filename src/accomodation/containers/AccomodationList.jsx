import { connect } from 'react-redux';

import AccomodationList from '../components/AccomodationList';
import mapProgress from '../../containers/mapProgress';

import { getAccomodationList, getAccomodationListProgress } from '../selectors';
import { accomodationListFetch } from '../actions';

const mapStateToProps = state => ({
  accomodationList: getAccomodationList(state),
});

export default mapProgress(connect(mapStateToProps)(AccomodationList), {
  progressSelector: getAccomodationListProgress,
  onResourceChange: accomodationListFetch.subscribe,
  onExit: accomodationListFetch.unsubscribe,
});
