import React, { Component, PropTypes } from 'react';

import Container from '../../container';

class ParticipantHome extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { ready, participant, yearNumber } = this.props;
    if (!ready) {
      return null;
    }

    return (
      <Container>
        <h1>Můj Improtřesk {yearNumber}</h1>
        <strong>{participant.name}</strong>
      </Container>
    );
  }
}

ParticipantHome.propTypes = {
  participant: PropTypes.shape({
    name: PropTypes.string,
  }),
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  yearNumber: PropTypes.string,
};

ParticipantHome.defaultProps = {
  participant: null,
  ready: false,
  yearNumber: null,
};

export default ParticipantHome;
