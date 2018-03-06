import Alert from 'reactstrap/lib/Alert';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import Message from '../../containers/Message';
import ObjectList from '../../components/ObjectList';
import PerformerListItem from '../../performers/components/PerformerListItem';
import ScheduleOverview from '../../schedule/components/ScheduleOverview';
import TextSchedule from '../../texts/containers/TextSchedule';

const Schedule = ({
  performers,
  scheduleEvents,
  year,
}) => (
  <Container>
    <h1><Message name="schedule.heading" /></h1>
    <TextSchedule skipFirstHeading />
    {scheduleEvents.length > 0 ? (
      <ScheduleOverview
        endAt={year.endDate}
        events={scheduleEvents}
        rowHeight={64}
        startAt={year.startDate}
      />
    ) : <Alert color="info"><Message name="schedule.notReady" /></Alert>}
    <hr />
    <h2 className="text-center"><Message name="schedule.performers" /></h2>
    {performers.length > 0 ? (
      <ObjectList
        Component={PerformerListItem}
        data={performers}
        colProps={{
          sm: 6,
          md: 4,
        }}
      />
    ) : <Alert color="info"><Message name="schedule.performersNotReady" /></Alert>}
  </Container>
);

Schedule.propTypes = {
  performers: PropTypes.arrayOf(PropTypes.object).isRequired,
  scheduleEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  year: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }),
};

Schedule.defaultProps = {
  year: null,
};

export default Schedule;
