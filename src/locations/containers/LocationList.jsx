import { connect } from 'react-redux'

import LocationList from '../components/LocationList'
import mapProgress from '../../containers/mapProgress'

import { getLocationList, getLocationListProgress } from '../selectors'
import { requireLocationList } from '../actions'

const mapStateToProps = state => ({
  locationList: getLocationList(state)
})

export default mapProgress(connect(mapStateToProps)(LocationList), {
  progressSelector: getLocationListProgress,
  onResourceChange: requireLocationList
})
