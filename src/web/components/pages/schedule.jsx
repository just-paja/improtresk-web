import React, { Component, PropTypes } from 'react';

import Container from '../container';

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
      <Container>
        <h1>Program</h1>
        <p>Program pro tento ročník zatím není zveřejněný.</p>
      </Container>
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
