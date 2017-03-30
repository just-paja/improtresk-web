import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import WorkshopList from '../workshopList';

export default class Workshops extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const { ready, workshops } = this.props;
    const title = 'Workshopy';

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
        <WorkshopList workshops={workshops} />
      </Container>
    );
  }
}

Workshops.propTypes = {
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Workshops.defaultProps = {
  ready: false,
};
