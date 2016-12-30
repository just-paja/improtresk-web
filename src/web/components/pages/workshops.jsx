import React, { Component, PropTypes } from 'react';

import Container from '../container';
import WorkshopList from '../workshopList';

export default class Workshops extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { ready, workshops } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <h1>Workshopy</h1>
        <WorkshopList workshops={workshops} />
      </Container>
    );
  }
}

Workshops.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Workshops.defaultProps = {
  ready: false,
};
