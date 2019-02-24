import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

import ArchivedYearDetail from '../components/ArchivedYearDetail'
import mapProgress from '../../containers/mapProgress'

import { yearDetailFetch } from '../actions'
import {
  getArchivedYear,
  getArchivedYearTopic,
  getArchivedYearWorkshops,
  getArchiveProgress
} from '../selectors'

const mapStateToProps = state => ({
  topic: getArchivedYearTopic(state),
  translate: getTranslate(state.locale),
  workshops: getArchivedYearWorkshops(state),
  year: getArchivedYear(state)
})

export default mapProgress(connect(mapStateToProps)(ArchivedYearDetail), {
  progressSelector: getArchiveProgress,
  onResourceChange: yearDetailFetch
})
