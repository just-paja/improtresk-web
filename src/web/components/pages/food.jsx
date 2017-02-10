import Col from 'react-bootstrap/lib/Col';
import Helmet from 'react-helmet';
import Image from 'react-bootstrap/lib/Image';
import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

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
        <Row>
          <Col md={6}>
            <Markdown source={intro} />
            <ul>
              {foodTimes.map(foodTime =>
                <li key={foodTime.id}>
                  <FoodTime {...foodTime} />
                </li>
              )}
            </ul>
          </Col>
          <Col md={6}>
            <Image responsive src="/static/theme/2017/bg-food.jpg" />
          </Col>
        </Row>
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
