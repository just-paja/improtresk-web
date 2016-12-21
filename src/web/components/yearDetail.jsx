import React, { PropTypes } from 'react';

import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import HumanDateRange from './humanDateRange';
import styles from './yearDetail.css';

const YearDetail = ({ endAt, startAt, topic, year }) => (
  <div className="text-center">
    <h1>Improtřesk {year} <small className={styles.topic}><i>{topic}</i></small></h1>
    <div className={styles.upcomingDate}>
      <HumanDateRange
        end={endAt}
        start={startAt}
      />
    </div>
    <LinkContainer to="/prihlaska">
      <Button bsStyle="primary">Přihláška</Button>
    </LinkContainer>
  </div>
);

YearDetail.propTypes = {
  endAt: PropTypes.string.isRequired,
  startAt: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default YearDetail;
