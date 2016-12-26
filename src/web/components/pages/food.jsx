import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';

import FoodTime from '../foodTime';

export default class Food extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { foodTimes, intro, ready } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <div>
        <h1>Stravování</h1>
        <Markdown source={intro} />
        <ul>
          {foodTimes.map(foodTime =>
            <li key={foodTime.id}>
              <FoodTime {...foodTime} />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

Food.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  foodTimes: PropTypes.arrayOf(PropTypes.object),
  intro: PropTypes.string.isRequired,
};

Food.defaultProps = {
  ready: false,
};
