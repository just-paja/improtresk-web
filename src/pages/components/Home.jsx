import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import HomeMenu from './HomeMenu';
import YearDetail from '../../years/components/YearDetail';

const Home = ({ about, news, year }) => {
  const yearClass = `year-${year.year}`;

  return (
    <div
      className={classnames([yearClass], {
        'year-next': !year.current,
      })}
    >
      <YearDetail
        current={year.current}
        endDate={year.endDate}
        startDate={year.startDate}
        startSignupsAt={year.startSignupsAt}
        topic={year.topic}
        year={year.year}
      />
      {year.current ? (
        <HomeMenu
          about={about}
          news={news}
        />
      ) : null}
    </div>
  );
};

Home.propTypes = {
  about: PropTypes.string,
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  year: PropTypes.shape({
    endDate: PropTypes.string,
    startAt: PropTypes.string,
    topic: PropTypes.string,
    year: PropTypes.string,
  }),
};

Home.defaultProps = {
  about: null,
  year: null,
};

export default Home;
