import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import MealList from '../components/MealList';
import mapProgress from '../../containers/mapProgress';

import { getMealList, getMealListProgress } from '../selectors';
import { requireMealList } from '../actions';

const mapStateToProps = state => ({
  mealList: getMealList(state),
  translate: getTranslate(state.locale),
});

export default mapProgress(connect(mapStateToProps)(MealList), {
  progressSelector: getMealListProgress,
  onResourceChange: requireMealList,
});
