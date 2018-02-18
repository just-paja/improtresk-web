import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Food from './components/Food';
import mapPageProgress from './mapPageProgress';

import { getMealList } from '../food/selectors';
import { getFoodPageProgress } from './selectors';

import * as constants from './constants';

const mapStateToProps = state => ({
  meals: getMealList(state),
  translate: getTranslate(state.locale),
});

export default mapPageProgress(connect(mapStateToProps)(Food), {
  progressSelector: getFoodPageProgress,
  onResourceChange: () => ({ type: constants.PAGE_FOOD_ENTERED }),
});
