import { connect } from 'react-redux';

import ArchivedYear from './components/ArchivedYear';
import mapPageProgress from './mapPageProgress';

import {
  getArchivedYear,
  getArchivedYearTopic,
  getArchivedYearWorkshops,
  getArchiveProgress,
} from '../years/selectors';

import * as constants from './constants';

const mapStateToProps = state => ({
  topic: getArchivedYearTopic(state),
  workshops: getArchivedYearWorkshops(state),
  year: getArchivedYear(state),
});

export default mapPageProgress(connect(mapStateToProps)(ArchivedYear), {
  matchParam: 'slug',
  progressSelector: getArchiveProgress,
  onResourceChange: year => ({ type: constants.PAGE_ARCHIVED_YEAR_ENTERED, year }),
});
