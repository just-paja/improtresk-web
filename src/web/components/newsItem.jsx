import React, { PropTypes } from 'react';

import HumanDate from './humanDate';
import PermaLink from './permaLink';

const NewsItem = ({ id, text, createdAt }) => (
  <div>
    <div>{text}</div>
    <PermaLink id={id} title={text} to="news:item">
      <HumanDate date={createdAt} showTime />
    </PermaLink>
  </div>
);

NewsItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NewsItem;
