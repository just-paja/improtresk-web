import { connect } from 'react-redux'

import mapProgress from '../../containers/mapProgress'
import Rules from '../components/Rules'

import { requireRules } from '../actions'
import { getRules, getRulesProgress } from '../selectors'

const mapStateToProps = state => ({
  rules: getRules(state)
})

export default mapProgress(connect(mapStateToProps)(Rules), {
  progressSelector: getRulesProgress,
  onResourceChange: requireRules
})
