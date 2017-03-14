import Alert from 'react-bootstrap/lib/Alert';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import ObjectList from '../objectList';
import PerformerListItem from '../performerListItem';

export default class Schedule extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { performers, ready } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <h1>Program</h1>
        <Alert bsStyle="info">Program pro tento ročník zatím není zveřejněný.</Alert>
        <h2>Účinkující</h2>
        <ObjectList
          Component={PerformerListItem}
          data={performers}
        />
      </Container>
    );
  }
}

Schedule.propTypes = {
  onMount: PropTypes.func.isRequired,
  performers: PropTypes.arrayOf(PropTypes.object).isRequired,
  ready: PropTypes.bool,
};

Schedule.defaultProps = {
  ready: false,
};
