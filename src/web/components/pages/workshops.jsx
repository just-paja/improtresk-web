import Grid from 'react-bootstrap/lib/Grid';
import React, { Component, PropTypes } from 'react';

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
      <Grid>
        <h1>Workshopy</h1>
        <WorkshopList workshops={workshops} />
      </Grid>
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
