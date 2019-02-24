import { connect } from 'react-redux'

import MealList from '../components/MealList'
import mapProgress from '../../containers/mapProgress'

import { getMealList, getMealListProgress } from '../selectors'
import { mealListFetch } from '../actions'

const mapStateToProps = state => ({
  mealList: getMealList(state)
})

export default mapProgress(connect(mapStateToProps)(MealList), {
  progressSelector: getMealListProgress,
  onResourceChange: mealListFetch
})
