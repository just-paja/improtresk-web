import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

import mapProgress from '../../containers/mapProgress'
import Tips from '../components/TipList'

import { requireTipList } from '../actions'
import {
  getTipList,
  getTipListProgress
} from '../selectors'

const mapStateToProps = state => ({
  tips: getTipList(state),
  translate: getTranslate(state.locale)
})

export default mapProgress(connect(mapStateToProps)(Tips), {
  progressSelector: getTipListProgress,
  onResourceChange: requireTipList
})
