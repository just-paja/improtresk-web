import { connect } from 'react-redux';

import mapPageProgress from './mapPageProgress';
import WorkshopDetailPage from './components/WorkshopDetailPage';

import { workshopsDetail } from '../workshops/selectors';
import { getWorkshopDetailPageProgress } from './selectors';

import * as constants from './constants';

const mapStateToProps = state => ({
  progress: getWorkshopDetailPageProgress(state),
  workshop: workshopsDetail(state),
});

export default mapPageProgress(connect(mapStateToProps)(WorkshopDetailPage), {
  matchParam: 'slug',
  progressSelector: getWorkshopDetailPageProgress,
  onResourceChange: workshop => ({
    type: constants.PAGE_WORKSHOP_DETAIL_ENTERED,
    workshop,
  }),
});
