import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import FoodTime from '../foodTime';

export default class Food extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { foodTimes, intro, ready } = this.props;
    const title = 'Stravování';

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <Helmet
          title={title}
          meta={[
            { property: 'og:title', content: title },
          ]}
        />
        <h1>{title}</h1>
        <Markdown source={intro} />
        <ul>
          {foodTimes.map(foodTime =>
            <li key={foodTime.id}>
              <FoodTime {...foodTime} />
            </li>
          )}
        </ul>
      </Container>
    );
  }
}

Food.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  foodTimes: PropTypes.arrayOf(PropTypes.object).isRequired,
  intro: PropTypes.string.isRequired,
};

Food.defaultProps = {
  ready: false,
};
