import Grid from 'react-bootstrap/lib/Grid';
import React, { Component, PropTypes } from 'react';

export default class Home extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { ready } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Grid>
        <h1>Program</h1>
        <p>Program pro tento ročník zatím není zveřejněný.</p>
      </Grid>
    );
  }
}

Home.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
};

Home.defaultProps = {
  ready: false,
};
