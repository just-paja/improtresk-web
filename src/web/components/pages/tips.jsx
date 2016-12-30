import React, { Component, PropTypes } from 'react';

import Container from '../container';
import TipList from '../tipList';

export default class Tips extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { ready, tips } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <h1>Tipy z Milevska</h1>
        <TipList tips={tips} />
      </Container>
    );
  }
}

Tips.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  tips: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Tips.defaultProps = {
  ready: false,
};
