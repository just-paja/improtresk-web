import React, { PropTypes } from 'react';

import News from '../news';

const Home = ({ news }) => (
  <div>
    <h1>Improtřesk</h1>
    <News news={news} />
  </div>
);

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
};

export default Home;
