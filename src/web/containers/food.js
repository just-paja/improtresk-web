import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Food from '../components/pages/food';

import { foodTimesAll } from '../selectors/food';
import { getText, readyTexts } from '../selectors/texts';

import * as actions from '../constants/actions';
import * as texts from '../constants/texts';

const mapStateToProps = state => ({
  foodTimes: foodTimesAll(state),
  intro: getText(state, texts.FOOD_INTRO),
  ready: state.foodTimes.ready && readyTexts(state, [texts.FOOD_INTRO]),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.FOOD_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Food);