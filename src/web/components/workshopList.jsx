import React, { PropTypes } from 'react';

import { Col, Row } from 'react-bootstrap';

import WorkshopSummary from './workshopSummary';

const WorkshopList = ({ workshops }) => (
  <Row>
    {workshops.map(workshop => (
      <Col key={workshop.id} md={6}>
        <WorkshopSummary {...workshop} />
      </Col>
    ))}
  </Row>
);

WorkshopList.propTypes = {
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WorkshopList;
