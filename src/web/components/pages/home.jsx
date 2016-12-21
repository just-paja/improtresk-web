import React, { Component, PropTypes } from 'react';

import News from '../news';

export default class Home extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { news } = this.props;

    return (
      <div>
        <h1>Improtřesk</h1>
        <News news={news} />
      </div>
    );
  }
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
  onMount: PropTypes.func.isRequired,
};
