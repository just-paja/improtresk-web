import PropTypes from 'prop-types';
import React from 'react';

import ObjectList from '../../components/ObjectList';
import NewsItem from './NewsItem';

const NewsList = ({ news }) => (
  <ObjectList
    Component={NewsItem}
    data={news}
    emptyMessage="Zatím nemáme žádné novinky"
    md={12}
  />
);

NewsList.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewsList;
