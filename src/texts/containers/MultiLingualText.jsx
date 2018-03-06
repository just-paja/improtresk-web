import { connect } from 'react-redux';

import { getLang } from '../../selectors';
import { getText, getTextProgress } from '../selectors';
import { requireText } from '../actions';

import mapProgress from '../../containers/mapProgress';
import MultiLingualMarkdown from '../../components/MultiLingualMarkdown';

export default (category) => {
  const getCategoryText = getText(category);
  return mapProgress(connect(state => ({
    lang: getLang(state),
    resourceId: category,
    texts: getCategoryText(state),
  }))(MultiLingualMarkdown), {
    progressSelector: getTextProgress(category),
    onResourceChange: () => requireText(category),
  });
};
