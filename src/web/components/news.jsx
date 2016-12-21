import React, { PropTypes } from 'react';

import NewsItem from './newsItem';

const News = ({ news }) => (
  <div>
    {news.map(item => (
      <NewsItem
        createdAt={item.createdAt}
        id={item.id}
        key={item.id}
        text={item.text}
      />
    ))}
  </div>
);

News.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
};

export default News;
