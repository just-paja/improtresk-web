import Markdown from 'react-markdown';
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
    const { intro, performers, ready, scheduleEvents, year } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <h1>Program</h1>
        <Markdown source={intro} />
        <ScheduleOverview
          endAt={year.endDate}
          events={scheduleEvents}
          rowHeight={64}
          startAt={year.startDate}
        />
        <h2>Účinkující</h2>
        <ObjectList
          Component={PerformerListItem}
          data={performers}
          colProps={{
            sm: 6,
            md: 4,
          }}
        />
      </Container>
    );
  }
}

Schedule.propTypes = {
  onMount: PropTypes.func.isRequired,
  performers: PropTypes.arrayOf(PropTypes.object).isRequired,
  intro: PropTypes.string,
  scheduleEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  ready: PropTypes.bool,
  year: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }),
};

Schedule.defaultProps = {
  intro: null,
  ready: false,
  year: null,
};
