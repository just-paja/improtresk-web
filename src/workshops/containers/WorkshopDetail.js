import { connect } from 'react-redux'

import mapProgress from '../../containers/mapProgress'
import WorkshopDetail from '../components/WorkshopDetail'

import { getWorkshopDetailProgress, workshopsDetail } from '../selectors'
import { requireWorkshopDetail, exitWorkshopDetail } from '../actions'

const mapStateToProps = state => ({
  workshop: workshopsDetail(state)
})

export default mapProgress(connect(mapStateToProps)(WorkshopDetail), {
  progressSelector: getWorkshopDetailProgress,
  onResourceChange: requireWorkshopDetail,
  onExit: exitWorkshopDetail
})
