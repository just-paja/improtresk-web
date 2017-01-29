import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

import HomeMenu from '../homeMenu';
import YearDetail from '../yearDetail';

export default class Home extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { about, news, ready, year } = this.props;

    if (!ready || !year) {
      return null;
    }

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
  }
}

Home.propTypes = {
  about: PropTypes.string.isRequired,
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  year: PropTypes.shape({
    endDate: PropTypes.string,
    startAt: PropTypes.string,
    topic: PropTypes.string,
    year: PropTypes.string,
  }),
};

Home.defaultProps = {
  ready: false,
  year: null,
};
