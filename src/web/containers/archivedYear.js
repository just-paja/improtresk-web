import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArchivedYear from '../components/pages/archivedYear';

import {
  getArchivedYear,
  getArchivedYearTopic,
  getArchivedYearWorkshops,
} from '../selectors/archive';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  ready: state.archive.ready,
  topic: getArchivedYearTopic(state),
  workshops: getArchivedYearWorkshops(state),
  year: getArchivedYear(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onDataRequest: year => ({ type: actions.ARCHIVED_YEAR_MOUNTED, year }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArchivedYear);
