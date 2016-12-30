import { combineReducers } from 'redux';

import newsDetail from './newsDetail';
import newsList from './newsList';

export default combineReducers({
  detail: newsDetail,
  list: newsList,
});
