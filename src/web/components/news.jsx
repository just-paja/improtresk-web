import React, { PropTypes } from 'react';

import ObjectList from './objectList';
import NewsItem from './newsItem';

const News = ({ news }) => (
  <ObjectList
    Component={NewsItem}
    data={news}
    emptyMessage="Zatím nemáme žádné novinky"
    md={12}
  />
);

News.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
};

export default News;
