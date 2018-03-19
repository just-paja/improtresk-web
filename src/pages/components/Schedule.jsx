import PropTypes from 'prop-types';
import React from 'react';

import Container from '../../components/Container';
import HelmetTitle from '../../containers/HelmetTitle';
import Message from '../../containers/Message';
import PerformerList from '../../performers/containers/PerformerList';
import ScheduleOverview from '../../schedule/containers/ScheduleOverview';
import TextSchedule from '../../texts/containers/TextSchedule';

const Schedule = ({ translate }) => (
  <Container>
    <HelmetTitle title={translate('pages.schedule')} />
    <h1><Message name="schedule.heading" /></h1>
    <TextSchedule skipFirstHeading />
    <ScheduleOverview />
    <hr />
    <h2 className="text-center"><Message name="schedule.performers" /></h2>
    <PerformerList />
  </Container>
);

Schedule.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Schedule;
