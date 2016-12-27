import Grid from 'react-bootstrap/lib/Grid';
import React, { Component, PropTypes } from 'react';

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
      <Grid>
        <h1>Tipy z Milevska</h1>
        <TipList tips={tips} />
      </Grid>
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
