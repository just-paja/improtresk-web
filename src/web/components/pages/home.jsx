import React, { Component, PropTypes } from 'react';

import News from '../news';
import YearDetail from '../yearDetail';

export default class Home extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { news, ready, year } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <div>
        <h1>Improtřesk</h1>
        {(
          year ?
            <YearDetail
              endAt={year.endAt}
              startAt={year.startAt}
              topic={year.topic}
              year={year.year}
            /> : null
        )}
        <News news={news} />
      </div>
    );
  }
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  year: PropTypes.shape({
    endAt: PropTypes.string,
    startAt: PropTypes.string,
    topic: PropTypes.string,
    year: PropTypes.string,
  }),
};

Home.defaultProps = {
  ready: false,
};
