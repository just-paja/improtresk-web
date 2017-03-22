import Alert from 'react-bootstrap/lib/Alert';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import ObjectList from '../objectList';
import PerformerListItem from '../performerListItem';
import ScheduleOverview from '../schedule/overview';

export default class Schedule extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { performers, ready, scheduleEvents, year } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <h1>Program</h1>
        <Alert bsStyle="info">Program pro tento ročník se zatím formuje.</Alert>
        <ScheduleOverview
          endAt={year.endDate}
          events={scheduleEvents}
          rowHeight={24}
          startAt={year.startDate}
        />
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
  scheduleEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  ready: PropTypes.bool,
  year: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }),
};

Schedule.defaultProps = {
  ready: false,
  year: null,
};
