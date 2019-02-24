import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

import mapProgress from '../../containers/mapProgress'
import WorkshopList from '../components/WorkshopList'

import { requireWorkshopListInteractive, exitWorkshopList } from '../actions'
import { getWorkshopListProgress, getWorkshopList } from '../selectors'

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
  workshops: getWorkshopList(state)
})

export default mapProgress(connect(mapStateToProps)(WorkshopList), {
  progressSelector: getWorkshopListProgress,
  onResourceChange: requireWorkshopListInteractive,
  onExit: exitWorkshopList
})
